import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

export default function AppRoutes() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes></Routes>
		</Suspense>
	)
}
