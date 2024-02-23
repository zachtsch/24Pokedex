import React, { useState, useEffect } from 'react';
import { View, Text, Image,  StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';

const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};
// we will hard code different types exp pokemonid = to test the
const PokemonDetail = ({ pokemonId = 102 }) => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);

  //Can someone please add error handling for this fetch request???

  useEffect(() => {
    const fetchPokemonData = async () => {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemonData = await pokemonResponse.json();
        setPokemon(pokemonData);
    
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        const speciesData = await speciesResponse.json();
        setSpecies(speciesData);
    
        setLoading(false);
    };
      //calling our
    fetchPokemonData();
  }, [pokemonId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

// this is whhere we are fetching the data

  const imageUrl = pokemon?.sprites?.other['official-artwork'].front_default;
  const height = pokemon?.height;
  const weight = pokemon?.weight;
  const types = pokemon?.types.map((typeInfo) => typeInfo.type.name);
  const flavorTextEntry = species?.flavor_text_entries.find((entry) => entry.language.name === 'en');

//we have safe view for protecting the top notches on iphones
//we must have the app scrollable to fit all devices/ ipads tablets ect
// to do -> add navigation to the pokemon page
//todo -> figure out why scroll view and safearea view only work when loaded in app.js
//we need this component to not rely on app.js in any way to be shown ( self contained)

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
        <Text style={styles.id}>#{pokemon?.id}</Text>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.name}>{species?.name.toUpperCase()}</Text>
          <View style={styles.typesContainer}>
          {types.map((type, index) => (
            <View key={index} style={[styles.typeBanner, { backgroundColor: typeColors[type] }]}>
              <Text style={styles.typeText}>{type.toUpperCase()}</Text>
            </View>
          ))}
        </View>
        </View>
        <Text style={styles.stats}>Height: {height / 10} m</Text>
        <Text style={styles.stats}>Weight: {weight / 10} kg</Text>
        <Text style={styles.description}>{flavorTextEntry?.flavor_text}</Text>
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

export default PokemonDetail;

