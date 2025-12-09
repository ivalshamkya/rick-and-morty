"use client";

import { useState } from "react";
import { useEpisodeStore } from "@/store/episodeStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EpisodeFilters() {
  const { filters, setFilters, resetFilters } = useEpisodeStore();
  const [searchInput, setSearchInput] = useState(filters.name || "");
  const [episodeInput, setEpisodeInput] = useState(filters.episode || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters = { ...filters };

    if (searchInput) {
      newFilters.name = searchInput;
    } else {
      delete newFilters.name;
    }

    if (episodeInput) {
      newFilters.episode = episodeInput;
    } else {
      delete newFilters.episode;
    }

    setFilters(newFilters);
  };

  const handleReset = () => {
    setSearchInput("");
    setEpisodeInput("");
    resetFilters();
  };

  const handleRemoveFilter = (filterKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newFilters = { ...filters };

    if (filterKey === "name") {
      setSearchInput("");
      delete newFilters.name;
    } else if (filterKey === "episode") {
      setEpisodeInput("");
      delete newFilters.episode;
    }

    setFilters(newFilters);
  };

  const activeFilterCount = [filters.name, filters.episode].filter(
    Boolean
  ).length;
  const activeFiltersArray = Object.entries(filters).filter(
    ([key, value]) => value && key !== "page"
  ) as Array<[string, string]>;

  return (
    <div className="mb-12">
      <form onSubmit={handleSearch} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black dark:text-white h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-12 h-14 text-base border-3 border-black dark:border-white bg-white dark:bg-neutral-900 placeholder:text-black/60 dark:placeholder:text-white/60 font-bold neo-shadow"
            />
          </div>

          <div className="relative">
            <Input
              type="text"
              placeholder="Episode code (e.g., S01E01)..."
              value={episodeInput}
              onChange={(e) => setEpisodeInput(e.target.value.toUpperCase())}
              className="h-14 text-base border-3 border-black dark:border-white bg-white dark:bg-neutral-900 placeholder:text-black/60 dark:placeholder:text-white/60 font-bold neo-shadow"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            className="h-12 px-8 border-3 border-black dark:border-white bg-[#00b5cc] hover:bg-[#009eb3] text-white font-black neo-shadow neo-active"
          >
            SEARCH
          </Button>

          {activeFilterCount > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="h-12 px-6 gap-2 border-3 border-black dark:border-white bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-black neo-shadow neo-active"
            >
              <X className="h-4 w-4" />
              RESET
            </Button>
          )}
        </div>

        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm font-black uppercase">Active:</span>
            {activeFiltersArray.map(([key, value]) => (
              <Badge
                key={key}
                variant="secondary"
                className="h-9 gap-2 px-4 text-sm font-black uppercase border-3 border-black dark:border-white bg-[#84d65a] hover:bg-[#70c446] text-black neo-shadow"
              >
                {value}
                <button
                  type="button"
                  onClick={(e) => handleRemoveFilter(key, e)}
                >
                  <X className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
