import { AnimatePresence, motion } from 'framer-motion'

interface PopProps {
	children: React.ReactNode
	isVisible: boolean
}

export const Pop = ({ children, isVisible }: PopProps) => {
	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{
						opacity: 0,
						scale: 0.96,
						y: 8,
					}}
					animate={{
						opacity: 1,
						scale: 1,
						y: 0,
					}}
					exit={{
						opacity: 0,
						scale: 0.96,
						y: 8,
					}}
					transition={{
						duration: 0.15,
					}}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
