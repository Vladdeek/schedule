export type LessonType = 'Лекция' | 'Практика' | 'Лабораторная'

export type WeekDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export interface Lesson {
	id: string
	date: string
	lessonType: LessonType
	lessonNumber: number
	startTime: string
	endTime: string
	auditory: string
	discipline: string
	teacher: string
	group: string
	subGroup: number | null
}

export type WeekSchedule = Record<WeekDay, Lesson[]>

// Параметры для получения сетки расписания
export interface GetScheduleParams {
	type: 'group' | 'teacher' | 'classroom' // или используйте свой ScheduleMode
	target: string // Название группы, ФИО преподавателя или аудитория (например, "2611-0001.1")
	academic_year?: string // Формат: "2026/2027"
	semester?: 1 | 2
	week_number?: number
}

export interface CurrentWeekResponse {
	academic_year: string
	academic_year_id: string
	semester_number: 1 | 2
	semester_id: string
	week_number: number
	week_id: string
}

export interface ApiLesson {
	id: string
	academic_year: string
	semester: number
	week_number: number
	week_start_date: string
	week_end_date: string
	group_name: string
	faculty: string | null
	day_number: number
	lesson_date: string
	subject_name: string
	lesson_type: LessonType
	subgroup: number | null
	lesson_number: number
	start_time: string
	end_time: string
	teacher_full_name: string
	teacher_mmis_id: number
	classroom: string
	mmis_lesson_id: string
	import_filename: string | null
	import_filesize: number | null
	webinar_link: string | null
	created_at: string
	updated_at: string
	is_stream: boolean
	stream_id: string | null
	stream_groups: string[]
}

export interface CurrentWeekParams {
	date?: string
}

export interface GetScheduleParams {
	type: 'group' | 'teacher' | 'classroom'
	target: string
	academic_year?: string
	semester?: 1 | 2
	week_number?: number
}
