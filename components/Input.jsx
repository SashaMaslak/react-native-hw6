import { useState } from "react"
import { StyleSheet, TextInput } from "react-native"

const Input = ({
	placeholder,
	isShowPassword,
	onChange,
	name,
	value,
	styleComment,
}) => {
	const [isActive, setIsActive] = useState(false)
	const onFocus = async () => {
		setIsActive(true)
	}

	const onBlur = async () => {
		setIsActive(false)
	}

	return (
		<TextInput
			onChangeText={(value) => onChange({ name, value })}
			style={[styles.input, isActive ? styles.inputFocus : styles.inputBlur]}
			value={value}
			onFocus={onFocus}
			onBlur={onBlur}
			textAlign={"left"}
			placeholderTextColor={"#bdbdbd"}
			placeholder={placeholder}
			secureTextEntry={placeholder === "Password" && isShowPassword}
		/>
	)
}

export default Input

const styles = StyleSheet.create({
	input: {
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#e8e8e8",
		borderRadius: 8,
		height: 50,
		marginHorizontal: 16,
		backgroundColor: "#f6f6f6",
		padding: 16,
		// shadowOffset: {
		// 	width: 4,
		// 	height: 4,
		// },
		// shadowColor: "#000",
		// shadowOpacity: 0.25,
		// elevation: 5,
	},
	inputBlur: {
		borderColor: "#e8e8e8",
		backgroundColor: "#fff",
	},
	inputFocus: {
		borderColor: "#FF6C00",
		backgroundColor: "#fff",
	},
})
