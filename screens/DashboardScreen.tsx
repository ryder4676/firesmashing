// DashboardScreen.tsx

import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { DashboardScreenProps } from '../navigation/Navigation';

const DashboardScreen: React.FC<DashboardScreenProps> = ({ route, navigation }) => {
  const { user } = route.params;

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      Alert.alert('Signed out successfully!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Something went wrong with sign out: ', error);
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
