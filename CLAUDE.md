# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The NXSYS corporate website (SAP consulting firm, UAE) — a pure static multi-page site. Plain HTML5/CSS/JS: no framework, no build step, no package.json, no tests. Editing a file and refreshing the browser is the whole dev loop.

## Development

- Preview locally by opening any `.html` file directly, or serve the folder: `python -m http.server 8000`
- There is no lint/build/test tooling.

## Deployment — TWO PHRASES, NOTHING ELSE

Hosted on **AWS Amplify Hosting** (app `d1fir3ywz6obz5`, region `ap-south-1`, personal AWS account 329643601284, profile `personal` — NOT the default profile). Live at https://www.nxsys.com. Monitor view: Nexora → Admin area → Websites.

There are exactly two branches and the owner only ever says two things:

1. **"Put it on test"** (or any request to change the site): make the change on branch `staging`, commit, `git push origin staging`. This updates ONLY the password-protected test copy (https://staging.d1fir3ywz6obz5.amplifyapp.com, login shown in Nexora → Websites → Test copy). It never touches the live site. Do this by default for every change.
2. **"Publish"** (or "go live"): merge `staging` into `main` (fast-forward) and `git push origin main`. This IS the production deploy. **Never push to `main` unless the owner has just said "publish" in this conversation.** After pushing, confirm the live site and that Nexora shows "live = GitHub main".

Rules: never commit directly to `main`; never push `main` for any other reason; to undo a publish, revert the commit on `main` and push (only when asked). The "Rebuild" button in Nexora only retries the build of what is already on `main` — it does not publish test changes.

AWS CLI: the machine has an empty `AWS_REGION` env var that breaks it — always pass `--profile personal --region ap-south-1`. Amplify has a catch-all rewrite `/<*>` → `/index.html` (404-200), so broken links render the homepage. `render.yaml` and the README's Render instructions are legacy; ignore them.

## Architecture

### Every page is standalone — shared chrome is duplicated

There are ~30 top-level pages (`index.html`, `services-*.html`, `solutions-*.html`, `industry-*.html`, `about-*.html`, `ai-*.html`, `contact.html`, etc.). There is no templating: **the header/nav and footer markup is copy-pasted into every page**. Any change to navigation, footer, or shared page chrome must be replicated across all HTML files — grep for a nav landmark (e.g. a menu label) to find every copy.

### CSS and JS layering

- `styles-new.css` is the **active** global stylesheet, linked by every page. Brand colors live in its `:root` CSS variables: `--primary-color: #C8102E` (crimson red), `--secondary-color: #1a1a1a` (black) — always use the variables, never hardcode.
- `script.js` is loaded by every page (nav/interactivity/animations).
- Icons come from Lucide via CDN (`unpkg.com/lucide@latest`); pages call `lucide.createIcons()`.
- `parallax-effects.css` is used by `index.html`, `ai-innovation.html` and `ai-partner.html`; `parallax-engine.js` only by `index.html` and `ai-innovation.html`. `ai-styles.css` is used only by the two `ai-*` pages.
- Pages also carry substantial page-specific CSS in inline `<style>` blocks in their `<head>`.

### Legacy/dead files — do not extend these

`styles.css` (superseded by `styles-new.css`), `ai-animations.js` (referenced by nothing), `index-backup.html`, `index-old-backup.html`, `index-parallax.html`, `render.yaml`.

### Contact forms

Forms post to **Formspree** (no backend). `ai-partner.html` uses the live endpoint `https://formspree.io/f/xeoqdkjl`; `contact.html` still has the placeholder `https://formspree.io/f/YOUR_FORM_ID`, so the main contact form does not deliver submissions until it's replaced. Setup details in `FORMSPREE-SETUP-GUIDE.md`.

### Content sources

- `Partners.md` holds the partner bios (formerly used on the now-removed leadership page `about-team.html`).
- `SEO-OPTIMIZATION-GUIDE.md` is the SEO plan; per its checklist there is no sitemap.xml or robots.txt yet, and pages have no Open Graph tags.
