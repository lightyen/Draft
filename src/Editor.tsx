import React from "react"
import { useDispatch } from "react-redux"

import { setDraft, useSelector } from "~/store"
import { useScrollBarSource } from "./components/ScrollBar"

import { fromTextArea, on, off } from "codemirror"
import type { Editor, EditorConfiguration, EditorFromTextArea, Doc, EditorChange } from "codemirror"
import "codemirror/addon/comment/comment"
import "codemirror/addon/edit/closetag"
import "codemirror/addon/edit/closebrackets"
import "codemirror/addon/edit/continuelist"

// highlights
import "codemirror/mode/markdown/markdown"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/jsx/jsx"
import "codemirror/mode/go/go"
import "codemirror/mode/sass/sass"
import "codemirror/mode/css/css"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
	const handle = React.useRef<number>()
	return React.useCallback(
		(...args: Parameters<T>) => {
			window.clearTimeout(handle.current)
			handle.current = window.setTimeout(() => callback(...args), delay)
		},
		[callback, delay],
	)
}

export default () => {
	const draft = useSelector(state => state.draft)
	const dispatch = useDispatch()
	const cb = React.useCallback(
		(value: string) => {
			dispatch(setDraft(value))
		},
		[dispatch],
	)
	const debounceSetDraft = useDebounce(cb, 100)

	return React.useMemo(
		() => (
			<CodeMirror
				className="sticky top-0 self-start"
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[debounceSetDraft],
	)
}

interface MyProps {
	options?: EditorConfiguration
	onChange?: (value: string) => void
}

type Textarea = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange">
type Props = Textarea & MyProps

const CodeMirror = React.forwardRef<Editor, Props>(
	({ options, className, style, onChange, defaultValue, ...props }, ref) => {
		const textareaRef = React.useRef<HTMLTextAreaElement>()
		const editorRef = React.useRef<EditorFromTextArea>()
		React.useImperativeHandle<Partial<Editor>, Partial<Editor>>(ref, () => ({
			focus: () => editorRef.current.focus(),
		}))
		React.useEffect(() => {
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

		React.useEffect(() => {
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
		const animationFrame = React.useRef(0)
		React.useEffect(() => {
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
	},
)
