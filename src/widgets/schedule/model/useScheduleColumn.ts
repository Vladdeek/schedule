import { useAppSelector } from '../../../app/store/hooks'
import { getDaySchedule } from '../../../entities/schedule/lib/getDaySchedule'

export const useScheduleColumn = () => {
	const { weekSchedule, selectedDate } = useAppSelector(state => state.schedule)
	return getDaySchedule(weekSchedule, selectedDate)
}
