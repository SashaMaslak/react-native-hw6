import { StyleSheet, TouchableOpacity, Text } from "react-native"

const Btn = ({ title, handlePressBtn, disabled }) => {
	return (
		<TouchableOpacity
			onPress={handlePressBtn}
			activeOpacity={0.7}
			style={[styles.btn, disabled && styles.btnDis]}
			disabled={false || disabled}
		>
			<Text style={[styles.titleBtn, disabled && styles.titleBtnDis]}>
				{title}
			</Text>
		</TouchableOpacity>
	)
}

export default Btn

const styles = StyleSheet.create({
	btn: {
		marginTop: 16,
		marginBottom: 16,
		marginHorizontal: 16,
		backgroundColor: "#FF6C00",
		height: 50,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	titleBtn: {
		fontSize: 18,
		lineHeight: 19,
		color: "#FFF",
	},
	btnDis: {
		backgroundColor: "#F6F6F6",
	},
	titleBtnDis: {
		color: "#a9a9a9",
	},
})
