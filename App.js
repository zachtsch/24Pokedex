import { Text, View, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

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
    <View style={styles.container}>
      <Text style={styles.paragraph}>The App updates any time we save!</Text>
      <Card>
        <EvoChain species={species} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
