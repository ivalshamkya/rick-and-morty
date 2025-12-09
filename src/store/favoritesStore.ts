import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (id: number) => {
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fav) => fav !== id)
            : [...state.favorites, id],
        }));
      },

      isFavorite: (id: number) => {
        return get().favorites.includes(id);
      },
    }),
    {
      name: "rick-morty-favorites",
    }
  )
);
