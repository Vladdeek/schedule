import { useEffect } from 'react'

export const useLockScroll = (enabled: boolean = true): void => {
	useEffect(() => {
		if (!enabled || typeof window === 'undefined') return

		const originalOverflow = document.body.style.overflow
		const originalPaddingRight = document.body.style.paddingRight

		// Вычисляем ширину скроллбара, чтобы предотвратить "игры" и сдвиги контента
		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth

		document.body.style.overflow = 'hidden'

		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`
		}

		return () => {
			document.body.style.overflow = originalOverflow
			document.body.style.paddingRight = originalPaddingRight
		}
	}, [enabled])
}
