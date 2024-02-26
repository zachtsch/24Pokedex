import { FlashList } from '@shopify/flash-list';
import { View, Text, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';

import PokemonCard from './PokemonCard';

const PokemonListScreen = () => {
  const [pokedexData, setPokedexData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
      <Card>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            margin: 2,
            padding: 2,
          }}
        >
          <TextInput
            placeholder='Search'
            onChangeText={(query) => {
              setSearchQuery(query.trim().toLowerCase());
            }}
          />
        </View>
      </Card>
      <View
        style={{ height: '100%', marginTop: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        <FlashList
          data={
            searchQuery === ''
              ? pokedexData
              : pokedexData.filter(({ name }) => name.startsWith(searchQuery))
          }
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
