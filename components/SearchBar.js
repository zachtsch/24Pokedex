import { View, TextInput } from 'react-native';
import { Card } from 'react-native-paper';

import { useState } from 'react';

const SearchBar = ({ onSearchQueryChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
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
          value={searchQuery}
          onChangeText={(query) => {
            setSearchQuery(query);
            onSearchQueryChange(query.trim().toLowerCase());
          }}
        />
      </View>
    </Card>
  );
};

export default SearchBar;
