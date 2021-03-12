import type { Doc, Editor, EditorChange, EditorConfiguration, EditorFromTextArea } from "codemirror"
import { fromTextArea, off, on } from "codemirror"
import "codemirror/addon/comment/comment"
import "codemirror/addon/edit/closebrackets"
import "codemirror/addon/edit/closetag"
import "codemirror/addon/edit/continuelist"
import "codemirror/mode/css/css"
import "codemirror/mode/go/go"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/jsx/jsx"
// highlights
import "codemirror/mode/markdown/markdown"
import "codemirror/mode/sass/sass"
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react"
import { useDispatch } from "react-redux"
import "twin.macro"
import { useDebounce } from "~/hooks"
import { setDraft, useSelector } from "~/store"
import { useScrollBarSource } from "./components/ScrollBar"

export default function Editor() {
	const draft = useSelector(state => state.draft)
	const dispatch = useDispatch()
	const cb = useCallback(
		(value: string) => {
			dispatch(setDraft(value))
		},
		[dispatch],
	)
	const debounceSetDraft = useDebounce(cb)

	return useMemo(
		() => (
			<CodeMirror
				tw="sticky top-0 self-start"
				options={{
					lineNumbers: true,
					mode: "markdown",
					theme: "monokai",
					extraKeys: {
						Enter: "newlineAndIndentContinueMarkdownList",
						Tab: function (cm) {
							cm.replaceSelection(Array(cm.getOption("tabSize")).join(" "))
						},
						"Ctrl-/": "toggleComment",
						"Ctrl-S": function (cm) {
							// no code
						},
					},
					indentWithTabs: true,
					indentUnit: 4,
					autoCloseTags: true,
					autoCloseBrackets: true,
				}}
				defaultValue={draft}
				onChange={e => debounceSetDraft(e)}
			/>
		),
		[debounceSetDraft],
	)
}

interface MyProps {
	options?: EditorConfiguration
	onChange?: (value: string) => void
}

type Textarea = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange">
type Props = Textarea & MyProps

const CodeMirror = forwardRef<Editor, Props>(({ options, className, style, onChange, defaultValue, ...props }, ref) => {
	const textareaRef = useRef<HTMLTextAreaElement>()
	const editorRef = useRef<EditorFromTextArea>()
	useImperativeHandle<Partial<Editor>, Partial<Editor>>(ref, () => ({
		focus: () => editorRef.current.focus(),
	}))
	useEffect(() => {
		editorRef.current = fromTextArea(textareaRef.current, options)
		const cm = editorRef.current
		cm.setValue(defaultValue as string)
		window.setTimeout(() => {
			cm.refresh()
		}, 500)

		return () => {
			cm.toTextArea()
		}
	}, [options, defaultValue])

	useEffect(() => {
		const cm = editorRef.current
		const handler = (instance: Doc, changeArgs: EditorChange) => {
			onChange(cm.getValue())
		}
		if (onChange) {
			on(cm.getDoc(), "change", handler)
		}
		return () => {
			if (onChange) {
				off(cm.getDoc(), "change", handler)
			}
		}
	}, [onChange])

	// handle scroll
	const scrollbar = useScrollBarSource()
	const animationFrame = useRef(0)
	useEffect(() => {
		const cm = editorRef.current
		const handler = () => {
			cancelAnimationFrame(animationFrame.current)
			animationFrame.current = requestAnimationFrame(() => {
				const { top, height, clientHeight } = cm.getScrollInfo()
				const percentage = top / (height - clientHeight)
				const cTop = percentage * (scrollbar.scrollHeight - scrollbar.clientHeight)
				scrollbar.scrollTop = cTop
			})
		}
		on(cm, "scroll", handler)
		return () => {
			off(cm, "scroll", handler)
		}
	}, [scrollbar])

	return (
		<div className={className} style={style}>
			<textarea
				ref={textareaRef}
				{...props}
				onChange={e => {
					// no code
				}}
			/>
		</div>
	)
})
