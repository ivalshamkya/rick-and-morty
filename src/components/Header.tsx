"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Heart, Tv } from "lucide-react";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { favorites } = useFavoritesStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="border-b-4 border-black dark:border-white bg-white dark:bg-neutral-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl md:text-3xl font-black uppercase text-[#00b5cc] slime-text">
              Rick & Morty
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12" />
            <div className="w-12 h-12" />
            <div className="w-12 h-12" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b-4 border-black dark:border-black bg-white dark:bg-neutral-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/rick-and-morty-logo.png"
            alt="Rick and Morty Logo"
            width={200}
            height={100}
            className="mx-auto mb-4 hover:scale-105 transition-transform"
          />
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/episodes">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 border-3 border-black dark:border-white bg-[#f9ca24] hover:bg-[#f6b93b] dark:bg-[#f9ca24] dark:hover:bg-[#f6b93b] neo-shadow neo-active"
            >
              <Tv className="h-5 w-5 text-black" />
            </Button>
          </Link>

          <Link href="/favorites">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 border-3 border-black dark:border-white bg-[#ee5a6f] hover:bg-[#e84a5f] dark:bg-[#ee5a6f] dark:hover:bg-[#e84a5f] neo-shadow neo-active relative"
            >
              <Heart className="h-5 w-5 text-white fill-white" />
              {favorites.length > 0 && (
                <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-black dark:bg-white text-white dark:text-black border-2 border-white dark:border-black text-xs font-black flex items-center justify-center">
                  {favorites.length}
                </div>
              )}
            </Button>
          </Link>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-12 w-12 border-3 border-black dark:border-white bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 neo-shadow neo-active"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
