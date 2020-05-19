import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setDraft } from "~/store"

import "monaco-editor/esm/vs/editor/editor.main"

import { MonacoMarkdownExtension } from "monaco-markdown"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { useScrollBarSource } from "./components/ScrollBar"

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
	const draft = useSelector((state: string) => state)
	const dispatch = useDispatch()
	const cb = React.useCallback(
		(value: string) => {
			dispatch(setDraft(value))
		},
		[dispatch],
	)
	const debounceSetDraft = useDebounce(cb, 100)

	return React.useMemo(
		() => <MonacoEditor defaultValue={draft} onChange={e => debounceSetDraft(e)} />,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[debounceSetDraft],
	)
}

interface Props {
	defaultValue: string
	onChange: (value: string) => void
}

const MonacoEditor: React.FC<Props> = ({ defaultValue, onChange }) => {
	const scrollbar = useScrollBarSource()
	React.useEffect(() => {
		const model = monaco.editor.createModel(defaultValue, "markdown")

		const instance = monaco.editor.create(document.getElementById("monaco-editor"), {
			automaticLayout: true,
			renderWhitespace: "boundary",
			renderIndentGuides: true,
			scrollbar: {
				vertical: "auto",
				horizontal: "auto",
			},
			theme: "vs-dark",
			scrollBeyondLastLine: false,
			model,
		})

		instance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
			/** */
		})

		const extension = new MonacoMarkdownExtension()
		extension.activate(instance as any)
		// instance.updateOptions({ fontSize: 16 })
		instance.onDidChangeModelContent(event => {
			onChange(instance.getValue())
		})
		instance.onDidScrollChange(e => {
			const percentage = instance.getScrollTop() / (instance.getScrollHeight() - instance.getLayoutInfo().height)
			const cTop = percentage * (scrollbar.scrollHeight - scrollbar.clientHeight)
			scrollbar.scrollTop = cTop
			console.log(instance.getLayoutInfo())
		})
		return () => {
			model.dispose()
			instance.dispose()
		}
	}, [defaultValue, scrollbar, onChange])
	return (
		<div className="sticky top-0 relative overflow-hidden" style={{ width: "48vw", height: "100vh" }}>
			<div id="monaco-editor" style={{ height: "100%" }} />
		</div>
	)
}
