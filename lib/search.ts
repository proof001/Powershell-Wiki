import Fuse from "fuse.js";
import type { CheatSheet } from "./types";
import { cheatSheets } from "@/content";

export interface SearchRecord {
  cheatSheetSlug: string;
  cheatSheetTitle: string;
  cheatSheetIcon: string;
  heading: string;
  title: string;
  description: string;
  code: string;
  tags: string[];
}

/** Flatten every snippet into a searchable record. */
export function buildSearchRecords(sheets: CheatSheet[] = cheatSheets): SearchRecord[] {
  const records: SearchRecord[] = [];
  for (const sheet of sheets) {
    for (const group of sheet.groups) {
      for (const snippet of group.snippets) {
        records.push({
          cheatSheetSlug: sheet.slug,
          cheatSheetTitle: sheet.title,
          cheatSheetIcon: sheet.icon,
          heading: group.heading,
          title: snippet.title,
          description: snippet.description,
          code: snippet.code,
          tags: sheet.tags,
        });
      }
    }
  }
  return records;
}

export function createFuse(records: SearchRecord[]): Fuse<SearchRecord> {
  return new Fuse(records, {
    includeScore: true,
    threshold: 0.4,
    ignoreLocation: true,
    keys: [
      { name: "title", weight: 3 },
      { name: "description", weight: 2 },
      { name: "tags", weight: 2 },
      { name: "code", weight: 1 },
      { name: "cheatSheetTitle", weight: 1 },
      { name: "heading", weight: 1 },
    ],
  });
}
