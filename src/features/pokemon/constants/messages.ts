export const POKEMON_MESSAGES = {
  listLoadError: 'Pokemon could not be loaded. Check your connection and try again.',
  detailsLoadError: 'Pokemon details could not be loaded.',
  typesLoadError: 'Pokemon types could not be loaded. Type filtering is temporarily unavailable.',
  notFound: (query: string) => `Pokemon "${query}" was not found.`,
} as const;
