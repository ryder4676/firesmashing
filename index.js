/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';
import { Settings } from 'react-native-fbsdk-next';
Settings.initializeSDK();
enableScreens();

AppRegistry.registerComponent(appName, () => App);
