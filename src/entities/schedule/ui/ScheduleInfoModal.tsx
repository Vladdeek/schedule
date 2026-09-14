import { Modal } from '../../../shared/ui/Modal'
import { LessonBadge } from './LessonBage'
import { Text, Show } from '../../../shared/ui'
import type { LESSONS } from '../model/lessonModel'
import { Clock, MapPin, User, Users, BookOpen, Layers } from 'lucide-react'

interface ScheduleInfoModalProps {
	isOpen: boolean
	onClose: () => void
	data: {
		date: string
		lessonType: keyof typeof LESSONS
		lessonNumber: number
		startTime: string
		endTime: string
		auditory: string
		discipline: string
		teacher: string
		group: string
		subGroup: number | null
	} | null
}

export const ScheduleInfoModal = ({
	isOpen,
	onClose,
	data,
}: ScheduleInfoModalProps) => {
	if (!data) return null

	const formattedAuditory =
		data.auditory.split('.')[0] === '25'
			? 'Дистанционно'
			: `Аудитория ${data.auditory}`

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			showCloseButton={true}
			closeOnOutsideClick={true}
			closeOnEscape={true}
		>
			<div className='flex flex-col gap-5 p-6 min-w-[320px] max-w-[500px] w-full text-[var(--text-primary)]'>
				{/* Шапка модалки */}
				<div className='flex items-center justify-between border-b border-[var(--bg-secondary)] pb-3 pr-6'>
					<div className='flex items-center gap-3'>
						<div className='flex items-center justify-center w-8 h-8 rounded-xl bg-[var(--hero)] text-white font-semibold text-sm'>
							{data.lessonNumber}
						</div>
						<LessonBadge lessonType={data.lessonType} />
					</div>
				</div>

				{/* Название дисциплины */}
				<div className='flex items-start gap-3'>
					<BookOpen className='w-5 h-5 mt-1 shrink-0 text-[var(--hero)]' />
					<div className='flex flex-col gap-1'>
						<Text size='sm' style='tertiary'>
							Дисциплина
						</Text>
						<Text size='lg' weight='medium' className='break-words'>
							{data.discipline}
						</Text>
					</div>
				</div>

				{/* Время и Аудитория */}
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[var(--bg-secondary)] p-3 rounded-xl'>
					<div className='flex items-center gap-3'>
						<Clock className='w-5 h-5 shrink-0 text-[var(--text-secondary)]' />
						<div className='flex flex-col'>
							<Text size='sm' style='tertiary'>
								Время
							</Text>
							<Text size='md' weight='medium'>
								{`${data.startTime} - ${data.endTime}`}
							</Text>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<MapPin className='w-5 h-5 shrink-0 text-[var(--text-secondary)]' />
						<div className='flex flex-col'>
							<Text size='sm' style='tertiary'>
								Место проведения
							</Text>
							<Text size='md' weight='medium' className='break-words'>
								{formattedAuditory}
							</Text>
						</div>
					</div>
				</div>

				{/* Преподаватель и Группа */}
				<div className='flex flex-col gap-4 border-t border-[var(--bg-secondary)] pt-4'>
					<div className='flex items-center gap-3'>
						<User className='w-5 h-5 shrink-0 text-[var(--text-secondary)]' />
						<div className='flex flex-col'>
							<Text size='sm' style='tertiary'>
								Преподаватель
							</Text>
							<Text size='md' weight='medium' className='break-words'>
								{data.teacher}
							</Text>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<Users className='w-5 h-5 shrink-0 text-[var(--text-secondary)]' />
						<div className='flex flex-col'>
							<Text size='sm' style='tertiary'>
								Группа
							</Text>
							<Text size='md' weight='medium' className='break-words'>
								{data.group}
							</Text>
						</div>
					</div>

					<Show when={data.subGroup !== null}>
						<div className='flex items-center gap-3 pl-8'>
							<Layers className='w-4 h-4 shrink-0 text-[var(--text-secondary)]' />
							<div className='flex flex-col'>
								<Text size='sm' style='tertiary'>
									Подгруппа
								</Text>
								<Text size='md' weight='medium'>
									{`${data.subGroup}-я подгруппа`}
								</Text>
							</div>
						</div>
					</Show>
				</div>
			</div>
		</Modal>
	)
}
