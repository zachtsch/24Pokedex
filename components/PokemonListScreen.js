import { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PokemonCard from './PokemonCard';
import usePokedexData from '../hooks/dataFetching/usePokedex';
import SearchBar from './SearchBar';
import SkeletonCard from './ui/SkeletonCard';

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
      const filtered = pokedexData.filter(
        ({ name, id }) => name.startsWith(query) || id.startsWith(query),
      );
      setFilteredData(filtered);
    }
  };

  return (
    <SafeAreaView
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <SearchBar onSearchQueryChange={handleSearchQueryChange} />
      {error && <Text>Error: {error}</Text>}
      {isLoading && Array(20).map(() => <SkeletonCard isLoading={isLoading} />)}
      {pokedexData && (
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
      )}
    </SafeAreaView>
  );
};

export default PokemonListScreen;
