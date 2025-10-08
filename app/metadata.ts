// app/metadata.ts
import type { Metadata } from "next";
import { metadata as mt } from "@/meta";
const { title, description, ogImage } = mt;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: ogImage }],
    url: "https://better-auth.farmui.com",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
    creator: "@kinfishT",
  },
};