import { useEffect } from "react"
import {
	View,
	StyleSheet,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
} from "react-native"

import { FontAwesome } from "@expo/vector-icons"
import { SimpleLineIcons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { useSelector, useDispatch } from "react-redux"
import { getPosts, getUser } from "../../redux/user/selectors"
import { addPost } from "../../redux/user/slice"

const DefaultPostsScreen = ({ route, navigation }) => {
	const dispatch = useDispatch()
	const user = useSelector(getUser)
	const posts = useSelector(getPosts)

	useEffect(() => {
		if (route.params) {
			dispatch(addPost(route.params))
		}
	}, [route.params])

	const goToMap = (item) => {
		item.nameLoc === null
			? alert("Location is not established")
			: navigation.navigate("Map", item)
	}

	return (
		<View style={styles.container}>
			<View style={styles.userBlock}>
				<Image source={user.avatar} style={styles.userAv} />
				<View style={styles.userInfo}>
					<Text style={{ fontSize: 16, fontWeight: 700 }}>{user.login}</Text>
					<Text style={styles.userInfo}>{user.email}</Text>
				</View>
			</View>
			{posts.length > 0 && (
				<FlatList
					data={posts}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<TouchableOpacity
							activeOpacity={0.7}
							style={styles.imageItem}
							onPress={() => navigation.navigate("Post", item)}
						>
							<Image source={{ uri: item.photo }} style={styles.image} />
							<Text style={styles.nameImage}>{item.name}</Text>
							<View style={styles.descriptionImage}>
								<TouchableOpacity
									activeOpacity={0.7}
									style={styles.statImage}
									onPress={() => navigation.navigate("Comments", item)}
								>
									<FontAwesome name="comment-o" size={24} color="#a9a9a9" />
									<Text style={styles.comImage}>{item.comments.length}</Text>
									<AntDesign name="like2" size={24} color="#a9a9a9" />
									<Text style={styles.comImage}>{item.likes}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									activeOpacity={0.7}
									style={styles.descriptionImage}
									onPress={() => goToMap(item)}
								>
									<SimpleLineIcons
										style={styles.locIcon}
										name="location-pin"
										size={24}
										color="#a9a9a9"
									/>
									<Text style={styles.locImage}>{item.nameLoc}</Text>
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					)}
				/>
			)}
		</View>
	)
}

export default DefaultPostsScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	userBlock: {
		marginTop: 32,
		marginBottom: 16,
		flexDirection: "row",
		gap: 8,
	},
	userAv: {
		width: 60,
		height: 60,
		alignSelf: "center",
		resizeMode: "contain",
		borderRadius: 16,
		overflow: "hidden",
	},
	userInfo: {
		color: "#212121",
		alignSelf: "center",
	},
	imageItem: {
		marginTop: 32,
		color: "#212121",
	},
	image: {
		width: "100%",
		height: 240,
		borderRadius: 8,
		overflow: "hidden",
		alignSelf: "center",
	},
	nameImage: {
		marginTop: 4,
		marginLeft: 8,
		fontSize: 18,
		fontWeight: "bold",
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
