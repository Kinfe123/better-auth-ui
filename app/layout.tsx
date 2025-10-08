// app/layout.tsx
"use client"; // Keep this for client-side features

import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/provider";
import { Navbar } from "@/components/navbar";
import { CommandMenu } from "@/components/command-menu";
import { metadata } from "./metadata"; // Import metadata
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-geist`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar setSearchOpen={setOpen} />
          {children}
          <CommandMenu open={open} onOpenChange={setOpen} />
        </ThemeProvider>
      </body>
    </html>
  );
}