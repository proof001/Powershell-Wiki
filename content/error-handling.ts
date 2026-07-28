import type { CheatSheet } from "@/lib/types";

export const errorHandling: CheatSheet = {
  slug: "error-handling",
  title: "Error Handling",
  description: "Catch exceptions, control error behavior, and validate input.",
  icon: "🛡️",
  tags: [
    "error",
    "exception",
    "try",
    "catch",
    "finally",
    "throw",
    "erroraction",
    "erroractionpreference",
    "validation",
    "trap",
    "fail",
    "handle error",
  ],
  groups: [
    {
      heading: "try / catch / finally",
      snippets: [
        {
          title: "Basic try/catch",
          description: "Handle a terminating error gracefully.",
          code: `try {
    Get-Content ".\\missing.txt" -ErrorAction Stop
} catch {
    Write-Warning "Failed: $($_.Exception.Message)"
}`,
        },
        {
          title: "Catch a specific exception type",
          description: "Handle different errors differently.",
          code: `try {
    1 / 0
} catch [System.DivideByZeroException] {
    "Cannot divide by zero"
} catch {
    "Some other error: $_"
}`,
        },
        {
          title: "finally block",
          description: "Always run cleanup, error or not.",
          code: `try {
    $conn = "open"
    # ... work ...
} finally {
    Write-Host "Cleaning up"
}`,
        },
      ],
    },
    {
      heading: "Controlling error behavior",
      snippets: [
        {
          title: "Make errors terminating",
          description: "Force a cmdlet error into the catch block.",
          code: "Remove-Item .\\x.txt -ErrorAction Stop",
        },
        {
          title: "Suppress errors",
          description: "Silently ignore non-critical errors.",
          code: "Get-ChildItem .\\maybe -ErrorAction SilentlyContinue",
        },
        {
          title: "Set the default for a script",
          description: "Treat all errors as terminating in a script.",
          code: '$ErrorActionPreference = "Stop"',
        },
        {
          title: "Throw your own error",
          description: "Raise a custom terminating error.",
          code: `if (-not $path) {
    throw "Path is required"
}`,
        },
      ],
    },
  ],
};
