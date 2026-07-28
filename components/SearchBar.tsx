"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createFuse, type SearchRecord } from "@/lib/search";
import { PlainCode } from "./PlainCode";

export function SearchBar({ records }: { records: SearchRecord[] }) {
  const [query, setQuery] = useState("");
  const fuse = useMemo(() => createFuse(records), [records]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return fuse.search(q, { limit: 8 }).map((r) => r.item);
  }, [query, fuse]);

  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search commands… e.g. copy a file, ping a host, catch an error"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-4 pl-12 pr-4 text-base outline-none transition focus:border-[var(--accent)]"
          aria-label="Search PowerShell commands"
        />
      </div>

      {query.trim() && (
        <div className="mt-4 space-y-3">
          {results.length === 0 ? (
            <p className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-muted)]">
              No matches. Try the{" "}
              <Link href="/goal-explorer" className="text-[var(--accent)] underline">
                Goal Explorer
              </Link>{" "}
              to generate a script with AI.
            </p>
          ) : (
            results.map((r, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-medium">{r.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{r.description}</p>
                  </div>
                  <Link
                    href={`/cheatsheets/${r.cheatSheetSlug}`}
                    className="shrink-0 text-xs text-[var(--text-muted)] transition hover:text-[var(--accent)]"
                  >
                    {r.cheatSheetIcon} {r.cheatSheetTitle} →
                  </Link>
                </div>
                <PlainCode code={r.code} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
