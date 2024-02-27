import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import PokemonListScreen from './components/PokemonListScreen';
import PokemonInfoScreen from './components/PokemonInfoScreen';

import {
  POKEMON_LIST_SCREEN_NAME,
  POKEMON_INFO_SCREEN_NAME,
} from './lib/constants';

const Stack = createNativeStackNavigator();

import EvoChain from './components/EvoChain';
import { useEffect, useState } from 'react';

export default function App() {
  const pokemonID = 4;
  const [species, setSpecies] = useState([]);

  const fetchPokeData = async () => {
    const speciesResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`,
    );
    const speciesData = await speciesResponse.json();
    setSpecies(speciesData);
  };

  fetchPokeData();

  return (
<<<<<<< HEAD
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
      </Stack.Navigator>
    </NavigationContainer>
=======
    <View style={styles.container}>
      <Text style={styles.paragraph}>The App updates any time we save!</Text>
      <Card>
        <EvoChain species={species} />
      </Card>
    </View>
>>>>>>> feature/EvoComponent
  );
}
