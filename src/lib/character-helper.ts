import { Character } from "@/types/character";

export function getColorByGender(gender: Character["gender"]): string {
  switch (gender) {
    case "Male":
      return "bg-[#00b5cc]"; // Blue
    case "Female":
      return "bg-[#cc0047]"; // Pink
    case "Genderless":
      return "bg-[#a29bfe]"; // Purple
    case "unknown":
    default:
      return "bg-[#636e72]"; // Grey
  }
}
