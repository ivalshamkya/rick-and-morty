import { notFound } from "next/navigation";
import EpisodeDetail from "@/components/episodes/EpisodeDetail";
import { episodeAPI } from "@/lib/api";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EpisodeDetailPage({ params }: PageProps) {
  try {
    const id = (await params).id;
    const episode = await episodeAPI.getById(parseInt(id));
    return <EpisodeDetail episode={episode} />;
  } catch (error) {
    notFound();
  }
}
