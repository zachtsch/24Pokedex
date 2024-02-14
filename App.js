import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, Image } from 'react-native';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='Pokemon' component={PokemonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const PokemonScreen = ({ navigation, route }) => {
  const [url, setURL] = useState('');
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
      .then((res) => res.json())
      .then((r) => {
        console.log(r.sprites.other['official-artwork'].front_shiny);
        setURL(r.sprites.other['official-artwork'].front_shiny);
      });
  }, []);
  return !url ? (
    <></>
  ) : (
    <Image source={{ uri: url }} style={{ width: 300, height: 300 }} />
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
      />
      <Button
        title='Go to Pokemon profile'
        onPress={() => navigation.navigate('Pokemon', { id: 3 })}
      />
    </>
  );
};
const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

export default MyStack;
