import React, { useState, useEffect } from "react"
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	ImageBackground,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native"
import { useKeyboardVisible } from "../../hooks/useKeyboardVisible"
import { SimpleLineIcons } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import Btn from "../../components/Btn"
import { nanoid } from "nanoid"
import { db } from "../../firebase/firebase.config"
import { storage } from "../../firebase/firebase.config"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore"
import { useSelector } from "react-redux"
import { getUser } from "../../redux/auth/selectors"

const initialPost = {
	name: null,
	photo: null,
	location: [],
	comments: [],
	likes: 0,
}

export default function DefaultCreatePostsScreen({ navigation, route }) {
	const [progress, setProgress] = useState(0)
	const [photo, setPhoto] = useState(null)
	const [urlPhoto, setUrlPhoto] = useState(null)
	const [docRefId, setDocRefId] = useState(null)
	const [defLocation, setDefLocation] = useState(null)
	const [valueName, setValueName] = useState(null)
	const [valueLoc, setValueLoc] = useState(null)
	const [post, setPost] = useState(initialPost)
	let isVisibleKeyboard = useKeyboardVisible()
	const user = useSelector(getUser)

	let routeData = route.params

	const uploadPhotoToServer = async (photo) => {
		const photoId = nanoid()
		const storageRef = ref(storage, `postImg/${photoId}`)
		const uploadTask = uploadBytesResumable(storageRef, photo)

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const prog = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				)
				setProgress(prog)
			},
			(err) => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					setUrlPhoto(url)
				})
			}
		)
	}

	useEffect(() => {
		if (routeData === undefined) return
		else {
			if ("photo" in routeData || "location" in routeData) {
				setPhoto(route.params.photo)
				setDefLocation(route.params.location)
				setPost((prevState) => ({
					...prevState,
					photo: route.params.photo,
					location: route.params.location,
				}))
				uploadPhotoToServer(photo)
			} else {
				setPhoto(null)
				setDefLocation(null)
				setPost(initialPost)
			}
		}
	}, [routeData])

	useEffect(() => {
		setPost((prevState) => ({
			...prevState,
			name: valueName,
			location: defLocation,
			nameLoc: valueLoc,
		}))
	}, [valueName, valueLoc])

	const handleCamera = () => {
		navigation.navigate("CreatePhoto")
	}

	const handleEditPhoto = () => {
		routeData = undefined
		setPhoto(null)
		setDefLocation(null)
		setValueName(null)
		setValueLoc(null)
		setPost(initialPost)
	}

	const uploadPostToServer = () => {
		const createdPost = {
			...post,
			photo: urlPhoto,
			nickname: user.login,
			userId: user.id,
		}
		const writeDataToFirestore = async () => {
			try {
				const docRef = await addDoc(collection(db, "posts"), createdPost)
				console.log("Document written with ID: ", docRef.id)
				setDocRefId(docRef.id)
			} catch (e) {
				console.error("Error adding document: ", e)
				throw e
			}
		}
		writeDataToFirestore()
	}

	const handlePressBtn = () => {
		setPost((prevState) => ({
			...prevState,
		}))
		uploadPostToServer()
		navigation.navigate("Posts", docRefId)
		routeData = undefined
		setPhoto(null)
		setDefLocation(null)
		setValueName(null)
		setValueLoc(null)
		setPost(initialPost)
	}

	const handleDeletePost = () => {
		routeData = undefined
		setPhoto(null)
		setDefLocation(null)
		setValueName(null)
		setValueLoc(null)
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<View style={styles.postBlock}>
					{isVisibleKeyboard ? (
						<View
							style={{
								minHeight: 100,
								width: "40%",
								marginTop: 16,
								marginBottom: 8,
								justifyContent: "center",
								alignItems: "center",
								position: "relative",
							}}
						>
							<ImageBackground
								source={{
									uri: photo,
								}}
								style={{
									flex: 1,
									width: "100%",
									height: "100%",
									resizeMode: "contain",
									borderRadius: 4,
									overflow: "hidden",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<TouchableOpacity
									style={styles.searchPlus}
									onPress={() => Keyboard.dismiss()}
								>
									<FontAwesome name="search-plus" size={12} color="#bdbdbd" />
								</TouchableOpacity>
							</ImageBackground>
						</View>
					) : (
						<>
							{photo ? (
								<View style={styles.photoBlock}>
									<ImageBackground
										source={{
											uri: photo,
										}}
										style={{
											flex: 1,
											width: "100%",
											height: "100%",
											resizeMode: "contain",
											borderRadius: 8,
											overflow: "hidden",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<TouchableOpacity
											style={styles.snapCamera}
											onPress={handleCamera}
										>
											<FontAwesome name="camera" size={24} color="#bdbdbd" />
										</TouchableOpacity>
									</ImageBackground>
								</View>
							) : (
								<View style={styles.imageBlock}>
									<TouchableOpacity
										style={styles.snapCamera}
										onPress={handleCamera}
									>
										<FontAwesome name="camera" size={24} color="#bdbdbd" />
									</TouchableOpacity>
								</View>
							)}
						</>
					)}
					<View style={styles.inputsBlock}>
						{photo ? (
							<TouchableOpacity onPress={handleEditPhoto}>
								<Text style={styles.inputsText}>Edit photo</Text>
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								onPress={() =>
									alert(
										"Are you sure you want to upload a photo from your phone?"
									)
								}
							>
								<Text style={styles.inputsText}>Upload photo</Text>
							</TouchableOpacity>
						)}

						<TextInput
							onChangeText={(value) => setValueName(value)}
							style={[styles.input]}
							value={valueName}
							//onFocus={onFocus}
							//onBlur={onBlur}
							textAlign={"left"}
							placeholderTextColor={"#bdbdbd"}
							placeholder="Name photo..."
						/>
						<TextInput
							onChangeText={(value) => setValueLoc(value)}
							style={[styles.input, { paddingLeft: 36 }]}
							//onFocus={onFocus}
							//onBlur={onBlur}
							value={valueLoc}
							textAlign={"left"}
							placeholderTextColor={"#bdbdbd"}
							placeholder="Location..."
						/>
						<SimpleLineIcons
							style={styles.locIcon}
							name="location-pin"
							size={24}
							color="#BDBDBD"
						/>
						<Btn
							disabled={
								post.name === null || post.photo === null ? true : false
							}
							title={"Publish"}
							handlePressBtn={handlePressBtn}
							style={{ backgroundColor: "#F6F6F6" }}
						/>
					</View>
				</View>
				{isVisibleKeyboard ? null : (
					<TouchableOpacity
						style={styles.deleteBtnWrapper}
						onPress={handleDeletePost}
					>
						<AntDesign name="delete" size={24} color="#a9a9a9" />
					</TouchableOpacity>
				)}
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#FFF" },
	postBlock: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 16,
		backgroundColor: "#FFF",
	},
	imageBlock: {
		backgroundColor: "#F6F6F6",
		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 8,
		minHeight: 267,
		width: "100%",
		marginTop: 28,
		marginBottom: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	photoBlock: {
		minHeight: 267,
		width: "100%",
		marginTop: 28,
		marginBottom: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	photoBlockSmall: {
		minHeight: 53,
		width: "100%",
		marginTop: 16,
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
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		borderRadius: 50,
	},
	searchPlus: {
		marginBottom: 20,
		width: 32,
		height: 32,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		borderRadius: 50,
	},
	inputsBlock: {
		flex: 1,
		alignSelf: "flex-start",
		width: "100%",
	},
	inputsText: {
		color: "#a9a9a9",
		fontSize: 16,
		lineHeight: 19,
		marginBottom: 28,
	},
	input: {
		width: "100%",
		marginBottom: 28,
		borderWidth: 1,
		borderBottomColor: "#a9a9a9",
		height: 50,
		backgroundColor: "#f6f6f6",
		paddingLeft: 16,
		fontSize: 16,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
	},
	inputBlur: {
		borderBottomColor: "#a9a9a9",
		backgroundColor: "#f6f6f6",
	},
	inputFocus: {
		borderBottomColor: "#FF6C00",
		backgroundColor: "#fff",
	},
	locIcon: {
		position: "absolute",
		top: 138,
		left: 8,
	},
	deleteBtnWrapper: {
		//position: "absolute",
		marginBottom: 22,
		alignSelf: "center",
		backgroundColor: "#FFF",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		width: 70,
		height: 40,
		borderRadius: 20,
	},
})
