// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '782464844748-a0e42itsbp61e0cqd5chvg24o6328gja.apps.googleusercontent.com',
// });
import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '782464844748-a0e42itsbp61e0cqd5chvg24o6328gja.apps.googleusercontent.com', // Replace with your web client ID
});

const App = () => {
  useEffect(() => {
    // Configure Google Sign-In when the app loads
    GoogleSignin.configure({
      webClientId: '782464844748-a0e42itsbp61e0cqd5chvg24o6328gja.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      console.log('Signed in with Google!');
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Google Sign-In"
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      />
    </View>
  );
};

export default App;
