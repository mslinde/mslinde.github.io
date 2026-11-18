# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is
Mark Slinde's one-page portfolio: plain HTML, CSS and JS with no build step, no package manager, no tests and no linter. It deploys to GitHub Pages from `main` (repo root) at https://mslinde.github.io. Every push to `main` goes live within a minute or two, so commit and push only when the user explicitly asks.

Most content is still placeholder (see the table in README.md). Don't invent real content (bio, contact email, links). Ask the user for it.

## Preview and verify
- Open `index.html` directly in a browser; everything works over `file://`. Or run `python3 -m http.server 8000`.
- Headless check: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --window-size=1280,1800 --screenshot=out.png file://…/index.html`. Use `--dump-dom` plus a temporary injected `<script>` that writes results to `document.title` to read layout values. Add `--virtual-time-budget=3000` so timers run.
  - Smooth scrolling doesn't run in headless mode. Pass `--force-prefers-reduced-motion` to test scroll positions.
  - Headless enforces a ~500px minimum viewport, so "375px" screenshots are really 500px wide.
- Do test edits (extra cards, injected scripts) on a copy in the scratchpad, never in the repo.
- After pushing, poll `curl -s https://mslinde.github.io/?t=$RANDOM` for the new markup to confirm the deploy.

## Architecture
- **`index.html`:** one page, with sections `#about`, `#projects`, `#experience`, `#contact`. Projects are `<article class="card">` blocks inside `.carousel > .cards`. Adding a project means copying a card plus an `assets/img/project-N.svg` (640×400 gradient placeholder).
- **`styles.css`:** all colors are custom-property tokens on `:root`. Dark mode redefines them twice: under `@media (prefers-color-scheme: dark)` with `:root:not([data-theme="light"])`, and under `:root[data-theme="dark"]`. Any token change must touch all three blocks. Component colors use only tokens.
- **`script.js`:** one IIFE with independent blocks: footer year, mobile nav, theme toggle (saves `localStorage.theme`) and the projects carousel. The page must work without it (its header says so). Keep new behavior progressive:
  - The carousel is a native horizontal scroll-snap track. Without JS it scrolls with a thin scrollbar.
  - JS adds `.is-enhanced` to `.carousel`, which hides the scrollbar. It shows the arrow buttons (which start `hidden`) only when the track overflows. Each click pages by `clientWidth` plus the grid gap.
- **Theme before first paint:** an inline `<script>` in the `<head>` of both `index.html` and `404.html` applies the saved theme so the page doesn't flash the wrong colors. Keep the two copies in sync.
- **`404.html`:** uses absolute `/` paths, because Pages serves it at any bad URL. This works only because the repo is named `mslinde.github.io`.
- **The name appears in several places:** `<title>`/meta/og tags, the header logo initials, the hero, the footer, `404.html`, `favicon.svg` and `assets/img/og-image.svg`.

## Git
- Repo-local identity: `mslinde <mslinde@users.noreply.github.com>`. Pushes authenticate through the macOS Keychain.
- Commit messages end with the Co-Authored-By line from the session's attribution instructions.
