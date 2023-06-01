import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	FlatList,
	Image,
	TouchableOpacity,
	TextInput,
	Keyboard,
} from "react-native"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { AntDesign } from "@expo/vector-icons"
import { useSelector, useDispatch } from "react-redux"
import { getUser } from "../../redux/auth/selectors"
import {
	collection,
	query,
	where,
	getDocs,
	documentId,
	addDoc,
} from "firebase/firestore"
import { db } from "../../firebase/firebase.config"

const CommentsScreen = ({ route, navigation }) => {
	const dispatch = useDispatch()
	const [docRefId, setDocRefId] = useState(null)
	const [isActive, setIsActive] = useState(false)
	const [comment, setComment] = useState("")
	const [comments, setComments] = useState([])
	const user = useSelector(getUser)
	const post = route.params
	const postId = route.params.id

	const getCommentsFromFirestore = async () => {
		try {
			let comments = []
			const q = query(collection(db, "posts", postId, "comments"))
			const querySnapshot = await getDocs(q)

			querySnapshot.forEach((doc) => {
				const commentOnServer = { ...doc.data(), id: doc.id }
				comments.push(commentOnServer)
			})
			setComments(comments)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getCommentsFromFirestore()
	}, [docRefId])

	const onFocus = async () => {
		setIsActive(true)
	}
	const onBlur = async () => {
		setIsActive(false)
	}

	const uploadCommentToServer = () => {
		if (comment === "") return alert("Please, add to comment")
		const date = format(new Date(2014, 1, 11), "MM/dd/yyyy")
		const dataComment = {
			owner: user ? "user" : "follower",
			comment: comment,
			date: date,
		}
		const writeDataToFirestore = async () => {
			try {
				const docRef = await addDoc(
					collection(db, "posts", postId, "comments"),
					dataComment
				)
				console.log("Document written with ID: ", docRef.id)
				setDocRefId(docRef.id)
			} catch (e) {
				console.error("Error adding document: ", e)
				throw e
			}
		}
		writeDataToFirestore()
	}

	const handleComment = () => {
		uploadCommentToServer()
		setComment("")
		Keyboard.dismiss()
	}

	return (
		<View style={styles.container}>
			<View style={styles.image}>
				<ImageBackground
					source={{ uri: post.photo }}
					style={{ flex: 1, width: "100%", height: "100%" }}
				/>
			</View>

			<FlatList
				data={comments}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View
						style={[
							styles.commentBlock,
							item.owner === "user"
								? styles.commentBlockUser
								: styles.commentBlockFol,
						]}
					>
						{item.owner === "user" ? (
							<Image source={user.avatar} style={styles.avatarUser} />
						) : (
							<Image
								source={require("../../assets/follower.png")}
								style={styles.avatarFol}
							/>
						)}
						<View style={styles.comment}>
							<Text style={styles.commentText}>{item.comment}</Text>
							<Text style={styles.commentDate}>{item.date}</Text>
						</View>
					</View>
				)}
			/>
			<View style={styles.inputBlock}>
				<TextInput
					onChangeText={(value) => setComment(value)}
					style={[
						styles.input,
						isActive ? styles.inputFocus : styles.inputBlur,
					]}
					value={comment}
					onFocus={onFocus}
					onBlur={onBlur}
					textAlign={"left"}
					placeholderTextColor={"#bdbdbd"}
					placeholder="To comment..."
				/>
				<TouchableOpacity style={styles.commentBtn} onPress={handleComment}>
					<AntDesign name="arrowup" size={24} color="#FFF" />
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default CommentsScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		alignItems: "center",
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
	commentsBlock: {},
	commentBlock: {
		flexDirection: "row",
		marginTop: 32,
		gap: 24,
	},
	commentBlockUser: {
		flexDirection: "row-reverse",
	},
	commentBlockFol: {},
	avatarUser: {
		width: 28,
		height: 28,
	},
	avatarFol: {
		width: 28,
		height: 28,
	},
	comment: {
		padding: 4,
		backgroundColor: "rgba(0, 0, 0, 0.03)",
		borderRadius: 6,

		width: 320,
	},
	commentText: {
		fontSize: 16,
		marginBottom: 4,
	},
	commentDate: {
		alignSelf: "flex-end",
		color: "#a9a9a9",
	},
	inputBlock: {
		//position: "relative",
		width: "100%",
	},
	input: {
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#e8e8e8",
		borderRadius: 28,
		height: 50,
		width: "100%",
		backgroundColor: "#f6f6f6",
		padding: 16,
	},
	commentBtn: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: "#FF6C00",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		right: 10,
		top: 5,
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
