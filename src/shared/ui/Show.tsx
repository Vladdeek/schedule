interface ShowProps {
	when: boolean
	fallback?: React.ReactNode
	children: React.ReactNode
}

export const Show = ({ when, fallback = null, children }: ShowProps) => {
	return when ? children : fallback
}
