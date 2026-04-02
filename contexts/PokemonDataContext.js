import { createContext, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import getIdFromUrl from '../lib/get-id-from-url';

export const PokemonDataContext = createContext({
  pokedexData: [],
  isLoading: true,
  error: null,
});

export const PokemonDataProvider = ({ children }) => {
  const [pokemonData, setPokemonData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const getPokemonData = async () => {
      try {
        const res = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
        );
        const data = await res.json();
        const idMappedData = data.results.map((item) => {
          return {
            ...item,
            id: getIdFromUrl(item.url),
          };
        });

        setPokemonData(idMappedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getPokemonData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const evoChainUpdate = async (pkmnData) => {
      if (!pkmnData) {
        return;
      }

      try {
      } catch (err) {
      } finally {
      }
    };
    evoChainUpdate(pokemonData);
    SplashScreen.hideAsync();
  }, [pokemonData]);

  return (
    <PokemonDataContext.Provider value={{ pokemonData, isLoading, error }}>
      {children}
    </PokemonDataContext.Provider>
  );
};
