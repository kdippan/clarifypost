# ClarifyPost

ClarifyPost is a fast, static publishing site for clear explainers, how-to guides, technology, finance, artificial intelligence, productivity, entertainment, and current affairs.

**Live site:** https://clarifypost.dippan.com.np/

[![Built with Eleventy](https://img.shields.io/badge/Built%20with-Eleventy-111111?style=for-the-badge)](https://www.11ty.dev/)
[![Hosted on Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-111111?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-2d7a4f?style=for-the-badge)](LICENSE)

## Live resources

- Website: https://clarifypost.dippan.com.np/
- Sitemap: https://clarifypost.dippan.com.np/sitemap.xml
- RSS feed: https://clarifypost.dippan.com.np/feed.xml
- AI-readable index: https://clarifypost.dippan.com.np/llms.txt
- Robots policy: https://clarifypost.dippan.com.np/robots.txt
- IndexNow key: https://clarifypost.dippan.com.np/clarifypost-indexnow-2026.txt
- Example article: https://clarifypost.dippan.com.np/posts/what-is-agentic-ai/

## Technology

| Area | Implementation |
| --- | --- |
| Static site generator | Eleventy 2 |
| Templates | Nunjucks |
| Content | Markdown with YAML front matter |
| Styling | CSS with responsive dark-mode support |
| JavaScript | Small progressive-enhancement scripts |
| Deployment | Vercel |
| Analytics | Google Analytics 4 + PostHog |
| Discovery | Sitemap, RSS, `llms.txt`, `robots.txt`, IndexNow |

## Features

- Responsive article, category, and homepage layouts.
- Article metadata, canonical URLs, Open Graph, Twitter cards, and JSON-LD.
- Internal linking and related-article navigation.
- GitHub-style syntax highlighting for language code blocks.
- Horizontal scrolling for code that is wider than the viewport.
- Click-to-preview images with an accessible lightbox modal.
- Click-to-play YouTube previews with lazy iframe loading.
- Floating social sharing rail on article pages.
- Global Buy Me a Coffee support widget.
- PostHog product analytics with page-view capture.
- PostHog structured web Logs with `posthog.logger`.
- RSS feed and AI-readable `llms.txt` resource.
- Bing IndexNow submission after successful Vercel builds.

## Project structure

```text
clarifypost/
├── .github/workflows/       # Google indexing workflow
├── scripts/                  # Asset minification and IndexNow submission
├── src/
│   ├── _data/                # Site configuration
│   ├── _includes/            # Shared Nunjucks layouts and partials
│   ├── assets/               # CSS, JavaScript, and images
│   ├── posts/                # Markdown articles
│   ├── feed.njk              # RSS feed
│   ├── sitemap.njk           # XML sitemap
│   ├── robots.njk            # Crawler policy
│   └── llms.txt.njk          # AI-readable content index
├── .eleventy.js
├── package.json
├── vercel.json
└── README.md
```

## Local development

Requirements: Node.js 18 or newer.

```bash
npm install
npm start
```

The development server runs at http://localhost:8080/.

To run the authenticated PostHog Self-driving setup wizard:

```bash
npm run posthog:self-driving
```

The wizard may require a PostHog personal API key or account login. The browser analytics client is already integrated through the shared base template.

PostHog Logs use the `clarifypost-web` service name and `production` environment. Console autocapture is intentionally disabled; use structured `posthog.logger` calls for application events that should appear in PostHog Logs.

## Production build

```bash
npm run build
```

The generated site is written to `_site/`. The build also minifies assets and runs the `postbuild` IndexNow hook.

Local builds skip IndexNow submission by default. To explicitly test it:

```bash
INDEXNOW_FORCE=true npm run postbuild
```

The IndexNow script accepts these optional environment variables:

- `INDEXNOW_SITE_URL`: canonical production site URL.
- `INDEXNOW_KEY`: IndexNow verification key.

IndexNow failures are non-blocking and do not fail the site build.

## Writing an article

Create a Markdown file in `src/posts/` with front matter like this:

```yaml
---
title: "Your Article Title"
description: "A concise description for search and social previews."
date: 2026-09-07
updated: 2026-09-07
category: "Technology"
tags: ["technology", "example"]
slug: "your-article-slug"
author: "ClarifyPost"
readingTime: "5 min read"
schemaType: "Article"
featured: false
image: "/assets/img/example/ogg.png"
imageAlt: "Descriptive image alt text"
---
```

Posts are published at `/posts/<slug>/` and automatically appear in the post collection, sitemap, RSS feed, search index, related links, and AI-readable index.

## Deployment

Push to `main` to trigger the configured Vercel deployment:

```bash
git add .
git commit -m "Add article"
git push origin main
```

The GitHub indexing workflow can notify Google when article files change. It requires these repository secrets:

| Secret | Purpose |
| --- | --- |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_REFRESH_TOKEN` | Google OAuth refresh token |

Google Search Console and Bing Webmaster Tools domain verification must also be completed externally. Sitemaps and IndexNow improve discovery, but they do not guarantee rankings or indexing speed.

## Support

If ClarifyPost is useful, support the project through the integrated Buy Me a Coffee widget or directly at:

- Buy Me a Coffee: https://buymeacoffee.com/dippanbhusal
- Ko-fi: https://ko-fi.com/dippanbhusal
- GitHub Sponsors: https://github.com/sponsors/kdippan

## Developer links

- X: https://x.com/dippanbhusal
- LinkedIn: https://linkedin.com/in/dippan
- GitHub: https://github.com/kdippan

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
