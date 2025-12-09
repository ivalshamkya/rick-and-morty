"use client";

import { useState } from "react";
import { useCharacterStore } from "@/store/characterStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SearchIcon, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const STATUS_OPTIONS = [
  { value: "all", label: "All", icon: "" },
  { value: "alive", label: "Alive", icon: "✓" },
  { value: "dead", label: "Dead", icon: "✗" },
  { value: "unknown", label: "Unknown", icon: "?" },
] as const;

const SPECIES_OPTIONS = [
  { value: "all", label: "All" },
  { value: "human", label: "Human" },
  { value: "alien", label: "Alien" },
  { value: "humanoid", label: "Humanoid" },
  { value: "robot", label: "Robot" },
  { value: "cronenberg", label: "Cronenberg" },
  { value: "animal", label: "Animal" },
  { value: "mythological", label: "Mythological" },
] as const;

const GENDER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "genderless", label: "Genderless" },
  { value: "unknown", label: "Unknown" },
] as const;

const FILTER_BADGE_COLORS: Record<string, string> = {
  name: "bg-[#f9ca24] hover:bg-[#f6b93b] text-black",
  status: "bg-[#00b5cc] hover:bg-[#009eb3] text-white",
  species: "bg-[#84d65a] hover:bg-[#70c446] text-black",
  gender: "bg-[#ee5a6f] hover:bg-[#e84a5f] text-white",
};

export default function CharacterFilters() {
  const { filters, setFilters, resetFilters } = useCharacterStore();
  const [searchInput, setSearchInput] = useState(filters.name || "");
  const [open, setOpen] = useState(false);

  const [localFilters, setLocalFilters] = useState({
    status: filters.status || "",
    species: filters.species || "",
    gender: filters.gender || "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters = { ...filters };
    if (searchInput) {
      newFilters.name = searchInput;
    } else {
      delete newFilters.name;
    }
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    const newFilters = { ...filters };

    if (localFilters.status) {
      newFilters.status = localFilters.status;
    } else {
      delete newFilters.status;
    }

    if (localFilters.species) {
      newFilters.species = localFilters.species;
    } else {
      delete newFilters.species;
    }

    if (localFilters.gender) {
      newFilters.gender = localFilters.gender;
    } else {
      delete newFilters.gender;
    }

    setFilters(newFilters);
    setOpen(false);
  };

  const handleResetFilters = () => {
    setLocalFilters({ status: "", species: "", gender: "" });
    setSearchInput("");
    resetFilters();
    setOpen(false);
  };

  const handleRemoveFilter = (filterKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newFilters = { ...filters };

    if (filterKey === "name") {
      setSearchInput("");
      delete newFilters.name;
    } else if (filterKey === "status") {
      setLocalFilters({ ...localFilters, status: "" });
      delete newFilters.status;
    } else if (filterKey === "species") {
      setLocalFilters({ ...localFilters, species: "" });
      delete newFilters.species;
    } else if (filterKey === "gender") {
      setLocalFilters({ ...localFilters, gender: "" });
      delete newFilters.gender;
    }

    setFilters(newFilters);
  };

  const activeFilterCount = [
    filters.name,
    filters.status,
    filters.species,
    filters.gender,
  ].filter(Boolean).length;

  const activeFiltersArray = Object.entries(filters).filter(
    ([key, value]) => value && key !== "page"
  ) as Array<[string, string]>;

  return (
    <div className="mb-12">
      <form onSubmit={handleSearch} className="space-y-5">
        <div className="flex flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black dark:text-neutral-300 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search characters..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-12 h-14 text-base rounded-xl border-3 border-black bg-white dark:bg-neutral-700 placeholder:text-black/60 text-black dark:placeholder:text-neutral-300 dark:text-white font-bold neo-shadow focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 rounded-xl border-3 border-black bg-[#00b5cc] hover:bg-[#009eb3] text-white font-black text-base neo-shadow neo-active"
            >
              <SearchIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Search</span>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-14 px-6 gap-2 relative rounded-xl border-3 border-black bg-[#84d65a] dark:bg-[#6db649] hover:bg-[#54af27] dark:hover:bg-[#5b943e] font-black neo-shadow neo-active"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  <span className="hidden sm:inline">FILTERS</span>
                  {activeFilterCount > 0 && (
                    <div className="absolute -top-2 -right-2 h-7 w-7 flex items-center justify-center rounded-full border-3 border-white dark:border-black bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-black neo-shadow-sm">
                      {activeFilterCount}
                    </div>
                  )}
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden rounded-xl border-3 border-black bg-white dark:bg-neutral-900 neo-shadow-xl">
                <DialogHeader className="px-6 pt-6 pb-4 border-b-4 border-black bg-[#00b5cc]">
                  <DialogTitle className="text-3xl font-black uppercase text-white slime-text">
                    Filters
                  </DialogTitle>
                  <DialogDescription className="text-base font-bold text-white">
                    Refine your search
                  </DialogDescription>
                </DialogHeader>

                <div className="px-6 space-y-5 py-6">
                  <div className="space-y-2.5">
                    <Label
                      htmlFor="status"
                      className="text-sm font-black uppercase"
                    >
                      Status
                    </Label>
                    <Select
                      value={localFilters.status || "all"}
                      onValueChange={(value) =>
                        setLocalFilters({
                          ...localFilters,
                          status: value === "all" ? "" : value,
                        })
                      }
                    >
                      <SelectTrigger
                        id="status"
                        className="h-12 border-3 border-black bg-white font-bold neo-shadow"
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="border-3 border-black neo-shadow">
                        {STATUS_OPTIONS.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="font-bold"
                          >
                            {option.icon && `${option.icon} `}
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2.5">
                    <Label
                      htmlFor="species"
                      className="text-sm font-black uppercase"
                    >
                      Species
                    </Label>
                    <Select
                      value={localFilters.species || "all"}
                      onValueChange={(value) =>
                        setLocalFilters({
                          ...localFilters,
                          species: value === "all" ? "" : value,
                        })
                      }
                    >
                      <SelectTrigger
                        id="species"
                        className="h-12 border-3 border-black bg-white font-bold neo-shadow"
                      >
                        <SelectValue placeholder="Select species" />
                      </SelectTrigger>
                      <SelectContent className="border-3 border-black neo-shadow">
                        {SPECIES_OPTIONS.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="font-bold"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2.5">
                    <Label
                      htmlFor="gender"
                      className="text-sm font-black uppercase"
                    >
                      Gender
                    </Label>
                    <Select
                      value={localFilters.gender || "all"}
                      onValueChange={(value) =>
                        setLocalFilters({
                          ...localFilters,
                          gender: value === "all" ? "" : value,
                        })
                      }
                    >
                      <SelectTrigger
                        id="gender"
                        className="h-12 border-3 border-black bg-white font-bold neo-shadow"
                      >
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="border-3 border-black neo-shadow">
                        {GENDER_OPTIONS.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="font-bold"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4 px-6 py-4 border-t-4 border-black bg-gray-100 dark:bg-neutral-800">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetFilters}
                    className="flex-1 h-12 border-3 border-black bg-white hover:bg-gray-200 font-black neo-shadow neo-hover"
                  >
                    <X className="h-4 w-4 mr-2" />
                    RESET
                  </Button>
                  <Button
                    type="button"
                    onClick={handleApplyFilters}
                    className="flex-1 h-12 border-3 border-black bg-[#84d65a] hover:bg-[#70c446] text-black font-black neo-shadow neo-hover"
                  >
                    APPLY
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm font-black uppercase">Active:</span>
            {activeFiltersArray.map(([key, value]) => (
              <Badge
                key={key}
                variant="secondary"
                className={`h-9 gap-2 px-4 text-sm font-black uppercase border-3 border-black neo-shadow ${
                  FILTER_BADGE_COLORS[key] || "bg-gray-300 text-black"
                }`}
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
