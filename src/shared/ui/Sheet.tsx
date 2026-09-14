import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { X } from 'lucide-react'
import { Fade } from './Animations/Fade'
import { Show } from './Show'
import { useLockScroll } from '../lib/hooks/useLookScroll'

interface TopSheetProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	showCloseButton?: boolean
	closeOnOutsideClick?: boolean
	closeOnEscape?: boolean
}

export const Sheet = ({
	isOpen,
	onClose,
	children,
	showCloseButton = true,
	closeOnOutsideClick = true,
	closeOnEscape = true,
}: TopSheetProps) => {
	useLockScroll(isOpen)

	useEffect(() => {
		if (!isOpen || !closeOnEscape) return

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen, closeOnEscape, onClose])

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!closeOnOutsideClick) return

		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<Fade isVisible={isOpen}>
					<div
						className='fixed inset-0 z-[100] bg-black/50'
						onMouseDown={handleOverlayClick}
					>
						<motion.div
							initial={{ y: '-100%' }}
							animate={{ y: 0 }}
							exit={{ y: '-100%' }}
							transition={{
								duration: 0.3,
								ease: [0.4, 0, 0.2, 1],
							}}
							className='relative w-full rounded-b-2xl bg-[var(--bg-primary)]'
							onMouseDown={e => e.stopPropagation()}
						>
							<Show when={showCloseButton}>
								<X
									onClick={onClose}
									size={24}
									className='absolute right-2 top-2 z-10 cursor-pointer rounded-full p-1 text-[var(--text-secondary)] transition-colors hover:bg-[var(--red-surface)]/50 hover:text-[var(--red-base)]'
								/>
							</Show>

							{children}
						</motion.div>
					</div>
				</Fade>
			)}
		</AnimatePresence>,
		document.body,
	)
}
