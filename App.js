import React from 'react';
import { NativeBaseProvider, Box, Text, StatusBar } from 'native-base';
import Logo from './assets/logo.svg'
import { StackNavigation } from './src/navigations/StackNavigation';
export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />
      <NativeBaseProvider>
        <StackNavigation />
      </NativeBaseProvider>
    </>
  );
}