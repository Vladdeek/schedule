import { useScheduleTable } from '../model/useScheduleTable'
import { DayHeader, DayColumn } from './schedule-table/DayColumn'
import { TimeColumn, TimeHeader } from './schedule-table/TimeColumn'
import { TIME_COLUMN_WIDTH } from '../model/scheduleTableModel'

export const ScheduleTable = () => {
	const { days, positionedByDay } = useScheduleTable()

	return (
		<div
			className='min-h-0 min-w-0 flex-1 overflow-auto hide-scrollbar'
			style={
				{
					'--schedule-time-column-width': TIME_COLUMN_WIDTH,
				} as React.CSSProperties
			}
		>
			<div
				className='grid min-w-max gap-x-3 px-1'
				style={{
					gridTemplateColumns: `var(--schedule-time-column-width) repeat(${days.length}, minmax(190px, 1fr))`,
					minWidth: `calc(var(--schedule-time-column-width) + ${days.length * 205}px)`,
				}}
			>
				<TimeHeader />
				<DayHeader days={days} />
				<TimeColumn />
				{days.map(({ key }) => (
					<DayColumn key={key} {...positionedByDay[key]} />
				))}
			</div>
		</div>
	)
}
