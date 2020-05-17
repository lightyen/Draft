import React from "react"
import styled from "styled-components"

interface CustomScrollBarProps {
	/** Color with scrollbar thumb, ex: #cccccc */
	color?: string
	/** The width of scrollbar thumb */
	width?: number
	padding?: number
}

// https://css-tricks.com/custom-scrollbars-in-webkit/
const CustomScrollBar = styled.div.attrs(props => ({ width: 6, padding: 4, color: "black", ...props }))<
	CustomScrollBarProps
>`
	transition: all 0.2s ease;
	::-webkit-scrollbar {
		width: ${({ width, padding }) => width + padding * 2}px;
		height: ${({ width, padding }) => width + padding * 2}px;
		background: #333333;
	}

	::-webkit-scrollbar-track {
		display: none;
	}

	::-webkit-scrollbar-corner {
		background: #333333;
	}

	:hover {
		color: ${({ color }) => color}80;
	}

	::-webkit-scrollbar-thumb {
		transition: all 3s ease;
		width: 2px;
		border: ${({ padding }) => padding}px solid transparent;
		border-radius: ${({ width, padding }) => width / 2 + padding}px;
		box-shadow: inset 0 0 0 100px;
	}

	::-webkit-scrollbar-thumb:hover {
		border: ${({ padding }) => padding - 2}px solid transparent;
		box-shadow: inset 0 0 0 100px;
	}
`
const ScrollBarContext = React.createContext<HTMLDivElement>(null)

export function useScrollBarSource() {
	return React.useContext(ScrollBarContext)
}

export function useScrollTop() {
	const scrollbar = useScrollBarSource()
	const [scrollTop, setScrollTop] = React.useState(scrollbar.scrollTop)
	const animationFrame = React.useRef(0)

	React.useEffect(() => {
		function scroll() {
			cancelAnimationFrame(animationFrame.current)
			animationFrame.current = requestAnimationFrame(() => setScrollTop(scrollbar.scrollTop))
		}
		scrollbar.addEventListener("scroll", scroll, { passive: true })
		return () => scrollbar.removeEventListener("scroll", scroll)
	}, [scrollbar])
	return scrollTop
}

interface ScrollBarProps {
	className?: string
	style?: React.CSSProperties
	top?: number
}

const backgroundColor = "#edf2f7"
const textColor = "#1a202c"
const showColor = backgroundColor
const hideColor = textColor

export const ScrollBar: React.FC<ScrollBarProps> = ({ children, ...props }) => {
	const ref = React.useRef<HTMLDivElement>()
	const [handle, setHandle] = React.useState<HTMLDivElement>(ref.current)
	const isMount = React.useRef(false)

	const [thumbColor, setThumbColor] = React.useState(hideColor)

	React.useEffect(() => {
		isMount.current = true
		setHandle(ref.current)
		return () => (isMount.current = false)
	}, [])

	const tick = React.useRef<number>()
	React.useEffect(() => {
		const target = ref.current
		function cb() {
			window.requestAnimationFrame(() => {
				window.clearTimeout(tick.current)
				setThumbColor(showColor)
				tick.current = window.setTimeout(() => {
					if (isMount.current) {
						setThumbColor(hideColor)
					}
				}, 3000)
			})
		}
		target.addEventListener("wheel", cb)
		target.addEventListener("mousemove", cb)
		target.addEventListener("touchmove", cb)
		target.focus()
		return () => {
			target.removeEventListener("wheel", cb)
			target.removeEventListener("mousemove", cb)
			target.addEventListener("touchmove", cb)
		}
	}, [])
	return (
		<CustomScrollBar
			ref={ref}
			onMouseDown={() => {
				window.clearTimeout(tick.current)
				setThumbColor(showColor)
			}}
			onMouseUp={() => {
				tick.current = window.setTimeout(() => {
					if (isMount.current) {
						setThumbColor(hideColor)
					}
				}, 3000)
			}}
			color={thumbColor}
			{...props}
		>
			{handle && (
				<ScrollBarContext.Provider value={handle}>
					<div style={{ color: textColor }}>{children}</div>
				</ScrollBarContext.Provider>
			)}
		</CustomScrollBar>
	)
}
