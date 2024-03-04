import { useState, useEffect, useRef } from 'react';

const usePokemon = (id) => {
  const [pokemonData, setPokemonData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const currentIdRef = useRef(id);

  useEffect(() => {
    const getPokemonData = async () => {
      if (id !== currentIdRef.current) {
        currentIdRef.current = id;
      }
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);

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
  }, [id]);

  return { pokemonData, isLoading, error };
};

export default usePokemon;
