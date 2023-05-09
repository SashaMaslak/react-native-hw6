import { createStackNavigator } from "@react-navigation/stack"

import DefaultCreatePostsScreen from "../nested/DefaultCreatePostsScreen"
import CreatePhotoScreen from "../nested/CreatePhotoScreen"

const NestedStack = createStackNavigator()

const CreatePostsScreen = () => {
	return (
		<NestedStack.Navigator
			screenOptions={() => {
				return {
					tabBarShowLabel: false,
					headerShown: false,
				}
			}}
		>
			<NestedStack.Screen
				name="DefaultCreatePosts"
				component={DefaultCreatePostsScreen}
			/>
			<NestedStack.Screen name="CreatePhoto" component={CreatePhotoScreen} />
		</NestedStack.Navigator>
	)
}

export default CreatePostsScreen
