import type { CheatSheet } from "@/lib/types";

export const pipelineAndFiltering: CheatSheet = {
  slug: "pipeline-and-filtering",
  title: "Pipeline & Filtering",
  description: "Select, sort, group, and aggregate objects in the pipeline.",
  icon: "🔧",
  tags: [
    "pipeline",
    "select-object",
    "sort-object",
    "group-object",
    "measure-object",
    "select",
    "sort",
    "group",
    "count",
    "sum",
    "average",
    "unique",
    "top",
    "aggregate",
  ],
  groups: [
    {
      heading: "Selecting and shaping",
      snippets: [
        {
          title: "Pick specific properties",
          description: "Keep only the columns you care about.",
          code: "Get-Process | Select-Object Name, Id, CPU",
        },
        {
          title: "Get the top N items",
          description: "Take the first few results.",
          code: "Get-Process | Sort-Object CPU -Descending | Select-Object -First 5",
        },
        {
          title: "Add a calculated property",
          description: "Create a new column from an expression.",
          code: `Get-Process | Select-Object Name,
    @{ Name = "MemMB"; Expression = { [math]::Round($_.WorkingSet / 1MB, 1) } }`,
        },
        {
          title: "Get unique values",
          description: "Remove duplicates from a set.",
          code: "Get-Process | Select-Object -ExpandProperty Company -Unique",
        },
      ],
    },
    {
      heading: "Sorting and grouping",
      snippets: [
        {
          title: "Sort by a property",
          description: "Order results ascending or descending.",
          code: "Get-ChildItem | Sort-Object Length -Descending",
        },
        {
          title: "Group by a property",
          description: "Bucket items and count each group.",
          code: "Get-Process | Group-Object Company | Sort-Object Count -Descending",
        },
      ],
    },
    {
      heading: "Aggregating",
      snippets: [
        {
          title: "Count, sum, and average",
          description: "Compute statistics over a property.",
          code: "Get-ChildItem -File | Measure-Object Length -Sum -Average -Maximum",
        },
        {
          title: "Count matching items",
          description: "How many items pass a filter.",
          code: "(Get-Service | Where-Object Status -eq 'Running').Count",
        },
      ],
    },
  ],
};
