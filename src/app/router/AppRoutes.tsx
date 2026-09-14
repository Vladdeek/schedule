import { Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ScheduleLayout } from '../layouts/SchdeuleLayout'
import { useAppDispatch } from '../store/hooks'
import { fetchWeekSchedule } from '../../entities/schedule/model/scheduleSlice'

export default function AppRoutes() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes>
				<Route path='/schedule' element={<ScheduleLayout />}></Route>
			</Routes>
		</Suspense>
	)
}
