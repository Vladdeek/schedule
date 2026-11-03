import { useState } from 'react'
import { isToday, isWithinInterval, parse } from 'date-fns'
import { Text } from '../../../shared/ui'
import type { LESSONS } from '../model/lessonModel'
import { LessonBadge } from './LessonBage'
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
		isToday(lessonDate) && isWithinInterval(new Date(), { start, end })
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

			<div className='[container-type:size] h-full w-full min-h-0 min-w-0 overflow-hidden'>
				<div
					role='button'
					tabIndex={0}
					onClick={() => setIsOpen(true)}
					onKeyDown={event => {
						if (event.key === 'Enter' || event.key === ' ') {
							event.preventDefault()
							setIsOpen(true)
						}
					}}
					className={`flex h-full min-h-0 min-w-0 flex-col gap-1.5 overflow-hidden rounded-xl bg-[var(--bg-secondary)] p-2 transition-colors hover:bg-[var(--bg-tertiary)] ${isActive ? 'outline outline-2 outline-[var(--hero)] outline-offset-[-2px]' : ''}`}
				>
					<div className='flex min-w-0 items-center justify-between gap-1.5'>
						<div className='min-w-0 flex-[0_1_auto] [&>div]:max-w-full [&>div]:gap-[3px] [&>div]:px-[5px] [&>div]:py-0.5 [&>div]:text-[10px] [&>div]:leading-tight'>
							<LessonBadge lessonType={lessonType} compact />
						</div>

						<Text
							size='xs'
							style='secondary'
							title={displayAuditory}
							className='min-w-0 flex-[0_1_auto] truncate whitespace-nowrap text-right @max-[175px]:hidden [@container(max-height:100px)]:hidden'
						>
							{displayAuditory}
						</Text>
					</div>

					<Text
						size='sm'
						weight='medium'
						title={discipline}
						className='min-w-0 flex-1 line-clamp-2 break-words text-[13px] leading-tight [overflow-wrap:anywhere] [@container(max-height:68px)]:line-clamp-1 [@container(max-height:68px)]:text-[10px]'
					>
						{discipline}
					</Text>

					<div className='mt-auto flex min-w-0 items-center justify-between gap-1.5 [@container(max-height:100px)]:hidden'>
						<Text
							size='xs'
							style='secondary'
							title={teacher}
							className='min-w-0 flex-1 truncate @max-[175px]:hidden'
						>
							{teacher}
						</Text>
						<Text
							size='xs'
							style='secondary'
							title={group}
							className='min-w-0 flex-[0_1_auto] truncate text-right text-[10px] @max-[120px]:text-[9px]'
						>
							{group}
							{subGroup !== null ? ` · ${subGroup}-я` : ''}
						</Text>
					</div>
				</div>
			</div>
		</>
	)
}
