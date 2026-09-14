import { AnimatePresence, motion } from 'framer-motion'

interface FadeProps {
	children: React.ReactNode
	isVisible: boolean
}

export const Fade = ({ children, isVisible }: FadeProps) => {
	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
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
