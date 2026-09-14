import { startOfWeek, addDays, format, isSameDay, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { DayButton } from './DayButton'
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks'
import { setSelectedDate } from '../../../entities/schedule/model/scheduleSlice'

export const DayToggler = () => {
	const dispatch = useAppDispatch()

	const selectedDate = useAppSelector(state => state.schedule.selectedDate)

	const currentDate = new Date()

	const monday = startOfWeek(currentDate, {
		weekStartsOn: 1,
	})

	const weekDays = Array.from({ length: 7 }, (_, index) => {
		const date = addDays(monday, index)

		return {
			date,
			weekDay: format(date, 'eeeeee', { locale: ru }),
			dayNumber: date.getDate(),
		}
	})

	const handleDayClick = (date: Date) => {
		dispatch(setSelectedDate(format(date, 'yyyy-MM-dd')))
	}

	return (
		<div className='flex gap-1 items-center w-full'>
			{weekDays.map(item => (
				<DayButton
					key={item.date.toISOString()}
					onClick={() => handleDayClick(item.date)}
					active={isSameDay(item.date, parseISO(selectedDate))}
					weekDay={item.weekDay}
					dayNumber={item.dayNumber}
				/>
			))}
		</div>
	)
}
