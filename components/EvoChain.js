import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Platform, SafeAreaView } from 'react-native';
import { getEvoData } from './EvoUtil';

//Will be called with <EvoChain url={"pokemons url"}/>
const EvoChain = ({ species, pokemon}) => {
  const [evoInfo, setEvoInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvoInfo = async () => {
      const evoData = await getEvoData(species.evolution_chain.url);
      setEvoInfo(evoData);

      setLoading(false);
    }

    setLoading(true);
    if (pokemon != null){
      getEvoInfo();
    }
  }, [pokemon]);

  return(
    <View style={styles.evo-container}>
      {!loading ? (evoInfo.map((row, i) => (
        <React.Fragment key={i}>
          <View style={`styles.evo-row ${
            column.length === 2
              ? "two-items"
              : column.length > 2
              ? "more-items"
              : ""
          }`}>

          </View>
        </React.Fragment>

      )))}
    </View>
  )
}

const styles = StyleSheet.create({
  pokeEvo: {
    marginBottom: 0,
    height: 145
  },
  pokeEvoH5: {
    marginBottom: 5,
  },
  evoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  evoLoading: {
    fontSize: 20,
    paddingTop: 25,
    width: 100,
  },
  evoRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  evoArrow: {
    marginRight: 0,
    fontSize: 4,
    color: 'black',
    flex: 1,
    alignItems: 'center',
  },
  evoArrowSpan: {
    marginBottom: 6,
  },
  evoItem: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 15,
    margin: 7,
    cursor: 'pointer',
  },
  evoSprite,
  evoSpriteContainer: {
    width: 100,
    height: 100,
  },
  
});

export default EvoChain; //Memo used to avoid reconstructing multiple times for each individual pokemon in the chain. Will end up using more mem tho
