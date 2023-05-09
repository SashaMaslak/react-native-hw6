import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TouchableOpacity,
	Image,
	Platform,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native"

import { FontAwesome } from "@expo/vector-icons"
import { SimpleLineIcons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { useSelector, useDispatch } from "react-redux"
import { getUser } from "../../redux/user/selectors"
import { changeIsLoggedIn } from "../../redux/user/slice"

const ProfileScreen = ({ navigation }) => {
	const dispatch = useDispatch()
	const user = useSelector(getUser)
	const { avatar, login, posts } = user

	const goToMap = (item) => {
		item.nameLoc === null
			? alert("Location is not established")
			: navigation.navigate("Map", item)
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				style={styles.bg}
				source={require("../../assets/Photo_BG.png")}
			>
				<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
					<ScrollView>
						<View style={styles.form}>
							<View style={styles.avatar}>
								<ImageBackground style={styles.bg} source={avatar}>
									{avatar ? (
										<View style={styles.btnAvatar}>
											<AntDesign
												name="closecircleo"
												size={24}
												color="#a9a9a9"
											/>
										</View>
									) : (
										<View style={styles.pinAddAvatar}>
											<Image source={require("../../assets/union.png")} />
										</View>
									)}
								</ImageBackground>
							</View>
							<TouchableOpacity
								style={styles.logoutBtn}
								activeOpacity={0.7}
								onPress={() => dispatch(changeIsLoggedIn(false))}
							>
								<MaterialIcons name="logout" size={32} color="#a9a9a9" />
							</TouchableOpacity>
							<Text
								style={{
									marginTop: 75,
									alignSelf: "center",
									fontSize: 18,
									fontWeight: "bold",
								}}
							>
								{login}
							</Text>
						</View>
						{posts.length > 0 &&
							posts.map((item) => (
								<TouchableOpacity
									key={item.id}
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
											<Text style={styles.comImage}>
												{item.comments.length}
											</Text>
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
							))}
					</ScrollView>
				</KeyboardAvoidingView>
			</ImageBackground>
		</View>
	)
}

export default ProfileScreen

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
		marginTop: 100,
		//paddingBottom: 50,
		position: "relative",
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
		//marginTop: 60,
	},
	btnAvatar: {
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		textAlign: "center",
		right: 0,
		bottom: 14,
		transform: [{ translateX: 12 }],
	},
	logoutBtn: {
		position: "absolute",
		right: 18,
		top: 18,
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
	imageItem: {
		backgroundColor: "#fff",
		paddingVertical: 32,
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
