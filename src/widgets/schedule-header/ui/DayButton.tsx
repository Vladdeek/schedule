import { Text } from '../../../shared/ui'
import type { TextStyle } from '../../../shared/ui/Text'

const styles = {
	active: {
		buttonStyle: 'bg-[var(--hero)]',
		textStyle: {
			weekDay: 'white',
			dayNumber: 'white',
		},
	},
	notActive: {
		buttonStyle: 'bg-[var(--bg-secondary)]/75',
		textStyle: {
			weekDay: 'tertiary',
			dayNumber: 'secondary',
		},
	},
} satisfies Record<
	'active' | 'notActive',
	{
		buttonStyle: string
		textStyle: {
			weekDay: TextStyle
			dayNumber: TextStyle
		}
	}
>

interface DayButtonProps {
	weekDay: string
	dayNumber: number
	active: boolean
	onClick: () => void
}

export const DayButton = ({
	weekDay,
	dayNumber,
	active = false,
	onClick,
}: DayButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`flex flex-col items-center justify-center ${active ? styles.active.buttonStyle : styles.notActive.buttonStyle}  w-full py-2 rounded-xl transition-all cursor-pointer`}
		>
			<Text
				className={active ? 'opacity-50' : 'opacity-100'}
				style={
					active
						? styles.active.textStyle.weekDay
						: styles.notActive.textStyle.weekDay
				}
				size='sm'
			>
				{weekDay}
			</Text>
			<Text
				style={
					active
						? styles.active.textStyle.dayNumber
						: styles.notActive.textStyle.dayNumber
				}
				weight='semibold'
				size='lg'
			>
				{String(dayNumber)}
			</Text>
		</button>
	)
}
