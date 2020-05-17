import { createAction, createReducer, configureStore } from "@reduxjs/toolkit"
import defaultPreloadedState from "./Default.md"

export const setDraft = createAction("SET_DRAFT", (value: string) => {
	localStorage.setItem("draft", value)
	return { payload: value }
})

const reducer = createReducer("", builder => builder.addCase(setDraft, (_, { payload }) => payload))
export const store = configureStore({
	devTools: process.env.NODE_ENV === "development",
	reducer,
	preloadedState: localStorage.getItem("draft") || defaultPreloadedState,
})
