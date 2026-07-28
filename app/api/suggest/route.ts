import OpenAI from "openai";

export const runtime = "edge";
export const maxDuration = 25;

const SYSTEM_PROMPT = `You are a PowerShell scripting expert helping users accomplish tasks.

The user will describe a goal in plain English. Respond with:
1. A short (2-4 sentence) explanation of the approach.
2. A single, complete, runnable PowerShell script in a \`\`\`powershell code block.
3. A brief note on anything to watch out for (permissions, destructive actions, prerequisites).

Rules:
- Prefer modern PowerShell (7+) cmdlets and idioms.
- Keep scripts practical and safe. If an action is destructive (deletes/overwrites), add a comment warning and prefer -WhatIf where sensible.
- Only answer PowerShell-related questions. If the goal is unrelated to PowerShell or scripting, briefly say so and suggest rephrasing.
- Be concise. Do not pad the response.`;

export async function POST(req: Request) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          "NVIDIA_API_KEY is not set. Add it to .env.local (local) or your Vercel project settings (deployed).",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let goal = "";
  try {
    const body = await req.json();
    goal = typeof body?.goal === "string" ? body.goal.trim() : "";
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!goal) {
    return new Response(JSON.stringify({ error: "Please describe a goal." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const client = new OpenAI({
    apiKey,
    baseURL: "https://integrate.api.nvidia.com/v1",
  });

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const completion = await client.chat.completions.create({
          model: "meta/llama-3.1-8b-instruct",
          max_tokens: 1500,
          stream: true,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: goal },
          ],
        });

        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(encoder.encode(`\n\n[Error contacting NVIDIA API: ${message}]`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
