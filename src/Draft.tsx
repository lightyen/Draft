import React from "react"
import { Provider } from "react-redux"
import { ScrollBar } from "~/components/ScrollBar"
// import Editor from "~/Editor"
import Editor from "~/MonacoEditor"
import Markdown from "~/Markdown"
import { store } from "~/store"

export default () => (
	<Provider store={store}>
		<ScrollBar className="flex flex-col flex-grow overflow-y-auto h-screen">
			<div className="flex h-full">
				<Editor />
				<Markdown />
			</div>
		</ScrollBar>
	</Provider>
)
