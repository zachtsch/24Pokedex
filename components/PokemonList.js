import { FlashList } from '@shopify/flash-list';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
const PokemonList = ({ searchQuery }) => {
  const [pokedexData, setPokedexData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPokedexData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
        );
        const data = await res.json();
        setPokedexData(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPokedexData();
    return () => {
      if (pokedexData) {
        setPokedexData(null);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <FlashList
        data={pokedexData}
        renderItem={(itemData) => (
          <PokemonCard name={itemData.item.name} url={itemData.item.url} />
        )}
        estimatedItemSize={250}
        numColumns={2}
      />
    </View>
  );
};

export default PokemonList;
