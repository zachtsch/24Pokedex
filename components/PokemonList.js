import { FlashList } from '@shopify/flash-list';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const [pokedexData, setPokedexData] = useState();

  useEffect(() => {
    const getPokedexData = async () => {
      const res = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
      );
      const data = await res.json();
      setPokedexData(data.results);
    };

    getPokedexData();
    return () => {
      if (pokedexData) {
        setPokedexData(null);
      }
    };
  }, []);

  return (
    <View
      style={{
        height: 500,
        width: '100%',
      }}
    >
      {pokedexData ? (
        <FlashList
          data={pokedexData}
          renderItem={(itemData) => (
            <PokemonCard name={itemData.item.name} url={itemData.item.url} />
          )}
          estimatedItemSize={250}
          numColumns={2}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default PokemonList;
