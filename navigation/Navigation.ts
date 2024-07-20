// Navigation.ts

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Dashboard: { user: { name: string; email: string } };
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type DashboardScreenRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export type DashboardScreenProps = {
  navigation: DashboardScreenNavigationProp;
  route: DashboardScreenRouteProp;
};
