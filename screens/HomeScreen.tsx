// HomeScreen.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HomeScreenProps } from '../navigation/Navigation';
import GoogleSignInButton from '../components/GoogleSignInButton';
import FacebookSignInButton from '../components/FacebookSignInButton';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleSignIn = (user: { name: string; email: string }) => {
    navigation.navigate('Dashboard', { user });
  };

  return (
    <View style={styles.container}>
      <GoogleSignInButton onSignIn={handleSignIn} />
      <FacebookSignInButton onSignIn={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
