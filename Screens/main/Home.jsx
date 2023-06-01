import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AntDesign } from "@expo/vector-icons"
import { Feather } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { getIsLoggedIn, getUser } from "../../redux/auth/selectors"
import RegistrationSrceen from "../../Screens/auth/RegistrationSrceen"
import LoginSrceen from "../../Screens/auth/LoginScreen"
import CreatePostsScreen from "./CreatePostsScreen"
import ProfileScreen from "../../Screens/main/ProfileScreen"
import PostsScreen from "../../Screens/main/PostsScreen"
import { signOut, onChange } from "../../redux/auth/authOperation"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase/firebase.config"

const AuthStack = createStackNavigator()
const MainTab = createBottomTabNavigator()

const Home = () => {
	const dispatch = useDispatch()
	const isLoggedIn = useSelector(getIsLoggedIn)

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) dispatch(onChange(currentUser))
		})
	}, [])

	if (!isLoggedIn) {
		return (
			<AuthStack.Navigator
				screenOptions={() => ({
					tabBarShowLabel: false,
					headerShown: false,
				})}
			>
				<AuthStack.Screen name="Home" component={LoginSrceen} />
				<AuthStack.Screen name="Login" component={LoginSrceen} />
				<AuthStack.Screen name="Register" component={RegistrationSrceen} />
			</AuthStack.Navigator>
		)
	}
	return (
		<MainTab.Navigator
			screenOptions={(props) => {
				return {
					tabBarShowLabel: false,
					headerTitleAlign: "center",
					tabBarIcon: ({ focused, color }) => {
						if (focused) {
							color = "#FFF"
						}
						let screenName = props.route.name
						switch (screenName) {
							case "Home":
								return (
									<AntDesign
										name="appstore-o"
										size={24}
										color={color}
										style={focused ? styles.tabBarIconWrapper : null}
									/>
								)
							case "CreatePost":
								return (
									<AntDesign
										name="plus"
										size={24}
										color={color}
										style={focused ? styles.tabBarIconWrapper : null}
									/>
								)
							case "Profile":
								return (
									<Feather
										name="user"
										size={24}
										color={color}
										style={focused ? styles.tabBarIconWrapper : null}
									/>
								)
						}
					},
					headerRight: () => (
						<TouchableOpacity
							style={{ marginRight: 10 }}
							activeOpacity={0.7}
							onPress={() => {
								dispatch(signOut())
							}}
						>
							<MaterialIcons name="logout" size={24} color="black" />
						</TouchableOpacity>
					),
					headerLeft: () => (
						<TouchableOpacity
							style={{ marginLeft: 10 }}
							activeOpacity={0.7}
							onPress={props.navigation.goBack}
						>
							<Ionicons name="arrow-back" size={24} color="black" />
						</TouchableOpacity>
					),
				}
			}}
		>
			<MainTab.Screen
				name="Home"
				component={PostsScreen}
				options={{ headerShown: false }}
			></MainTab.Screen>
			<MainTab.Screen
				name="CreatePost"
				component={CreatePostsScreen}
				options={() => ({
					//tabBarStyle: { display: "none" },
					headerShown: true,
				})}
			></MainTab.Screen>
			<MainTab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					//tabBarStyle: { display: "none" },
					headerShown: false,
				}}
			></MainTab.Screen>
		</MainTab.Navigator>
	)
}

export default Home

const styles = StyleSheet.create({
	tabBarIconWrapper: {
		backgroundColor: "#FF6C00",
		width: 70,
		height: 40,
		verticalAlign: "middle",
		textAlign: "center",
		borderRadius: 20,
	},
})
