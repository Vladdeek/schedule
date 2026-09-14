import { AnimatePresence, motion } from 'framer-motion'

interface FadeSlideYProps {
	children: React.ReactNode
	isVisible: boolean
	from: 'bottom' | 'top'
}

export const FadeSlideY = ({ children, isVisible, from }: FadeSlideYProps) => {
	const directions = {
		bottom: 10,
		top: -10,
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, y: directions[from] }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: directions[from] }}
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
