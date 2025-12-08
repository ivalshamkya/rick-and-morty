import { create } from "zustand";
import { Character, CharacterFilters } from "@/types/characters";
import { characterAPI } from "@/lib/api";

interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
  filters: CharacterFilters;
  totalPages: number;
  currentPage: number;

  fetchCharacters: () => Promise<void>;
  setFilters: (filters: Partial<CharacterFilters>) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  characters: [],
  loading: false,
  error: null,
  filters: { page: 1 },
  totalPages: 1,
  currentPage: 1,

  fetchCharacters: async () => {
    set({ loading: true, error: null });
    try {
      const data = await characterAPI.getAll(get().filters);
      set({
        characters: data.results,
        totalPages: data.info.pages,
        currentPage: get().filters.page || 1,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || "Failed to fetch characters",
        loading: false,
        characters: [],
      });
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...newFilters, page: 1 },
    }));
    get().fetchCharacters();
  },

  setPage: (page) => {
    set((state) => ({
      filters: { ...state.filters, page },
    }));
    get().fetchCharacters();
  },

  resetFilters: () => {
    set({ filters: { page: 1 } });
    get().fetchCharacters();
  },
}));
