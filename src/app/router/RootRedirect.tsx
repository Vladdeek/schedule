import { Navigate } from 'react-router-dom'

export const RootRedirect = () => {
	const groupName = localStorage.getItem('user_group')

	return groupName ? (
		<Navigate to='/schedule' replace />
	) : (
		<Navigate to='/auth' replace />
	)
}
