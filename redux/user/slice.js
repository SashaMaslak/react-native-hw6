import { createSlice } from "@reduxjs/toolkit"

const initialStateReg = {
	avatar: "",
	login: "Natali Romanova",
	email: "email@example.com",
	password: "",
	posts: [],
	isLoggedIn: false,
}

const initialPost = {
	name: null,
	photo: null,
	location: [],
	comments: [
		{
			id: "1",
			owner: "follower",
			comment:
				"Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips",
			date: "09 июня, 2020 | 08:40",
		},
		{
			id: "2",
			owner: "user",
			comment:
				"A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
			date: "09 июня, 2020 | 09:14",
		},
		{
			id: "3",
			owner: "follower",
			comment: "Thank you! That was very helpful!",
			date: "09 июня, 2020 | 09:20",
		},
	],
	likes: 153,
}

export const userSlice = createSlice({
	name: "user",
	initialState: initialStateReg,
	reducers: {
		createUser(state, action) {
			return { ...state, ...action.payload }
		},
		changeIsLoggedIn(state, action) {
			state.isLoggedIn = action.payload
		},
		setAvatar(state, action) {
			state.avatar = action.payload
		},
		addPost(state, action) {
			state.posts.push(action.payload)
		},
		addComment(state, action) {
			const { dataComment, idx } = action.payload
			state.posts[idx].comments.push(dataComment)
		},
		deletePost(state, action) {
			state.posts.splice(action.payload, 1)
		},
	},
})

export const {
	createUser,
	changeIsLoggedIn,
	setAvatar,
	addPost,
	addComment,
	deletePost,
} = userSlice.actions
