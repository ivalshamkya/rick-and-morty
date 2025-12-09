import EpisodeList from "@/components/episodes/EpisodeList";
import EpisodeFilters from "@/components/episodes/EpisodeFilters";

export default function EpisodesPage() {
  return (
    <main className="min-h-screen bg-[#f0f5f9] dark:bg-neutral-800">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tight">
            <span className="inline-block text-[#00b5cc] slime-text tracking-wider">
              Episodes
            </span>
          </h1>
          <p className="text-lg md:text-xl font-bold uppercase">
            All Rick and Morty Episodes
          </p>
        </div>

        <EpisodeFilters />
        <EpisodeList />
      </div>
    </main>
  );
}
