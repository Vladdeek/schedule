import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Moon, Search, Sun } from 'lucide-react'
import { Button, SearchInput, Text } from '../../../shared/ui'
import {
	getSystemTheme,
	toggleTheme,
} from '../../../shared/lib/theme/changeTheme'
import { useSearchParams } from 'react-router-dom'

export const AppHeader = () => {
	const [searchParams] = useSearchParams()
	const activeMode = searchParams.get('mode')

	const [theme, setTheme] = useState(getSystemTheme())
	const [isSearchOpen, setIsSearchOpen] = useState(false)

	return (
		<header className='relative w-full h-10 flex items-center'>
			<AnimatePresence mode='wait'>
				{!isSearchOpen ? (
					<motion.div
						key='header'
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						className='w-full flex justify-between items-center'
					>
						<div className='flex gap-1 items-center'>
							<img
								className='h-8 w-auto aspect-square'
								src='./logo.png'
								alt=''
							/>

							<Text className='leading-4' size='lg' weight='medium'>
								Расписание <br /> МелГУ
							</Text>
						</div>

						<div className='flex gap-1'>
							<Button
								className='p-2'
								size='square'
								style='transparent'
								onClick={() => setIsSearchOpen(true)}
							>
								<Search size={18} />
							</Button>

							<Button
								className='p-2'
								size='square'
								style='transparent'
								onClick={() => console.log('change locale')}
							>
								<p className='w-[18px] h-[18px] aspect-square flex items-center justify-center'>
									🇷🇺
								</p>
							</Button>

							<Button
								className='p-2'
								size='square'
								style={'transparent'}
								onClick={() => {
									const res = toggleTheme()
									setTheme(res)
								}}
							>
								{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
							</Button>
						</div>
					</motion.div>
				) : (
					<motion.div
						key='search'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						className='w-full h-full flex items-center'
					>
						<SearchInput
							placeholder={
								activeMode === 'group'
									? 'Введите название группы...'
									: 'Введите ФИО преподавателя...'
							}
							isOpen={isSearchOpen}
							onClose={() => setIsSearchOpen(false)}
							options={[
								{
									id: '1',
									label: 'Иванов Иван',
									description: 'Преподаватель',
								},
								{
									id: '2',
									label: 'ИВТ-21',
									description: 'Группа',
								},
								{
									id: '3',
									label: 'Математика',
									description: 'Дисциплина',
								},
							]}
							onSelect={option => {
								console.log('selected:', option)
							}}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	)
}
