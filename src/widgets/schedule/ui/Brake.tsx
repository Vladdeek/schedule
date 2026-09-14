import { Zap } from 'lucide-react'
import { Text } from '../../../shared/ui'

interface BrakeProps {
	duration: number
	startTime: string
	endTime: string
}

export const Brake = ({ duration, startTime, endTime }: BrakeProps) => {
	return (
		<div className='flex justify-between items-center w-full'>
			<div className='flex gap-1 items-center'>
				<Zap size={12} color='var(--text-tertiary)' />
				<Text size='sm' style='tertiary'>{`Перемена ${duration} минут`}</Text>
			</div>
			<Text size='sm' style='tertiary'>{`${startTime} - ${endTime}`}</Text>
		</div>
	)
}
