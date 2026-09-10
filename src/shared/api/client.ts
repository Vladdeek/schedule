import axios from 'axios'
import { API } from '../config/config'
import { getCookie } from '../lib/api/cookies'
import { handleApiError } from '../lib/api/errorHandler'

const api = axios.create({
	baseURL: API,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 5000,
})

// Интерцептор запросов (Request)
api.interceptors.request.use(
	config => {
		// Забираем CSRF-токен из кук
		const csrf = getCookie('csrftoken')
		if (csrf) {
			config.headers['X-CSRF-TOKEN'] = csrf
		}

		return config
	},
	error => {
		return Promise.reject(error)
	},
)

// Интерцептор ответов (Response)
api.interceptors.response.use(
	response => {
		// Оптимизация: отдаем компонентам сразу чистое тело ответа (.data)
		// Больше не придется писать res.data.data в коде
		return response?.data ?? response
	},
	error => {
		// Оптимизация: игнорируем отмененные запросы (чтобы не спамить тостами)
		if (axios.isCancel(error)) {
			return Promise.reject(error)
		}

		const status = error.response?.status

		// Обработка критической ошибки авторизации
		if (status === 401) {
			// window.location.href = '/login'
		}

		// Глобальный перехватчик ошибок: скармливаем ошибку твоему handleApiError
		if (error.response) {
			handleApiError(error.response)
		} else if (error.request) {
			// Оптимизация: если сервер вообще не ответил (нет интернета / упал бэк)
			handleApiError({
				status: 0,
				data: { unique_code: 'NETWORK_ERROR' },
			})
		}

		// Пробрасываем отклоненный промис дальше, чтобы в компонентах
		// всё равно можно было локально поймать ошибку, если это необходимо
		return Promise.reject(error)
	},
)

export default api
