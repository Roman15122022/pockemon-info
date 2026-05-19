import type { FormEvent } from 'react';
import { useCallback, useEffect, useReducer } from 'react';
import { EMPTY_COUNT } from '../../../shared/constants/pokemon';
import { getTotalPages } from '../../../shared/utils/pagination';
import {
  fetchPokemonByNameOrId,
  fetchPokemonByType,
  fetchPokemonListPage,
  fetchPokemonTypes,
} from '../api/pokeApi';
import { POKEMON_MESSAGES } from '../constants/messages';
import type { Pokemon } from '../types/pokemon';
import {
  initialPokemonCatalogState,
  pokemonCatalogActions,
  pokemonCatalogReducer,
} from './pokemonCatalogReducer';

type UsePokemonCatalogParams = {
  onPokemonFound: (pokemon: Pokemon) => Promise<void> | void;
};

export const usePokemonCatalog = ({ onPokemonFound }: UsePokemonCatalogParams) => {
  const [state, dispatch] = useReducer(pokemonCatalogReducer, initialPokemonCatalogState);
  const searchMode = state.submittedSearch.trim().length > EMPTY_COUNT;
  const totalPages = getTotalPages(state.totalCount);

  useEffect(() => {
    let active = true;

    const loadTypes = async () => {
      dispatch(pokemonCatalogActions.startTypesLoading());

      try {
        const nextTypes = await fetchPokemonTypes();

        if (active) {
          dispatch(pokemonCatalogActions.loadTypesSuccess(nextTypes));
        }
      } catch {
        if (active) {
          dispatch(pokemonCatalogActions.loadTypesError(POKEMON_MESSAGES.typesLoadError));
        }
      }
    };

    loadTypes();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (searchMode) {
      return;
    }

    let active = true;

    const loadPokemon = async () => {
      dispatch(pokemonCatalogActions.startListLoading());

      try {
        const result = state.selectedType
          ? await fetchPokemonByType(state.selectedType, state.page)
          : await fetchPokemonListPage(state.page);

        if (active) {
          dispatch(pokemonCatalogActions.loadListSuccess(result.items, result.totalCount));
        }
      } catch {
        if (active) {
          dispatch(pokemonCatalogActions.loadListError(POKEMON_MESSAGES.listLoadError));
        }
      }
    };

    loadPokemon();

    return () => {
      active = false;
    };
  }, [searchMode, state.page, state.selectedType]);

  const setSearchValue = useCallback((value: string) => {
    dispatch(pokemonCatalogActions.setSearchValue(value));
  }, []);

  const handleSearchSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const query = state.searchValue.trim().toLowerCase();

      if (!query) {
        dispatch(pokemonCatalogActions.submitEmptySearch());
        return;
      }

      dispatch(pokemonCatalogActions.startSearch(query));

      let foundPokemon: Pokemon;
      try {
        foundPokemon = await fetchPokemonByNameOrId(query);
      } catch {
        dispatch(pokemonCatalogActions.searchError(POKEMON_MESSAGES.notFound(query)));
        return;
      }

      dispatch(pokemonCatalogActions.searchSuccess(foundPokemon));
      await onPokemonFound(foundPokemon);
    },
    [onPokemonFound, state.searchValue],
  );

  const handleTypeChange = useCallback((type: string) => {
    dispatch(pokemonCatalogActions.changeType(type));
  }, []);

  const handleReset = useCallback(() => {
    dispatch(pokemonCatalogActions.reset());
  }, []);

  const handlePrevious = useCallback(() => {
    dispatch(pokemonCatalogActions.goPrevious());
  }, []);

  const handleNext = useCallback(() => {
    dispatch(pokemonCatalogActions.goNext(totalPages));
  }, [totalPages]);

  return {
    ...state,
    searchMode,
    setSearchValue,
    handleSearchSubmit,
    handleTypeChange,
    handleReset,
    handlePrevious,
    handleNext,
  };
};
