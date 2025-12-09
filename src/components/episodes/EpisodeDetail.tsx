'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Episode } from '@/types/episode';
import { Character } from '@/types/character';
import { characterAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, Tv, Users, AlertCircle } from 'lucide-react';

interface EpisodeDetailProps {
  episode: Episode;
}

export default function EpisodeDetail({ episode }: EpisodeDetailProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseEpisode = (code: string) => {
    const match = code.match(/S(\d+)E(\d+)/);
    if (match) {
      return { season: parseInt(match[1]), episode: parseInt(match[2]) };
    }
    return { season: 0, episode: 0 };
  };

  const { season, episode: episodeNum } = parseEpisode(episode.episode);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);
        const characterIds = episode.characters.map((url) => {
          const id = url.split('/').pop();
          return parseInt(id || '0');
        });

        const charactersData = await characterAPI.getMultiple(characterIds);
        setCharacters(charactersData);
      } catch (err) {
        setError('Failed to load characters');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [episode]);

  return (
    <div className="min-h-screen bg-[#f0f5f9] dark:bg-neutral-800">
      <div className="container mx-auto px-4 py-8">
        <Link href="/episodes">
          <Button
            variant="outline"
            className="mb-8 h-12 px-6 border-3 border-black dark:border-white bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-black neo-shadow neo-active"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            BACK TO EPISODES
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2 border-4 border-black dark:border-white bg-white dark:bg-neutral-900 neo-shadow-xl">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className="bg-[#00b5cc] border-3 border-black dark:border-white text-white font-black uppercase text-lg px-6 py-3">
                  {episode.episode}
                </Badge>
                <div className="flex items-center gap-2 px-4 py-2 border-3 border-black dark:border-white bg-[#f9ca24] font-black">
                  <Tv className="h-5 w-5 text-black" />
                  <span className="text-black">Season {season} • Episode {episodeNum}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight">
                {episode.name}
              </h1>

              <div className="flex items-center gap-3 p-4 border-3 border-black dark:border-white bg-[#84d65a]">
                <Calendar className="h-6 w-6 shrink-0 text-black" />
                <div>
                  <p className="text-xs font-black uppercase text-black">Air Date</p>
                  <p className="text-xl font-black text-black">{episode.air_date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border-3 border-black dark:border-white bg-neutral-100 dark:bg-neutral-800">
                <Calendar className="h-6 w-6 shrink-0" />
                <div>
                  <p className="text-xs font-black uppercase text-neutral-700 dark:text-neutral-400">
                    Added to Database
                  </p>
                  <p className="text-sm font-bold">
                    {new Date(episode.created).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-black dark:border-white bg-white dark:bg-neutral-900 neo-shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-black uppercase mb-6 border-b-3 border-black dark:border-white pb-3">
                Statistics
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 border-3 border-black dark:border-white bg-[#ee5a6f]">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-white" />
                    <div>
                      <p className="text-xs font-black uppercase text-white">
                        Characters
                      </p>
                      <p className="text-3xl font-black text-white">
                        {episode.characters.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-3 border-black dark:border-white bg-[#00b5cc]">
                  <div className="flex items-center gap-3">
                    <Tv className="h-8 w-8 text-white" />
                    <div>
                      <p className="text-xs font-black uppercase text-white">
                        Episode Number
                      </p>
                      <p className="text-3xl font-black text-white">
                        #{episode.id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-4 border-black dark:border-white bg-white dark:bg-neutral-900 neo-shadow-xl">
          <CardContent className="p-8">
            <h2 className="text-3xl font-black uppercase mb-6 border-b-3 border-black dark:border-white pb-3">
              Characters in This Episode ({episode.characters.length})
            </h2>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="w-full aspect-square bg-black neo-shadow-lg" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {characters.map((character) => (
                  <Link
                    key={character.id}
                    href={`/characters/${character.id}`}
                    className="group"
                  >
                    <Card className="overflow-hidden border-3 border-black dark:border-white bg-white dark:bg-neutral-900 neo-shadow hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 hover:shadow-[2px_2px_0px_0px_#84d65a]">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={character.image}
                          alt={character.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-black uppercase truncate group-hover:text-[#00b5cc] transition-colors">
                          {character.name}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}