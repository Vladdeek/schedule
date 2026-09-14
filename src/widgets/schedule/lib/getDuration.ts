const getMinutes = (time: string) => {
	const [hours, minutes] = time.split(':').map(Number)

	return hours * 60 + minutes
}

export const getDuration = (startTime: string, endTime: string) => {
	return getMinutes(endTime) - getMinutes(startTime)
}
