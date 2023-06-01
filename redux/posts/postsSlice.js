import { createSlice } from "@reduxjs/toolkit"
import {
	getPostsFromFirestore,
	getPostsFromFirestoreByUserId,
} from "./postsOperations"

const initialState = {
	posts: [],
	isLoading: false,
	error: null,
	filter: "",
}

const handlePending = (state) => {
	state.isLoading = true
}

const handleRejected = (state, action) => {
	state.isLoading = false
	state.error = action.payload
}

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	extraReducers: (builder) =>
		builder
			.addCase(getPostsFromFirestore.pending, handlePending)
			.addCase(getPostsFromFirestore.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.posts = action.payload
			})
			.addCase(getPostsFromFirestore.rejected, handleRejected),
})

export const postsReducer = postsSlice.reducer
