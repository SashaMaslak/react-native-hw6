import React, { useState, useEffect } from "react"
import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { Camera } from "expo-camera"
import * as Location from "expo-location"
import * as MediaLibrary from "expo-media-library"

const initialDataCamera = {
	photo: null,
	location: null,
}

export default function DefaultCreatePostsScreen({ navigation }) {
	const [hasPermissionCam, setHasPermissionCam] = useState(null)
	const [hasPermissionLoc, setHasPermissionLoc] = useState(null)
	const [cameraRef, setCameraRef] = useState(null)
	const [type, setType] = useState(Camera.Constants.Type.back)

	useEffect(() => {
		;(async () => {
			const permCam = await Camera.requestCameraPermissionsAsync()
			await MediaLibrary.requestPermissionsAsync()
			setHasPermissionCam(permCam.status === "granted")
			const permLoc = await Location.requestForegroundPermissionsAsync()
			await MediaLibrary.requestPermissionsAsync()
			setHasPermissionLoc(permLoc.status === "granted")
		})()
	}, [])

	useEffect(() => {
		;(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync()
			await MediaLibrary.requestPermissionsAsync()
			setHasPermissionLoc(status === "granted")
		})()
	}, [])

	if (hasPermissionCam === null) {
		return <View />
	}
	if (hasPermissionCam === false) {
		return <Text>No access to camera</Text>
	}

	if (hasPermissionLoc === null) {
		return <View />
	}
	if (hasPermissionLoc === false) {
		return <Text>No access to location</Text>
	}

	const takePhoto = async () => {
		if (cameraRef) {
			const { uri } = await cameraRef.takePictureAsync()
			const location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Highest,
				maximumAge: 10000,
				timeout: 5000,
			})
			await MediaLibrary.createAssetAsync(uri)
			const dataCamera = await createDataCamera(uri, location)
			await navToBack(dataCamera)
		}
	}

	async function createDataCamera(uri, location) {
		return {
			photo: uri,
			location: {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			},
		}
	}

	async function navToBack(dataCamera) {
		navigation.navigate("DefaultCreatePosts", dataCamera)
	}

	return (
		<View style={styles.container}>
			<Camera style={styles.camera} type={type} ref={setCameraRef}>
				<View style={styles.photoView}>
					<View style={styles.smallPhoto}>
						<TouchableOpacity
							disabled={false}
							style={styles.button}
							activeOpacity={0.7}
							//onPress={sendPhoto}
						>
							<AntDesign name="clouduploado" size={40} color="white" />
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={styles.button}
						activeOpacity={0.7}
						onPress={takePhoto}
					>
						<View style={styles.takePhotoOut}></View>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.flipContainer}
						activeOpacity={0.7}
						onPress={() => {
							setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							)
						}}
					>
						<Ionicons name="camera-reverse-outline" size={40} color="white" />
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	camera: {
		flex: 1,
		justifyContent: "flex-end",
	},
	photoView: {
		backgroundColor: "transparent",
		justifyContent: "space-around",
		flexDirection: "row",
		alignItems: "flex-end",
		paddingBottom: 20,
	},

	flipContainer: {
		alignSelf: "center",
	},

	button: {
		alignSelf: "center",
	},

	ButtonEnabled: {
		color: "red",
	},

	takePhotoOut: {
		borderWidth: 2,
		borderColor: "white",
		height: 55,
		width: 55,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
	},
	smallPhoto: {
		alignSelf: "center",
	},
	takeGallOut: {
		borderWidth: 2,
		borderColor: "white",
		height: 45,
		width: 45,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
	},
	postBlock: {
		flex: 1,
		backgroundColor: "green",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	imageBlock: {
		backgroundColor: "#F6F6F6",
		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 8,
		minHeight: 267,
		width: "100%",
		marginTop: 32,
		marginBottom: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	snapCamera: {
		marginBottom: 20,
		width: 65,
		height: 65,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFF",
		borderRadius: 50,
	},
	inputsBlock: {
		flex: 1,
		backgroundColor: "blue",
		alignSelf: "flex-start",
		//width: "100%",
	},
	inputsText: {
		color: "#BDBDBD",
		fontSize: 16,
		lineHeight: 19,
	},
})
