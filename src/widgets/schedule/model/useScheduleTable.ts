import { useMemo } from 'react'
import { useAppSelector } from '../../../app/store/hooks'
import type { WeekDay } from '../../../entities/schedule/model/scheduleTypes'
import { layoutLessons, SCHEDULE_DAYS } from './scheduleTableModel'

export const useScheduleTable = () => {
	const weekSchedule = useAppSelector(state => state.schedule.weekSchedule)
	const days = useMemo(
		() =>
			SCHEDULE_DAYS.filter(
				({ key }) =>
					key === 'mon' ||
					key === 'tue' ||
					key === 'wed' ||
					key === 'thu' ||
					key === 'fri' ||
					weekSchedule[key].length > 0,
			),
		[weekSchedule],
	)
	const positionedByDay = useMemo(
		() =>
			Object.fromEntries(
				days.map(({ key }) => [key, layoutLessons(weekSchedule[key])]),
			) as Record<WeekDay, ReturnType<typeof layoutLessons>>,
		[days, weekSchedule],
	)

	return { days, positionedByDay }
}
