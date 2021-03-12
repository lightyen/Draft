import { useEffect } from "react"
import { Provider } from "react-redux"
import "twin.macro"
import { ScrollBar } from "~/components/ScrollBar"
import Markdown from "~/Markdown"
import Editor from "~/MonacoEditor"
import { instance, store } from "~/store"

export default function App() {
	return (
		<Provider store={store}>
			<ScrollBar tw="flex flex-col flex-grow overflow-y-auto h-screen">
				<Screen />
			</ScrollBar>
		</Provider>
	)
}

function Screen() {
	useEffect(() => {
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
		<div tw="flex h-full">
			<Editor />
			<Markdown />
		</div>
	)
}
