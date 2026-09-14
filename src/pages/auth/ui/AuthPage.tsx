import { useEffect, useState } from 'react'
import { Button, SearchInput, Text } from '../../../shared/ui'
import { getGroups } from '../../../entities/schedule/api/scheduleApi'

export const AuthPage = () => {
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

	const [groups, setGroups] = useState<string[]>([])

	const fetchGroups = async () => {
		try {
			const res = await getGroups()
			setGroups(res)
		} catch (err) {
			console.error(err)
		} finally {
		}
	}

	useEffect(() => {
		fetchGroups()
	}, [])

	// Сохранение в localStorage и продолжение
	const handleConfirm = () => {
		if (!selectedGroup) return

		// Сохраняем группу в локальное хранилище
		localStorage.setItem('user_group', JSON.stringify(selectedGroup))
	}

	return (
		<div className='relative flex h-screen w-screen flex-col items-center justify-center bg-[var(--bg-secondary)] p-4 overflow-hidden'>
			{/* Главная карточка */}
			<div className='flex w-full max-w-md flex-col items-center rounded-3xl border border-[var(--border)] bg-[var(--bg-primary)] p-8 shadow-xl backdrop-blur-md transition-all'>
				{/* Информативный заголовок и четкое объяснение UX */}
				<div className='flex flex-col items-center text-center gap-2 mb-6'>
					<Text size='2xl' weight='bold' style='primary'>
						Укажите вашу группу
					</Text>
					<Text size='sm' style='secondary' className='leading-relaxed'>
						Мы не нашли сохраненных данных о вашей группе. Выберите ее из
						списка, чтобы мы могли сформировать актуальное расписание и
						материалы.
					</Text>
				</div>

				{/* Блок выбора/отображения группы */}
				<div className='w-full mb-6 flex flex-col gap-2'>
					<Text size='xs' weight='medium' style='tertiary'>
						Ваш выбор:
					</Text>

					<SearchInput
						options={groups}
						placeholder='Введите номер группы...'
						onSelect={option => {
							setSelectedGroup(option)
						}}
					/>
				</div>

				{/* Кнопка подтверждения */}
				<Button
					style='black'
					size='lg'
					className='w-full'
					disabled={!selectedGroup}
					onClick={handleConfirm}
				>
					Сохранить и продолжить
				</Button>

				{/* Поясняющая плашка внизу */}
				<div className='mt-6 text-center'>
					<Text size='xs' style='tertiary'>
						Группу можно будет изменить в любой момент в настройках профиля.
					</Text>
				</div>
			</div>
		</div>
	)
}
