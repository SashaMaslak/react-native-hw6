import { useState } from "react"
import {
	View,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Text,
	Alert,
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { SimpleLineIcons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { useSelector, useDispatch } from "react-redux"
import { getUser } from "../../redux/auth/selectors"
import { getPosts } from "../../redux/posts/selectors"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase.config"

const PostScreen = ({ route, navigation }) => {
	const dispatch = useDispatch()
	const [showBox, setShowBox] = useState(false)
	const user = useSelector(getUser)
	const posts = useSelector(getPosts)
	const post = route.params
	const { location, name, photo, nameLoc, comments, likes } = post
	const idPost = post.id
	const idx = posts.findIndex((el) => el.id === idPost)

	const handleDeletePost = async () => {
		try {
			await deleteDoc(doc(db, "posts", `${idPost}`))
			navigation.navigate("Posts")
		} catch (e) {
			console.error("Error adding document: ", e)
			throw e
		}
	}

	const goToMap = (post) => {
		nameLoc === null
			? alert("Location is not established")
			: navigation.navigate("Map", post)
	}

	const showConfirmDialog = () => {
		return Alert.alert(
			"Are your sure?",
			"Are you sure you want to remove this post?",
			[
				// The "Yes" button
				{
					text: "Yes",
					onPress: () => {
						handleDeletePost()
						setShowBox(false)
					},
				},
				// The "No" button
				// Does nothing but dismiss the dialog when tapped
				{
					text: "No",
				},
			]
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.photoBlock}>
				<View style={styles.image}>
					<ImageBackground
						source={{
							uri: photo,
						}}
						style={{ flex: 1, width: "100%", height: "100%" }}
					/>
				</View>
				<Text style={styles.nameImage}>{name}</Text>
				<View style={styles.descriptionImage}>
					<TouchableOpacity
						activeOpacity={0.7}
						style={styles.statImage}
						onPress={() => navigation.navigate("Comments", post)}
					>
						<FontAwesome name="comment-o" size={24} color="#a9a9a9" />
						<Text style={styles.comImage}>{comments.length}</Text>
						<AntDesign name="like2" size={24} color="#a9a9a9" />
						<Text style={styles.comImage}>{likes}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						style={styles.descriptionImage}
						onPress={() => goToMap(post)}
					>
						<SimpleLineIcons
							style={styles.locIcon}
							name="location-pin"
							size={24}
							color="#a9a9a9"
						/>
						<Text style={styles.locImage}>{nameLoc}</Text>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity
				style={styles.deleteBtnWrapper}
				onPress={() => showConfirmDialog()}
				//onPress={handleDeletePost}
			>
				<AntDesign name="delete" size={24} color="#a9a9a9" />
			</TouchableOpacity>
		</View>
	)
}

export default PostScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		alignItems: "center",
	},
	photoBlock: {
		flex: 1,
		width: "100%",
	},
	image: {
		marginTop: 32,
		width: "100%",
		height: 240,
		resizeMode: "contain",
		borderRadius: 8,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
	},
	deleteBtnWrapper: {
		marginBottom: 22,
		alignSelf: "center",
		justifyContent: "flex-end",
		backgroundColor: "#FFF",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		width: 70,
		height: 40,
		borderRadius: 20,
	},
	nameImage: {
		marginTop: 4,
		marginLeft: 8,
		fontSize: 18,
		fontWeight: "bold",
	},
	description: {
		marginTop: 24,
		alignSelf: "center",
	},
	descriptionImage: {
		marginTop: 4,
		marginLeft: 8,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	statImage: {
		marginTop: 4,
		marginLeft: 8,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	comImage: {
		fontSize: 16,
		marginLeft: 8,
		marginRight: 16,
	},
	locImage: {
		fontSize: 16,
		marginHorizontal: 8,
	},
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	box: {
		width: 300,
		height: 300,
		backgroundColor: "red",
		marginBottom: 30,
	},
	text: {
		fontSize: 30,
	},
})
