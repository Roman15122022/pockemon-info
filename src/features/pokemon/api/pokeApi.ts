import axios from 'axios';
import { POKE_API_BASE_URL, API_TIMEOUT_MS } from '../../../shared/constants/api';
import {
  EXCLUDED_POKEMON_TYPES,
  POKEMON_PAGE_SIZE,
} from '../../../shared/constants/pokemon';
import { getPageOffset } from '../../../shared/utils/pagination';
import type {
  NamedApiResource,
  PokeApiListResponse,
  Pokemon,
  PokemonPage,
  PokemonTypeResponse,
} from '../types/pokemon';

const api = axios.create({
  baseURL: POKE_API_BASE_URL,
  timeout: API_TIMEOUT_MS,
});

const fetchPokemonBatch = async (resources: NamedApiResource[]) => {
  return Promise.all(resources.map((resource) => fetchPokemonByNameOrId(resource.name)));
};

export const fetchPokemonListPage = async (page: number): Promise<PokemonPage> => {
  const { data } = await api.get<PokeApiListResponse<NamedApiResource>>('/pokemon', {
    params: {
      limit: POKEMON_PAGE_SIZE,
      offset: getPageOffset(page),
    },
  });

  return {
    items: await fetchPokemonBatch(data.results),
    totalCount: data.count,
  };
};

export const fetchPokemonByNameOrId = async (nameOrId: string | number): Promise<Pokemon> => {
  const value = String(nameOrId).trim().toLowerCase();
  const { data } = await api.get<Pokemon>(`/pokemon/${encodeURIComponent(value)}`);

  return data;
};

export const fetchPokemonTypes = async (): Promise<NamedApiResource[]> => {
  const { data } = await api.get<PokeApiListResponse<NamedApiResource>>('/type');

  return data.results
    .filter((type) => !EXCLUDED_POKEMON_TYPES.has(type.name))
    .sort((first, second) => first.name.localeCompare(second.name));
};

export const fetchPokemonByType = async (type: string, page: number): Promise<PokemonPage> => {
  const { data } = await api.get<PokemonTypeResponse>(`/type/${encodeURIComponent(type)}`);
  const start = getPageOffset(page);
  const pageResources = data.pokemon
    .slice(start, start + POKEMON_PAGE_SIZE)
    .map((entry) => entry.pokemon);

  return {
    items: await fetchPokemonBatch(pageResources),
    totalCount: data.pokemon.length,
  };
};
