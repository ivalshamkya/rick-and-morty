"use client";

import { useEffect, useState } from "react";
import { useFavoritesStore } from "@/store/favoritesStore";
import { characterAPI } from "@/lib/api";
import { Character } from "@/types/character";
import CharacterCard from "@/components/characters/CharacterCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      if (favorites.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const promises = favorites.map((id) => characterAPI.getById(id));
        const results = await Promise.all(promises);
        setCharacters(results);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, [favorites]);

  return (
    <main className="min-h-screen bg-[#f0f5f9] dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tight">
            <span className="inline-block text-[#ee5a6f] slime-text tracking-wider">
              Favorites
            </span>
          </h1>
          <p className="text-lg md:text-xl font-bold uppercase">
            Your favorite characters ({favorites.length})
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-full aspect-square" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#ee5a6f]/20 mb-6">
              <Heart className="h-12 w-12 text-[#ee5a6f]" />
            </div>
            <h3 className="text-2xl font-black uppercase mb-2">
              No Favorites Yet
            </h3>
            <p className="text-muted-foreground font-bold">
              Start adding characters to your favorites!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
