import { useMemo } from 'react'
import { ScheduleTableElement } from '../../../entities/schedule'
import type { Lesson, WeekDay } from '../../../entities/schedule/model/scheduleTypes'
import { useAppSelector } from '../../../app/store/hooks'
import { LESSON_GRID } from '../../../shared/config'
import { Text } from '../../../shared/ui'

const DAYS: { key: WeekDay; title: string }[] = [
	{ key: 'mon', title: 'Понедельник' },
	{ key: 'tue', title: 'Вторник' },
	{ key: 'wed', title: 'Среда' },
	{ key: 'thu', title: 'Четверг' },
	{ key: 'fri', title: 'Пятница' },
	{ key: 'sat', title: 'Суббота' },
	{ key: 'sun', title: 'Воскресенье' },
]

const MINUTES_PER_PIXEL = 1 / 1.6
const FIRST_MINUTE = 8 * 60
const LAST_MINUTE = 20 * 60
const CALENDAR_HEIGHT = (LAST_MINUTE - FIRST_MINUTE) / MINUTES_PER_PIXEL
const toMinutes = (time: string) => {
	const [hours, minutes] = time.split(':').map(Number)
	return hours * 60 + minutes
}

interface PositionedLesson {
	lesson: Lesson
	top: number
	height: number
	lane: number
}

const layoutLessons = (lessons: Lesson[]) => {
	const sorted = [...lessons].sort(
		(a, b) => toMinutes(a.startTime) - toMinutes(b.startTime) || a.lessonNumber - b.lessonNumber,
	)
	const laneEnds: number[] = []
	const positioned: PositionedLesson[] = sorted.map(lesson => {
		const start = toMinutes(lesson.startTime)
		const end = Math.max(start + 1, toMinutes(lesson.endTime))
		let lane = laneEnds.findIndex(laneEnd => laneEnd <= start)
		if (lane < 0) lane = laneEnds.length
		laneEnds[lane] = end
		const visibleStart = Math.max(start, FIRST_MINUTE)
		const visibleEnd = Math.min(end, LAST_MINUTE)
		return {
			lesson,
			top: (visibleStart - FIRST_MINUTE) / MINUTES_PER_PIXEL,
			height: Math.max(1, (visibleEnd - visibleStart) / MINUTES_PER_PIXEL),
			lane,
		}
	})
	return { lessons: positioned, laneCount: Math.max(1, laneEnds.length) }
}

export const ScheduleTable = () => {
	const weekSchedule = useAppSelector(state => state.schedule.weekSchedule)
	const days = DAYS.filter(({ key }) => key === 'mon' || key === 'tue' || key === 'wed' || key === 'thu' || key === 'fri' || weekSchedule[key].length > 0)
	const positionedByDay = useMemo(
		() => Object.fromEntries(days.map(({ key }) => [key, layoutLessons(weekSchedule[key])])) as Record<WeekDay, ReturnType<typeof layoutLessons>>,
		[days, weekSchedule],
	)
	const timeSlots = Object.entries(LESSON_GRID)

	return (
		<div className='min-h-0 min-w-0 flex-1 overflow-auto hide-scrollbar'>
			<div
				className='grid min-w-max gap-x-3 px-1'
				style={{
					gridTemplateColumns: `136px repeat(${days.length}, minmax(190px, 1fr))`,
					minWidth: `${136 + days.length * 205}px`,
				}}
			>
				<div className='sticky top-0 z-20 flex h-12 items-center border-b border-[var(--border)] bg-[var(--bg-primary)] px-2'>
					<Text weight='semibold'>Время пар</Text>
				</div>
				{days.map(({ key, title }) => (
					<div key={key} className='sticky top-0 z-20 flex h-12 items-center border-b border-[var(--border)] bg-[var(--bg-primary)] px-2'>
						<Text weight='semibold' size='lg' className='first-letter:uppercase'>{title}</Text>
					</div>
				))}

				<div className='relative' style={{ height: CALENDAR_HEIGHT }}>
					{timeSlots.map(([number, slot]) => {
						const top = (toMinutes(slot.startTime) - FIRST_MINUTE) / MINUTES_PER_PIXEL
						const bottom = (toMinutes(slot.endTime) - FIRST_MINUTE) / MINUTES_PER_PIXEL
						return (
							<div key={number} className='absolute left-0 right-0 border-t border-[var(--border)]/70 pt-1' style={{ top, height: bottom - top }}>
								<Text size='sm' weight='semibold'>{number}-я пара</Text>
								<Text size='xs' style='secondary'>{slot.startTime} – {slot.endTime}</Text>
							</div>
						)
					})}
					<div className='absolute inset-x-0 border-t border-[var(--border)]/70' style={{ top: CALENDAR_HEIGHT }} />
				</div>

				{days.map(({ key }) => {
					const { lessons, laneCount } = positionedByDay[key]
					return (
						<div key={key} className='relative border-l border-[var(--border)]/50' style={{ height: CALENDAR_HEIGHT }}>
							{timeSlots.map(([number, slot]) => {
								const top = (toMinutes(slot.startTime) - FIRST_MINUTE) / MINUTES_PER_PIXEL
								const height = (toMinutes(slot.endTime) - toMinutes(slot.startTime)) / MINUTES_PER_PIXEL
								return <div key={number} className='absolute inset-x-0 border-t border-[var(--border)]/30' style={{ top, height }} />
							})}
							{lessons.map(({ lesson, top, height, lane }) => (
								<div
									key={lesson.id}
									className='absolute p-1'
									style={{
										top,
										height,
										left: `${(lane / laneCount) * 100}%`,
										width: `${100 / laneCount}%`,
									}}
								>
									<ScheduleTableElement
										date={lesson.date}
										lessonType={lesson.lessonType}
										lessonNumber={lesson.lessonNumber}
										startTime={lesson.startTime}
										endTime={lesson.endTime}
										auditory={lesson.auditory}
										discipline={lesson.discipline}
										teacher={lesson.teacher}
										group={lesson.group}
										subGroup={lesson.subGroup}
									/>
								</div>
							))}
						</div>
					)
				})}
			</div>
		</div>
	)
}
