import { format, parseISO } from 'date-fns'
import type {
	Lesson,
	WeekSchedule,
	WeekDay,
} from '../../../entities/schedule/model/scheduleTypes'

const DAY_KEYS: Record<number, WeekDay> = {
	1: 'mon',
	2: 'tue',
	3: 'wed',
	4: 'thu',
	5: 'fri',
	6: 'sat',
	7: 'sun',
}

export const getDaySchedule = (
	weekSchedule: WeekSchedule,
	selectedDate: string,
): Lesson[] => {
	const date = parseISO(selectedDate)
	const dayNumber = date.getDay() === 0 ? 7 : date.getDay()

	const dayKey = DAY_KEYS[dayNumber]

	return weekSchedule[dayKey]
}
