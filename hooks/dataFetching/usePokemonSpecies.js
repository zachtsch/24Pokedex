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
          `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
        );
        const data = await res.json();

        const evoChainUrl = data.evolution_chain.url;

        const chainRes = await fetch(evoChainUrl);

        const chainData = await chainRes.json();
        setPokemonSpecies({ ...data, ...chainData });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPokemonSpecies();
  }, [id]);

  return { pokemonSpecies, isLoading, error };
};

export default usePokemonSpecies;
