import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    fontWeight: 'bold',
  },
});

const ListElement = ({ item }) => {
  const [i, setI] = useState(0);
  return (
    <TouchableOpacity onPress={() => setI(i + 1)}>
      <Text style={{ ...styles.item, color: i % 2 == 0 ? 'green' : 'red' }}>
        {i} {item.key}
      </Text>
    </TouchableOpacity>
  );
};

const Timer = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    let id = setInterval(() => setTime(time + 1), 10);

    return () => clearInterval(id);
  }, [time]);

  return (
    <>
      <Text></Text>
      <Text style={{ color: time % 2 == 0 ? 'red' : 'green' }}>{time}</Text>
    </>
  );
};
const FlatListBasics = () => {
  const [i, setI] = useState(0);
  return (
    <View style={styles.container}>
      <Timer />
      <FlatList
        data={[
          { key: 'Devin' },
          { key: 'Dan' },
          { key: 'Dominic' },
          { key: 'Jackson' },
          { key: 'James' },
          { key: 'Joel' },
          { key: 'John' },
          { key: 'Jillian' },
          { key: 'Jimmy' },
          { key: 'Julie' },
        ]}
        renderItem={({ item, index }) => <ListElement item={item} />}
      />
    </View>
  );
};

export default FlatListBasics;
