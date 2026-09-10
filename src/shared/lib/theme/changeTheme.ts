import { THEME } from '../../config/enums/themes'
import { STORAGE_KEY } from '../../config/localStorageKeys'

/**
 * Получить текущую тему из localStorage или системных настроек.
 * @returns {string} 'light' | 'dark'
 */
export const getSystemTheme = () => {
	const savedTheme = localStorage.getItem(STORAGE_KEY.THEME)

	if (savedTheme === THEME.LIGHT || savedTheme === THEME.DARK) {
		return savedTheme
	}

	// Если пользователь зашел впервые, смотрим на настройки его ОС
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? THEME.DARK
		: THEME.LIGHT
}

/**
 * Применить тему: сохраняет в localStorage и вешает атрибут на документ
 * @param {string} theme - 'light' | 'dark'
 */
export const applyTheme = (theme: string) => {
	if (theme !== THEME.LIGHT && theme !== THEME.DARK) return

	localStorage.setItem(STORAGE_KEY.THEME, theme)
	document.documentElement.setAttribute('data-theme', theme)
}

/**
 * Переключить текущую тему на противоположную
 * @returns {string} Новая установленная тема
 */
export const toggleTheme = () => {
	const currentTheme =
		document.documentElement.getAttribute('data-theme') || getSystemTheme()
	const newTheme = currentTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK

	applyTheme(newTheme)
	return newTheme
}
