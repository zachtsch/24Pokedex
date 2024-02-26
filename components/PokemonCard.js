import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Image } from 'expo-image';

import SkeletonCard from './ui/SkeletonCard';

import getBackgroundColor from '../lib/get-background-color';
import padId from '../lib/pad-id';

const PokemonCard = ({ name, url, navigation }) => {
  const [pokemonData, setPokemonData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const currentUrlRef = useRef(url);

  useEffect(() => {
    const getPokemonData = async () => {
      setIsLoading(true);
      setError(null);
      if (url !== currentUrlRef.current) {
        currentUrlRef.current = url;
      }
      try {
        const res = await fetch(url);
        const data = await res.json();
        setPokemonData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPokemonData();
    return () => {
      if (pokemonData) {
        setPokemonData(null);
      }
    };
  }, [url]);

  return (
    <>
      {error && <Text>Error: {error}</Text>}
      {isLoading && <SkeletonCard />}
      {!isLoading && !error && pokemonData && (
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => {
            navigation.navigate('PokemonDetail', {
              pokemonId: pokemonData.id,
              pokemonName: name,
              pokemonUrl: url,
            });
          }}
        >
          <View style={styles.imageContainer}>
            {isLoading || currentUrlRef.current !== url ? (
              <ActivityIndicator size='large' />
            ) : (
              <Image
                source={
                  pokemonData.sprites.other['official-artwork'].front_default
                }
                style={styles.pokemonImage}
                allowDownscaling={true}
                alt={name}
                transition={500}
              />
            )}
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
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 250,
    backgroundColor: 'white',
    padding: 5,
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 2,
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 10,
  },
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
