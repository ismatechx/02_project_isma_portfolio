# ask-ismail — Supabase Edge Function

Proxies the portfolio's chat widget to Claude with prompt caching and a knowledge base about Ismail.

## Deploy

```bash
# 1. Install / login (one-time)
npm i -g supabase
supabase login
supabase link --project-ref rubhvlgacxjncohamfnz   # your project ref

# 2. Set secrets
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
# optional — restrict to your domain instead of "*"
supabase secrets set ALLOWED_ORIGINS=https://ismatechx.github.io,http://localhost:8765

# 3. Deploy
supabase functions deploy ask-ismail --no-verify-jwt
```

After deploy the endpoint is:
```
https://<project-ref>.supabase.co/functions/v1/ask-ismail
```

The frontend already points at `https://rubhvlgacxjncohamfnz.supabase.co/functions/v1/ask-ismail` — if your project ref is different, set it via:

```html
<script>window.ASK_ISMAIL_ENDPOINT = "https://<ref>.supabase.co/functions/v1/ask-ismail";</script>
```

## Model & cost

- Model: `claude-sonnet-4-6`
- `max_tokens: 600`
- Prompt caching enabled on the system block (~2k tokens of bio). First call pays full price; subsequent calls within ~5 minutes pay ~1/10th for the cached portion.
- Conversation is clipped to the last 12 turns to bound cost.

## Edit the knowledge base

Update `ISMAIL_BIO` in `index.ts` and re-deploy. Keep it focused — denser context = better answers + cheaper prompts.

## (Optional) Rate limiting

Add this table + use it in the function if you want per-IP limits:

```sql
create table if not exists public.ask_ismail_rate (
  ip text primary key,
  count int not null default 0,
  window_start timestamptz not null default now()
);
```
