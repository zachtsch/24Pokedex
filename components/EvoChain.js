import { StyleSheet, Text, View, Image } from 'react-native';
import getIdFromUrl from '../lib/get-id-from-url';

const NextImage = ({ chainData }) => {
  if (!chainData) {
    return null;
  }
  return (
    <>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(chainData.species.url)}.png`,
        }}
        style={styles.evoSprite}
      />
      <NextImage chainData={chainData.evolves_to[0]} />
    </>
  );
};

const EvoChain = ({ chainData }) => {
  if (!chainData) {
    return null;
  }

  return (
    <View style={styles.pokeEvo}>
      <Text style={styles.text}>Evolution </Text>
      <View style={styles.evoRow}>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(chainData.species.url)}.png`,
          }}
          style={styles.evoSprite}
        />
        <NextImage chainData={chainData.evolves_to[0]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pokeEvo: {
    height: 145,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  evoContainer: {},
  evoRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  evoRowTwoItems: {},
  evoRowMoreItems: {},
  evoArrow: {},
  evoArrowSpan: {},
  evoItem: {},
  evoSpriteContainer: {},
  evoSprite: {
    width: 75,
    height: 75,
    margin: 5,
    resizeMode: 'contain',
  },
  text: {
    alignItems: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});

export default EvoChain;
