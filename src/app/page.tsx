import CharacterList from "@/components/characters/CharacterList";
import CharacterFilters from "@/components/characters/CharacterFilters";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f5f9]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <Image
            src="/rick-and-morty-logo.png"
            alt="Rick and Morty Logo"
            width={400}
            height={200}
            className="mx-auto mb-4"
          />
        </div>

        <CharacterFilters />
        <CharacterList />
      </div>
    </main>
  );
}
