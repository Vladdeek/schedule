import type React from 'react'

const BADGE_COLORS: Record<string, string> = {
	danger:
		'text-[var(--red-base)] border-[var(--red-base)]/25 bg-[var(--red-surface)]',

	warning:
		'text-[var(--orange-base)] border-[var(--orange-base)]/25 bg-[var(--orange-surface)]',

	caution:
		'text-[var(--yellow-base)] border-[var(--yellow-base)]/25 bg-[var(--yellow-surface)]',

	success:
		'text-[var(--green-base)] border-[var(--green-base)]/25 bg-[var(--green-surface)]',

	info: 'text-[var(--blue-base)] border-[var(--blue-base)]/25 bg-[var(--blue-surface)]',

	default:
		'bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text-secondary)]',
	hero: 'text-[var(--hero)] border-[var(--hero)]/25 bg-[var(--hero)]/10',
}

interface BadgeProps {
	children: React.ReactNode
	style?: keyof typeof BADGE_COLORS
}

export const Badge = ({ children, style = 'default' }: BadgeProps) => {
	return (
		<div
			className={`${BADGE_COLORS[style]} flex items-center justify-center gap-1 px-2 w-fit rounded-full text-sm`}
		>
			{children}
		</div>
	)
}
