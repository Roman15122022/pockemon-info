import {
  EMPTY_COUNT,
  FIRST_PAGE,
  PAGE_STEP,
  SINGLE_RESULT_COUNT,
} from '../../../shared/constants/pokemon';
import type { NamedApiResource, Pokemon } from '../types/pokemon';

const EMPTY_FIELD_VALUE = '';

export type PokemonCatalogState = {
  pokemon: Pokemon[];
  types: NamedApiResource[];
  searchValue: string;
  submittedSearch: string;
  selectedType: string;
  page: number;
  totalCount: number;
  loading: boolean;
  loadingTypes: boolean;
  listError: string | null;
  typeError: string | null;
};

export const initialPokemonCatalogState: PokemonCatalogState = {
  pokemon: [],
  types: [],
  searchValue: EMPTY_FIELD_VALUE,
  submittedSearch: EMPTY_FIELD_VALUE,
  selectedType: EMPTY_FIELD_VALUE,
  page: FIRST_PAGE,
  totalCount: EMPTY_COUNT,
  loading: true,
  loadingTypes: true,
  listError: null,
  typeError: null,
};

export const pokemonCatalogActions = {
  setSearchValue: (value: string) =>
    ({
      type: 'setSearchValue',
      value,
    }) as const,
  startTypesLoading: () =>
    ({
      type: 'startTypesLoading',
    }) as const,
  loadTypesSuccess: (types: NamedApiResource[]) =>
    ({
      type: 'loadTypesSuccess',
      types,
    }) as const,
  loadTypesError: (message: string) =>
    ({
      type: 'loadTypesError',
      message,
    }) as const,
  startListLoading: () =>
    ({
      type: 'startListLoading',
    }) as const,
  loadListSuccess: (pokemon: Pokemon[], totalCount: number) =>
    ({
      type: 'loadListSuccess',
      pokemon,
      totalCount,
    }) as const,
  loadListError: (message: string) =>
    ({
      type: 'loadListError',
      message,
    }) as const,
  submitEmptySearch: () =>
    ({
      type: 'submitEmptySearch',
    }) as const,
  startSearch: (query: string) =>
    ({
      type: 'startSearch',
      query,
    }) as const,
  searchSuccess: (pokemon: Pokemon) =>
    ({
      type: 'searchSuccess',
      pokemon,
    }) as const,
  searchError: (message: string) =>
    ({
      type: 'searchError',
      message,
    }) as const,
  changeType: (selectedType: string) =>
    ({
      type: 'changeType',
      selectedType,
    }) as const,
  reset: () =>
    ({
      type: 'reset',
    }) as const,
  goPrevious: () =>
    ({
      type: 'goPrevious',
    }) as const,
  goNext: (totalPages: number) =>
    ({
      type: 'goNext',
      totalPages,
    }) as const,
} as const;

type ValueOf<TValue> = TValue[keyof TValue];

export type PokemonCatalogAction = ReturnType<ValueOf<typeof pokemonCatalogActions>>;

export const pokemonCatalogReducer = (
  state: PokemonCatalogState,
  action: PokemonCatalogAction,
): PokemonCatalogState => {
  switch (action.type) {
    case 'setSearchValue':
      return {
        ...state,
        searchValue: action.value,
      };

    case 'startTypesLoading':
      return {
        ...state,
        loadingTypes: true,
        typeError: null,
      };

    case 'loadTypesSuccess':
      return {
        ...state,
        types: action.types,
        loadingTypes: false,
      };

    case 'loadTypesError':
      return {
        ...state,
        typeError: action.message,
        loadingTypes: false,
      };

    case 'startListLoading':
      return {
        ...state,
        loading: true,
        listError: null,
      };

    case 'loadListSuccess':
      return {
        ...state,
        pokemon: action.pokemon,
        totalCount: action.totalCount,
        loading: false,
      };

    case 'loadListError':
      return {
        ...state,
        pokemon: [],
        totalCount: EMPTY_COUNT,
        listError: action.message,
        loading: false,
      };

    case 'submitEmptySearch':
      return {
        ...state,
        submittedSearch: EMPTY_FIELD_VALUE,
        selectedType: EMPTY_FIELD_VALUE,
        page: FIRST_PAGE,
        listError: null,
      };

    case 'startSearch':
      return {
        ...state,
        loading: true,
        listError: null,
        page: FIRST_PAGE,
        selectedType: EMPTY_FIELD_VALUE,
        submittedSearch: action.query,
      };

    case 'searchSuccess':
      return {
        ...state,
        pokemon: [action.pokemon],
        totalCount: SINGLE_RESULT_COUNT,
        loading: false,
      };

    case 'searchError':
      return {
        ...state,
        pokemon: [],
        totalCount: EMPTY_COUNT,
        listError: action.message,
        loading: false,
      };

    case 'changeType':
      return {
        ...state,
        selectedType: action.selectedType,
        searchValue: EMPTY_FIELD_VALUE,
        submittedSearch: EMPTY_FIELD_VALUE,
        listError: null,
        page: FIRST_PAGE,
      };

    case 'reset':
      return {
        ...state,
        searchValue: EMPTY_FIELD_VALUE,
        submittedSearch: EMPTY_FIELD_VALUE,
        selectedType: EMPTY_FIELD_VALUE,
        listError: null,
        page: FIRST_PAGE,
      };

    case 'goPrevious':
      return {
        ...state,
        page: Math.max(state.page - PAGE_STEP, FIRST_PAGE),
      };

    case 'goNext':
      return {
        ...state,
        page: Math.min(state.page + PAGE_STEP, action.totalPages || state.page),
      };
  }
};
