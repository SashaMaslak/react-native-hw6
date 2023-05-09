import {
	View,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Text,
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { SimpleLineIcons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { useSelector, useDispatch } from "react-redux"
import { getUser, getPosts } from "../../redux/user/selectors"
import { deletePost } from "../../redux/user/slice"

const PostScreen = ({ route, navigation }) => {
	const dispatch = useDispatch()

	const user = useSelector(getUser)
	const posts = useSelector(getPosts)
	const post = route.params
	const { location, name, photo, nameLoc, comments, likes } = post
	const idPost = post.id
	const idx = posts.findIndex((el) => el.id === idPost)

	const handleDeletePost = () => {
		dispatch(deletePost(idx))
		navigation.navigate("Posts")
	}

	const goToMap = (post) => {
		nameLoc === null
			? alert("Location is not established")
			: navigation.navigate("Map", post)
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
				onPress={handleDeletePost}
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
		//position: "absolute",
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
})
