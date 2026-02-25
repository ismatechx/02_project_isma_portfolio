# Ismail Uthuman — Portfolio

> Personal portfolio website for Ismail Uthuman, Senior Business Intelligence Analyst with 5+ years of experience in Tableau, Power BI, SQL, and cloud data platforms.

**Live Site:** [ismatechx.github.io/02_project_isma_portfolio](https://ismatechx.github.io/02_project_isma_portfolio/)

---

## Features

- Animated hero section with typewriter effect and floating data cards
- Scroll-reveal animations throughout
- Responsive mobile navigation
- Interactive skills, experience timeline, and certifications sections
- Project showcase (3+2 grid) with live Tableau dashboard embeds via modal
- Supabase-powered contact form — submissions stored in a real database
- Deployed on GitHub Pages (free, auto-deploys on push)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES Modules) |
| Fonts | Google Fonts — Inter |
| Database | Supabase (PostgreSQL) |
| Hosting | GitHub Pages |
| BI Embeds | Tableau Public Embed API |
| Version Control | Git / GitHub |

---

## Project Structure

```
02_project_isma_portfolio/
├── index.html              # Main single-page app
├── css/
│   └── style.css           # All styles and animations
├── js/
│   └── main.js             # JS — nav, typewriter, scroll reveal, modals, Supabase
├── assets/
│   └── images/
│       └── profile photo
├── Ismail_resume.pdf       # Downloadable CV
├── Ismail_CV.pdf
└── docs/
    ├── README.md           # This file
    ├── DESIGN.md           # Design decisions and system
    ├── TECHNICAL_SPEC.md   # Full technical specification
    └── PROJECT_BRIEF.md    # One-page project summary
```

---

## Local Setup

No build tools required. Just open in a browser:

```bash
# Clone the repository
git clone https://github.com/ismatechx/02_project_isma_portfolio.git

# Open directly in browser
open index.html
```

Or use a local server for best results:

```bash
# Using VS Code Live Server extension — right-click index.html → Open with Live Server
# OR using Python
python3 -m http.server 8000
# Then open http://localhost:8000
```

---

## Supabase Contact Form Setup

The contact form stores submissions in a Supabase PostgreSQL database.

### 1. Create the table

Run this in your Supabase SQL Editor:

```sql
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

grant usage on schema public to anon;
grant insert on public.contact_submissions to anon;
```

### 2. Set your credentials

In `js/main.js`, update:

```js
const supabase = createClient(
  'YOUR_SUPABASE_PROJECT_URL',
  'YOUR_SUPABASE_ANON_KEY'
);
```

### 3. View submissions

Supabase Dashboard → Table Editor → `contact_submissions`

---

## Deployment

The site auto-deploys to GitHub Pages on every push to `main`.

```bash
git add .
git commit -m "your message"
git push origin main
```

GitHub Pages settings: **Settings → Pages → Source: main branch / root**

---

## License

© 2026 Ismail Uthuman. All rights reserved.
