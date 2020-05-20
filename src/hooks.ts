import React from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void>(callback: T) {
	const handle = React.useRef<number>()
	return React.useCallback(
		(...args: Parameters<T>) => {
			window.cancelAnimationFrame(handle.current)
			handle.current = window.requestAnimationFrame(() => callback(...args))
		},
		[callback],
	)
}
