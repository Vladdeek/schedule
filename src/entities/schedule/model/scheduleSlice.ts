import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit'
import { format } from 'date-fns'

import { getCurrentWeek, getSchedule } from '../api/scheduleApi'
import type { ApiLesson, Lesson, WeekSchedule, WeekDay } from './scheduleTypes'

// Вариант через replace:
const GROUP = (localStorage.getItem('user_group') || '').replace(/^"|"$/g, '')

const SCHEDULE_TYPE = 'group'

const DAY_KEYS: Record<number, WeekDay> = {
	1: 'mon',
	2: 'tue',
	3: 'wed',
	4: 'thu',
	5: 'fri',
	6: 'sat',
	7: 'sun',
}

const createEmptyWeekSchedule = (): WeekSchedule => ({
	mon: [],
	tue: [],
	wed: [],
	thu: [],
	fri: [],
	sat: [],
	sun: [],
})

const mapLesson = (item: ApiLesson): Lesson => ({
	id: item.id,
	date: item.lesson_date,
	lessonType: item.lesson_type,
	lessonNumber: item.lesson_number,
	startTime: item.start_time.slice(0, 5),
	endTime: item.end_time.slice(0, 5),
	auditory: item.classroom,
	discipline: item.subject_name,
	teacher: item.teacher_full_name,
	group: item.group_name,
	subGroup: item.subgroup,
})

const transformSchedule = (apiSchedule: ApiLesson[]): WeekSchedule => {
	const weekSchedule = createEmptyWeekSchedule()

	for (const item of apiSchedule) {
		const dayKey = DAY_KEYS[item.day_number]

		if (!dayKey) {
			continue
		}

		weekSchedule[dayKey].push(mapLesson(item))
	}

	return weekSchedule
}

interface ScheduleState {
	currentDate: string
	selectedDate: string
	weekSchedule: WeekSchedule
}

const currentDate = format(new Date(), 'yyyy-MM-dd')

const initialState: ScheduleState = {
	currentDate,
	selectedDate: currentDate,
	weekSchedule: createEmptyWeekSchedule(),
}

export const fetchWeekSchedule = createAsyncThunk(
	'schedule/fetchWeekSchedule',
	async () => {
		const currentDate = format(new Date(), 'yyyy-MM-dd')

		const week = await getCurrentWeek({
			date: currentDate,
		})

		const schedule = await getSchedule({
			type: 'group',
			target: GROUP,
			academic_year: week.academic_year,
			semester: week.semester_number,
			week_number: week.week_number,
		})

		const transformed = transformSchedule(schedule)

		return transformed
	},
)

const scheduleSlice = createSlice({
	name: 'schedule',
	initialState,

	reducers: {
		setSelectedDate: (state, action: PayloadAction<string>) => {
			state.selectedDate = action.payload
		},
	},

	extraReducers: builder => {
		builder.addCase(fetchWeekSchedule.fulfilled, (state, action) => {
			state.weekSchedule = action.payload
		})
	},
})

export const { setSelectedDate } = scheduleSlice.actions

export default scheduleSlice.reducer
