import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Episode } from '@/types/episode';
import { Calendar, Users, Tv } from 'lucide-react';

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  // Parse episode code (e.g., "S01E01" -> Season 1, Episode 1)
  const parseEpisode = (code: string) => {
    const match = code.match(/S(\d+)E(\d+)/);
    if (match) {
      return { season: parseInt(match[1]), episode: parseInt(match[2]) };
    }
    return { season: 0, episode: 0 };
  };

  const { season, episode: episodeNum } = parseEpisode(episode.episode);

  return (
    <Link href={`/episodes/${episode.id}`}>
      <Card className="overflow-hidden cursor-pointer h-full border-4 border-black dark:border-white bg-white dark:bg-gray-900 neo-shadow-lg neo-hover">
        <CardContent className="p-6 space-y-4">
          {/* Episode Code Badge */}
          <div className="flex items-center justify-between">
            <Badge className="bg-[#00b5cc] border-3 border-black dark:border-white text-white font-black uppercase text-sm px-4 py-2">
              {episode.episode}
            </Badge>
            <div className="flex items-center gap-2 text-sm font-bold">
              <Tv className="h-4 w-4" />
              <span className="font-black">S{season} E{episodeNum}</span>
            </div>
          </div>

          {/* Episode Name */}
          <h3 className="font-black text-xl leading-tight uppercase line-clamp-2 min-h-[3.5rem]">
            {episode.name}
          </h3>

          {/* Air Date */}
          <div className="flex items-center gap-2 p-3 border-3 border-black dark:border-white bg-[#f9ca24]">
            <Calendar className="h-5 w-5 flex-shrink-0 text-black" />
            <div>
              <p className="text-xs font-black uppercase text-black">Air Date</p>
              <p className="text-sm font-bold text-black">{episode.air_date}</p>
            </div>
          </div>

          {/* Character Count */}
          <div className="flex items-center gap-2 p-3 border-3 border-black dark:border-white bg-[#84d65a]">
            <Users className="h-5 w-5 flex-shrink-0 text-black" />
            <div>
              <p className="text-xs font-black uppercase text-black">Characters</p>
              <p className="text-lg font-black text-black">{episode.characters.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}