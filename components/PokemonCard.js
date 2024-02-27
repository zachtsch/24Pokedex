import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import PressableCard from './ui/PressableCard';
import SkeletonCard from './ui/SkeletonCard';

import getBackgroundColor from '../lib/get-background-color';
import padId from '../lib/pad-id';

import usePokemon from '../hooks/usePokemon';

const PokemonCard = ({ name, url, navigation }) => {
  const { pokemonData, isLoading, error } = usePokemon(url);

  return (
    <>
      {error && <Text>Error: {error}</Text>}
      {isLoading && <SkeletonCard isLoading={isLoading} />}
      {!isLoading && !error && pokemonData && (
        <PressableCard
          onPress={() => {
            navigation.navigate('PokemonDetail', {
              pokemonId: pokemonData.id,
              pokemonName: name,
              pokemonUrl: url,
            });
          }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={
                pokemonData.sprites.other['official-artwork'].front_default
              }
              style={styles.pokemonImage}
              allowDownscaling={true}
              alt={name}
              transition={500}
            />
            <View style={styles.idContainer}>
              <Text style={{ fontSize: 12, color: 'grey', fontWeight: 'bold' }}>
                {padId(pokemonData.id)}
              </Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.pokemonName}>{name}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: 4,
                gap: 5,
                flexWrap: 'wrap',
              }}
            >
              {pokemonData.types.map((value) => (
                <View
                  key={value.type.name}
                  style={{
                    backgroundColor: getBackgroundColor(value.type.name),
                    borderRadius: 7,
                    borderWidth: 2,
                    borderColor: getBackgroundColor(value.type.name),
                  }}
                >
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      padding: 2,
                      color: 'white',
                    }}
                  >
                    {value.type.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </PressableCard>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 2,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  idContainer: {
    position: 'absolute',
    bottom: -7,
    right: 0,
    paddingRight: 4,
  },
  pokemonName: {
    fontSize: 20,
    paddingRight: 4,
    textAlign: 'right',
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  pokemonImage: {
    width: 145,
    height: 145,
  },
});

export default PokemonCard;
