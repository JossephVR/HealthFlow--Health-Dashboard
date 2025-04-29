import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This utility function is necessary for shadcn/ui components to work correctly
// It combines class names intelligently, handling conditional classes (via clsx)
// and merging Tailwind classes properly to avoid conflicts (via tailwind-merge)
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
