import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import PokemonListScreen from './components/PokemonListScreen';
import PokemonInfoScreen from './components/PokemonInfoScreen';
import EvoChain from './components/EvoChain'; 
import {
  POKEMON_LIST_SCREEN_NAME,
  POKEMON_INFO_SCREEN_NAME,
  EVO_CHAIN_SCREEN_NAME,
  
} from './lib/constants';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto' />
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

        <Stack.Screen
          name={EVO_CHAIN_SCREEN_NAME}
          options={{ headerTransparent: true }}
          component={EvoChain}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
