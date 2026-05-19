import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import {
  EMPTY_COUNT,
  FIRST_PAGE,
  PAGE_STEP,
  SINGLE_RESULT_COUNT,
} from '../../../shared/constants/pokemon';
import { getTotalPages } from '../../../shared/utils/pagination';
import {
  fetchPokemonByNameOrId,
  fetchPokemonByType,
  fetchPokemonListPage,
  fetchPokemonTypes,
} from '../api/pokeApi';
import { POKEMON_MESSAGES } from '../constants/messages';
import type { NamedApiResource, Pokemon } from '../types/pokemon';

type UsePokemonCatalogParams = {
  onPokemonFound: (pokemon: Pokemon) => Promise<void> | void;
};

export const usePokemonCatalog = ({ onPokemonFound }: UsePokemonCatalogParams) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<NamedApiResource[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [page, setPage] = useState(FIRST_PAGE);
  const [totalCount, setTotalCount] = useState(EMPTY_COUNT);
  const [loading, setLoading] = useState(true);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);

  const searchMode = submittedSearch.trim().length > EMPTY_COUNT;
  const totalPages = getTotalPages(totalCount);

  useEffect(() => {
    let active = true;

    const loadTypes = async () => {
      setLoadingTypes(true);
      setTypeError(null);

      try {
        const nextTypes = await fetchPokemonTypes();

        if (active) {
          setTypes(nextTypes);
        }
      } catch {
        if (active) {
          setTypeError(POKEMON_MESSAGES.typesLoadError);
        }
      } finally {
        if (active) {
          setLoadingTypes(false);
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
      setLoading(true);
      setListError(null);

      try {
        const result = selectedType
          ? await fetchPokemonByType(selectedType, page)
          : await fetchPokemonListPage(page);

        if (active) {
          setPokemon(result.items);
          setTotalCount(result.totalCount);
        }
      } catch {
        if (active) {
          setPokemon([]);
          setTotalCount(EMPTY_COUNT);
          setListError(POKEMON_MESSAGES.listLoadError);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPokemon();

    return () => {
      active = false;
    };
  }, [page, searchMode, selectedType]);

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchValue.trim().toLowerCase();

    if (!query) {
      setSubmittedSearch('');
      setSelectedType('');
      setPage(FIRST_PAGE);
      setListError(null);
      return;
    }

    setLoading(true);
    setListError(null);
    setPage(FIRST_PAGE);
    setSelectedType('');
    setSubmittedSearch(query);

    try {
      const foundPokemon = await fetchPokemonByNameOrId(query);
      setPokemon([foundPokemon]);
      setTotalCount(SINGLE_RESULT_COUNT);
      await onPokemonFound(foundPokemon);
    } catch {
      setPokemon([]);
      setTotalCount(EMPTY_COUNT);
      setListError(POKEMON_MESSAGES.notFound(query));
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setSearchValue('');
    setSubmittedSearch('');
    setListError(null);
    setPage(FIRST_PAGE);
  };

  const handleReset = () => {
    setSearchValue('');
    setSubmittedSearch('');
    setSelectedType('');
    setListError(null);
    setPage(FIRST_PAGE);
  };

  const handlePrevious = () => {
    setPage((currentPage) => Math.max(currentPage - PAGE_STEP, FIRST_PAGE));
  };

  const handleNext = () => {
    setPage((currentPage) => Math.min(currentPage + PAGE_STEP, totalPages || currentPage));
  };

  return {
    pokemon,
    types,
    searchValue,
    selectedType,
    page,
    totalCount,
    loading,
    loadingTypes,
    listError,
    typeError,
    searchMode,
    setSearchValue,
    handleSearchSubmit,
    handleTypeChange,
    handleReset,
    handlePrevious,
    handleNext,
  };
};
