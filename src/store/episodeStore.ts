import { create } from "zustand";
import { Episode, EpisodeFilters } from "@/types/episode";
import { episodeAPI } from "@/lib/api";

interface EpisodeState {
  episodes: Episode[];
  loading: boolean;
  error: string | null;
  filters: EpisodeFilters;
  totalPages: number;
  currentPage: number;

  fetchEpisodes: () => Promise<void>;
  setFilters: (filters: Partial<EpisodeFilters>) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useEpisodeStore = create<EpisodeState>((set, get) => ({
  episodes: [],
  loading: false,
  error: null,
  filters: { page: 1 },
  totalPages: 1,
  currentPage: 1,

  fetchEpisodes: async () => {
    set({ loading: true, error: null });
    try {
      const data = await episodeAPI.getAll(get().filters);
      set({
        episodes: data.results,
        totalPages: data.info.pages,
        currentPage: get().filters.page || 1,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || "Failed to fetch episodes",
        loading: false,
        episodes: [],
      });
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...newFilters, page: 1 },
    }));
    get().fetchEpisodes();
  },

  setPage: (page) => {
    set((state) => ({
      filters: { ...state.filters, page },
    }));
    get().fetchEpisodes();
  },

  resetFilters: () => {
    set({ filters: { page: 1 } });
    get().fetchEpisodes();
  },
}));
