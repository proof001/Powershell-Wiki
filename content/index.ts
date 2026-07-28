import type { CheatSheet } from "@/lib/types";
import { fileSystem } from "./file-system";
import { networking } from "./networking";
import { systemAdministration } from "./system-administration";
import { stringsAndText } from "./strings-and-text";
import { loopsAndConditionals } from "./loops-and-conditionals";
import { errorHandling } from "./error-handling";
import { pipelineAndFiltering } from "./pipeline-and-filtering";

export const cheatSheets: CheatSheet[] = [
  fileSystem,
  networking,
  systemAdministration,
  stringsAndText,
  loopsAndConditionals,
  errorHandling,
  pipelineAndFiltering,
];

export function getCheatSheet(slug: string): CheatSheet | undefined {
  return cheatSheets.find((c) => c.slug === slug);
}
