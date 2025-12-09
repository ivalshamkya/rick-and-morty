"use client";

import { useEffect } from "react";
import { useCharacterStore } from "@/store/characterStore";
import CharacterCard from "./CharacterCard";
import Pagination from "./Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function CharacterList() {
  const {
    characters,
    loading,
    error,
    fetchCharacters,
    totalPages,
    currentPage,
    setPage,
  } = useCharacterStore();

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

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
              <Skeleton className="w-full aspect-square rounded-2xl bg-neutral-900/50 neo-shadow-lg" />
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
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
          Interdimensional cable's down!
        </h3>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No characters found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
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
