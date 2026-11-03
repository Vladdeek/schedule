import { Text } from '../../../../shared/ui'
import {
	CALENDAR_HEIGHT,
	FIRST_MINUTE,
	MINUTES_PER_PIXEL,
	TIME_SLOTS,
	toMinutes,
} from '../../model/scheduleTableModel'

export const TimeHeader = () => (
	<div className='sticky left-0 top-0 z-30 flex h-12 items-center border-b border-[var(--border)] bg-[var(--bg-primary)] px-2'>
		<Text weight='semibold'>Время пар</Text>
	</div>
)

export const TimeColumn = () => (
	<div
		className='sticky left-0 z-10 relative bg-[var(--bg-primary)]'
		style={{ height: CALENDAR_HEIGHT }}
	>
		{TIME_SLOTS.map(([number, slot]) => {
			const top = (toMinutes(slot.startTime) - FIRST_MINUTE) / MINUTES_PER_PIXEL
			const bottom = (toMinutes(slot.endTime) - FIRST_MINUTE) / MINUTES_PER_PIXEL
			return (
				<div
					key={number}
					className='absolute left-0 right-0 border-t border-[var(--border)]/70 pt-1'
					style={{ top, height: bottom - top }}
				>
					<Text size='sm' weight='semibold'>
						{number}-я пара
					</Text>
					<Text size='xs' style='secondary'>
						{slot.startTime} – {slot.endTime}
					</Text>
				</div>
			)
		})}
		<div
			className='absolute inset-x-0 border-t border-[var(--border)]/70'
			style={{ top: CALENDAR_HEIGHT }}
		/>
	</div>
)
