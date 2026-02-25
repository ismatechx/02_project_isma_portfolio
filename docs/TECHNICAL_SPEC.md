# Technical Specification — Ismail Uthuman Portfolio

## Project Overview

| Property | Detail |
|---|---|
| **Type** | Static single-page portfolio website |
| **Owner** | Ismail Uthuman |
| **Live URL** | https://ismatechx.github.io/02_project_isma_portfolio/ |
| **Repository** | https://github.com/ismatechx/02_project_isma_portfolio |
| **Last Updated** | February 2026 |

---

## Architecture

```
Browser
  └── GitHub Pages (static hosting)
        └── index.html + css/style.css + js/main.js
              └── Supabase REST API (contact form inserts)
              └── Tableau Public Embed API (dashboard modals)
```

No build tools, no bundler, no framework. Pure HTML/CSS/JS.
JavaScript uses **ES Modules** (`type="module"`) for the Supabase import.

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Page structure and semantics |
| CSS3 | — | Styling, animations, responsive layout |
| JavaScript | ES2020+ | Interactivity, Supabase client, Tableau loader |
| Google Fonts (Inter) | — | Typography |

### Backend / Services
| Service | Plan | Purpose |
|---|---|---|
| **Supabase** | Free | PostgreSQL database for contact form submissions |
| **GitHub Pages** | Free | Static site hosting, auto-deploy from `main` branch |
| **Tableau Public** | Free | Embedded interactive dashboards |

---

## File Structure

```
02_project_isma_portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── images/
│       └── [profile photo].jpeg
├── Ismail_resume.pdf
├── Ismail_CV.pdf
├── README.md
└── docs/
    ├── DESIGN.md
    ├── TECHNICAL_SPEC.md       ← this file
    ├── PROJECT_BRIEF.md
    └── README.md
```

---

## JavaScript Modules (main.js)

| Module | Functionality |
|---|---|
| **Nav** | Scroll → adds `scrolled` class to header for blur backdrop; active link tracking |
| **Mobile Nav** | Hamburger toggle, close on link click |
| **Typewriter** | Cycles through role titles with typing/deleting animation |
| **Scroll Reveal** | `IntersectionObserver` on `.reveal` elements — staggered fade-up on enter |
| **Tableau Modals** | Lazy-loads Tableau embed script on first modal open; supports multiple dashboards via `data-viz` attribute |
| **Contact Form** | Async submit to Supabase `contact_submissions` table; UI state (Sending → Sent/Error) |

---

## Supabase Integration

### Connection
```js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(PROJECT_URL, ANON_KEY);
```

### Database Schema

**Table: `contact_submissions`**

| Column | Type | Constraints |
|---|---|---|
| `id` | `uuid` | Primary key, `gen_random_uuid()` |
| `name` | `text` | NOT NULL |
| `email` | `text` | NOT NULL |
| `message` | `text` | NOT NULL |
| `created_at` | `timestamptz` | Default: `now()` |

### Security

| Setting | Value |
|---|---|
| Row Level Security | Disabled (insert-only public table) |
| Permissions granted | `anon` role: `INSERT` on `contact_submissions` |
| Key used in frontend | Publishable (anon) key only — safe to expose |
| Service role key | Never used in frontend |

---

## Tableau Embed Integration

Dashboards are embedded lazily — the Tableau JS API script is only injected into the DOM when the user opens the modal for the first time.

### Supported Dashboards

| ID | Dashboard | Viz ID |
|---|---|---|
| 1 | NYC Maven Taxi Challenge | `viz1771970012538` |
| 2 | World Happiness Report 2022 | `viz1771976526694` |

### Modal Behaviour
- Triggered by `.tableau-modal-btn[data-viz="<vizId>"]`
- `vizModalMap` object maps viz IDs to their modal element IDs
- Each viz is loaded only once (`vizLoaded` flag per viz ID)
- Closed by: close button, overlay click, or `Escape` key

---

## Deployment

### GitHub Pages
- Source: `main` branch, root `/`
- Auto-deploys on every `git push origin main`
- Build time: ~30–60 seconds after push
- HTTPS enforced

### Deploy Workflow
```bash
git add .
git commit -m "description"
git push origin main
# Site live at: https://ismatechx.github.io/02_project_isma_portfolio/
```

---

## Performance Considerations

| Technique | Detail |
|---|---|
| Lazy Tableau loading | Tableau JS API only loads when modal is opened |
| CSS cache busting | `?v=N` query param on stylesheet link |
| No framework overhead | Pure HTML/CSS/JS — zero bundle size |
| Font preconnect | `<link rel="preconnect">` for Google Fonts |
| Scroll reveal | `IntersectionObserver` (native, no library) |

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | Full |
| Firefox 88+ | Full |
| Safari 14+ | Full (`backdrop-filter` supported) |
| Edge 90+ | Full |
| Mobile (iOS/Android) | Responsive, floating cards hidden on small screens |

---

## Known Limitations

| Issue | Detail |
|---|---|
| Contact form RLS | Supabase `sb_publishable_` key format doesn't map to `anon` RLS role — RLS disabled on `contact_submissions` table |
| Email notifications | Not yet implemented — form stores to DB only |
| No form spam protection | No CAPTCHA or rate limiting on contact form |
