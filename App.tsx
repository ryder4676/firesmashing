// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '782464844748-a0e42itsbp61e0cqd5chvg24o6328gja.apps.googleusercontent.com',
// });
import React from 'react';
import { View, Alert, Image, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Replace with your web client ID
GoogleSignin.configure({
  webClientId: '782464844748-a0e42itsbp61e0cqd5chvg24o6328gja.apps.googleusercontent.com',
});

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  
  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken, user } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      Alert.alert('Signed in with Google!');
      navigation.navigate('Dashboard', { user: { name: user.name, email: user.email } });
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
      <Text>Welcome to the Awesome Fresmash App!</Text>
      <TouchableOpacity onPress={onGoogleButtonPress}>
        <Image
          source={require('./assets/google-logo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  );
};

const DashboardScreen = ({ route, navigation }) => {
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
      <Text>Welcome, {user.name}!</Text>
      <Text>Email: {user.email}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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

export default App;
