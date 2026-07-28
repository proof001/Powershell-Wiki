import type { CheatSheet } from "@/lib/types";

export const systemAdministration: CheatSheet = {
  slug: "system-administration",
  title: "System Administration",
  description: "Manage processes, services, the registry, and event logs.",
  icon: "⚙️",
  tags: [
    "process",
    "service",
    "kill process",
    "start service",
    "stop service",
    "registry",
    "event log",
    "task",
    "reboot",
    "environment variable",
    "admin",
    "system",
  ],
  groups: [
    {
      heading: "Processes",
      snippets: [
        {
          title: "List running processes",
          description: "Show all processes, sorted by memory use.",
          code: "Get-Process | Sort-Object WorkingSet -Descending",
        },
        {
          title: "Find a process by name",
          description: "Look up a specific process.",
          code: "Get-Process -Name chrome",
        },
        {
          title: "Stop a process",
          description: "Kill a process by name or ID.",
          code: "Stop-Process -Name notepad -Force",
        },
      ],
    },
    {
      heading: "Services",
      snippets: [
        {
          title: "List services",
          description: "Show all services and their status.",
          code: "Get-Service | Where-Object Status -eq 'Running'",
        },
        {
          title: "Start or stop a service",
          description: "Control a Windows service by name.",
          code: `Start-Service -Name Spooler
Stop-Service -Name Spooler`,
        },
        {
          title: "Restart a service",
          description: "Cycle a service off and on.",
          code: "Restart-Service -Name Spooler",
        },
      ],
    },
    {
      heading: "Registry and environment",
      snippets: [
        {
          title: "Read a registry value",
          description: "Get a value from the Windows registry.",
          code: 'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" -Name ProductName',
        },
        {
          title: "Read an environment variable",
          description: "Access an environment variable.",
          code: "$env:PATH",
        },
        {
          title: "Set an environment variable (permanent)",
          description: "Persist a variable for the current user.",
          code: '[Environment]::SetEnvironmentVariable("MY_VAR", "value", "User")',
        },
      ],
    },
    {
      heading: "Event logs and system info",
      snippets: [
        {
          title: "Read recent system errors",
          description: "Get the 20 most recent error events.",
          code: "Get-WinEvent -LogName System -MaxEvents 20 | Where-Object LevelDisplayName -eq 'Error'",
        },
        {
          title: "Get computer info",
          description: "Show OS and hardware details.",
          code: "Get-ComputerInfo | Select-Object CsName, OsName, OsVersion, CsTotalPhysicalMemory",
        },
      ],
    },
  ],
};
