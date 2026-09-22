import type { Metadata } from "next";
import Link from "next/link";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Aster · Your companion",
  description: "A continuous, time-aware personal companion.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>
        <div className="ambient-bg" aria-hidden="true" />
        <header className="app-header">
          <Link className="wordmark" href="/" aria-label="Aster home">
            <span>A</span>
            <strong>Aster</strong>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/today">Today</Link>
            <Link href="/memory">Memory</Link>
          </nav>
          <div className="presence-indicator">
            <span /> awake
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
