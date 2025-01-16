import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ARBIN_UI_CONSTANT = {
  padding: {
    sm: "2px",
    md: "4px",
    lg: "8px",
  },
  // modal,
  // screen,
  colors: {
    background: "red",
    foreground: "blue",
    text: "black",
    title: "black",
  },
};
