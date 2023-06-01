import { createAsyncThunk } from "@reduxjs/toolkit"
import { collection, query, getDocs, where } from "firebase/firestore"
import { db } from "../../firebase/firebase.config"

export const getPostsFromFirestore = createAsyncThunk(
	"posts/getPostsFromFirestore",
	async (_, thunkAPI) => {
		try {
			let posts = []
			const q = query(
				collection(db, "posts") /*, where("capital", "==", true)*/
			)
			const querySnapshot = await getDocs(q)

			querySnapshot.forEach((doc) => {
				const postOnServer = { ...doc.data(), id: doc.id }
				posts.push(postOnServer)
			})
			return posts
		} catch (error) {
			return thunkAPI.rejectWithValue(console.log(error.message))
		}
	}
)

export const getPostsFromFirestoreByUserId = createAsyncThunk(
	"posts/getPostsFromFirestoreByUserId",
	async (userId, thunkAPI) => {
		try {
			let posts = []
			const q = query(collection(db, "posts"), where("userId", "==", userId))
			const querySnapshot = await getDocs(q)

			querySnapshot.forEach((doc) => {
				const postOnServer = { ...doc.data(), id: doc.id }
				posts.push(postOnServer)
			})
			return posts
		} catch (error) {
			return thunkAPI.rejectWithValue(console.log(error.message))
		}
	}
)
