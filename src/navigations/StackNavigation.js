import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { SplashScreen } from '../screens/SpalshScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { CustomHeader } from '../component/CustomHeader'
const Stack = createNativeStackNavigator()

export const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Splash' component={SplashScreen} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name='Home' component={HomeScreen} options={{
                    header: (props) => <CustomHeader  {...props} />
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}