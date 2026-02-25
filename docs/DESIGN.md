# Design Document — Ismail Uthuman Portfolio

## Overview

A dark-themed, single-page portfolio designed to reflect a professional BI Analyst's brand — clean, data-driven, and modern. The design prioritizes readability, visual hierarchy, and subtle interactivity.

---

## Design Philosophy

| Principle | Application |
|---|---|
| **Data-inspired** | Floating metric cards in the hero, stat counters, chart-like gradients |
| **Dark & premium** | Deep navy/charcoal backgrounds with teal accent — feels professional |
| **Minimal noise** | Muted secondary text, restrained use of color, no clutter |
| **Progressive disclosure** | Scroll-reveal animations guide the user through content naturally |

---

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `--clr-bg` | `#060d14` | Page background |
| `--clr-surface` | `#0c1822` | Section backgrounds, cards |
| `--clr-surface-2` | `#111f2e` | Elevated cards, inputs |
| `--clr-accent` | `#00d4aa` | Primary accent — teal/green |
| `--clr-accent-hover` | `#00b891` | Hover state for accent |
| `--clr-accent-glow` | `rgba(0,212,170,0.15)` | Glow effects, hover fills |
| `--clr-text` | `#e2eeff` | Primary text |
| `--clr-muted` | `#6b8faf` | Secondary/supporting text |
| `--clr-border` | `#162536` | Borders, dividers |

---

## Typography

| Element | Font | Size | Weight |
|---|---|---|---|
| Font family | Inter (Google Fonts) | — | — |
| Hero H1 | Inter | `clamp(2.8rem, 7vw, 5.5rem)` | 800 |
| Section titles | Inter | `1.9rem` | 800 |
| Card headings | Inter | `0.92rem` | 700 |
| Body text | Inter | `0.88–0.97rem` | 400 |
| Labels / tags | Inter | `0.68–0.75rem` | 600–700 |

---

## Spacing & Layout

- **Container max-width:** 1080px, centered, 2rem horizontal padding
- **Section padding:** 7rem top/bottom
- **Border radius:** `--radius: 10px`, `--radius-lg: 16px`
- **Grid gaps:** 1.25–1.5rem

---

## Section Layout Breakdown

### Hero
- Full viewport height (`min-height: 100vh`)
- 3 animated background orbs (blur, float animation)
- Dot-grid overlay (radial gradient mask)
- 4 floating data metric cards (positioned absolutely, corner-anchored)
- Centered hero content with typewriter tagline
- Scroll indicator with bouncing animation

### About
- 2-column grid: photo (220×220px, rounded) + text + stat counters

### Skills
- Grouped by category (BI Tools / Programming & DB / Cloud & ETL)
- Pill-shaped skill badges with hover glow

### Experience
- Vertical timeline with gradient line
- Cards with date badge, company label, bullet points

### Projects
- **Row 1:** 3 equal cards (grid-column: span 2 each, 6-column base)
- **Row 2:** 2 wider cards (grid-column: span 3 each)
- Each card: gradient banner + project number + emoji icon + meta badges + tags
- Live projects include "View Dashboard" button opening a Tableau modal

### Certifications & Awards
- 2-column grid: Certifications (left) | Awards (right)
- Icon + name + date format

### Contact
- 2-column: contact links (left) + contact form (right)
- Form connects to Supabase on submit

---

## Animations

| Animation | Element | Details |
|---|---|---|
| `orbFloat` | Hero background orbs | 10–16s float, alternate, infinite |
| `floatCard` | Hero metric cards | 5s vertical float, staggered delays |
| `pulse` | Hero badge dot | 2s pulse with box-shadow glow |
| `blink` | Typewriter cursor | 0.75s step-end blink |
| `bounce` | Scroll indicator | 2.5s translateY bounce |
| `taxiShimmer` | NYC Taxi card banner | 2.5s sweep shimmer |
| `taxiGlow` | NYC Taxi card border | 2.5s glow pulse alternate |
| Scroll reveal | `.reveal` elements | IntersectionObserver, translateY(24px) → 0, staggered 80ms |

---

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `max-width: 900px` | Floating hero cards hidden |
| `max-width: 768px` | Mobile nav (hamburger), about grid → 1col, certs → 1col, contact → 1col, projects → 1col |

---

## Component States

| Component | Default | Hover | Active/Focus |
|---|---|---|---|
| Nav links | Muted color | White + surface-2 bg | Accent color |
| Buttons (.btn) | Teal fill | Darker teal + lift + shadow | — |
| Skill cards | Surface bg | Accent border + glow | — |
| Project cards | Border | Lift + accent border + shadow | — |
| Timeline cards | Surface-2 bg | Accent border glow | — |
| Form inputs | Surface bg | Accent border + ring | — |
