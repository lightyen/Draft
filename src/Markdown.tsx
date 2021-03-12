import MarkdownIt from "markdown-it"
// plugins
import emoji from "markdown-it-emoji"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "twin.macro"
import { prism } from "~/plugins/prism"
import { youtube } from "~/plugins/youtube"
import { setVWitdh, useSelector } from "~/store"

function Resizer() {
	const dispatch = useDispatch()
	const active = useRef(false)

	function onMouseDown(e: React.MouseEvent) {
		e.preventDefault()
		active.current = true
	}
	useEffect(() => {
		function update(vw: number) {
			dispatch(setVWitdh(vw))
		}
		const onup = (e: MouseEvent) => {
			e.preventDefault()
			active.current = false
		}
		const onmove = (e: MouseEvent) => {
			if (!active.current) {
				return
			}
			const vw = (e.pageX * 100) / document.getElementById("root").clientWidth
			update(vw)
		}
		document.addEventListener("mousemove", onmove)
		document.addEventListener("mouseup", onup)
		return () => {
			document.removeEventListener("mousemove", onmove)
			document.removeEventListener("mouseup", onup)
		}
	}, [dispatch])

	return (
		<div tw="absolute left-0 h-full w-2 bg-gray-700" style={{ cursor: "col-resize" }} onMouseDown={onMouseDown} />
	)
}

const md = new MarkdownIt({
	html: true,
	xhtmlOut: true,
	typographer: true,
	linkify: true,
})
	.use(youtube)
	.use(prism)
	.use(emoji)

function Content() {
	const __html = useSelector(state => md.render(state.draft))
	return (
		<div
			className="post"
			tw="mx-auto mt-6 p-3 bg-white flex-grow"
			style={{
				maxWidth: "85%",
				minHeight: 600,
			}}
			dangerouslySetInnerHTML={{ __html }}
		/>
	)
}

export default function Markdown() {
	const vw = useSelector(state => 100 - state.vw)
	return (
		<div tw="flex-grow flex relative" style={{ width: `${vw}vw` }}>
			<Content />
			<Resizer />
		</div>
	)
}
