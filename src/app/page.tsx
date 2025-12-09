import CharacterList from "@/components/characters/CharacterList";
import CharacterFilters from "@/components/characters/CharacterFilters";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f5f9] dark:bg-neutral-800">
      <div className="container px-4 mx-auto py-12">
        <div className="mb-12 text-center">
          <Image
            src="/rick-and-morty-logo.png"
            alt="Rick and Morty Logo"
            width={480}
            height={240}
            className="mx-auto mb-4"
          />
        </div>

        <CharacterFilters />
        <CharacterList />
      </div>
    </main>
  );
}
