import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: ["powershell"],
    });
  }
  return highlighterPromise;
}

/** Highlight PowerShell code into HTML. Runs on the server at render time. */
export async function highlightPowerShell(code: string): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang: "powershell",
    theme: "github-dark",
  });
}
