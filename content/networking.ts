import type { CheatSheet } from "@/lib/types";

export const networking: CheatSheet = {
  slug: "networking",
  title: "Networking",
  description: "Test connectivity, make web requests, and inspect network config.",
  icon: "🌐",
  tags: [
    "network",
    "ping",
    "test-connection",
    "http",
    "web request",
    "download",
    "api",
    "dns",
    "ip address",
    "port",
    "tcp",
    "curl",
    "rest",
  ],
  groups: [
    {
      heading: "Connectivity tests",
      snippets: [
        {
          title: "Ping a host",
          description: "Modern replacement for ping.",
          code: "Test-Connection -TargetName google.com -Count 4",
        },
        {
          title: "Test a specific TCP port",
          description: "Check whether a port is open and reachable.",
          code: "Test-NetConnection -ComputerName example.com -Port 443",
        },
        {
          title: "Resolve a DNS name",
          description: "Look up the IP addresses for a hostname.",
          code: "Resolve-DnsName -Name example.com",
        },
      ],
    },
    {
      heading: "Web requests and APIs",
      snippets: [
        {
          title: "Download a file",
          description: "Fetch a file from a URL to disk.",
          code: 'Invoke-WebRequest -Uri "https://example.com/file.zip" -OutFile ".\\file.zip"',
        },
        {
          title: "Call a REST API (JSON)",
          description: "Get JSON and auto-parse it into objects.",
          code: 'Invoke-RestMethod -Uri "https://api.github.com/repos/PowerShell/PowerShell"',
        },
        {
          title: "POST JSON to an API",
          description: "Send a JSON body with headers.",
          code: `$body = @{ name = "demo" } | ConvertTo-Json
Invoke-RestMethod -Uri "https://httpbin.org/post" -Method Post -Body $body -ContentType "application/json"`,
        },
      ],
    },
    {
      heading: "Interface and IP configuration",
      snippets: [
        {
          title: "Show network adapters",
          description: "List all network interfaces and their status.",
          code: "Get-NetAdapter",
        },
        {
          title: "Show IP addresses",
          description: "List configured IPv4 addresses.",
          code: "Get-NetIPAddress -AddressFamily IPv4",
        },
        {
          title: "Show active TCP connections",
          description: "List established connections and owning process.",
          code: "Get-NetTCPConnection -State Established",
        },
      ],
    },
  ],
};
