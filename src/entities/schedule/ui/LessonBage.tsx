import { Badge } from '../../../shared/ui'
import { LESSONS } from '../model/lessonModel'

interface LessonBadgeProps {
	lessonType: string
	compact?: boolean
}

export const LessonBadge = ({ lessonType, compact = false }: LessonBadgeProps) => {
	const config = LESSONS[lessonType]
	const Icon = config.icon

	return (
		<Badge style={config.style}>
			<Icon size={compact ? 9 : 10} />
			<span
				className={
					compact
						? 'block min-w-0 truncate whitespace-nowrap @max-[120px]:hidden [@container(max-height:68px)]:hidden'
						: undefined
				}
			>
				{config.title}
			</span>
		</Badge>
	)
}
