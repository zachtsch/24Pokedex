import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import { Image } from 'expo-image';

import getBackgroundColor from '../lib/get-background-color';
import padId from '../lib/pad-id';

const PokemonDetailScreen = ({ route, navigation }) => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonError, setPokemonError] = useState();
  const [speciesError, setSpeciesError] = useState();

  const { pokemonId, pokemonName } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: pokemonName.replace('-', ' ').toUpperCase(),
    });

    const fetchPokemonData = async () => {
      setIsLoading(true);
      setPokemonError(null);
      setSpeciesError(null);
      try {
        const pokemonResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
        );
        const pokemonData = await pokemonResponse.json();
        setPokemon(pokemonData);
      } catch (err) {
        setPokemonError(err.message);
      }

      try {
        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`,
        );
        const speciesData = await speciesResponse.json();
        setSpecies(speciesData);
      } catch (err) {
        setSpeciesError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonId, navigation, pokemonName]);

  const imageUrl = pokemon?.sprites?.other['official-artwork'].front_default;
  const height = pokemon?.height;
  const weight = pokemon?.weight;
  const types = pokemon?.types.map((typeInfo) => typeInfo.type.name);
  const flavorTextEntry = species?.flavor_text_entries.find(
    (entry) => entry.language.name === 'en',
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {!pokemonError && (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Text style={styles.id}>{padId(pokemonId)}</Text>
              {isLoading ? (
                <View
                  style={[
                    styles.image,
                    { alignItems: 'center', justifyContent: 'center' },
                  ]}
                >
                  <ActivityIndicator size='large' />
                </View>
              ) : (
                <Image
                  source={imageUrl}
                  style={styles.image}
                  transition={500}
                  allowDownscaling={true}
                />
              )}
              <Text style={styles.name}>{pokemonName.toUpperCase()}</Text>
              <View style={styles.typesContainer}>
                {isLoading ? (
                  <View
                    style={{
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ActivityIndicator size='small' />
                  </View>
                ) : (
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
                  ))
                )}
              </View>
            </View>
            <Text style={styles.stats}>Height: {height / 10} m</Text>
            <Text style={styles.stats}>Weight: {weight / 10} kg</Text>
            {!speciesError && (
              <Text style={styles.description}>
                {flavorTextEntry?.flavor_text}
              </Text>
            )}
          </View>
        )}
      </ScrollView>
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
