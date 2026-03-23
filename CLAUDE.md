@AGENTS.md

# Florada Fonte de Mel - Project Context

## Overview

Website for **Florada Fonte de Mel**, an artisanal honey business owned by Lucimar (mom of Aurélio Rosa / @balancejunkie). Based in **Anápolis, Goiás, Brazil**. Family has 40+ years of beekeeping in the cerrado biome.

- **Live site**: https://floradamel.com (also floradamel.com.br)
- **GitHub**: github.com/balancejunkie/florada
- **Deployed on**: Vercel (CLI deploys from master branch)
- **Domains**: floradamel.com (Cloudflare DNS proxy), floradamel.com.br (registro.br - may need DNS zone config: A record `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`)

## Tech Stack

- **Next.js 16.2.0** with App Router, TypeScript, React 19
- **Tailwind CSS v4** using `@theme inline` for custom tokens in globals.css
- **Google Fonts** via `next/font/google`: Playfair Display (display), Inter (sans), Caveat (accent/handwriting)
- **Sharp** for image processing (logo bg removal, OG image generation)
- **No CMS** - all content in `src/i18n/translations.ts` (PT/EN bilingual)

## Brand Design System

- **Colors**: Cream `#FDF8F0`, Forest Green `#1A4D2E`, Honey Gold `#D4A017`, Amber `#FF9900`, Earth `#1C1610`
- **Fonts**: Playfair Display (headings), Inter (body), Caveat (accents like subtitle)
- **Tone**: Minimalistic, warm, natural. Portuguese is the primary language with EN toggle.

## Architecture

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 theme, animations, custom CSS
│   ├── layout.tsx           # Root layout, fonts, metadata, viewport, LanguageProvider
│   ├── page.tsx             # Single-page site: Hero, Story, Gallery, Media, Contact/Footer
│   └── opengraph-image.png  # OG image (bee on forest green bg for WhatsApp sharing)
├── components/
│   ├── HeroVideo.tsx        # Dual-video crossfade loop, HEVC/H264 fallback, color sampling
│   ├── Nav.tsx              # Fixed nav, scroll-based bg, mobile hamburger, language toggle
│   └── FadeInSection.tsx    # IntersectionObserver scroll fade-in wrapper
└── i18n/
    ├── LanguageContext.tsx   # React Context for PT/EN, localStorage persistence
    └── translations.ts      # All site copy in both languages
```

## Key Technical Details

### Hero Video System
- **3 videos** rotate on page reloads via `sessionStorage` counter
- Order: hero-loop-3 (main) → hero-loop-2 → hero-loop-web
- Each video has **HEVC (4K original)** + **H.264 (4K re-encoded fallback)**
- HEVC detection via `canPlayType('video/mp4; codecs="hvc1"')`
- **Dual-video crossfade**: two `<video>` elements with opacity transitions. When video A nears its end (1s before), video B starts from 0 and fades in. Creates seamless infinite loop.
- **Dynamic color sampling**: On first frame, samples top pixels of video via canvas and sets `<meta name="theme-color">` so iOS Safari status bar matches the video. Also samples bottom pixels to set the hero-to-content ribbon color.

### Video Files (public/videos/)
| File | Codec | Purpose |
|------|-------|---------|
| hero-loop-3-hevc.mp4 | HEVC 4K | Primary - new main video (original) |
| hero-loop-3.mp4 | H.264 4K | Primary - Firefox fallback |
| hero-loop-2-hevc.mp4 | HEVC 4K | Second rotation (original) |
| hero-loop-2.mp4 | H.264 4K | Second - Firefox fallback |
| hero-loop-web-hevc.mp4 | HEVC 4K | Third rotation (original) |
| hero-loop-web.mp4 | H.264 4K | Third - Firefox fallback |

Source mapping (originals are HEVC, excluded from git/deploy):
- hero-loop-3 ← `openart-video_..._1773978621444_1773978622142.mp4`
- hero-loop-2 ← `openart-video_..._1773972257576_1773972258127.mp4`
- hero-loop-web ← `openart-video_..._1773970209660_1773970210150.mp4`

### Image Rules (from owner)
- **AI-generated images**: OK for hero section, about/story section. NOT for gallery.
- **Gallery**: Only real archive photos of mom, bees, honey jars. No AI.
- **Logo**: `public/images/logo/logo.png` - 400x400 transparent PNG, white bg removed with sharp (brightness+saturation threshold + alpha feathering)

### iOS Safari Handling
- `viewport-fit: cover` in viewport export to extend behind Dynamic Island
- `theme-color` meta tag dynamically set from video's top pixels
- Hero ribbon below video section blends video bottom edge → cream via CSS variable `--ribbon-color` set by JS
- Body background is cream `#FDF8F0`

### Sections on page.tsx
1. **Hero**: Full-screen video with crossfade loop, title + Caveat subtitle, scroll chevron
2. **Nossa História / Our Story**: Two blocks - origins (old photo + text) and bees/mission (AI bee image + stats: 40+ years, 3 generations, 70% pollination)
3. **Galeria / Gallery**: CSS columns layout (2 on mobile, 3 on desktop) with real photos only. Currently 7 images.
4. **Na Mídia / In the Media**: Two YouTube embeds - Agrovivendo interview (DIrEm8kbQtA) + TeslaVision contest winner (Yl8WSyjp0T4)
5. **Contato / Contact + Footer**: WhatsApp CTA with pre-populated message, location (Anápolis GO), Instagram link, phone number

### WhatsApp Integration
- Number: 5562984136020
- Pre-populated message changes based on locale (PT/EN)
- Link format: `https://wa.me/5562984136020?text=...`

### OG Image (WhatsApp sharing preview)
- `src/app/opengraph-image.png` - 1200x630
- AI bee approaching cerrado wildflower (`auleo_photorealistic_honey_bee_approaching_a_cerrado_wildflower_1d0e7dce...`) on forest green background
- Generated via sharp with white background removal

## Deployment

```bash
# Build
npm run build

# Deploy to Vercel production
vercel --prod

# Git
git push origin master
```

- `.vercelignore` excludes: openart source videos, hero-loop.mp4, instagram folder, *.webp
- `.gitignore` same exclusions plus .env, node_modules, .next

## User Preferences (Aurélio)

- Keep site **minimalistic**
- **No em dashes (—)** in copy - "makes people think it's AI generated"
- All Portuguese text must have **proper accents** (História, Mídia, Anápolis, começou, profissão, missão, contribuições, polinização, gerações, tradição, etc.)
- Subtitle "Mel puro do cerrado goiano" uses **Caveat font** (font-accent class)
- Gallery should have **variety** - not too many honey jar photos
- Prefers **4K native quality** for videos - don't downscale unless necessary
- Videos should use **original HEVC files** as primary, H.264 as fallback only
- Don't push to prod without checking locally first (unless can't check on device)

## Known Issues / In Progress

- **iOS Safari bars**: Top bar (Dynamic Island area) and bottom bar show body background color. Dynamic theme-color sampling helps for top. Bottom ribbon blends video edge into content. Still not perfect - may need further refinement.
- **registro.br DNS**: May still need DNS zone configuration once transition completes (A record + CNAME for .com.br domain)
- **Video looping**: Uses crossfade technique. If it ever freezes, check the timeupdate event listeners and ensure `current.duration` is not NaN before comparison.

## YouTube Video IDs

- Agrovivendo interview: `DIrEm8kbQtA`
- TeslaVision "Honey From the Future": `Yl8WSyjp0T4`

## Family Background (for writing copy)

Lucimar started beekeeping at 18 on a farm in Goiás. Her parents were pioneers from Minas Gerais. She works with Africanized bees native to the cerrado. Her son Aurélio (the site owner) helps with the business and technology side. The honey comes from native cerrado flowers: cipozinho, assa-peixe, angico, and mixed wildflowers. Each honey has different color/flavor based on floral source. The family motto is "Sem abelha, sem vida" (No bees, no life). Lucimar won a Tesla community video contest. The business is based in Anápolis, Goiás, Brazil.
