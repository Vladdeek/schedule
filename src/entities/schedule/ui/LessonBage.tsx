import { Badge } from '../../../shared/ui'
import { LESSONS } from '../model/lessonModel'

interface LessonBadgeProps {
	lessonType: string
}

export const LessonBadge = ({ lessonType }: LessonBadgeProps) => {
	const config = LESSONS[lessonType]
	const Icon = config.icon

	return (
		<Badge style={config.style}>
			<Icon size={10} />
			{config.title}
		</Badge>
	)
}
