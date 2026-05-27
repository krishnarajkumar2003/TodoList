import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SplashScreen } from '../screen/SplashScreen';
import { OnboardingScreen } from "../screen/OnboardingScreen";
import { HomeScreen } from "../screen/HomeScreen";
import { Header } from "../components/Headers";

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Splash" 
                    component={SplashScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Onboarding" 
                    component={OnboardingScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{
                        // Note: To show your custom Header component, change this to true
                        headerShown: true, 
                        
                        // FIX: Receive navigation options context object and spread it correctly
                        header: (props) => <Header {...props} />
                    }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};