import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import I18NextHttpBackend from 'i18next-http-backend'
import { STORAGE_KEY } from '../../shared/config/localStorageKeys'

i18next
	.use(I18NextHttpBackend)
	.use(I18nextBrowserLanguageDetector)
	.use(initReactI18next)
	.init({
		lng: localStorage.getItem(STORAGE_KEY.LOCALE) || 'en',
		fallbackLng: 'en',
		ns: ['common'],
		backend: {
			loadPath: '../public/locales/{{lng}}/{{ns}}.json',
		},
	})

export default i18next
