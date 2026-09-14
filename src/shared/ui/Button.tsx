const BUTTON_STYLES: Record<string, string> = {
	black:
		'text-[var(--bg-primary)] bg-[var(--text-primary)] enabled:hover:bg-[var(--hero)] enabled:hover:text-white',

	white:
		'text-[var(--text-primary)] bg-[var(--bg-primary)] enabled:hover:bg-[var(--hero)] enabled:hover:text-white',

	gray: 'bg-[var(--bg-secondary)] text-[var(--text-primary)] enabled:hover:bg-[var(--bg-secondary)]/90',

	transparent:
		'bg-transparent text-[var(--text-primary)] enabled:hover:bg-[var(--text-primary)]/5',

	outline:
		'bg-transparent text-[var(--text-primary)] border-1 border-[var(--border)] enabled:hover:border-[var(--hero)] enabled:hover:text-[var(--hero)] enabled:hover:bg-[var(--hero)]/5',
}

const BUTTON_SIZES: Record<string, string> = {
	square: 'p-1 aspect-square rounded-lg',
	sm: 'px-2 py-1 rounded-lg',
	md: 'px-4 py-2 rounded-xl',
	lg: 'px-6 py-3 rounded-2xl',
}

interface ButtonProps {
	children: React.ReactNode

	style?: keyof typeof BUTTON_STYLES
	size?: keyof typeof BUTTON_SIZES

	className?: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	disabled?: boolean
}

export const Button = ({
	children,
	style = 'black',
	size = 'md',
	className = 'w-fit',
	onClick,
	disabled = false,
}: ButtonProps) => {
	const defaultStyle: Record<string, string> = {
		active: 'active:scale-98 active:brightness-90',
		hover: 'hover:scale-102 hover:brightness-110',
		flex: 'flex justify-center items-center gap-2',
	}
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`${defaultStyle.flex} ${disabled ? 'disabled:opacity-75 disabled:grayscale-75 disabled:cursor-not-allowed' : `${defaultStyle.hover} ${defaultStyle.active} cursor-pointer`} ${BUTTON_STYLES[style]} ${BUTTON_SIZES[size]} ${className} transition-all`}
		>
			{children}
		</button>
	)
}
