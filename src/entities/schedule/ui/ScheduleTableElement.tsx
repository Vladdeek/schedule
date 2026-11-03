import { Show, Text } from '../../../shared/ui'
import type { LESSONS } from '../model/lessonModel'
import { LessonBadge } from './LessonBage'
import { isToday, isWithinInterval, parse } from 'date-fns'
import { useState } from 'react'
import { ScheduleInfoModal } from './ScheduleInfoModal'

interface ScheduleTableElementProps {
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
}

export const ScheduleTableElement = ({
	date,
	lessonType,
	lessonNumber,
	startTime,
	endTime,
	auditory,
	discipline,
	teacher,
	group,
	subGroup,
}: ScheduleTableElementProps) => {
	const [isOpen, setIsOpen] = useState(false)

	const lessonDate = parse(date, 'yyyy-MM-dd', new Date())
	const start = parse(`${date} ${startTime}`, 'yyyy-MM-dd HH:mm', new Date())
	const end = parse(`${date} ${endTime}`, 'yyyy-MM-dd HH:mm', new Date())

	const isActive =
		isToday(lessonDate) &&
		isWithinInterval(new Date(), {
			start,
			end,
		})

	const displayAuditory =
		auditory.split('.')[0] === '25' ? 'Дистанционно' : `ауд. ${auditory}`

	return (
		<>
			<ScheduleInfoModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				data={{
					date,
					lessonType,
					lessonNumber,
					startTime,
					endTime,
					auditory,
					discipline,
					teacher,
					group,
					subGroup,
				}}
			/>

			<div
				onClick={() => setIsOpen(true)}
				className={`
					group
					w-full
					min-w-0
					h-full
					min-h-[80px]
					cursor-pointer
					rounded-xl
					bg-[var(--bg-secondary)]
					p-3
					transition-all
					hover:bg-[var(--bg-tertiary)]
					${isActive ? 'ring-2 ring-[var(--hero)]' : ''}
				`}
			>
				<div className='flex h-full min-w-0 flex-col'>
					{/* верхняя строка */}
					<div className='flex min-w-0 items-center justify-between gap-2'>
						<div className='min-w-0'>
							<LessonBadge lessonType={lessonType} />
						</div>

						<Text
							size='xs'
							style='secondary'
							title={displayAuditory}
							className='min-w-0 max-w-[55%] truncate text-right'
						>
							{displayAuditory}
						</Text>
					</div>

					{/* название */}
					<div className='mt-2 min-w-0 flex-1'>
						<Text
							size='sm'
							weight='medium'
							className='line-clamp-2 leading-tight'
							title={discipline}
						>
							{discipline}
						</Text>
					</div>

					{/* нижняя часть */}
					<div className='mt-2 flex min-w-0 items-end justify-between gap-2'>
						<Text
							size='xs'
							style='secondary'
							className='min-w-0 truncate'
							title={teacher}
						>
							{teacher}
						</Text>

						<div className='min-w-0 text-right'>
							<Text
								size='xs'
								style='secondary'
								className='truncate'
								title={group}
							>
								{group}
							</Text>

							<Show when={subGroup !== null}>
								<Text size='xs' style='tertiary'>
									{subGroup}-я
								</Text>
							</Show>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
