export interface Snippet {
  /** Short human title for this command/pattern */
  title: string;
  /** One-line explanation of what it does */
  description: string;
  /** The PowerShell code */
  code: string;
}

export interface SnippetGroup {
  /** Section heading within a cheat sheet, e.g. "Listing files" */
  heading: string;
  snippets: Snippet[];
}

export interface CheatSheet {
  /** URL slug, e.g. "file-system" */
  slug: string;
  /** Display title, e.g. "File System" */
  title: string;
  /** One-line summary shown on cards */
  description: string;
  /** Emoji/icon shown on the category card */
  icon: string;
  /** Keywords used for search and goal-matching */
  tags: string[];
  groups: SnippetGroup[];
}
