import { notFound } from "next/navigation";
import CharacterDetail from "@/components/characters/CharacterDetail";
import { characterAPI } from "@/lib/api";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CharacterDetailPage({ params }: PageProps) {
  try {
    const id = (await params).id;
    const character = await characterAPI.getById(parseInt(id));
    return <CharacterDetail character={character} />;
  } catch (error) {
    notFound();
  }
}
