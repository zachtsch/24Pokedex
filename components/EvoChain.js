import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getEvoData } from './EvoUtil';
import usePokemon from '../hooks/dataFetching/usePokemon';
import { useNavigation } from '@react-navigation/native';
import EvoCard from './ui/EvoCard';

const EvoChain = ({ species }) => {
  const [evoInfo, setEvoInfo] = useState([]);
  const cardInfo = [[],[],[]];
  const navigation = useNavigation();

  useEffect(() => {
    const getEvoInfo = async () => {
      const temp = await getEvoData(species.evolution_chain.url)
      setEvoInfo(temp);
    };

    getEvoInfo();

    const getCardInfo = async () => {
      evoInfo.forEach(async (child) => {
        const layerInfo = [];
        child.forEach(async (id) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
          const data = await res.json();
          layerInfo.push(data)
        })
        cardInfo.push(layerInfo)
      });
      console.log(cardInfo)
    };

    getCardInfo();
  }, [species]);

  return (
    <View style={styles.pokeEvo}>
      <Text style={styles.text}>Evolution </Text>  
      <View style={styles.evoRow}>
        {evoInfo.map((child, depth) => (
          <React.Fragment key={depth}>
            {child.map((item, index) => (
              <EvoCard onPress={() => {navigation.navigate('PokemonDetail', {pokemonData: cardInfo[depth][index]})}}>
                <Image key={item} style={styles.evoSprite} source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${child[index]}.png`}}/>
              </EvoCard>
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
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});

export default EvoChain; 
