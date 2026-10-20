import { collegeImages } from "./home";

import imgFestival from "@/assets/life-festival.jpg";
import imgLab from "@/assets/life-lab.jpg";
import imgLibrary from "@/assets/life-library.jpg";
import imgSports from "@/assets/life-sports.jpg";

// Every real photo shipped with the portal, addressable by a stable key
// so editors can pick an image from the admin dashboard.
export const imageLibrary: Record<string, string> = {
  ...collegeImages,
  "life-festival": imgFestival,
  "life-lab": imgLab,
  "life-library": imgLibrary,
  "life-sports": imgSports,
};

export const imageKeys = Object.keys(imageLibrary);

export function imageFor(key: string | null | undefined, fallback = "life-library") {
  if (key && imageLibrary[key]) return imageLibrary[key];
  return imageLibrary[fallback] as string;
}
