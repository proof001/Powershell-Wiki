import type { CheatSheet } from "@/lib/types";

export const fileSystem: CheatSheet = {
  slug: "file-system",
  title: "File System",
  description: "Navigate, read, and manage files and directories.",
  icon: "📁",
  tags: [
    "files",
    "folders",
    "directories",
    "get-childitem",
    "copy",
    "move",
    "delete",
    "remove",
    "rename",
    "path",
    "io",
    "read file",
    "write file",
  ],
  groups: [
    {
      heading: "Listing files and folders",
      snippets: [
        {
          title: "List items in a directory",
          description: "Show files and folders in the current location.",
          code: "Get-ChildItem",
        },
        {
          title: "List recursively",
          description: "Include everything in subfolders too.",
          code: "Get-ChildItem -Path C:\\Projects -Recurse",
        },
        {
          title: "Filter by extension",
          description: "Only return files matching a pattern.",
          code: "Get-ChildItem -Path . -Filter *.log -Recurse",
        },
        {
          title: "Only files (no directories)",
          description: "Exclude folders from the results.",
          code: "Get-ChildItem -File",
        },
      ],
    },
    {
      heading: "Creating and removing",
      snippets: [
        {
          title: "Create a new folder",
          description: "Make a directory (parents created as needed).",
          code: 'New-Item -Path ".\\reports\\2026" -ItemType Directory -Force',
        },
        {
          title: "Create an empty file",
          description: "Make a new empty file.",
          code: 'New-Item -Path ".\\notes.txt" -ItemType File',
        },
        {
          title: "Delete a file or folder",
          description: "Remove an item; -Recurse for non-empty folders.",
          code: 'Remove-Item -Path ".\\temp" -Recurse -Force',
        },
      ],
    },
    {
      heading: "Copy, move, rename",
      snippets: [
        {
          title: "Copy a file",
          description: "Copy a file to another location.",
          code: 'Copy-Item -Path ".\\report.docx" -Destination "D:\\Backup\\"',
        },
        {
          title: "Move a file",
          description: "Move (or cut) a file to another folder.",
          code: 'Move-Item -Path ".\\report.docx" -Destination "D:\\Archive\\"',
        },
        {
          title: "Rename a file",
          description: "Change a file or folder name.",
          code: 'Rename-Item -Path ".\\old.txt" -NewName "new.txt"',
        },
        {
          title: "Bulk rename with a prefix",
          description: "Add a date prefix to every .txt file in a folder.",
          code: 'Get-ChildItem -Filter *.txt | Rename-Item -NewName { "2026-07-27_" + $_.Name }',
        },
      ],
    },
    {
      heading: "Reading and writing content",
      snippets: [
        {
          title: "Read a whole file",
          description: "Get the full contents of a text file.",
          code: 'Get-Content -Path ".\\log.txt" -Raw',
        },
        {
          title: "Read the last N lines",
          description: "Tail the end of a file.",
          code: 'Get-Content -Path ".\\log.txt" -Tail 20',
        },
        {
          title: "Write text to a file",
          description: "Overwrite a file with new content.",
          code: 'Set-Content -Path ".\\out.txt" -Value "Hello world"',
        },
        {
          title: "Append text to a file",
          description: "Add a line without overwriting.",
          code: 'Add-Content -Path ".\\log.txt" -Value "New entry"',
        },
      ],
    },
  ],
};
