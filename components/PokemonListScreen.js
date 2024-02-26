import { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PokemonCard from './PokemonCard';
import usePokedexData from '../hooks/usePokedex';
import SearchBar from './SearchBar';

const PokemonListScreen = () => {
  const { pokedexData, isLoading, error } = usePokedexData();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(pokedexData);
  }, [pokedexData]);

  const navigation = useNavigation();

  const handleSearchQueryChange = (query) => {
    if (query === '') {
      setFilteredData(pokedexData);
    } else {
      const filtered = pokedexData.filter(({ name }) => name.startsWith(query));
      setFilteredData(filtered);
    }
  };

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
      <SearchBar onSearchQueryChange={handleSearchQueryChange} />
      <View
        style={{ height: '100%', marginTop: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        <FlashList
          data={filteredData}
          renderItem={(itemData) => (
            <PokemonCard
              name={itemData.item.name.replace('-', ' ')}
              url={itemData.item.url}
              navigation={navigation}
            />
          )}
          estimatedItemSize={250}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

export default PokemonListScreen;
