import { Text, View, StyleSheet, Keyboard } from "react-native"
import { useDispatch } from "react-redux"
import { setAvatar } from "../redux/auth/authSlice"
import { signUp, signIn } from "../redux/auth/authOperation"
import Btn from "./Btn"

const LoginBlock = ({ nav, titleBtn, text, clearInputs, credentials }) => {
	const dispatch = useDispatch()

	const handlePressBtn = () => {
		const values = Object.values(credentials)
		const keys = Object.keys(credentials)
		if (values.includes("")) {
			return alert("To fill every field!")
		}

		// if (credentials.hasOwnProperty("avatar")) {
		// 	dispatch(setAvatar(initialAv))
		// }
		if (keys.includes("login")) {
			dispatch(signUp(credentials))
		} else {
			dispatch(signIn(credentials))
		}

		Keyboard.dismiss()
		clearInputs()
		nav("Home")
	}

	const handlePressText = () => {
		titleBtn === "Sign in" ? nav("Register") : nav("Login")
	}

	return (
		<View>
			<Btn title={titleBtn} handlePressBtn={handlePressBtn} />
			<Text style={styles.link} onPress={handlePressText}>
				{text}
			</Text>
		</View>
	)
}

export default LoginBlock

const styles = StyleSheet.create({
	link: {
		color: "#1B4371",
		textAlign: "center",
	},
})
