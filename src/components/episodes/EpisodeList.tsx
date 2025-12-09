"use client";

import { useEffect } from "react";
import { useEpisodeStore } from "@/store/episodeStore";
import EpisodeCard from "./EpisodeCard";
import Pagination from "../characters/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import Image from "next/image";

export default function EpisodeList() {
  const {
    episodes,
    loading,
    error,
    fetchEpisodes,
    totalPages,
    currentPage,
    setPage,
  } = useEpisodeStore();

  useEffect(() => {
    fetchEpisodes();
  }, [fetchEpisodes]);

  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  if (episodes.length == 0 || error) {
    return (
      <div className="text-center py-20">
        <Image
          src="/broken-gun.png"
          alt="Rick and Morty Broken Gun"
          width={400}
          height={100}
          className="mx-auto mb-4 hover:scale-105 transition-transform"
        />
        <h3 className="text-xl font-semibold mb-2">
          Oh man, Rick! The portal gun's broken!
        </h3>
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
