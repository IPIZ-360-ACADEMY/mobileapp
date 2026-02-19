import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../app/AppNavigator';

export type NativeStackNavProp<Screen extends keyof RootStackParamList> =
	NativeStackNavigationProp<RootStackParamList, Screen>;

export type AppRouteProp<Name extends keyof RootStackParamList> =
	RouteProp<RootStackParamList, Name>;
