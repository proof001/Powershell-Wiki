import { CopyButton } from "./CopyButton";

/** Lightweight code block for client/dynamic contexts (no server highlighting). */
export function PlainCode({ code }: { code: string }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[#0d1117]">
      <div className="absolute right-2 top-2 z-10 opacity-0 transition group-hover:opacity-100">
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-4 text-[0.85rem] leading-relaxed">
        <code className="font-mono text-[#c9d1d9]">{code}</code>
      </pre>
    </div>
  );
}
