import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Crypto from "crypto";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCustomKey(length: number = 10) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Uppercase and lowercase letters
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  const timestamp = Date.now();
  return result + timestamp.toString();
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
export const secretGen = () => {
  const secret = Crypto.randomBytes(32).toString("hex");
  return secret;
};
