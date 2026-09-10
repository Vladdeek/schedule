import { useEffect, useRef, type RefObject } from 'react'

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
	callback: (event: MouseEvent | TouchEvent) => void,
): RefObject<T | null> => {
	const ref = useRef<T | null>(null)
	const savedCallback = useRef(callback)

	// Обновляем ссылку на актуальный callback при каждом рендере
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		const handleClick = (event: MouseEvent | TouchEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				savedCallback.current(event)
			}
		}

		document.addEventListener('mousedown', handleClick)
		document.addEventListener('touchstart', handleClick)

		return () => {
			document.removeEventListener('mousedown', handleClick)
			document.removeEventListener('touchstart', handleClick)
		}
	}, [])

	return ref
}
