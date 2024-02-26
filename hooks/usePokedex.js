import { useState, useEffect } from 'react';
import getIdFromUrl from '../lib/get-id-from-url';

const usePokedex = () => {
  const [pokedexData, setPokedexData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getPokedexData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
        );
        const data = await res.json();
        const idMappedData = data.results.map((pokemonInfo) => {
          return {
            ...pokemonInfo,
            id: getIdFromUrl(pokemonInfo.url),
          };
        });
        setPokedexData(idMappedData);
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

  return { pokedexData, isLoading, error };
};

export default usePokedex;
