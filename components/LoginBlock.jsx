import { Text, View, StyleSheet, Keyboard } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { getUser } from "../redux/user/selectors"
import { changeIsLoggedIn, createUser, setAvatar } from "../redux/user/slice"
import Btn from "./Btn"

const initialAv = require("../assets/user.png")

const LoginBlock = ({ nav, titleBtn, text, clearInputs, credentials }) => {
	const user = useSelector(getUser)
	const dispatch = useDispatch()
	const handlePressBtn = () => {
		const values = Object.values(credentials)

		if (values.includes("")) {
			return alert("To fill every field!")
		}

		clearInputs()
		Keyboard.dismiss()
		dispatch(createUser(credentials))
		dispatch(changeIsLoggedIn(true))
		if (credentials.hasOwnProperty("avatar")) {
			dispatch(setAvatar(initialAv))
		}

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
