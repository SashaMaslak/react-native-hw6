import { createAsyncThunk } from "@reduxjs/toolkit"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
} from "firebase/auth"
import { auth } from "../../firebase/firebase.config"

export const signUp = createAsyncThunk(
	"auth/signUp",
	async ({ email, password, login }, thunkAPI) => {
		try {
			await createUserWithEmailAndPassword(auth, email, password)
			const user = auth.currentUser
			await updateProfile(user, {
				displayName: login,
			})

			const updatedUser = {
				login: user.displayName,
				avatar: require("../../assets/user.png"),
				id: user.uid,
				email: user.email,
				token: user.accessToken,
			}

			return updatedUser
		} catch (error) {
			return thunkAPI.rejectWithValue(console.log(error.message))
		}
	}
)

export const signIn = createAsyncThunk(
	"auth/signIn",
	async ({ email, password }, thunkAPI) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
			const user = auth.currentUser

			const updatedUser = {
				login: user.displayName,
				avatar: require("../../assets/user.png"),
				id: user.uid,
				email: user.email,
				token: user.accessToken,
			}
			return updatedUser
		} catch (error) {
			return thunkAPI.rejectWithValue(console.log(error.message))
		}
	}
)

export const signOut = createAsyncThunk("auth/signOut", async (_, thunkAPI) => {
	try {
		await auth.signOut()
		return false
	} catch (error) {
		return thunkAPI.rejectWithValue(console.log(error.message))
	}
})

export const onChange = createAsyncThunk(
	"auth/onChange",
	async (currentUser, thunkAPI) => {
		try {
			const updatedUser = {
				login: currentUser.displayName,
				avatar: require("../../assets/user.png"),
				id: currentUser.uid,
				email: currentUser.email,
				token: currentUser.accessToken,
			}
			return updatedUser
		} catch (error) {
			return thunkAPI.rejectWithValue(console.log(error.message))
		}
	}
)
