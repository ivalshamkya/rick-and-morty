import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EpisodeCard from '../EpisodeCard';
import { mockEpisode } from '@/test/mockData';

describe('EpisodeCard', () => {
  it('renders episode information correctly', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    expect(screen.getByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('S01E01')).toBeInTheDocument();
    expect(screen.getByText('December 2, 2013')).toBeInTheDocument();
  });

  it('displays character count', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    expect(screen.getByText('2')).toBeInTheDocument(); // 2 characters
  });

  it('parses episode code correctly', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    expect(screen.getByText(/S1 E1/i)).toBeInTheDocument();
  });

  it('renders as a link to episode detail page', () => {
    const { container } = render(<EpisodeCard episode={mockEpisode} />);

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/episodes/1');
  });
});