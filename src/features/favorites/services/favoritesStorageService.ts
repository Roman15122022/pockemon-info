import { FAVORITES_STORAGE_KEY } from '../../../shared/constants/storage';
import { localStorageService } from '../../../shared/services/storage/localStorageService';

export type FavoritesStorageService = {
  readFavoriteIds: () => number[];
  writeFavoriteIds: (favoriteIds: number[]) => void;
};

const normalizeFavoriteIds = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(new Set(value.filter((id): id is number => Number.isInteger(id) && id > 0)));
};

export const favoritesStorageService: FavoritesStorageService = {
  readFavoriteIds: () => localStorageService.read(FAVORITES_STORAGE_KEY, [], normalizeFavoriteIds),
  writeFavoriteIds: (favoriteIds) => localStorageService.write(FAVORITES_STORAGE_KEY, favoriteIds),
};
