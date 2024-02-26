import { useState, useEffect, useRef } from 'react';

const usePokemon = (url) => {
  const [pokemonData, setPokemonData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const currentUrlRef = useRef(url);

  useEffect(() => {
    const getPokemonData = async () => {
      if (url !== currentUrlRef.current) {
        currentUrlRef.current = url;
      }
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        const data = await res.json();
        setPokemonData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPokemonData();
    return () => {
      if (pokemonData) {
        setPokemonData(null);
      }
    };
  }, [url]);

  return { pokemonData, isLoading, error, currentUrlRef };
};

export default usePokemon;
