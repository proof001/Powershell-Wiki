"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createFuse, type SearchRecord } from "@/lib/search";
import { PlainCode } from "./PlainCode";
import { AiAnswer } from "./AiAnswer";

const EXAMPLES = [
  "Rename all photos in a folder to add today's date",
  "List every service that is currently stopped",
  "Download a file from a URL and unzip it",
  "Find all files larger than 100 MB",
];

export function GoalExplorer({ records }: { records: SearchRecord[] }) {
  const [goal, setGoal] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fuse = useMemo(() => createFuse(records), [records]);

  const matches = useMemo(() => {
    if (!submitted) return [];
    return fuse.search(submitted, { limit: 4 }).map((r) => r.item);
  }, [submitted, fuse]);

  async function runGoal(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setSubmitted(trimmed);
    setAnswer("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      if (!res.body) throw new Error("No response stream.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setAnswer((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    runGoal(goal);
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="space-y-3">
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) onSubmit(e);
          }}
          rows={3}
          placeholder="Describe what you want to do… e.g. 'move all .log files older than 7 days into an archive folder'"
          className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-base outline-none transition focus:border-[var(--accent)]"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setGoal(ex);
                  runGoal(ex);
                }}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {ex}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading || !goal.trim()}
            className="rounded-xl bg-[var(--accent)] px-5 py-2.5 font-medium text-[#04121f] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Thinking…" : "Get a script"}
          </button>
        </div>
      </form>

      {submitted && (
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Phase 1: instant matches from the cheat sheets */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              From the cheat sheets
            </h2>
            {matches.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">
                No direct matches — see the AI suggestion.
              </p>
            ) : (
              <div className="space-y-3">
                {matches.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">{m.title}</span>
                      <Link
                        href={`/cheatsheets/${m.cheatSheetSlug}`}
                        className="shrink-0 text-xs text-[var(--text-muted)] transition hover:text-[var(--accent)]"
                      >
                        {m.cheatSheetIcon} →
                      </Link>
                    </div>
                    <PlainCode code={m.code} />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Phase 2: AI-generated script */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
                AI suggestion
              </span>
              {loading && <span className="animate-pulse text-[var(--accent)]">●</span>}
            </h2>
            {error ? (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            ) : answer ? (
              <AiAnswer markdown={answer} />
            ) : (
              <p className="text-sm text-[var(--text-muted)]">
                {loading ? "Generating a script…" : ""}
              </p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
