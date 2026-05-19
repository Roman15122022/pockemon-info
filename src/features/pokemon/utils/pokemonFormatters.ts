import {
  POKEMON_DIMENSION_DECIMAL_PLACES,
  POKEMON_DIMENSION_DIVISOR,
  POKEMON_ID_PAD_LENGTH,
} from '../../../shared/constants/pokemon';
import type { Pokemon } from '../types/pokemon';

export const formatPokemonId = (id: number) => `#${String(id).padStart(POKEMON_ID_PAD_LENGTH, '0')}`;

export const formatPokemonName = (name: string) =>
  name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const formatPokemonDimension = (value: number, unit: string) => {
  const convertedValue = Number(
    (value / POKEMON_DIMENSION_DIVISOR).toFixed(POKEMON_DIMENSION_DECIMAL_PLACES),
  );

  return `${convertedValue} ${unit}`;
};

export const formatHeight = (height: number) => formatPokemonDimension(height, 'm');

export const formatWeight = (weight: number) => formatPokemonDimension(weight, 'kg');

export const getPokemonImage = (pokemon: Pokemon) =>
  pokemon.sprites.other?.['official-artwork']?.front_default ??
  pokemon.sprites.other?.home?.front_default ??
  pokemon.sprites.front_default;

export const formatStatName = (name: string) => {
  if (name === 'hp') {
    return 'HP';
  }

  return formatPokemonName(name);
};
