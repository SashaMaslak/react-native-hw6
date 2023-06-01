import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { authReducer, authSlice } from "./auth/authSlice"
import { postsReducer, postsSlice } from "./posts/postsSlice"

const rootReduser = combineReducers({
	[authSlice.name]: authReducer,
	[postsSlice.name]: postsReducer,
})

export const store = configureStore({
	reducer: rootReduser,
})
