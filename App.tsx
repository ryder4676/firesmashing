// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '782464844748-a0e42itsbp61e0cqd5chvg24o6328gja.apps.googleusercontent.com',
// });
import React, { useEffect } from 'react';
import { Button, View, Text, Alert, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackScreenProps } from '@react-navigation/stack';
import { Button as ElementsButton } from 'react-native-elements';

// Replace with your web client ID
GoogleSignin.configure({
  webClientId: '782464844748-a0e42itsbp61e0cqd5chvg24o6328gja.apps.googleusercontent.com',
});

type RootStackParamList = {
  Home: undefined;
  Dashboard: { user: { name: string; email: string } };
};

const Stack = createStackNavigator<RootStackParamList>();

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const onGoogleButtonPress = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the user's ID token
      const { idToken, user } = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ElementsButton
        title="Sign in with Google"
        onPress={onGoogleButtonPress}
        icon={
          <Image
            source={require('./assets/google-logo.png')}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
        }
      />
    </View>
  );
};

type DashboardScreenProps = StackScreenProps<RootStackParamList, 'Dashboard'>;

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, {user.name}!</Text>
      <Text>Email: {user.email}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

