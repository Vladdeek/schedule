import { ScheduleTableElement } from '../../../../entities/schedule'
import {
	CALENDAR_HEIGHT,
	FIRST_MINUTE,
	MINUTES_PER_PIXEL,
	TIME_SLOTS,
	toMinutes,
	type DayLayout,
} from '../../model/scheduleTableModel'
import type { WeekDay } from '../../../../entities/schedule/model/scheduleTypes'
import { Text } from '../../../../shared/ui'

export const DayHeader = ({ days }: { days: { key: WeekDay; title: string }[] }) => (
	<>
		{days.map(({ key, title }) => (
			<div
				key={key}
				className='sticky top-0 z-20 flex h-12 items-center border-b border-[var(--border)] bg-[var(--bg-primary)] px-2'
			>
				<Text weight='semibold' size='lg' className='first-letter:uppercase'>
					{title}
				</Text>
			</div>
		))}
	</>
)

export const DayColumn = ({ lessons, laneCount }: DayLayout) => (
	<div
		className='relative border-l border-[var(--border)]/50'
		style={{ height: CALENDAR_HEIGHT }}
	>
		{TIME_SLOTS.map(([number, slot]) => {
			const top = (toMinutes(slot.startTime) - FIRST_MINUTE) / MINUTES_PER_PIXEL
			const height =
				(toMinutes(slot.endTime) - toMinutes(slot.startTime)) / MINUTES_PER_PIXEL
			return (
				<div
					key={number}
					className='absolute inset-x-0 border-t border-[var(--border)]/30'
					style={{ top, height }}
				/>
			)
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
