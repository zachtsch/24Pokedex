import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import padId from '../lib/pad-id';
import getBackgroundColor from '../lib/get-background-color';

const PokemonCard = ({ name, url }) => {
  const [pokemonData, setPokemonData] = useState();

  useEffect(() => {
    const getPokemonData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setPokemonData(data);
    };

    getPokemonData();
    return () => {
      if (pokemonData) {
        setPokemonData(null);
      }
    };
  }, [name, url]);

  return (
    <View style={styles.cardContainer}>
      {pokemonData ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.pokemonImage}
            source={{
              uri: pokemonData.sprites.other['official-artwork'].front_default,
            }}
          />
          <View style={styles.idContainer}>
            <Text style={{ fontSize: 12, color: 'grey', fontWeight: 'bold' }}>
              {padId(pokemonData.id)}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <View style={styles.imageContainer}></View>
        </View>
      )}
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
          {pokemonData &&
            pokemonData.types.map((value) => (
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
    </View>
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
