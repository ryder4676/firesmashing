// webClientId: '782464844748-a0e42itsbp61e0cqd5chvg24o6328gja.apps.googleusercontent.com', PLace into a environment file soon July 20, 2024
// GoogleSignInButton.tsx

import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '782464844748-a0e42itsbp61e0cqd5chvg24o6328gja.apps.googleusercontent.com', // Replace with your web client ID
   offlineAccess: true,
});

type GoogleSignInButtonProps = {
  onSignIn: (user: { name: string; email: string }) => void;
};

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onSignIn }) => {
  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken, user } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      //Alert.alert('Signed in with Google!'); Mayb no Alert?!
      if (user) {
        const { name, email } = user;
        if (name && email) {
          onSignIn({ name, email });
        } else {
          console.error('User name or email is null');
        }
      } else {
        console.error('User is null');
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === statusCodes.SIGN_IN_CANCELLED) {
          console.log('User cancelled the login flow');
        } else if (error.message === statusCodes.IN_PROGRESS) {
          console.log('Sign in is in progress already');
        } else if (error.message === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('Play services not available or outdated');
        } else {
          console.error('Something went wrong with sign in: ', error.message);
        }
      } else {
        console.error('Something went wrong with sign in');
      }
    }
  };

  return (
    <TouchableOpacity onPress={onGoogleButtonPress}>
      <Image source={require('../assets/google-logo.png')} style={styles.logo} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
  },
});

export default GoogleSignInButton;
