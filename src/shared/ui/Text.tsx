const TEXT_STYLES = {
	sizes: {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-md',
		lg: 'text-lg',
		xl: 'text-xl',
		'2xl': 'text-2xl',
		'3xl': 'text-3xl',
		'4xl': 'text-4xl',
		'5xl': 'text-5xl',
		'6xl': 'text-6xl',
		'7xl': 'text-7xl',
		'8xl': 'text-8xl',
	},
	weights: {
		thin: 'font-thin',
		light: 'font-light',
		normal: 'font-normal',
		medium: 'font-medium',
		semibold: 'font-semibold',
		bold: 'font-bold',
		black: 'font-black',
	},
	colors: {
		primary: 'text-[var(--text-primary)]',
		secondary: 'text-[var(--text-secondary)]',
		tertiary: 'text-[var(--text-tertiary)]',
		inverse: 'text-[var(--bg-primary)]',
		hero: 'text-[var(--hero)]',
		white: 'text-white',
		black: 'text-black',
	},
}

export type TextStyle = keyof typeof TEXT_STYLES.colors
export type TextSize = keyof typeof TEXT_STYLES.sizes

interface TextProps {
	children?: React.ReactNode
	size?: TextSize
	weight?: keyof typeof TEXT_STYLES.weights
	style?: keyof typeof TEXT_STYLES.colors
	className?: string
	title?: string
}

export const Text = ({
	children,
	size = 'md',
	weight = 'normal',
	style = 'primary',
	className,
	title,
}: TextProps) => {
	return (
		<p
			title={title}
			className={`${TEXT_STYLES.sizes[size]} ${TEXT_STYLES.weights[weight]} ${TEXT_STYLES.colors[style]} ${className} transition-all`}
		>
			{children}
		</p>
	)
}
