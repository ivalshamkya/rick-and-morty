import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Character } from "@/types/characters";
import { MapPin, Globe, UsersIcon, Tv } from "lucide-react";

interface CharacterCardProps {
  character: Character;
}

const statusColors = {
  Alive: "bg-[#84d65a] border-black text-black",
  Dead: "bg-[#ee5a6f] border-black text-white",
  unknown: "bg-gray-400 border-black text-white",
};

const genderColors = {
  Male: "bg-[#00b5cc] border-black text-white",
  Female: "bg-[#f9ca24] border-black text-black",
  Genderless: "bg-gray-300 border-black text-black",
  unknown: "bg-gray-400 border-black text-white",
};

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/characters/${character.id}`}>
      <Card className="overflow-hidden cursor-pointer h-full border-4 border-black bg-white neo-hover-inverted">
        <div className="relative w-full aspect-square border-b-4 border-black bg-gray-100">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3 bg-black text-[#84d65a] px-3 py-1.5 border-3 border-[#84d65a] font-black text-xs uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#84d65a]">
            <Tv className="h-3 w-3" />
            {character.episode.length}
          </div>
        </div>

        <CardContent className="p-5 bg-white space-y-3">
          <h3 className="font-black text-3xl leading-tight uppercase line-clamp-2 tracking-tight">
            {character.name}
          </h3>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              className={`${
                statusColors[character.status]
              } border-3 font-black uppercase text-xs px-3 py-1.5`}
            >
              {character.status}
            </Badge>
            <Badge className="bg-white border-3 border-black text-black font-black uppercase text-xs px-3 py-1.5">
              {character.species}
            </Badge>
            {character.type && (
              <Badge className="bg-[#00b5cc] border-3 border-black text-white font-black uppercase text-xs px-3 py-1.5">
                {character.type}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 p-2 border-3 border-black bg-gray-50">
            <UsersIcon className="h-4 w-4 shrink-0 font-bold" />
            <span className="text-xs font-black uppercase tracking-wide">
              {character.gender}
            </span>
          </div>

          <div className="p-3 border-3 border-black bg-[#f9ca24] space-y-1">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 shrink-0 font-bold" />
              <p className="text-xs font-black uppercase tracking-wide">
                Origin
              </p>
            </div>
            <p className="text-sm font-bold truncate pl-6">
              {character.origin.name}
            </p>
          </div>

          <div className="p-3 border-3 border-black bg-[#00b5cc] text-white space-y-1">
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
