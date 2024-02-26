import { useState } from 'react';
import { Card } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { View, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PokemonCard from './PokemonCard';
import usePokedexData from '../hooks/usePokedex';

const PokemonListScreen = () => {
  const { pokedexData, isLoading, error } = usePokedexData();
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation();

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
