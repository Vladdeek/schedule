import { Navigate, Outlet } from 'react-router-dom'

export const PublicRoute = () => {
	const groupName = localStorage.getItem('user_group')

	return groupName ? <Navigate to='/schedule' replace /> : <Outlet />
}
