import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import PokemonListScreen from './components/PokemonListScreen';
import PokemonDetailScreen from './components/PokemonDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <Stack.Navigator>
        <Stack.Screen
          name='PokemonList'
          options={{ title: '', headerShown: false }}
          component={PokemonListScreen}
        />
        <Stack.Screen
          name='PokemonDetail'
          options={{ headerTransparent: true }}
          component={PokemonDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
