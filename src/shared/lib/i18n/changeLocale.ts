import i18next from 'i18next'

export const ChangeLocale = () => {
	const newLanguage = i18next.language === 'ru' ? 'en' : 'ru'

	i18next.changeLanguage(newLanguage)

	return newLanguage
}
