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
import PokemonCard from './PokemonCard';

const PokemonDetailScreen = ({ route, navigation }) => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const { pokemonId, pokemonName } = route.params;

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
      {isLoading && <ActivityIndicator size='large' />}
      {error && (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            gap: 10,
          }}
        >
          <Text style={{ textAlign: 'center' }}>
            The selected pokemon is a special variant
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            Original Variant
          </Text>
          <PokemonCard
            name={pokemonName.split('-')[0]}
            url={`https://pokeapi.co/api/v2/pokemon/${pokemonName.split('-')[0]}`}
            navigation={navigation}
          />
        </View>
      )}
      <ScrollView>
        {!error && !isLoading && (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Text style={styles.id}>{padId(pokemon?.id)}</Text>
              <Image
                source={imageUrl}
                style={styles.image}
                transition={1000}
                allowDownscaling={true}
              />
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
