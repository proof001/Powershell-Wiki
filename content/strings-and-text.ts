import type { CheatSheet } from "@/lib/types";

export const stringsAndText: CheatSheet = {
  slug: "strings-and-text",
  title: "Strings & Text",
  description: "Manipulate strings, match patterns, and format output.",
  icon: "🔤",
  tags: [
    "string",
    "text",
    "replace",
    "split",
    "join",
    "regex",
    "match",
    "select-string",
    "grep",
    "format",
    "trim",
    "substring",
    "search text",
  ],
  groups: [
    {
      heading: "Transforming strings",
      snippets: [
        {
          title: "Replace text",
          description: "Substitute one substring for another.",
          code: '"Hello World" -replace "World", "PowerShell"',
        },
        {
          title: "Split a string",
          description: "Break a string into an array on a delimiter.",
          code: '"a,b,c" -split ","',
        },
        {
          title: "Join an array into a string",
          description: "Combine array elements with a separator.",
          code: '@("a", "b", "c") -join " | "',
        },
        {
          title: "Trim and change case",
          description: "Clean up whitespace and normalize case.",
          code: '"  Hello  ".Trim().ToUpper()',
        },
      ],
    },
    {
      heading: "Searching and matching",
      snippets: [
        {
          title: "Search files for a pattern (grep)",
          description: "Find lines matching a regex across files.",
          code: 'Select-String -Path ".\\*.log" -Pattern "ERROR"',
        },
        {
          title: "Test a regex match",
          description: "Return true/false if a string matches.",
          code: '"user@example.com" -match "^[^@]+@[^@]+\\.[^@]+$"',
        },
        {
          title: "Extract with a capture group",
          description: "Pull a value out using $matches.",
          code: `if ("Order #4521" -match "#(\\d+)") { $matches[1] }`,
        },
      ],
    },
    {
      heading: "Formatting output",
      snippets: [
        {
          title: "Format with placeholders",
          description: "Insert values into a template string.",
          code: '"{0} has {1} items" -f "Cart", 3',
        },
        {
          title: "Pad and align numbers",
          description: "Right-align a number in a fixed width.",
          code: '"{0,8:N2}" -f 1234.5',
        },
      ],
    },
  ],
};
