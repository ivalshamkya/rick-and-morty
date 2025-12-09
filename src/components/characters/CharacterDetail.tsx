"use client";

import Image from "next/image";
import Link from "next/link";
import { Character } from "@/types/character";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  MapPin,
  Globe,
  Users,
  Tv,
  Calendar,
  Heart,
} from "lucide-react";
import { useFavoritesStore } from "@/store/favoritesStore";

interface CharacterDetailProps {
  character: Character;
}

const statusColors = {
  Alive: "bg-[#84d65a] border-black text-black",
  Dead: "bg-[#ee5a6f] border-black text-white",
  unknown: "bg-gray-400 border-black text-white",
};

export default function CharacterDetail({ character }: CharacterDetailProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(character.id);

  return (
    <div className="min-h-screen bg-[#f0f5f9] dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button
              variant="outline"
              className="h-12 px-6 border-3 border-black dark:border-white bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 font-black neo-shadow neo-hover"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              BACK TO LIST
            </Button>
          </Link>

          <Button
            onClick={() => toggleFavorite(character.id)}
            className={`h-12 px-6 border-3 border-black dark:border-white font-black neo-shadow neo-hover ${
              favorite
                ? "bg-[#ee5a6f] hover:bg-[#e84a5f] text-white"
                : "bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Heart className={`h-5 w-5 mr-2 ${favorite ? "fill-white" : ""}`} />
            {favorite ? "REMOVE FROM FAVORITES" : "ADD TO FAVORITES"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-4 h-fit border-black bg-white neo-shadow-xl overflow-hidden">
            <div className="relative w-full aspect-square">
              <Image
                src={character.image}
                alt={character.name}
                fill
                className="object-cover"
                priority
                unoptimized={true}
              />
            </div>
          </Card>

          {/* Right Column - Info */}
          <div className="space-y-6">
            {/* Name & Status */}
            <Card className="border-4 border-black bg-white neo-shadow-lg p-6">
              <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 leading-tight">
                {character.name}
              </h1>
              <div className="flex flex-wrap gap-3">
                <Badge
                  className={`${
                    statusColors[character.status]
                  } border-3 font-black uppercase text-sm px-4 py-2`}
                >
                  {character.status}
                </Badge>
                <Badge className="bg-white border-3 border-black text-black font-black uppercase text-sm px-4 py-2">
                  {character.species}
                </Badge>
                {character.type && (
                  <Badge className="bg-[#00b5cc] border-3 border-black text-white font-black uppercase text-sm px-4 py-2">
                    {character.type}
                  </Badge>
                )}
              </div>
            </Card>

            <Card className="border-4 border-black bg-white neo-shadow-lg">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-black uppercase mb-4 border-b-3 border-black pb-2">
                  Personal Info
                </h2>

                <div className="flex items-center gap-3 p-4 border-3 border-black bg-[#f9ca24]">
                  <Users className="h-6 w-6 shrink-0" />
                  <div>
                    <p className="text-xs font-black uppercase text-gray-700">
                      Gender
                    </p>
                    <p className="text-lg font-black">{character.gender}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border-3 border-black bg-[#00b5cc] text-white">
                  <Globe className="h-6 w-6 shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black uppercase">Origin</p>
                    <p className="text-lg font-black wrap-break-word">
                      {character.origin.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border-3 border-black bg-[#84d65a]">
                  <MapPin className="h-6 w-6 shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black uppercase">
                      Last Known Location
                    </p>
                    <p className="text-lg font-black wrap-break-word">
                      {character.location.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border-3 border-black bg-[#ee5a6f] text-white">
                  <Tv className="h-6 w-6 shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-black uppercase">Featured In</p>
                    <p className="text-2xl font-black">
                      {character.episode.length} Episodes
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border-3 border-black bg-gray-100">
                  <Calendar className="h-6 w-6 shrink-0" />
                  <div>
                    <p className="text-xs font-black uppercase text-gray-700">
                      Created
                    </p>
                    <p className="text-sm font-bold">
                      {new Date(character.created).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-black bg-white neo-shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-black uppercase mb-4 border-b-3 border-black pb-2">
                  Episode Appearances
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
                  {character.episode.map((ep, index) => {
                    const episodeNum = ep.split("/").pop();
                    return (
                      <div
                        key={ep}
                        className="p-3 border-3 border-black bg-white text-center font-black hover:bg-[#84d65a] transition-colors"
                      >
                        EP {episodeNum}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
