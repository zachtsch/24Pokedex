import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import PokemonListScreen from './components/PokemonListScreen';
import PokemonInfoScreen from './components/PokemonInfoScreen';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

import { PokemonDataProvider } from './contexts/PokemonDataContext';

import {
  POKEMON_LIST_SCREEN_NAME,
  POKEMON_INFO_SCREEN_NAME,
} from './lib/constants';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <PokemonDataProvider>
        <Stack.Navigator>
          <Stack.Screen
            name={POKEMON_LIST_SCREEN_NAME}
            options={{ title: '', headerShown: false }}
            component={PokemonListScreen}
          />
          <Stack.Screen
            name={POKEMON_INFO_SCREEN_NAME}
            options={{ headerTransparent: true }}
            component={PokemonInfoScreen}
          />
        </Stack.Navigator>
      </PokemonDataProvider>
    </NavigationContainer>
  );
}
