import { AnimatePresence, motion } from 'framer-motion'

interface FadeSlideXProps {
	children: React.ReactNode
	isVisible: boolean
	from: 'left' | 'right'
}

export const FadeSlideX = ({ children, isVisible, from }: FadeSlideXProps) => {
	const directions = {
		right: 10,
		left: -10,
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, x: directions[from] }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: directions[from] }}
					transition={{
						duration: 0.3,
					}}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
