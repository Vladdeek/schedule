import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from './Button'

interface SearchOption {
	id: string
	label: string
	description?: string
}

interface SearchInputProps {
	isOpen: boolean
	onClose: () => void
	options?: SearchOption[]
	onSelect?: (option: SearchOption) => void
	placeholder?: string
}

export const TopSearchInput = ({
	isOpen,
	onClose,
	options = [],
	onSelect,
	placeholder = 'Поиск...',
}: SearchInputProps) => {
	const [value, setValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isOpen) {
			inputRef.current?.focus()
		}
	}, [isOpen])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [onClose])

	const filteredOptions = options.filter(option =>
		option.label.toLowerCase().includes(value.toLowerCase()),
	)

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ width: 0 }}
					animate={{ width: '100%' }}
					exit={{ width: 0 }}
					transition={{
						duration: 0.25,
						ease: 'easeInOut',
					}}
					className='absolute left-1/2 -translate-x-1/2 overflow-visible'
				>
					<div className='flex items-center gap-2'>
						<div className='relative flex-1'>
							<div className='flex items-center gap-2 bg-[var(--bg-secondary)]/50 p-2 rounded-xl shadow-inner'>
								<Search
									className='shrink-0 text-[var(--text-secondary)]'
									size={18}
								/>

								<input
									ref={inputRef}
									value={value}
									onChange={event => setValue(event.target.value)}
									placeholder={placeholder}
									className='w-full bg-transparent outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]'
								/>

								<Button
									style='transparent'
									size='square'
									onClick={onClose}
									className='shrink-0 p-1'
								>
									<X size={18} />
								</Button>
							</div>

							<AnimatePresence>
								{value && filteredOptions.length > 0 && (
									<motion.div
										initial={{ opacity: 0, y: -5 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -5 }}
										className='absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-2xl bg-[var(--bg-primary)] shadow-md/10'
									>
										{filteredOptions.map(option => (
											<button
												key={option.id}
												type='button'
												onClick={() => onSelect?.(option)}
												className='flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors hover:bg-[var(--bg-secondary)]'
											>
												<span className='text-sm font-medium'>
													{option.label}
												</span>

												{option.description && (
													<span className='text-xs text-[var(--text-secondary)]'>
														{option.description}
													</span>
												)}
											</button>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
