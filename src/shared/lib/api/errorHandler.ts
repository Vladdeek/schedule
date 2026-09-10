import { toast } from 'sonner'
import {
	BACKEND_ERROR_MAP,
	HTTP_ERROR_MESSAGE,
} from '../../config/enums/errors'

export interface ApiErrorResponse {
	status?: number
	data?: {
		unique_code?: string
	}
}

export const handleApiError = (errorResponse: unknown) => {
	// Приводим к объекту, если пришли валидные данные
	const err = (
		errorResponse && typeof errorResponse === 'object' ? errorResponse : {}
	) as ApiErrorResponse

	const uniqueCode = err.data?.unique_code
	const status = err.status

	const errorObject = uniqueCode ? BACKEND_ERROR_MAP[uniqueCode] : undefined

	// Безопасная проверка на случай, если прилетел неизвестный уникальный код
	const uniqueCode_message = errorObject
		? errorObject
		: 'Произошла непредвиденная ошибка'

	const httpStatus_message =
		(status && HTTP_ERROR_MESSAGE[status]) || 'Ошибка сервера'

	toast.error(`${status ?? '---'}: ${httpStatus_message}`, {
		description: uniqueCode_message,
		id: 'api-error',
	})
}
