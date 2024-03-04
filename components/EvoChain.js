import { StyleSheet, Text, View, Image } from 'react-native';
import getIdFromUrl from '../lib/get-id-from-url';
import { AntDesign } from '@expo/vector-icons';

const NextImage = ({ chainData, first, parentId }) => {
  if (!chainData) {
    return null;
  }

  return (
    <>
      {!first && <AntDesign name='arrowright' size={15} color='black' />}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(chainData.species.url)}.png`,
          }}
          style={styles.evoSprite}
        />
        <Text
          style={[
            {
              marginTop: -10,
              fontSize: 12,
            },
            parentId == getIdFromUrl(chainData.species.url)
              ? styles.activePkmn
              : null,
          ]}
        >
          {chainData.species.name.toUpperCase()}
        </Text>
      </View>
      <NextImage chainData={chainData.evolves_to[0]} parentId={parentId} />
    </>
  );
};

const EvoChain = ({ chainData, parentId }) => {
  if (!chainData) {
    return null;
  }
  return (
    <View style={styles.pokeEvo}>
      <Text style={styles.text}>Evolution </Text>
      <View style={styles.evoRow}>
        <NextImage chainData={chainData} first={true} parentId={parentId} />
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
    gap: 5,
  },
  activePkmn: {
    fontWeight: 'bold',
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
