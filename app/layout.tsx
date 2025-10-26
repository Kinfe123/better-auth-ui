// app/layout.tsx 

import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/provider";
import { Navbar } from "@/components/navbar";
import { CommandPaletteProvider } from "@/components/command-palette-context";

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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-geist`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
            <CommandPaletteProvider> 
                <Navbar /> 
                {children}
            </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}