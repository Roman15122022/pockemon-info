import { useCallback } from 'react';
import type { Pokemon } from '../../pokemon/types/pokemon';
import { useFavoritesStore } from '../store/favoritesStore';

export const useFavoritePokemon = () => {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const isFavorite = useCallback((id: number) => favoriteIds.includes(id), [favoriteIds]);

  const togglePokemonFavorite = (pokemon: Pokemon) => {
    toggleFavorite(pokemon.id);
  };

  return {
    favoriteIds,
    isFavorite,
    togglePokemonFavorite,
  };
};
