import type { CheatSheet } from "@/lib/types";

export const loopsAndConditionals: CheatSheet = {
  slug: "loops-and-conditionals",
  title: "Loops & Conditionals",
  description: "Iterate over collections and branch on conditions.",
  icon: "🔁",
  tags: [
    "loop",
    "foreach",
    "for",
    "while",
    "do",
    "if",
    "else",
    "switch",
    "where-object",
    "iterate",
    "condition",
    "filter",
    "repeat",
  ],
  groups: [
    {
      heading: "Looping",
      snippets: [
        {
          title: "Loop over a collection (pipeline)",
          description: "Run a block for each item coming down the pipeline.",
          code: "1..5 | ForEach-Object { Write-Host \"Number $_\" }",
        },
        {
          title: "foreach statement",
          description: "Classic loop over an array.",
          code: `$names = @("Ann", "Bob", "Cy")
foreach ($name in $names) {
    Write-Host "Hello $name"
}`,
        },
        {
          title: "while loop",
          description: "Repeat while a condition holds.",
          code: `$i = 0
while ($i -lt 3) {
    Write-Host $i
    $i++
}`,
        },
        {
          title: "for loop",
          description: "Counter-based loop.",
          code: `for ($i = 0; $i -lt 3; $i++) {
    Write-Host "Step $i"
}`,
        },
      ],
    },
    {
      heading: "Conditionals",
      snippets: [
        {
          title: "if / elseif / else",
          description: "Branch on comparison operators.",
          code: `$n = 7
if ($n -gt 10) {
    "big"
} elseif ($n -gt 5) {
    "medium"
} else {
    "small"
}`,
        },
        {
          title: "switch statement",
          description: "Match a value against several cases.",
          code: `switch ($env:OS) {
    "Windows_NT" { "Running on Windows" }
    default      { "Other OS" }
}`,
        },
        {
          title: "Filter with Where-Object",
          description: "Keep only items matching a condition.",
          code: "Get-Process | Where-Object { $_.CPU -gt 100 }",
        },
      ],
    },
  ],
};
