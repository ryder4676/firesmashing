// HomeScreen.tsx

import React from 'react';
import { View, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { HomeScreenProps } from '../navigation/Navigation';

// Replace with your web client ID
GoogleSignin.configure({
  webClientId: '782464844748-a0e42itsbp61e0cqd5chvg24o6328gja.apps.googleusercontent.com',
});

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const onGoogleButtonPress = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken, user } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    Alert.alert('Signed in with Google!');
    if (user) {
      const { name, email } = user;
      if (name && email) {
        navigation.navigate('Dashboard', { user: { name, email } });
      } else {
        console.error('User name or email is null');
      }
    } else {
      console.error('User is null');
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Sign in is in progress already');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play services not available or outdated');
    } else {
      console.error('Something went wrong with sign in: ', error);
    }
  }
};


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onGoogleButtonPress}>
        <Image source={require('../assets/google-logo.png')} style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
  },
});

export default HomeScreen;
