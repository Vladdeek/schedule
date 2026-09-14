import { Brake } from './Brake'
import { ScheduleCard } from '../../../entities/schedule'
import { LESSON_GRID } from '../../../shared/config'
import { getDuration } from '../lib/getDuration'

import { useAppSelector } from '../../../app/store/hooks'
import { getDaySchedule } from '../../../entities/schedule/lib/getDaySchedule'
import { Show, Text } from '../../../shared/ui'

export const ScheduleColumn = () => {
	const { weekSchedule, selectedDate } = useAppSelector(state => state.schedule)
	const todaySchedule = getDaySchedule(weekSchedule, selectedDate)

	return (
		<div className='flex flex-col w-full gap-3 p-1 overflow-y-auto hide-scrollbar'>
			<Show
				when={todaySchedule.length !== 0}
				fallback={
					<div className='w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-3 select-none'>
						{/* Большой эмодзи или кастомный арт */}
						<div className='text-6xl mb-2'>🎉</div>

						{/* Главный заголовок */}
						<Text size='3xl' weight='bold' style='primary'>
							Пар нет, расписание свободно!
						</Text>

						{/* Ироничное описание */}
						<Text
							size='md'
							weight='normal'
							style='secondary'
							className='max-w-xs sm:max-w-sm'
						>
							Преподаватели тоже люди и сегодня отдыхают. Самое время поспать
							ещё 5 минут.
						</Text>
					</div>
				}
			>
				{todaySchedule.map((lesson, index) => {
					return (
						<div className='flex flex-col gap-3' key={lesson.id}>
							{index > 0 && (
								<Brake
									duration={getDuration(
										LESSON_GRID[lesson.lessonNumber - 1].endTime,
										LESSON_GRID[lesson.lessonNumber].startTime,
									)}
									startTime={LESSON_GRID[lesson.lessonNumber - 1].endTime}
									endTime={LESSON_GRID[lesson.lessonNumber].startTime}
								/>
							)}

							<ScheduleCard
								date={lesson.date}
								lessonType={lesson.lessonType}
								lessonNumber={lesson.lessonNumber}
								startTime={lesson.startTime}
								endTime={lesson.endTime}
								auditory={lesson.auditory}
								discipline={lesson.discipline}
								teacher={lesson.teacher}
								group={lesson.group}
								subGroup={lesson.subGroup}
							/>
						</div>
					)
				})}
			</Show>
		</div>
	)
}
