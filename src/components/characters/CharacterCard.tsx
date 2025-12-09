"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Character } from "@/types/character";
import { MapPin, Globe, UsersIcon, Tv, Heart } from "lucide-react";
import { useFavoritesStore } from "@/store/favoritesStore";

interface CharacterCardProps {
  character: Character;
}

const statusColors = {
  Alive: "bg-[#84d65a] border-black text-black",
  Dead: "bg-[#ee5a6f] border-black text-white",
  unknown: "bg-neutral-400 border-black text-white",
};

export default function CharacterCard({ character }: CharacterCardProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(character.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(character.id);
  };

  return (
    <Link href={`/characters/${character.id}`}>
      <Card className="overflow-hidden cursor-pointer h-full border-4 border-black dark:border-white bg-white dark:bg-neutral-900 neo-shadow-lg neo-hover">
        <div className="relative w-full aspect-square bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Favorite Button */}
          <Button
            size="icon"
            onClick={handleFavoriteClick}
            className={`absolute top-3 left-3 h-10 w-10 border-3 border-black dark:border-white neo-shadow-sm z-10 ${
              favorite
                ? "bg-[#ee5a6f] hover:bg-[#e84a5f]"
                : "bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            <Heart
              className={`h-5 w-5 ${
                favorite
                  ? "fill-white text-white"
                  : "text-black dark:text-white"
              }`}
            />
          </Button>

          {/* Episode Badge */}
          <div className="absolute top-3 right-3 bg-black dark:bg-white text-[#84d65a] dark:text-black px-3 py-1.5 border-3 border-[#84d65a] dark:border-black font-black text-xs uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#84d65a]">
            <Tv className="h-3 w-3" />
            {character.episode.length}
          </div>
        </div>

        <CardContent className="px-5 bg-white dark:bg-neutral-900 space-y-4">
          <h3 className="font-black text-xl leading-tight uppercase line-clamp-2 tracking-tight">
            {character.name}
          </h3>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              className={`${
                statusColors[character.status]
              } border-3 font-black uppercase text-xs px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]`}
            >
              {character.status}
            </Badge>
            <Badge className="bg-white dark:bg-neutral-900 border-3 border-black dark:border-white text-black dark:text-white font-black uppercase text-xs px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              {character.species}
            </Badge>
            {character.type && (
              <Badge className="bg-[#00b5cc] border-3 border-black dark:border-white text-white font-black uppercase text-xs px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                {character.type}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 p-2 border-3 border-black dark:border-white bg-neutral-50 dark:bg-neutral-800">
            <UsersIcon className="h-4 w-4 shrink-0 font-bold" />
            <span className="text-xs font-black uppercase tracking-wide">
              {character.gender}
            </span>
          </div>

          <div className="p-3 border-3 border-black dark:border-white bg-[#f9ca24] dark:bg-[#f6b93b] space-y-1">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 shrink-0 font-bold text-black" />
              <p className="text-xs font-black uppercase tracking-wide text-black">
                Origin
              </p>
            </div>
            <p className="text-sm font-bold truncate pl-6 text-black">
              {character.origin.name}
            </p>
          </div>

          <div className="p-3 border-3 border-black dark:border-white bg-[#00b5cc] text-white space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 font-bold" />
              <p className="text-xs font-black uppercase tracking-wide">
                Last Known Location
              </p>
            </div>
            <p className="text-sm font-bold truncate pl-6">
              {character.location.name}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
