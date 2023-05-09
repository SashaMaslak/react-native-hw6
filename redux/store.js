import { configureStore, combineRedusers } from "@reduxjs/toolkit"
import { userSlice } from "./user/slice"
import { authSlice } from "./auth/authSlice"

const rootReduser = combineRedusers({
	[authSlice.name]: authSlice.reducer,
	[userSlice.name]: userSlice.reducer,
})

export const store = configureStore({
	reducer: rootReduser,
})
