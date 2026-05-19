import { useCallback, useState } from 'react';
import { fetchPokemonByNameOrId } from '../api/pokeApi';
import { POKEMON_MESSAGES } from '../constants/messages';
import type { Pokemon } from '../types/pokemon';

export const usePokemonDetails = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsPokemon, setDetailsPokemon] = useState<Pokemon | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const openDetails = useCallback(async (targetPokemon: Pokemon) => {
    setDrawerOpen(true);
    setDetailsPokemon(null);
    setDetailsError(null);
    setDetailsLoading(true);

    try {
      const freshPokemon = await fetchPokemonByNameOrId(targetPokemon.id);
      setDetailsPokemon(freshPokemon);
    } catch {
      setDetailsError(POKEMON_MESSAGES.detailsLoadError);
    } finally {
      setDetailsLoading(false);
    }
  }, []);

  const closeDetails = () => {
    setDrawerOpen(false);
  };

  return {
    drawerOpen,
    detailsPokemon,
    detailsLoading,
    detailsError,
    openDetails,
    closeDetails,
  };
};
