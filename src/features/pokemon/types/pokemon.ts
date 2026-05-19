export type NamedApiResource = {
  name: string;
  url: string;
};

export type PokeApiListResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type PokemonTypeSlot = {
  slot: number;
  type: NamedApiResource;
};

export type PokemonAbilitySlot = {
  ability: NamedApiResource;
  is_hidden: boolean;
  slot: number;
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
};

export type PokemonSprites = {
  front_default: string | null;
  other?: {
    home?: {
      front_default: string | null;
    };
    'official-artwork'?: {
      front_default: string | null;
    };
  };
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
  abilities: PokemonAbilitySlot[];
  stats: PokemonStat[];
};

export type PokemonTypeResponse = {
  id: number;
  name: string;
  pokemon: Array<{
    pokemon: NamedApiResource;
    slot: number;
  }>;
};

export type PokemonPage = {
  items: Pokemon[];
  totalCount: number;
};
