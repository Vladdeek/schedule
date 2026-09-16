import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Text } from '../../shared/ui'

export const ProtectedRoute = () => {
	// null — идет проверка (показываем лоадер)
	// true — user_group есть
	// false — user_group отсутствует
	const [hasGroup, setHasGroup] = useState<boolean | null>(null)

	useEffect(() => {
		const groupName = localStorage.getItem('user_group')
		setHasGroup(Boolean(groupName))
	}, [])

	// 1. Состояние загрузки
	if (hasGroup === null) {
		return (
			<div className='w-screen h-screen flex items-center justify-center'>
				<Text size='4xl'>Загрузка...</Text>
			</div>
		)
	}

	// 2. Если группа есть — пропускаем к дочерним роутам
	// 3. Если группы нет — перенаправляем на /auth
	return hasGroup ? <Outlet /> : <Navigate to='/auth' replace />
}
