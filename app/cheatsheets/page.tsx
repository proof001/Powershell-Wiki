import type { Metadata } from "next";
import { CategoryGrid } from "@/components/CategoryGrid";

export const metadata: Metadata = {
  title: "Cheat Sheets — PowerShell Wiki",
};

export default function CheatSheetsIndex() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Cheat Sheets</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Pick a category to see ready-to-copy PowerShell commands.
        </p>
      </header>
      <CategoryGrid />
    </div>
  );
}
