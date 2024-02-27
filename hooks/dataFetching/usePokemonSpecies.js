import { useState, useEffect } from 'react';

const usePokemonSpecies = (url) => {
  const [pokemonSpecies, setPokemonSpecies] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getPokemonSpecies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        const data = await res.json();
        setPokemonSpecies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPokemonSpecies();
  }, [url]);

  return { pokemonSpecies, isLoading, error };
};

export default usePokemonSpecies;
