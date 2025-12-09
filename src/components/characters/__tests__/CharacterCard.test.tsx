import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharacterCard from '../CharacterCard';
import { mockCharacter } from '@/test/mockData';

const { mockToggleFavorite, mockIsFavorite, mockUseFavoritesStore } = vi.hoisted(() => {
  const mockToggleFavorite = vi.fn();
  const mockIsFavorite = vi.fn(() => false);
  const mockUseFavoritesStore = vi.fn(() => ({
    toggleFavorite: mockToggleFavorite,
    isFavorite: mockIsFavorite,
    favorites: [],
  }));

  return { mockToggleFavorite, mockIsFavorite, mockUseFavoritesStore };
});

vi.mock('@/store/favoritesStore', () => ({
  useFavoritesStore: mockUseFavoritesStore,
}));

describe('CharacterCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsFavorite.mockReturnValue(false);
  });

  it('renders character information correctly', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  it('shows origin and location information', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
  });

  it('displays episode count', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders as a link to character detail page', () => {
    const { container } = render(<CharacterCard character={mockCharacter} />);

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/characters/1');
  });

  it('handles favorite button click', async () => {
    const user = userEvent.setup();

    render(<CharacterCard character={mockCharacter} />);

    const favoriteButton = screen.getByRole('button');
    await user.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(1);
  });

  it('shows filled heart when character is favorited', () => {
    mockIsFavorite.mockReturnValue(true);

    render(<CharacterCard character={mockCharacter} />);

    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toHaveClass('bg-[#ee5a6f]');
  });
});