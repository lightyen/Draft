import React from "react"
import { useDispatch } from "react-redux"
import { setDraft, useSelector, instance } from "~/store"
import { useScrollBarSource } from "./components/ScrollBar"

import { MonacoMarkdownExtension } from "monaco-markdown"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { useDebounce } from "~/hooks"

export default () => {
	const draft = useSelector(state => state.draft)
	const defaultDraft = React.useRef(draft)
	const dispatch = useDispatch()
	const cb = React.useCallback(
		(value: string) => {
			dispatch(setDraft(value))
		},
		[dispatch],
	)
	const debounceSetDraft = useDebounce(cb)

	return React.useMemo(() => <Wrapper defaultValue={defaultDraft.current} onChange={e => debounceSetDraft(e)} />, [
		debounceSetDraft,
	])
}

interface Props {
	defaultValue: string
	onChange: (value: string) => void
}

const Wrapper: React.FC<Props> = props => {
	const vw = useSelector(state => state.vw)
	return (
		<div className="sticky top-0 relative overflow-hidden" style={{ width: `${vw}vw`, height: "100vh" }}>
			<MonacoEditor {...props} />
		</div>
	)
}

const MonacoEditor: React.FC<Props> = ({ defaultValue, onChange }) => {
	const scrollbar = useScrollBarSource()
	const dispatch = useDispatch()

	React.useEffect(() => {
		const model = monaco.editor.createModel(defaultValue, "markdown")
		model.updateOptions({
			tabSize: 4,
		})
		const editor = monaco.editor.create(document.getElementById("monaco-editor"), {
			renderWhitespace: "boundary",
			renderIndentGuides: true,
			scrollbar: {
				vertical: "auto",
				horizontal: "auto",
			},
			theme: "vs-dark",
			scrollBeyondLastLine: false,
			fontLigatures: true,
			fontFamily: "Fira Code",
			find: {
				addExtraSpaceOnTop: false,
			},
			smoothScrolling: true,
			autoClosingBrackets: "always",
			autoClosingQuotes: "always",
			model,
		})
		instance.monaco = editor

		editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
			/** */
		})

		const extension = new MonacoMarkdownExtension()
		extension.activate(editor as never)
		// editor.updateOptions({ fontSize: 16 })
		editor.onDidChangeModelContent(event => {
			onChange(editor.getValue())
		})
		window.setTimeout(() => editor.setScrollTop(300), 3000)
		editor.onDidScrollChange(e => {
			const percentage = editor.getScrollTop() / (editor.getScrollHeight() - editor.getLayoutInfo().height)
			const cTop = percentage * (scrollbar.scrollHeight - scrollbar.clientHeight)
			scrollbar.scrollTop = cTop
		})
		return () => {
			model.dispose()
			editor.dispose()
		}
	}, [defaultValue, scrollbar, onChange, dispatch])
	return <div id="monaco-editor" style={{ height: "100%" }} />
}
