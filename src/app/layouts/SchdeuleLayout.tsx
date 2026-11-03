import { useEffect } from 'react'
import { AppHeader } from '../../widgets/app-header'
import { ScheduleColumn, ScheduleTable } from '../../widgets/schedule'
import { ScheduleHeader } from '../../widgets/schedule-header'
import { useAppDispatch } from '../store/hooks'
import { fetchWeekSchedule } from '../../entities/schedule/model/scheduleSlice'

export const ScheduleLayout = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchWeekSchedule())
	}, [dispatch])

	return (
		<div className='flex flex-col gap-3 w-screen h-screen'>
			<div className='flex flex-col gap-3 bg-[var(--bg-primary)] p-4 rounded-b-3xl shadow-md/5'>
				<AppHeader />
				<div className='self-center w-[90vw] h-[2px] bg-[var(--border)]/50' />
				<ScheduleHeader />
			</div>

			<div className='lg:flex hidden flex-1 min-h-0 gap-3 bg-[var(--bg-primary)] p-4 rounded-t-3xl shadow-md/5'>
				<ScheduleTable />
			</div>

			<div className='flex flex-1 min-h-0 lg:hidden flex-col gap-3 bg-[var(--bg-primary)] p-4 rounded-t-3xl shadow-md/5'>
				<ScheduleColumn />
			</div>
		</div>
	)
}
