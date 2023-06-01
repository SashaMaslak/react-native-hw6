import { useState } from "react"
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TouchableOpacity,
	Image,
	Dimensions,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	KeyboardAvoidingView,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import { useKeyboardVisible } from "../../hooks/useKeyboardVisible"

import Input from "../../components/Input"
import LoginBlock from "../../components/LoginBlock"
import { useDispatch } from "react-redux"

const initialStateReg = {
	avatar: null,
	login: "",
	email: "",
	password: "",
	posts: [],
	isLoggedIn: false,
}

const RegistrationSrceen = ({ navigation }) => {
	const [credentialsReg, setCredentialsReg] = useState(initialStateReg)
	const [isShowPassword, setIsShowPassword] = useState(true)
	const [dimensions, setDimensions] = useState(
		Dimensions.get("window").width - 20 * 2
	)

	// useEffect(() => {
	// 	const onChange = () => {
	// 		const width = Dimensions.get("window").width - 20 * 2
	// 		setDimensions(width)
	// 	}
	// 	Dimensions.addEventListener("change", onChange)
	// 	return () => {
	// 		Dimensions.removeEventListener("change", onChange)
	// 	}
	// }, [])

	let isVisibleKeyboard = useKeyboardVisible()
	const handleShowPassword = () => {
		setIsShowPassword(!isShowPassword)
	}

	const iconShowEffect = isShowPassword
		? require("../../assets/show.png")
		: require("../../assets/hide.png")

	const onChange = ({ name, value }) => {
		setCredentialsReg((prevState) => ({ ...prevState, [name]: value }))
	}

	const deleteAvatar = () => {
		setCredentialsReg((prevState) => ({ ...prevState, avatar: null }))
	}

	const clearInputs = () => {
		setCredentialsReg(initialStateReg)
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
							<View style={styles.avatar}>
								{credentialsReg.avatar ? (
									<TouchableOpacity
										style={styles.btnAvatar}
										onPress={deleteAvatar}
									>
										<AntDesign name="closecircleo" size={24} color="#a9a9a9" />
									</TouchableOpacity>
								) : (
									<TouchableOpacity
										style={styles.pinAddAvatar}
										onPress={() =>
											alert(
												"Are you sure you want to upload an avatar from your phone?"
											)
										}
									>
										<Image source={require("../../assets/union.png")} />
									</TouchableOpacity>
								)}
							</View>

							<Text style={[styles.titleForm, styles.shadowProp]}>
								Registration
							</Text>
							<View style={styles.inputsBlock}>
								<Input
									onChange={onChange}
									placeholder="Login"
									name="login"
									value={credentialsReg.login}
								/>
								<Input
									onChange={onChange}
									placeholder="E-Mail"
									name="email"
									value={credentialsReg.email}
								/>
								<Input
									onChange={onChange}
									placeholder="Password"
									name="password"
									value={credentialsReg.password}
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
									titleBtn="Sign up"
									text="If you have an account? Log In"
									clearInputs={clearInputs}
									credentials={credentialsReg}
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

export default RegistrationSrceen

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
		paddingBottom: 50, // isVisibleKeyboard ? 8 : 48,
		position: "relative",
		// marginBottom: 100,
	},
	avatar: {
		height: 120,
		width: 120,
		borderRadius: 16,
		backgroundColor: "#F6F6F6",
		position: "absolute",
		textAlign: "center",
		left: "50%",
		transform: [{ translateY: -60 }, { translateX: -60 }],
	},
	btnAvatar: {
		backgroundColor: "#FFF",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		textAlign: "center",
		right: 0,
		bottom: 14,
		transform: [{ translateX: 12 }],
	},
	pinAddAvatar: {
		justifyContent: "center",
		alignItems: "center",
		height: 25,
		width: 25,
		borderRadius: 25 / 2,
		borderColor: "#FF6C00",
		borderWidth: 1,
		position: "absolute",
		textAlign: "center",
		right: 0,
		bottom: 14,
		transform: [{ translateX: 12 }],
	},
	titleForm: {
		marginTop: 90,
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
