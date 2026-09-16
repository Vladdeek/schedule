const LESSON_COUNT_MAP: Record<string, string> = {
	one: 'пара',
	several: 'пары',
	more: 'пар',
}

export const getLessonsCountText = (count: number) => {
	switch (true) {
		case count === 1:
			return LESSON_COUNT_MAP.one

		case count >= 2 && count <= 4:
			return LESSON_COUNT_MAP.several

		default:
			return LESSON_COUNT_MAP.more
	}
}
