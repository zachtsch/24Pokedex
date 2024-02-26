import { useState, useEffect } from 'react';

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

        const pokedexResults = data.results;

        setPokedexData(pokedexResults);
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
