import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

type FacebookSignInButtonProps = {
  onSignIn: (user: { name: string; email: string }) => void;
};

const FacebookSignInButton: React.FC<FacebookSignInButtonProps> = ({ onSignIn }) => {
  const onFacebookButtonPress = async () => {
    try {
      // Attempt to log in with Facebook
      const result = await LoginManager.logInWithPermissions(['public_profile']);

      if (result.isCancelled) {
        console.log('User cancelled the login process');
        return;
      }

      // Get the user's AccessToken
      const data = await AccessToken.getCurrentAccessToken();
      

      if (!data) {
        console.log('Error obtaining access token');
        return;
      }

      // Create a Firebase credential with the AccessToken and sign in
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      const userCredential = await auth().signInWithCredential(facebookCredential);

      const { user } = userCredential;
      if (user) {
        onSignIn({
          name: user.displayName || 'Unknown User',
          email: user.email || 'No Email',
        });
      }
    } catch (error) {
      console.error('Facebook login failed:', error);
    }
  };

  return (
    <TouchableOpacity onPress={onFacebookButtonPress} style={styles.button}>
      <Image source={require('../assets/facebook-logo.png')} style={styles.logo} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  logo: {
    width: 48,
    height: 48,
  },
});

export default FacebookSignInButton;

