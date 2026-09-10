type Env = 'dev' | 'prod'

// Приводим к типу Env (с дефолтным 'prod')
const env = (import.meta.env.VITE_ENV as Env) || 'prod'

const config = {
	dev: {
		API: import.meta.env.VITE_API_URL_DEV as string,
		MEDIA_URL: import.meta.env.VITE_MEDIA_URL_DEV as string,
	},
	prod: {
		API: import.meta.env.VITE_API_URL_PROD as string,
		MEDIA_URL: import.meta.env.VITE_MEDIA_URL_PROD as string,
	},
} as const

if (!config[env]) {
	throw new Error(`Неизвестное окружение: ${env}`)
}

export const { API, MEDIA_URL } = config[env]
export const IS_DEV = env === 'dev'
