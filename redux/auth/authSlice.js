import { createSlice } from "@reduxjs/toolkit"
import { signUp, signIn, signOut, onChange } from "./authOperation"

const initialState = {
	user: {
		token: null,
		id: null,
		login: null,
		email: null,
		posts: [],
		avatar: "",
	},
	isLoggedIn: false,
	isRefreshing: false,
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAvatar(state, action) {
			state.user.avatar = action.payload
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(signUp.fulfilled, (state, { payload }) => {
				state.user = { ...state.user, ...payload }
				state.isLoggedIn = true
			})
			.addCase(signIn.fulfilled, (state, { payload }) => {
				state.user = { ...state.user, ...payload }
				state.isLoggedIn = true
			})
			.addCase(signOut.fulfilled, (state, { payload }) => {
				state.user = initialState.user
				state.isLoggedIn = payload
			})
			.addCase(onChange.fulfilled, (state, { payload }) => {
				state.user = { ...state.user, ...payload }
				state.isLoggedIn = true
			}),
})
export const { setAvatar } = authSlice.actions

export const authReducer = authSlice.reducer
