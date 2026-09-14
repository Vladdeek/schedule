import { useSearchParams } from 'react-router-dom'

interface Mode {
	label: string
	value: string
}

interface ModeTogglerProps {
	modes: [Mode, Mode]
}

export const ModeToggler = ({ modes }: ModeTogglerProps) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const activeMode = searchParams.get('mode') || modes[0].value

	const setMode = (mode: string) => {
		setSearchParams(prev => {
			prev.set('mode', mode)
			return prev
		})
	}

	const STYLES = {
		active: 'text-white',
		notActive: 'text-[var(--text-secondary)]',
	}

	return (
		<div className='w-full h-fit bg-[var(--bg-secondary)]/50 p-2 relative flex items-center rounded-xl shadow-inner'>
			{modes.map((mode, index) => (
				<button
					key={mode.value}
					onClick={() => setMode(mode.value)}
					className={`${
						activeMode === mode.value ? STYLES.active : STYLES.notActive
					} w-full text-center z-2 transition-all`}
				>
					{mode.label}
				</button>
			))}

			<div
				className={`bg-[var(--hero)] w-[calc(50%-4px)] h-[calc(100%-8px)] absolute top-1 ${
					activeMode === modes[0].value ? 'left-1' : 'left-[calc(50%+3px)]'
				} transition-all rounded-lg shadow-md`}
			/>
		</div>
	)
}
