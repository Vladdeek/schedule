import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SchedulePage } from '../../pages/schedule/ui/SchedulePage'
import { AuthPage } from '../../pages/auth/ui/AuthPage'

export default function AppRoutes() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes>
				<Route path='/schedule' element={<SchedulePage />}></Route>
				<Route path='/auth' element={<AuthPage />}></Route>
			</Routes>
		</Suspense>
	)
}
