import React from "react"
import { Provider } from "react-redux"
import { ScrollBar } from "~/components/ScrollBar"
// import Editor from "~/Editor"
import Editor from "~/MonacoEditor"
import Markdown from "~/Markdown"
import { store, instance } from "~/store"
import { useDebounce } from "./hooks"

export default () => (
	<Provider store={store}>
		<ScrollBar className="flex flex-col flex-grow overflow-y-auto h-screen">
			<Screen />
		</ScrollBar>
	</Provider>
)

const Screen: React.FC = () => {
	React.useEffect(() => {
		let h = 0
		const handler = () => {
			window.cancelAnimationFrame(h)
			h = window.requestAnimationFrame(() => instance.monaco.layout())
		}
		window.addEventListener("resize", handler)
		return () => {
			window.removeEventListener("resize", handler)
		}
	}, [])
	return (
		<div className="flex h-full">
			<Editor />
			<Markdown />
		</div>
	)
}
