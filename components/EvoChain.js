import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getEvoData } from './EvoUtil';


const EvoChain = ({ route }) => {
  const { species } = route.params; 
  const [evoInfo, setEvoInfo] = useState([]);

  useEffect(() => {
    const getEvoInfo = async () => {
      setEvoInfo(await getEvoData(species.evolution_chain.url));
    };
    getEvoInfo();
  }, [species]);

  return (
    <View style={styles.pokeEvo}>
      <Text style={styles.text}>Evolution </Text>
      <View style={styles.evoRow}>
        <Image source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoInfo[0]}.png`}} style={styles.evoSprite}/> 
        <Image source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoInfo[1]}.png`}} style={styles.evoSprite}/>
        <Image source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoInfo[2]}.png`}} style={styles.evoSprite}/>
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
  evoContainer: {
    
  },
  evoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  evoRowTwoItems: {
    
  },
  evoRowMoreItems: {
    
  },
  evoArrow: {
    
  },
  evoArrowSpan: {
    
  },
  evoItem: {
    
  },
  evoSpriteContainer: {
    
  },
  evoSprite: {
    width: 100,
    height: 100,
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
