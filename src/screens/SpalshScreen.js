import { StyleSheet } from "react-native"
import { View } from "react-native"
import Logo from '../../assets/logo.svg'
import { useEffect } from "react"
export const SplashScreen = ({ navigation }) => {
    useEffect(
        () => {
            setTimeout(() => {
                navigation.navigate('Home')
            }, 3000)
        }, []
    )
    return (
        <View style={styles.screen}>
            <Logo width={200} height={200} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212'
    }
})