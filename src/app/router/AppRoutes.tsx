import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SchedulePage } from '../../pages/schedule/ui/SchedulePage'
import { AuthPage } from '../../pages/auth/ui/AuthPage'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { RootRedirect } from './RootRedirect'

export default function AppRoutes() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes>
				{/* Авторедирект с "/" */}
				<Route path='/' element={<RootRedirect />} />

				{/* PublicRoute - доступен только не авторизированным пользователям */}
				<Route element={<PublicRoute />}>
					<Route path='/auth' element={<AuthPage />} />
				</Route>

				{/* ProtectedRoute - доступен только авторизированным пользователям */}
				<Route element={<ProtectedRoute />}>
					<Route path='/schedule' element={<SchedulePage />}></Route>
				</Route>
			</Routes>
		</Suspense>
	)
}
