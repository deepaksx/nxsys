# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The NXSYS corporate website (SAP consulting firm, UAE) — a pure static multi-page site. Plain HTML5/CSS/JS: no framework, no build step, no package.json, no tests. Editing a file and refreshing the browser is the whole dev loop.

## Development

- Preview locally by opening any `.html` file directly, or serve the folder: `python -m http.server 8000`
- There is no lint/build/test tooling.

## Deployment

Deployed on **AWS Amplify Hosting** (app `d1fir3ywz6obz5`, region `ap-south-1`, in the personal AWS account — profile `personal`, account 329643601284, NOT the default profile). Live at https://www.nxsys.com.

- Every push to `main` on `github.com/deepaksx/nxsys` auto-deploys — pushing to main IS deploying to production.
- Amplify has a catch-all rewrite `/<*>` → `/index.html` (404-200), so broken links render the homepage instead of a 404.
- `render.yaml` and the README's Render/deployment instructions are legacy from the previous Render hosting; ignore them.
- The AWS CLI on this machine has an empty `AWS_REGION` env var that breaks it — always pass `--profile personal --region ap-south-1` explicitly.

## Architecture

### Every page is standalone — shared chrome is duplicated

There are ~30 top-level pages (`index.html`, `services-*.html`, `solutions-*.html`, `industry-*.html`, `about-*.html`, `ai-*.html`, `contact.html`, etc.). There is no templating: **the header/nav and footer markup is copy-pasted into every page**. Any change to navigation, footer, or shared page chrome must be replicated across all HTML files — grep for a nav landmark (e.g. a menu label) to find every copy.

### CSS and JS layering

- `styles-new.css` is the **active** global stylesheet, linked by every page. Brand colors live in its `:root` CSS variables: `--primary-color: #C8102E` (crimson red), `--secondary-color: #1a1a1a` (black) — always use the variables, never hardcode.
- `script.js` is loaded by every page (nav/interactivity/animations).
- Icons come from Lucide via CDN (`unpkg.com/lucide@latest`); pages call `lucide.createIcons()`.
- `parallax-engine.js` + `parallax-effects.css` are used only by the parallax pages (`index.html`, `ai-innovation.html`, `ai-partner.html`); `ai-styles.css` only by the two `ai-*` pages.
- Pages also carry substantial page-specific CSS in inline `<style>` blocks in their `<head>`.

### Legacy/dead files — do not extend these

`styles.css` (superseded by `styles-new.css`), `ai-animations.js` (referenced by nothing), `index-backup.html`, `index-old-backup.html`, `index-parallax.html`, `render.yaml`.

### Contact forms

Forms post to **Formspree** (no backend) — e.g. `ai-partner.html` uses `https://formspree.io/f/xeoqdkjl`. Setup details in `FORMSPREE-SETUP-GUIDE.md`.
