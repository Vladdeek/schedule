import api from '../../../shared/api/client'
import type {
	ApiLesson,
	CurrentWeekParams,
	CurrentWeekResponse,
	GetGroupsParams,
	GetScheduleParams,
} from '../model/scheduleTypes'

/**
 * Получение информации о текущей академической неделе
 */
export const getCurrentWeek = async (
	params?: CurrentWeekParams,
): Promise<CurrentWeekResponse> => {
	const res = await api.get('/api/v1/academic-calendar/current', {
		params,
	})
	return res.data || res
}

/**
 * Получение HTML-сетки расписания
 */
export const getSchedule = async ({
	type,
	target,
	...params
}: GetScheduleParams): Promise<ApiLesson[]> => {
	const res = await api.get<ApiLesson[]>(
		`/api/v1/schedule/${type}/${encodeURIComponent(target)}`,
		{
			params,
		},
	)
	return res.data
}

/**
 * Получение статистики нагрузки группы за семестр
 */
export const getGroupStatistics = async (params: {
	groupName: string
	semester?: 1 | 2
}): Promise<string> => {
	const res = await api.get('/public/group-statistics', {
		params,
	})
	return res.data || res
}

/**
 * Получение статистики нагрузки группы за семестр
 */
export const getGroups = async (
	params?: GetGroupsParams,
): Promise<string[]> => {
	const response = await api.get<string[]>('api/v1/schedule/groups', {
		params: {
			academic_year: '2026/2027',
			semester: 1,
			...params,
		},
	})

	return response.data
}
/**
 * Получение статистики нагрузки преподавателя за семестр
 */
export const getTeacherStatistics = async (params: {
	teacherName: string
	semester?: 1 | 2
}): Promise<string> => {
	const res = await api.get('/public/teacher-statistics', {
		params,
		responseType: 'text',
	})
	return res.data || res
}
