import { createAction, createReducer, configureStore } from "@reduxjs/toolkit"
import { useSelector as useReactReduxSelector, TypedUseSelectorHook } from "react-redux"
import defaultPreloadedState from "./Default.md"

export const setDraft = createAction("SET_DRAFT", (value: string) => {
	localStorage.setItem("draft", value)
	return { payload: value }
})
export const setVWitdh = createAction("SET_VW", (value: number) => {
	value = value > 95 ? 95 : value
	localStorage.setItem("vw", `${value}`)
	return { payload: value }
})

export const instance: { monaco?: monaco.editor.IStandaloneCodeEditor } = {}

import * as monaco from "monaco-editor/esm/vs/editor/editor.api"

interface Store {
	draft: string
	vw: number
	monaco?: monaco.editor.IStandaloneCodeEditor
}

const init: Store = {
	draft: localStorage.getItem("draft") || defaultPreloadedState,
	vw: parseInt(localStorage.getItem("vw")) || 48,
}

let h = 0

const reducer = createReducer(init, builder =>
	builder
		.addCase(setDraft, (state, { payload }) => {
			state.draft = payload
		})
		.addCase(setVWitdh, (state, { payload }) => {
			state.vw = payload > 99 ? 99 : payload
			window.clearTimeout(h)
			h = setTimeout(() => {
				instance.monaco.layout()
			}, 100)
		}),
)

export const store = configureStore({
	devTools: process.env.NODE_ENV === "development",
	reducer,
	preloadedState: init,
})

export const useSelector: TypedUseSelectorHook<Store> = useReactReduxSelector
