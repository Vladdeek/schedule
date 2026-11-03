import { LESSON_GRID } from '../../../shared/config'
import type { Lesson, WeekDay } from '../../../entities/schedule/model/scheduleTypes'

export const SCHEDULE_DAYS: { key: WeekDay; title: string }[] = [
	{ key: 'mon', title: 'Понедельник' },
	{ key: 'tue', title: 'Вторник' },
	{ key: 'wed', title: 'Среда' },
	{ key: 'thu', title: 'Четверг' },
	{ key: 'fri', title: 'Пятница' },
	{ key: 'sat', title: 'Суббота' },
	{ key: 'sun', title: 'Воскресенье' },
]

export const TIME_COLUMN_WIDTH = '136px'
export const MINUTES_PER_PIXEL = 1 / 1.6
export const FIRST_MINUTE = 8 * 60
export const LAST_MINUTE = 20 * 60
export const CALENDAR_HEIGHT = (LAST_MINUTE - FIRST_MINUTE) / MINUTES_PER_PIXEL
export const TIME_SLOTS = Object.entries(LESSON_GRID)

export const toMinutes = (time: string) => {
	const [hours, minutes] = time.split(':').map(Number)
	return hours * 60 + minutes
}

export interface PositionedLesson {
	lesson: Lesson
	top: number
	height: number
	lane: number
}

export interface DayLayout {
	lessons: PositionedLesson[]
	laneCount: number
}

export const layoutLessons = (lessons: Lesson[]): DayLayout => {
	const sorted = [...lessons].sort(
		(a, b) =>
			toMinutes(a.startTime) - toMinutes(b.startTime) ||
			a.lessonNumber - b.lessonNumber,
	)
	const laneEnds: number[] = []
	const positioned = sorted.map(lesson => {
		const start = toMinutes(lesson.startTime)
		const end = Math.max(start + 1, toMinutes(lesson.endTime))
		let lane = laneEnds.findIndex(laneEnd => laneEnd <= start)
		if (lane < 0) lane = laneEnds.length
		laneEnds[lane] = end
		const visibleStart = Math.max(start, FIRST_MINUTE)
		const visibleEnd = Math.min(end, LAST_MINUTE)
		return {
			lesson,
			top: (visibleStart - FIRST_MINUTE) / MINUTES_PER_PIXEL,
			height: Math.max(1, (visibleEnd - visibleStart) / MINUTES_PER_PIXEL),
			lane,
		}
	})
	return { lessons: positioned, laneCount: Math.max(1, laneEnds.length) }
}
