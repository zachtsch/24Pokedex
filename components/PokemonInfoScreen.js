import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import { Image } from 'expo-image';

import getBackgroundColor from '../lib/get-background-color';
import padId from '../lib/pad-id';
import usePokemonSpecies from '../hooks/dataFetching/usePokemonSpecies';
import { GLOBAL_LANGUAGE } from '../lib/constants';

const PokemonInfoScreen = ({ route }) => {
  const { pokemonData } = route.params;
  const { pokemonSpecies, isLoading, error } = usePokemonSpecies(
    pokemonData.id,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Text style={styles.id}>{padId(pokemonData.id)}</Text>
            <Image
              source={
                pokemonData.sprites.other['official-artwork'].front_default
              }
              style={styles.image}
              transition={500}
              allowDownscaling={true}
            />
            <Text style={styles.name}>{pokemonData.name.toUpperCase()}</Text>
            <View style={styles.typesContainer}>
              {pokemonData.types.map((typeInfo, index) => (
                <View
                  key={index}
                  style={[
                    styles.typeBanner,
                    {
                      backgroundColor: getBackgroundColor(typeInfo.type.name),
                    },
                  ]}
                >
                  <Text style={styles.typeText}>
                    {typeInfo.type.name.toUpperCase()}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={styles.stats}>
              Height: {pokemonData.height / 10} m
            </Text>
            <Text style={styles.stats}>
              Weight: {pokemonData.weight / 10} kg
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 150,
              }}
            >
              {error && <Text>Error : {error}</Text>}
              {isLoading && <Text>Loading...</Text>}
              {!error && !isLoading && pokemonSpecies && (
                <Text
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    width: '100%',
                  }}
                >
                  {pokemonSpecies &&
                    pokemonSpecies.flavor_text_entries.filter(
                      ({ language }) => language.name === GLOBAL_LANGUAGE,
                    )[0].flavor_text}
                </Text>
              )}
            </View>
          </View>
        </View>
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

export default PokemonInfoScreen;
