import axios from 'axios';
import { Character, CharacterResponse, CharacterFilters } from '@/types/characters';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const characterAPI = {
  getAll: async (filters: CharacterFilters = {}): Promise<CharacterResponse> => {
    const params = new URLSearchParams();
    
    if (filters.name) params.append('name', filters.name);
    if (filters.status) params.append('status', filters.status);
    if (filters.species) params.append('species', filters.species);
    if (filters.gender) params.append('gender', filters.gender);
    if (filters.page) params.append('page', filters.page.toString());

    const { data } = await api.get<CharacterResponse>(`/character?${params.toString()}`);
    return data;
  },

  getById: async (id: number): Promise<Character> => {
    try {
      const { data } = await api.get<Character>(`/character/${id}`);
      return data;
    } catch (error) {
      throw new Error('Character not found');
    }
  },
};