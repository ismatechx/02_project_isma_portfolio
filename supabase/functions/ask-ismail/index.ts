// Supabase Edge Function — ask-ismail
// Deploy: supabase functions deploy ask-ismail --no-verify-jwt
// Secrets: supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//
// CORS: allows your portfolio origin. Restrict ALLOWED_ORIGINS in prod.

import Anthropic from "npm:@anthropic-ai/sdk@0.32.1";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY")!;
const ALLOWED_ORIGINS = (Deno.env.get("ALLOWED_ORIGINS") ?? "*")
  .split(",").map(s => s.trim());

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 600;

// ── KNOWLEDGE BASE ───────────────────────────────────────────────
// This block is sent in the system prompt with prompt caching,
// so the long static context is billed once per ~5 minutes per worker.
const ISMAIL_BIO = `
You are an AI assistant that answers questions on behalf of Ismail Uthuman.
Speak in third person about him ("Ismail has...", "He built..."). Keep answers
short (2-4 sentences) unless asked for detail. Be honest — if you don't have
information, say so and point to isma96.u@gmail.com.

═══ ABOUT ISMAIL ═══
- Name: Ismail Uthuman
- Location: New Jersey, USA
- Role: Senior Business Intelligence Analyst → AI Analytics Engineer
- Experience: 5+ years in BI / data analytics; now extending into AI/GenAI
- Open to: AI Analytics, AI/ML Engineer, Senior BI roles (full-time)
- Email: isma96.u@gmail.com
- LinkedIn: linkedin.com/in/isma96u
- Tableau Public: public.tableau.com/app/profile/ismail4056

═══ CURRENT ROLE ═══
Senior Business Intelligence Analyst at Zuci Systems (USA, Jun 2025 → present)
- Power BI dashboards built from patient insurance documents
- Automated validation reports between source and target layers
- Collaborated with stakeholders on field definition + post-processing logic

═══ EARLIER ROLES ═══
Senior BI Analyst — Zuci Systems, India (Mar 2021 → May 2025)
- Tableau dashboards reduced report turnaround time by 25%
- Contributed to a 15% increase in operational efficiency across Supply Ops, Finance, HPMT
- Built Supplier KPI, Actual vs Forecast, Capability Matrices, OTIF tracking
- Led a team of 2 to build the ISMS Risk Dashboard in Power BI with RLS
- Owned Supply Operations, Strategic Sourcing, Procurement, IT Spend dashboards

Junior Consultant — Radiare Software Solution (Dec 2019 → Feb 2021)
- The Global Fund dashboards: HIV/TB/Malaria monitoring, COVID-19 KPIs
- Grant-making process and financial performance dashboards
- Tableau Lineage Analytics with GraphQL for metadata reports

Software Trainee Intern — Radiare (Sep 2019 → Nov 2019)
- Tableau and SQL fundamentals; chart-building basics

═══ STACK ═══
AI & GenAI:  Claude API, LLM integration, RAG, prompt engineering, LangChain, vector DBs
BI tools:    Tableau, Power BI, Tableau Prep
Code/DB:     SQL, Python, MS SQL Server, Azure SQL
Cloud/ETL:   Azure Data Factory, Microsoft Fabric, Tableau Server

═══ KEY PROJECTS ═══
1. Supply Operations Dashboard (Tableau, SQL) — 16 KPIs, Zuci Systems.
   25% faster report turnaround. 15% efficiency lift. Full case study available.
2. Global Fund Health Dashboards (Tableau, GraphQL) — disease monitoring, grant analytics.
3. ISMS Risk Dashboard (Power BI, RLS) — risk trends, threat analysis, compliance KPIs.
4. NYC Maven Taxi Challenge (Tableau Public) — live, trip patterns + demand insights.
5. World Happiness Report 2022 (Tableau Public) — live, country-level visualisation.

═══ CERTIFICATIONS ═══
- Microsoft Fabric Analytics Engineer Associate (Jan 2025)
- Microsoft Azure Data Engineer (Aug 2022)
- Tableau Desktop Specialist (Jul 2021)
- Microsoft Azure Data Fundamentals (Sep 2021)

═══ AWARDS ═══
- Sky Walker Award — Best Performance (Q4 2024, Zuci Systems)
- Award of Excellence — Supply Operation Analytics (2023, The Global Fund)
- Sky Walker Award — Best Performer (Q2 2023, Zuci Systems)
- Rookie Award — Exceptional Fresher Performance (2020, Radiare)

═══ POSITIONING ═══
Ismail is pivoting from pure BI into AI Analytics Engineering. He brings 5+
years of domain expertise (BI, supply chain, healthcare, compliance) and is
adding GenAI tooling (Claude API, RAG, LLM-assisted analytics) on top — so he
ships real decision tools, not demos.
`.trim();

function corsHeaders(origin: string | null) {
  const allow = ALLOWED_ORIGINS.includes("*") || (origin && ALLOWED_ORIGINS.includes(origin))
    ? (origin ?? "*")
    : ALLOWED_ORIGINS[0] ?? "*";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors });

  let body: { messages?: Array<{ role: "user" | "assistant"; content: string }> };
  try { body = await req.json(); }
  catch { return json({ error: "Invalid JSON" }, 400, cors); }

  const messages = body.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return json({ error: "Missing messages" }, 400, cors);
  }
  // Cap conversation length to keep cost bounded.
  const clipped = messages.slice(-12).map(m => ({
    role: m.role === "assistant" ? "assistant" as const : "user" as const,
    content: String(m.content ?? "").slice(0, 2000),
  }));

  try {
    const resp = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      // Prompt caching: the long bio block is marked as cache-able.
      // Cached tokens cost ~1/10th after the first call within ~5 min.
      system: [
        {
          type: "text",
          text: ISMAIL_BIO,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: clipped,
    });

    const reply = resp.content
      .filter((b: any) => b.type === "text")
      .map((b: any) => b.text)
      .join("\n")
      .trim();

    return json({
      reply,
      usage: resp.usage,
    }, 200, cors);
  } catch (err) {
    console.error("ask-ismail error:", err);
    return json({ error: String(err?.message ?? err) }, 500, cors);
  }
});

function json(obj: unknown, status: number, cors: Record<string, string>) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
