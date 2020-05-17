import React from "react"
import { useSelector } from "react-redux"
import MarkdownIt from "markdown-it"
// plugins
import emoji from "markdown-it-emoji"
import { youtube } from "~/plugins/youtube"
import { prism } from "~/plugins/prism"

const md = new MarkdownIt({
	html: true,
	xhtmlOut: true,
	typographer: true,
	linkify: true,
})
	.use(youtube)
	.use(prism)
	.use(emoji)

export default () => {
	const __html = useSelector((state: string) => md.render(state))
	return (
		<div className="flex-grow">
			<div
				className="post mx-auto mt-6 p-3 bg-white"
				style={{
					maxWidth: "85%",
					minWidth: 620,
					minHeight: 600,
				}}
				dangerouslySetInnerHTML={{ __html }}
			/>
		</div>
	)
}
