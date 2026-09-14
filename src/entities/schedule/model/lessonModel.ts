import {
	BookMarked,
	FlaskConical,
	NotebookPen,
	type LucideIcon,
} from 'lucide-react'

interface lesson {
	title: string
	icon: LucideIcon
	style: string
	color: string
}

export const LESSONS: Record<string, lesson> = {
	Лекция: {
		title: 'Лекция',
		icon: BookMarked,
		style: 'info',
		color: 'var(--blue-base)',
	},
	Практика: {
		title: 'Практика',
		icon: NotebookPen,
		style: 'success',
		color: 'var(--green-base)',
	},

	Лабораторная: {
		title: 'Лабораторная',
		icon: FlaskConical,
		style: 'warning',
		color: 'var(--orange-base)',
	},
} as const

export type Lessons = keyof typeof LESSONS
