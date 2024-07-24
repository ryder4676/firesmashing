// DashboardScreen.tsx

import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';
import { DashboardScreenProps } from '../navigation/Navigation';

const DashboardScreen: React.FC<DashboardScreenProps> = ({ route, navigation }) => {
  const { user } = route.params;

  const handleSignOut = async () => {
    try {
      // Sign out from Firebase
      const currentUser = auth().currentUser;
      if (currentUser) {
        await auth().signOut();
      } else {
        console.log('No Firebase user signed in');
      }

      // Sign out from Google if signed in
      const googleUserInfo = await GoogleSignin.getCurrentUser();
      if (googleUserInfo) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        console.log('Google sign-out successful');
      } else {
        console.log('No Google user signed in');
      }

      // Sign out from Facebook
      LoginManager.logOut();
      console.log('Facebook log-out successful');

      Alert.alert('Signed out successfully!');
      navigation.navigate('Home');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Something went wrong with sign out: ', error.message);
      } else {
        console.error('Something went wrong with sign out');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome, {user.name ?? 'User'}!</Text>
      <Text>Email: {user.email ?? 'No email provided'}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
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

export default DashboardScreen;
