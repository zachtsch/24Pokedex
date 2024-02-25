import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import getBackgroundColor from '../lib/get-background-color';
import padId from '../lib/pad-id';

// we will hard code different types exp pokemonid = to test the
const PokemonDetailScreen = ({ route, navigation }) => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const { pokemonId, pokemonName } = route.params;

  //Can someone please add error handling for this fetch request???

  useEffect(() => {
    navigation.setOptions({ title: pokemonName.toUpperCase() });

    const fetchPokemonData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const pokemonResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
        );
        const pokemonData = await pokemonResponse.json();
        setPokemon(pokemonData);

        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`,
        );
        const speciesData = await speciesResponse.json();
        setSpecies(speciesData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    //calling our
    fetchPokemonData();
  }, [pokemonId, navigation, pokemonName]);

  // this is whhere we are fetching the data

  const imageUrl = pokemon?.sprites?.other['official-artwork'].front_default;
  const height = pokemon?.height;
  const weight = pokemon?.weight;
  const types = pokemon?.types.map((typeInfo) => typeInfo.type.name);
  const flavorTextEntry = species?.flavor_text_entries.find(
    (entry) => entry.language.name === 'en',
  );

  //we have safe view for protecting the top notches on iphones
  //we must have the app scrollable to fit all devices/ ipads tablets ect
  // to do -> add navigation to the pokemon page
  //todo -> figure out why scroll view and safearea view only work when loaded in app.js
  //we need this component to not rely on app.js in any way to be shown ( self contained)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {isLoading && <ActivityIndicator size='large' />}
        {error && <Text>Error: {error}</Text>}
        {!error && !isLoading && (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Text style={styles.id}>{padId(pokemon?.id)}</Text>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <Text style={styles.name}>{species?.name.toUpperCase()}</Text>
              <View style={styles.typesContainer}>
                {pokemon &&
                  types.map((type, index) => (
                    <View
                      key={index}
                      style={[
                        styles.typeBanner,
                        { backgroundColor: getBackgroundColor(type) },
                      ]}
                    >
                      <Text style={styles.typeText}>{type.toUpperCase()}</Text>
                    </View>
                  ))}
              </View>
            </View>
            <Text style={styles.stats}>Height: {height / 10} m</Text>
            <Text style={styles.stats}>Weight: {weight / 10} kg</Text>
            <Text style={styles.description}>
              {flavorTextEntry?.flavor_text}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  imageContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  id: {
    fontSize: 15,
    opacity: 0.75,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 2,
  },
  typeBanner: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  typeText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  stats: {
    margin: 5,
    textAlign: 'center',
  },
  description: {
    margin: 5,
    textAlign: 'center',
  },
});

export default PokemonDetailScreen;
