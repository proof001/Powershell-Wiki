import { highlightPowerShell } from "@/lib/highlight";
import { CopyButton } from "./CopyButton";

/** Server component: highlights PowerShell code and adds a copy button. */
export async function CodeBlock({ code }: { code: string }) {
  const html = await highlightPowerShell(code);

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[#0d1117]">
      <div className="absolute right-2 top-2 z-10 opacity-0 transition group-hover:opacity-100">
        <CopyButton text={code} />
      </div>
      <div className="code-shiki" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
