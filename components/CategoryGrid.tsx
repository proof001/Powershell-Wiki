import Link from "next/link";
import { cheatSheets } from "@/content";

export function CategoryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cheatSheets.map((sheet) => {
        const count = sheet.groups.reduce((n, g) => n + g.snippets.length, 0);
        return (
          <Link
            key={sheet.slug}
            href={`/cheatsheets/${sheet.slug}`}
            className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)] hover:bg-[var(--surface-2)]"
          >
            <div className="mb-3 text-3xl">{sheet.icon}</div>
            <h3 className="mb-1 font-semibold transition group-hover:text-[var(--accent)]">
              {sheet.title}
            </h3>
            <p className="mb-3 text-sm text-[var(--text-muted)]">{sheet.description}</p>
            <span className="text-xs text-[var(--text-muted)]">{count} snippets</span>
          </Link>
        );
      })}
    </div>
  );
}
