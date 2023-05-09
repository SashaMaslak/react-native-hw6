import { useState } from "react"
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TouchableOpacity,
	Image,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	KeyboardAvoidingView,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useKeyboardVisible } from "../../hooks/useKeyboardVisible"

import Input from "../../components/Input"
import LoginBlock from "../../components/LoginBlock"

const initialStateLogin = {
	avatar: "./",
	email: "",
	password: "",
}

const LoginSrceen = ({ navigation }) => {
	const [credentialsLogin, setCredentialsLogin] = useState(initialStateLogin)
	const [isShowPassword, setIsShowPassword] = useState(true)
	let isVisibleKeyboard = useKeyboardVisible()
	const handleShowPassword = () => {
		setIsShowPassword(!isShowPassword)
	}

	const iconShowEffect = isShowPassword
		? require("../../assets/show.png")
		: require("../../assets/hide.png")

	const onChange = ({ name, value }) => {
		setCredentialsLogin((prevState) => ({ ...prevState, [name]: value }))
	}

	const clearInputs = () => {
		setCredentialsLogin(initialStateLogin)
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<ImageBackground
					style={styles.bg}
					source={require("../../assets/Photo_BG.png")}
				>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : ""}
					>
						<View style={styles.form}>
							<Text style={[styles.titleForm, styles.shadowProp]}>Login</Text>
							<View style={styles.inputsBlock}>
								<Input
									onChange={onChange}
									placeholder="E-Mail"
									name="email"
									value={credentialsLogin.email}
								/>
								<Input
									onChange={onChange}
									placeholder="Password"
									name="password"
									value={credentialsLogin.password}
									isShowPassword={isShowPassword}
								/>
								<TouchableOpacity
									style={styles.iconShowEffect}
									onPress={handleShowPassword}
									activeOpacity={0.7}
								>
									<Image source={iconShowEffect} />
								</TouchableOpacity>
							</View>
							{isVisibleKeyboard ? null : (
								<LoginBlock
									nav={navigation.navigate}
									titleBtn="Sign in"
									text="If you don`t have an account? Sign Up"
									clearInputs={clearInputs}
									credentials={credentialsLogin}
								/>
							)}
						</View>
						<StatusBar style="auto" />
					</KeyboardAvoidingView>
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default LoginSrceen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	bg: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "flex-end",
		// alignItems: "center",
	},
	form: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingBottom: 50,
		position: "relative",
		// marginBottom: 100,
	},
	titleForm: {
		marginTop: 50,
		color: "#212121",
		fontWeight: 500,
		fontSize: 30,
		lineHeight: 35,
		textAlign: "center",
		marginBottom: 32, //isVisibleKeyboard ? 16 : 32,
	},
	inputsBlock: {
		position: "relative",
	},
	iconShowEffect: {
		padding: 4,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		right: 24,
		bottom: 24,
	},
})
