import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg">⚡</span>
          <span>
            PowerShell<span className="text-[var(--accent)]">Wiki</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/cheatsheets"
            className="rounded-md px-3 py-1.5 text-[var(--text-muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text)]"
          >
            Cheat Sheets
          </Link>
          <Link
            href="/goal-explorer"
            className="rounded-md px-3 py-1.5 text-[var(--text-muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text)]"
          >
            Goal Explorer
          </Link>
        </nav>
      </div>
    </header>
  );
}
