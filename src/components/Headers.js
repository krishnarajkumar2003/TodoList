import { Box, HStack, Text } from "native-base";
import Menu from '../../assets/menu.svg';
import Profile from '../../assets/profile.svg'
export const Header = () => {
    return (
        /* Using safeAreaTop instead of a hardcoded margin-top.
          This dynamically calculates the exact height of the phone's notch/status bar 
          so your header never overlaps the clock or battery icons!
        */
        <HStack 
            bg={'#000000'}// Changed red to black to match your onboarding theme style
            w="100%" 
            h={50} 
            safeAreaTop 
            px={6} // FIX: Changed 'ph={33}' to 'px={6}' (Native-Base spacing scale) or px="24px"
            alignItems="center"
            justifyContent={'space-between'}
        >
            <Menu width={24} height={24} />
            <Text fontSize={20}>Index</Text>
            <Profile width={42} height={42} />
        </HStack>
    );
};