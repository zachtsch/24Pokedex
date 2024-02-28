import { useState, useEffect } from 'react';

const usePokemonSpecies = (id) => {
  const [pokemonSpecies, setPokemonSpecies] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getPokemonSpecies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`,
        );
        const data = await res.json();
        setPokemonSpecies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPokemonSpecies();
  }, [id]);

  useEffect(() => {
    const evoChainUpdate = async () => {
      if (!pokemonSpecies) {
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/evolution-chain/${id}/`,
        );
        const data = await res.json();
        setPokemonSpecies((prevState) => {
          return {
            ...prevState,
            ...data,
          };
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    evoChainUpdate();
  }, [id]);
  return { pokemonSpecies, isLoading, error };
};

export default usePokemonSpecies;
