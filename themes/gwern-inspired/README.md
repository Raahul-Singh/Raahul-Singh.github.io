# gwern-inspired — night-sky redesign

A drop-in restyle of your existing `gwern-inspired` theme that matches the
`raahulsingh.net.html` prototype: typography-first, dark by default, a quiet
twinkling starfield, a centered night-sky hero, margin sidenotes, and a clean
light mode behind the header toggle.

It reuses your **existing front-matter contract and section structure**
(`writings/`, `notes/`, `reading/`) — no content changes required.

## Install

This folder is a complete Hugo theme. Two ways to use it:

**A. As a theme**
```
mv hugo-redesign themes/gwern-redesign
```
```toml
# hugo.toml
theme = "gwern-redesign"
```

**B. In place** — copy `hugo-redesign/layouts` and `hugo-redesign/static`
over your project root (or your current theme), replacing the old
`css/gwern.css`, `js/*`, and `layouts/`.

## The résumé is just a PDF link

Drop your file at **`static/resume.pdf`** and you're done — a `Résumé ↗`
link appears in the nav and on the home hero automatically. To point
somewhere else:
```toml
[params]
  resumeURL = "/cv/raahul-singh.pdf"   # or an external URL
```
Don't also add Résumé to `menu.main` or it'll show twice.

## Config

```toml
baseURL    = "https://raahulsingh.net/"
title      = "Raahul Singh"
languageCode = "en"

[params]
  author    = "Raahul Singh"
  description = "Essays & notes on minds, mountains, and the night sky."
  # Home hero:
  role      = "AI Research Engineer"
  started   = 2024
  coords    = "12.97° N · 77.59° E<br>BENGALURU"   # optional, top-right of hero
  intro     = "Hello, I'm Raahul Singh — an AI research engineer with interests in machine learning, analysis, physics, philosophy, history, literature, and a whole bunch of other things. This website is an archive of whatever moves me enough to make a note about it."
  resumeURL = "/resume.pdf"

  # Header + footer social icons (icon ∈ github|twitter|x|linkedin|instagram|gitlab|email)
  [[params.socialLinks]]
    name = "GitHub"
    url  = "https://github.com/raahulsingh"
    icon = "github"
  [[params.socialLinks]]
    name = "Email"
    url  = "mailto:raahul@raahulsingh.net"
    icon = "email"

[menu]
  [[menu.main]]
    name = "Writing"
    url  = "/writings/"
    weight = 1
  [[menu.main]]
    name = "Reading"
    url  = "/reading/"
    weight = 2
  [[menu.main]]
    name = "Now"
    url  = "/now/"
    weight = 3
```

### Notes live inside Writing

Notes and essays share **one stream**: the `/writings/` index and the home feed
list both sections together, newest first, each row badged by kind
(`Essay` / `Fiction` / `Note`). So **don't** add a separate `Notes` entry to
`menu.main`. The `/notes/` page still exists as a filtered “notebook” view if you
want to link it somewhere, but it's intentionally out of the main nav.

Give an essay a kind with `kind: "Fiction"` in its front matter; notes are
labelled `Note` automatically.

Any `menu.main` entry can open in a new tab with `[menu.main.params] external = true`.

## Front-matter notes

Unchanged from your current site. A few params the redesign reads:

- `description` — used as the dek/abstract on cards and article heads.
- `kind` — small eyebrow on writings (`Essay`, `Fiction`, …); defaults to `Essay`.
- `status` — shown in the article meta line (e.g. `finished`, `in progress`).
- `tags`, `date`, `updated` — as before.
- `toc: false` in a post's front matter hides its Contents box.
- Reading: `author`, `rating`, `progress`, `status: reading`, `cover_image`.

## Sidenotes

Standard Markdown footnotes (`[^1]`) are promoted to right-margin sidenotes by
`static/js/gwern.js`, and collapse inline below ~1180px. (Your older posts that
use bracketed `[1]` plain-text references render as normal paragraphs — convert
them to `[^1]` footnotes to get sidenotes.)

## What's in here

```
layouts/
  _default/baseof.html      header (nav + résumé link + theme toggle), footer, scripts
  _default/single.html      writings/essays — kind eyebrow, TOC, sidenotes
  _default/list.html        writings index (entry rows)
  index.html                home — night-sky hero + Writings + Notebook
  notes/{list,single}.html  atomic notes (date-column rows)
  reading/{list,single}.html book cards
  partials/book-card.html   shared book card
static/
  css/{normalize,gwern}.css dark-first system; light mode via toggle
  js/starfield.js           twinkling canvas + shooting stars (hidden in light)
  js/gwern.js               footnotes → sidenotes, external links, image zoom
  js/tooltips.js            inline tooltips
```
