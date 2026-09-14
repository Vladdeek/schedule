import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from './Button'
import { AnimatePresence, motion } from 'framer-motion'

interface SearchInputProps {
	options?: string[]
	onSelect?: (option: string) => void
	placeholder?: string
	className?: string
}

export const SearchInput = ({
	options = [],
	onSelect,
	placeholder = 'Поиск группы...',
	className = '',
}: SearchInputProps) => {
	const [value, setValue] = useState('')
	const [isFocused, setIsFocused] = useState(false)

	// Фильтрация по совпадению подстроки
	const filteredOptions = options.filter(option =>
		option.toLowerCase().includes(value.toLowerCase()),
	)

	const handleSelect = (option: string) => {
		setValue(option)
		onSelect?.(option)
		setIsFocused(false)
	}

	const handleClear = () => {
		setValue('')
	}

	return (
		<div className={`relative w-full ${className}`}>
			{/* Поле ввода */}
			<div className='flex items-center gap-2 rounded-2xl bg-[var(--bg-secondary)]/50 p-2 shadow-inner border border-[var(--border)] focus-within:border-[var(--hero)] transition-all'>
				<input
					value={value}
					onChange={e => setValue(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setTimeout(() => setIsFocused(false), 150)}
					placeholder={placeholder}
					className='w-full bg-transparent outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]'
				/>
			</div>

			{/* Выпадающий список */}
			<AnimatePresence>
				{isFocused && value && filteredOptions.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: -10, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -8, scale: 0.98 }}
						transition={{ duration: 0.18, ease: 'easeOut' }}
						className='absolute left-0 right-0 top-full z-20 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] shadow-lg hide-scrollbar'
					>
						{filteredOptions.map((option, index) => (
							<motion.button
								key={option}
								type='button'
								initial={{ opacity: 0, x: -6 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.15, delay: index * 0.03 }}
								onMouseDown={() => handleSelect(option)}
								className='flex w-full flex-col gap-0.5 border-b border-[var(--border)]/50 px-4 py-3 text-left transition-colors hover:bg-[var(--bg-secondary)] last:border-none'
							>
								<span className='text-sm font-medium text-[var(--text-primary)]'>
									{option}
								</span>
							</motion.button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
