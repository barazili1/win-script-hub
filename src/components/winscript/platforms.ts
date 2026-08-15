import ultrapari from "@/assets/ultrapari.jpg";
import greenbet from "@/assets/greenbet.jpg";

export type Platform = {
  id: "ultrapari" | "greenbet";
  name: string;
  image: string;
};

export const PLATFORMS: Platform[] = [
  { id: "ultrapari", name: "UltraPari", image: ultrapari },
  { id: "greenbet", name: "GreenBet", image: greenbet },
];

export const GAMES = [
  { id: "aviator", name: "Aviator" },
  { id: "mines", name: "Mines" },
  { id: "lucky-jet", name: "Lucky Jet" },
  { id: "jetx", name: "JetX" },
];
