import { PlainCode } from "./PlainCode";

interface Block {
  type: "text" | "code";
  content: string;
}

/** Split streamed markdown into text and fenced code blocks. */
function parseBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  const parts = markdown.split(/```[a-zA-Z]*\n?/);
  // Even indices are text, odd indices are code (fence-delimited).
  parts.forEach((part, i) => {
    if (i % 2 === 1) {
      blocks.push({ type: "code", content: part.replace(/\n$/, "") });
    } else if (part.trim()) {
      blocks.push({ type: "text", content: part.trim() });
    }
  });
  return blocks;
}

export function AiAnswer({ markdown }: { markdown: string }) {
  const blocks = parseBlocks(markdown);

  return (
    <div className="space-y-3">
      {blocks.map((block, i) =>
        block.type === "code" ? (
          <PlainCode key={i} code={block.content} />
        ) : (
          <p key={i} className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--text)]">
            {block.content}
          </p>
        )
      )}
    </div>
  );
}
