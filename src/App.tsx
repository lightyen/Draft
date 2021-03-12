import { Global } from "@emotion/react"
import "dracula-prism/dist/css/dracula-prism.css"
import { useEffect } from "react"
import { Provider } from "react-redux"
import { GlobalStyles } from "twin.macro"
import { ScrollBar } from "~/components/ScrollBar"
// import "~/css/styles.css"
import Markdown from "~/Markdown"
import Editor from "~/MonacoEditor"
import { instance, store } from "~/store"
import globalStyles from "./styles"

export default function App() {
	return (
		<>
			<GlobalStyles />
			<Global styles={globalStyles} />
			<Provider store={store}>
				<ScrollBar tw="flex flex-col flex-grow overflow-y-auto h-screen">
					<Screen />
				</ScrollBar>
			</Provider>
		</>
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
