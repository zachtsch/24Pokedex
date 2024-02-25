import { FlashList } from '@shopify/flash-list';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonCard from './PokemonCard';

const PokemonListScreen = ({ searchQuery }) => {
  const [pokedexData, setPokedexData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

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
    <SafeAreaView
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <FlashList
        data={pokedexData}
        renderItem={(itemData) => (
          <PokemonCard
            name={itemData.item.name}
            url={itemData.item.url}
            navigation={navigation}
          />
        )}
        estimatedItemSize={250}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default PokemonListScreen;
