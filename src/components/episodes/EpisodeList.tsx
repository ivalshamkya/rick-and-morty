'use client';

import { useEffect } from 'react';
import { useEpisodeStore } from '@/store/episodeStore';
import EpisodeCard from './EpisodeCard';
import Pagination from '../characters/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

export default function EpisodeList() {
  const { episodes, loading, error, fetchEpisodes, totalPages, currentPage, setPage } = useEpisodeStore();

  useEffect(() => {
    fetchEpisodes();
  }, [fetchEpisodes]);

  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="w-full h-64" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Oops! Something went wrong</h3>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (episodes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📺</div>
        <h3 className="text-xl font-semibold mb-2">No episodes found</h3>
        <p className="text-muted-foreground">Try adjusting your search</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}