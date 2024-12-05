import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function anyBool(lists: boolean[]) {
  let result = false;
  lists.map((list) => {
    if (list) {
      result = true;
      return;
    }
  });
  return result;
}
