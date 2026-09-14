import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLockScroll } from '../lib/hooks/useLookScroll'
import { Fade } from './Animations/Fade'
import { Pop } from './Animations/Pop'
import { Show } from './Show'
import { X } from 'lucide-react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	showCloseButton: boolean
	closeOnOutsideClick: boolean
	closeOnEscape: boolean
}

export const Modal = ({
	isOpen,
	onClose,
	children,
	showCloseButton = true,
	closeOnOutsideClick = true,
	closeOnEscape = true,
}: ModalProps) => {
	const modalRef = useRef(null)

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
			<Fade isVisible={isOpen}>
				<div
					className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 `}
					onMouseDown={handleOverlayClick}
				>
					<Pop isVisible={isOpen}>
						<div
							className={`bg-[var(--bg-primary)] rounded-2xl relative`}
							ref={modalRef}
							onMouseDown={e => e.stopPropagation()}
						>
							<Show when={showCloseButton}>
								<X
									onClick={onClose}
									size={24}
									className='absolute right-2 top-2 p-1 z-10 flex items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--red-surface)]/50 hover:text-[var(--red-base)] cursor-pointer'
								/>
							</Show>
							{children}
						</div>
					</Pop>
				</div>
			</Fade>
		</AnimatePresence>,
		document.body,
	)
}
