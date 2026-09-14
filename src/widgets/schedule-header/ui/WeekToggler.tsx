import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, Text } from '../../../shared/ui'
import { useState } from 'react'

export const WeekToggler = () => {
	const [week, setWeek] = useState(0)
	return (
		<>
			<div className='flex w-full justify-between items-center'>
				<Button
					size='square'
					style='transparent'
					onClick={() => setWeek(prev => prev - 1)}
				>
					<ChevronLeft />
				</Button>
				<Text>Неделя {week}</Text>
				<Button
					size='square'
					style='transparent'
					onClick={() => setWeek(prev => prev + 1)}
				>
					<ChevronRight />
				</Button>
			</div>
		</>
	)
}
