import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MenuIcon from '../../assets/menu.svg';
import { JumpingTransition } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileIcon from '../../assets/profile.svg'
export const CustomHeader = () => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <MenuIcon width={30} height={30} />
        <Text style={styles.index}>Index</Text>
        <ProfileIcon width={42} height={42} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    // height: 42,
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  index: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
  }
});