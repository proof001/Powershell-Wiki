import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "PowerShell Wiki — Cheat sheets & goal-based scripting",
  description:
    "An easy way to script PowerShell: browsable cheat sheets plus a goal-based explorer that turns what you want to do into working scripts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-10 text-center text-sm text-[var(--text-muted)]">
          Built for learning PowerShell · Cheat sheets + AI goal explorer
        </footer>
      </body>
    </html>
  );
}
