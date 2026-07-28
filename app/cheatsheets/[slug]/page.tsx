import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cheatSheets, getCheatSheet } from "@/content";
import { CodeBlock } from "@/components/CodeBlock";

export function generateStaticParams() {
  return cheatSheets.map((sheet) => ({ slug: sheet.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sheet = getCheatSheet(slug);
  if (!sheet) return { title: "Not found — PowerShell Wiki" };
  return {
    title: `${sheet.title} — PowerShell Wiki`,
    description: sheet.description,
  };
}

export default async function CheatSheetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sheet = getCheatSheet(slug);
  if (!sheet) notFound();

  const related = cheatSheets.filter((c) => c.slug !== sheet.slug).slice(0, 4);

  return (
    <div className="space-y-10">
      <header>
        <Link
          href="/cheatsheets"
          className="text-sm text-[var(--text-muted)] transition hover:text-[var(--accent)]"
        >
          ← All cheat sheets
        </Link>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-4xl">{sheet.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{sheet.title}</h1>
            <p className="text-[var(--text-muted)]">{sheet.description}</p>
          </div>
        </div>
      </header>

      {sheet.groups.map((group) => (
        <section key={group.heading} className="space-y-4">
          <h2 className="border-b border-[var(--border)] pb-2 text-xl font-semibold">
            {group.heading}
          </h2>
          <div className="space-y-5">
            {group.snippets.map((snippet) => (
              <div key={snippet.title}>
                <h3 className="font-medium">{snippet.title}</h3>
                <p className="mb-2 text-sm text-[var(--text-muted)]">
                  {snippet.description}
                </p>
                <CodeBlock code={snippet.code} />
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="border-t border-[var(--border)] pt-6">
        <h2 className="mb-4 text-lg font-semibold">Related cheat sheets</h2>
        <div className="flex flex-wrap gap-3">
          {related.map((c) => (
            <Link
              key={c.slug}
              href={`/cheatsheets/${c.slug}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {c.icon} {c.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
