interface lessonDuration {
	startTime: string
	endTime: string
}
export const LESSON_GRID: Record<number, lessonDuration> = {
	1: { startTime: '08:00', endTime: '09:20' },
	2: { startTime: '09:30', endTime: '10:50' },
	3: { startTime: '11:00', endTime: '12:20' },
	4: { startTime: '12:40', endTime: '14:00' },
	5: { startTime: '14:10', endTime: '15:30' },
	6: { startTime: '15:40', endTime: '17:00' },
	7: { startTime: '17:10', endTime: '18:30' },
	8: { startTime: '18:40', endTime: '20:00' },
}
