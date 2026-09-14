import { format, getDay, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

import { Text } from '../../../shared/ui'
import { DayToggler } from './DayToggler'
import { ModeToggler } from './ModeToggler'
import { WeekToggler } from './WeekToggler'
import { getCurrentWeek } from '../../../entities/schedule/api/scheduleApi'
import { useAppSelector } from '../../../app/store/hooks'
import { getDaySchedule } from '../../../entities/schedule/lib/getDaySchedule'

export const ScheduleHeader = () => {
	const { weekSchedule, currentDate } = useAppSelector(state => state.schedule)
	const todaySchedule = getDaySchedule(weekSchedule, currentDate)
	const date = parseISO(currentDate)

	const isWeekend = getDay(date) === 0 || getDay(date) === 6
	const isDayOff = isWeekend && todaySchedule.length === 0
	return (
		<div className='w-full flex flex-col gap-3'>
			{/* <div className='flex flex-col gap-1'>
				<ModeToggler
					modes={[
						{
							label: 'Группа',
							value: 'group',
						},
						{
							label: 'Преподаватель',
							value: 'teacher',
						},
					]}
				/>
			</div> */}
			<div className='flex flex-col gap-1'>
				<Text weight='medium' size='3xl'>
					{`Сегодня ${format(date, 'd MMMM', { locale: ru })}`}
				</Text>
				<Text weight='medium' size='4xl' style='hero'>
					{isDayOff ? 'Выходной' : `${todaySchedule.length} пар`}
				</Text>
			</div>
			<div className='flex flex-col gap-1'>
				{/* <WeekToggler /> */}
				<DayToggler />
			</div>
		</div>
	)
}
