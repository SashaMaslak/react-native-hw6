import { TouchableOpacity } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { MaterialIcons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { useDispatch } from "react-redux"
import { changeIsLoggedIn } from "../../redux/user/slice"

import DefaultPostsScreen from "../nested/DefaultPostsScreen"
import MapScreen from "../nested/MapScreen"
import CommentsScreen from "../nested/CommentsScreen"
import PostScreen from "../nested/PostScreen"

const NestedStack = createStackNavigator()

const PostsScreen = () => {
	const dispatch = useDispatch()
	return (
		<NestedStack.Navigator
			screenOptions={({ navigation, route }) => {
				let isPosts = route.name === "Posts" ? true : false
				return {
					tabBarShowLabel: false,
					headerTitleAlign: "center",
					headerRight: () => (
						<TouchableOpacity
							style={{ marginRight: 10 }}
							activeOpacity={0.7}
							onPress={() => dispatch(changeIsLoggedIn(false))}
						>
							<MaterialIcons name="logout" size={24} color="black" />
						</TouchableOpacity>
					),
					headerLeft: () => {
						return (
							!isPosts && (
								<TouchableOpacity
									style={{ marginLeft: 10 }}
									activeOpacity={0.7}
									onPress={navigation.goBack}
								>
									<Ionicons name="arrow-back" size={24} color="black" />
								</TouchableOpacity>
							)
						)
					},
				}
			}}
		>
			<NestedStack.Screen name="Posts" component={DefaultPostsScreen} />
			<NestedStack.Screen name="Comments" component={CommentsScreen} />
			<NestedStack.Screen name="Map" component={MapScreen} />
			<NestedStack.Screen name="Post" component={PostScreen} />
		</NestedStack.Navigator>
	)
}

export default PostsScreen
