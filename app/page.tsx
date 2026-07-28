import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { buildSearchRecords } from "@/lib/search";

export default function HomePage() {
  const records = buildSearchRecords();

  return (
    <div className="space-y-12">
      <section className="pt-6 text-center">
        <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Script PowerShell{" "}
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
            the easy way
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--text-muted)]">
          Searchable cheat sheets for everyday PowerShell — plus a goal explorer
          that turns what you want to do into a working script.
        </p>
      </section>

      <section>
        <SearchBar records={records} />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-semibold">Browse by category</h2>
          <Link
            href="/goal-explorer"
            className="text-sm text-[var(--accent)] transition hover:underline"
          >
            Have a goal instead? →
          </Link>
        </div>
        <CategoryGrid />
      </section>
    </div>
  );
}
