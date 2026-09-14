import { useSearchParams } from 'react-router-dom'
import { Show, Text } from '../../../shared/ui'
import type { LESSONS } from '../model/lessonModel'
import { LessonBadge } from './LessonBage'
import { User, Group, Users } from 'lucide-react'
import { isToday, isWithinInterval, parse } from 'date-fns'
import { useState } from 'react'
import { ScheduleInfoModal } from './ScheduleInfoModal'

interface ScheduleCardProps {
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

export const ScheduleCard = ({
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
}: ScheduleCardProps) => {
	const [searchParams] = useSearchParams()

	const activeMode = searchParams.get('mode')

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const now = new Date()
	const lessonDate = parse(date, 'yyyy-MM-dd', new Date())
	const start = parse(`${date} ${startTime}`, 'yyyy-MM-dd HH:mm', new Date())
	const end = parse(`${date} ${endTime}`, 'yyyy-MM-dd HH:mm', new Date())
	const isActive =
		isToday(lessonDate) &&
		isWithinInterval(now, {
			start,
			end,
		})
	const STYLES = {
		lessonNumber: {
			active: 'bg-[var(--hero)] text-white',
			notActive: 'bg-[var(--bg-primary)] text-[var(--text-primary)]',
		},
		card: {
			active: 'ring-0 bg-[var(--bg-secondary)]',
			notActive: 'ring-0 bg-[var(--bg-secondary)]',
		},
	}
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
				className={` w-full h-fit flex rounded-xl p-1 ${
					STYLES.card[isActive ? 'active' : 'notActive']
				}`}
			>
				<div
					className={`w-5 h-full rounded-2xl flex items-center justify-center ${
						STYLES.lessonNumber[isActive ? 'active' : 'notActive']
					}`}
				>
					{lessonNumber}
				</div>
				<div className='flex flex-col w-full gap-1 p-2'>
					<div className='flex justify-between items-center w-full'>
						<div className='flex gap-2'>
							<LessonBadge lessonType={lessonType} />
							<Text
								className='whitespace-nowrap'
								size='sm'
								style='secondary'
							>{`${startTime} - ${endTime}`}</Text>
						</div>
						<Text
							title={auditory}
							className={
								auditory.split('.')[0] === 'СПОРТ'
									? 'truncate w-30 text-end'
									: ''
							}
							size='sm'
							style='secondary'
						>
							{auditory.split('.')[0] === '25'
								? 'Дистанционно'
								: `ауд. ${auditory}`}
						</Text>
					</div>
					<Text size='lg' weight='medium'>
						{discipline}
					</Text>
					<div
						className={`flex ${activeMode === 'teacher' && 'flex-row-reverse'} justify-between items-center w-full`}
					>
						<Text
							size={activeMode === 'teacher' ? 'sm' : 'md'}
							style={activeMode === 'teacher' ? 'tertiary' : 'secondary'}
						>{`${teacher}`}</Text>
						<div className='flex flex-col items-end'>
							<Text
								size={activeMode === 'group' ? 'sm' : 'md'}
								style={activeMode === 'group' ? 'tertiary' : 'secondary'}
							>{`${group}`}</Text>
							<Show when={subGroup !== null}>
								<Text
									size={activeMode === 'group' ? 'sm' : 'md'}
									style={activeMode === 'group' ? 'tertiary' : 'secondary'}
								>
									{`${subGroup}-я подгруппа`}
								</Text>
							</Show>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
