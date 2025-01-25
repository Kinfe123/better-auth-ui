import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCustomKey() {
  const part1 = crypto.randomBytes(16).toString("base64").replace(/=+$/, ""); // 16 bytes
  const part2 = crypto.randomBytes(16).toString("base64").replace(/=+$/, ""); // 16 bytes

  return `${part1}.${part2}`;
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
