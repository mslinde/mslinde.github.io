# Portfolio site

A one-page portfolio site in plain HTML, CSS and JS. There's no build step, so you edit the files and upload them.

## Editing content
Everything you need to change is in `index.html`. Search for these placeholders:

| Placeholder | Where |
|---|---|
| `Your Name`, `YN` | `<title>`, meta tags, header logo, hero, footer, `404.html`, `favicon.svg`, `assets/img/og-image.svg` |
| Tagline and intro | Hero section |
| About text and skills | `#about` |
| Projects | `#projects`: copy an `<article class="card">…</article>` block to add a project |
| Experience | `#experience` timeline |
| `you@example.com`, GitHub and LinkedIn URLs | `#contact` |

**Images:** replace the files in `assets/img/` (`headshot.svg`, `project-1.svg`, …). You can use `.jpg` or `.png` files instead; just update the `src` in `index.html`. Aim for headshots about 640×640 and project images about 1280×800.

**Resume:** put your PDF at `assets/resume.pdf`, or delete the "Download resume" button.

**Colors:** change the `--accent` and other tokens at the top of `styles.css`. Dark-mode values are in the two blocks below them.

**Social preview:** some sites (e.g. Facebook, LinkedIn) don't show SVG previews. For best results, export a 1200×630 PNG, save it as `assets/img/og-image.png`, and update the `og:image` tag.

## Previewing locally
Double-click `index.html` to open it in your browser. Everything works when opened this way.

Once the developer tools are installed (`xcode-select --install`, see Option B below), you can also serve it:
```sh
cd ~/Desktop/"AI Projects"/portfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying to GitHub Pages

**Name the repo `<your-username>.github.io`**: the site lives at `https://<your-username>.github.io`, and `404.html` works as-is. With any other repo name the URL becomes `https://<your-username>.github.io/<repo>/`, and you must edit the `/` paths in `404.html` to start with `/<repo>/`.

### Option A: Upload in the browser (no git needed)
1. On github.com, click **New repository**, name it as described above, make it **Public**, and click **Create**.
2. Click **uploading an existing file** and drag in *everything inside* this folder (not the folder itself). Commit.
3. Go to **Settings → Pages**, set **Source: Deploy from a branch**, **Branch: main / (root)**, and click **Save**.
4. Wait a minute or two, then open the URL shown on that page.

To update the site later, upload the changed files the same way.

### Option B: git
```sh
xcode-select --install          # one-time; installs git (approve the macOS dialog)
cd ~/Desktop/"AI Projects"/portfolio
git init -b main
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```
Then enable Pages as in step 3 of Option A. After that, every `git push` updates the site.
