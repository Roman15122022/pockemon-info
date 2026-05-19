import type { Pokemon } from '../types/pokemon';

export const POKEMON_DETAILS_ACTION = {
  open: 'open',
  success: 'success',
  error: 'error',
  close: 'close',
} as const;

export type PokemonDetailsState = {
  drawerOpen: boolean;
  detailsPokemon: Pokemon | null;
  detailsLoading: boolean;
  detailsError: string | null;
};

export type PokemonDetailsAction =
  | { type: typeof POKEMON_DETAILS_ACTION.open }
  | { type: typeof POKEMON_DETAILS_ACTION.success; pokemon: Pokemon }
  | { type: typeof POKEMON_DETAILS_ACTION.error; message: string }
  | { type: typeof POKEMON_DETAILS_ACTION.close };

export const initialPokemonDetailsState: PokemonDetailsState = {
  drawerOpen: false,
  detailsPokemon: null,
  detailsLoading: false,
  detailsError: null,
};

export const pokemonDetailsReducer = (
  state: PokemonDetailsState,
  action: PokemonDetailsAction,
): PokemonDetailsState => {
  switch (action.type) {
    case POKEMON_DETAILS_ACTION.open:
      return {
        drawerOpen: true,
        detailsPokemon: null,
        detailsLoading: true,
        detailsError: null,
      };

    case POKEMON_DETAILS_ACTION.success:
      return {
        ...state,
        detailsPokemon: action.pokemon,
        detailsLoading: false,
      };

    case POKEMON_DETAILS_ACTION.error:
      return {
        ...state,
        detailsError: action.message,
        detailsLoading: false,
      };

    case POKEMON_DETAILS_ACTION.close:
      return {
        ...state,
        drawerOpen: false,
      };
  }
};
