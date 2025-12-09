"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Character } from "@/types/character";
import {
  MapPin,
  Globe,
  UsersIcon,
  Tv,
  Heart,
  VenusAndMarsIcon,
  PersonStanding,
  User,
  UserIcon,
} from "lucide-react";
import { useFavoritesStore } from "@/store/favoritesStore";
import { cn } from "@/lib/utils";
import { getColorByGender } from "@/lib/character-helper";

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
              <UserIcon className="h-3 w-3 inline-block mr-1" />
              {character.status}
            </Badge>
            <Badge className="bg-white dark:bg-neutral-900 border-3 border-black dark:border-white text-black dark:text-white font-black uppercase text-xs px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <PersonStanding className="h-3 w-3 inline-block mr-1" />
              {character.species}
            </Badge>
            {character.gender && (
              <Badge
                className={cn(
                  getColorByGender(character.gender),
                  "border-3 border-black dark:border-white text-white font-black uppercase text-xs px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                )}
              >
                <VenusAndMarsIcon className="h-3 w-3 inline-block mr-1" />
                {character.gender}
              </Badge>
            )}
            {character.type && (
              <Badge className="bg-[#cc7000] border-3 border-black dark:border-white text-white font-black uppercase text-xs px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                {character.type}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
