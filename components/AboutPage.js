import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
// we will hard code different types exp pokemonid = to test the
const PokemonDetail = ({ pokemonId = 4 }) => {
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
  const types = pokemon?.types.map((typeInfo) => typeInfo.type.name).join(', ');
  const flavorTextEntry = species?.flavor_text_entries.find((entry) => entry.language.name === 'en');
// to do -> add navigation to the pokemon page
//todo -> figure out why scroll view and safearea view only work when loaded in app.js
//we need this component to not rely on app.js in any way to be shown ( self contained)
  return (

//we have safe view for protecting the top notches on iphones
 //we must have the app scrollable to fit all devices/ ipads tablets ect

    <SafeAreaView style={styles.safeArea}>
 
      <ScrollView style={styles.container}>


        <Image source={{ uri: imageUrl }} />
        <Text>{species?.name.toUpperCase()} #{pokemon?.id}</Text>
        {types && <Text style={styles.type}>Type: {types}</Text>}
        <Text>Height: {height / 10} m</Text>
        <Text >Weight: {weight / 10} kg</Text>
        <Text> HIIIIIIIIIII</Text>
        <Text>{flavorTextEntry?.flavor_text}</Text>
        {/* Navigation here*/}
      </ScrollView>
    </SafeAreaView>
  );
};
//todo -> Add stylin
const styles = StyleSheet.create({
  safeArea: {
  
  },
 

});

export default PokemonDetail;