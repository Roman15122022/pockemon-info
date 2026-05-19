import { create } from 'zustand';
import { favoritesStorageService } from '../services/favoritesStorageService';

type FavoritesState = {
  favoriteIds: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: favoritesStorageService.readFavoriteIds(),
  addFavorite: (id) =>
    set((state) => {
      if (state.favoriteIds.includes(id)) {
        return state;
      }

      const nextFavoriteIds = [...state.favoriteIds, id];
      favoritesStorageService.writeFavoriteIds(nextFavoriteIds);

      return { favoriteIds: nextFavoriteIds };
    }),
  removeFavorite: (id) =>
    set((state) => {
      const nextFavoriteIds = state.favoriteIds.filter((favoriteId) => favoriteId !== id);
      favoritesStorageService.writeFavoriteIds(nextFavoriteIds);

      return { favoriteIds: nextFavoriteIds };
    }),
  toggleFavorite: (id) => {
    const { favoriteIds, addFavorite, removeFavorite } = get();

    if (favoriteIds.includes(id)) {
      removeFavorite(id);
      return;
    }

    addFavorite(id);
  },
  isFavorite: (id) => get().favoriteIds.includes(id),
}));
