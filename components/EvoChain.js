import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { getEvoData } from './EvoUtil';
import usePokemon from '../hooks/dataFetching/usePokemon';
import { useNavigation } from '@react-navigation/native';

const EvoChain = ({ species }) => {
  const [evoInfo, setEvoInfo] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getEvoInfo = async () => {
      const temp = await getEvoData(species.evolution_chain.url)
      console.log(temp);
      setEvoInfo(temp);
    };
    getEvoInfo();
  }, [species]);

  return (
    <View style={styles.pokeEvo}>
      <Text style={styles.text}>Evolution </Text>
      <View style={styles.evoRow}>
        {evoInfo.map((child, depth) => (
          <React.Fragment key={depth}>
            {child.map((item, index) => (
              <TouchableOpacity style={styles.evoSpriteContainer} onPress={() => {navigation.navigate('PokemonDetail', {pokemonData: usePokemon(item)})}}>
                <Image key={item} style={styles.evoSprite} onClick={() => {}} source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${child[index]}.png`}}/>
              </TouchableOpacity>
            ))}
            {depth !== evoInfo.length - 1 && ( <Text style={styles.text}>{`->`}</Text> )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pokeEvo: {
    marginBottom: 0,
    height: 145,
    alignItems: 'center',
  },
  evoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  evoSprite: {
    width: 100,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
  },
  evoSpriteContainer: {
    width: 120,
    height: 120,
    margin: 5,
    backgroundColor: 'white',
    padding: 5,
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 10,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});

export default EvoChain; 
