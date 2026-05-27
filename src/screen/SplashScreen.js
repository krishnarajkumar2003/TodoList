import React, {useCallback} from 'react';
import {Box, NativeBaseProvider} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';

import Logo from '../../assets/logo.svg';

export const SplashScreen = ({navigation}) => {

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        navigation.navigate('Onboarding')
      }, 3000);
    }, []),
  );

  return (
    
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        bg="#000000"
      >
        <Logo width={140} height={180} />
      </Box>
  );
};