import { useCallback, useReducer } from 'react';
import { fetchPokemonByNameOrId } from '../api/pokeApi';
import { POKEMON_MESSAGES } from '../constants/messages';
import type { Pokemon } from '../types/pokemon';
import {
  initialPokemonDetailsState,
  POKEMON_DETAILS_ACTION,
  pokemonDetailsReducer,
} from './pokemonDetailsReducer';

export const usePokemonDetails = () => {
  const [state, dispatch] = useReducer(pokemonDetailsReducer, initialPokemonDetailsState);

  const openDetails = useCallback(async (targetPokemon: Pokemon) => {
    dispatch({ type: POKEMON_DETAILS_ACTION.open });

    try {
      const freshPokemon = await fetchPokemonByNameOrId(targetPokemon.id);
      dispatch({
        type: POKEMON_DETAILS_ACTION.success,
        pokemon: freshPokemon,
      });
    } catch {
      dispatch({
        type: POKEMON_DETAILS_ACTION.error,
        message: POKEMON_MESSAGES.detailsLoadError,
      });
    }
  }, []);

  const closeDetails = () => {
    dispatch({ type: POKEMON_DETAILS_ACTION.close });
  };

  return {
    ...state,
    openDetails,
    closeDetails,
  };
};
