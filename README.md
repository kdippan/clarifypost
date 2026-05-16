# ClarifyPost 🚀

<div align="center">
<img src="src/assets/img/favicon.svg" style="max-width: 50%; height: auto;" alt="Clarify post logo">

### ⚡ Fast • SEO-Optimized • Static • Automated Indexing

A lightning-fast, static-generated tech and finance blog built for the modern web.

[![Built with Eleventy](https://img.shields.io/badge/Built%20With-11ty-black?style=for-the-badge)](https://11ty.dev/)
[![Hosted on Vercel](https://img.shields.io/badge/Hosted%20On-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#)
[![SEO Optimized](https://img.shields.io/badge/SEO-Optimized-blue?style=for-the-badge)](#)

🌐 **Live Website:** https://clarifypost.vercel.app/

</div>

---

# 📖 About ClarifyPost

ClarifyPost is a modern publishing platform focused on:

- 🧠 Technology
- 💰 Finance
- 🤖 Artificial Intelligence
- 📈 Productivity
- 🛠 Developer Tools
- 🌍 Internet & Startups

The project is built using **Eleventy (11ty)** for maximum speed and simplicity. Every article is written in Markdown and statically generated for ultra-fast performance, SEO optimization, and a clean developer experience.

The platform also integrates:

- ⚡ Instant Google Indexing
- 📊 Google Analytics 4
- 🚀 Automated Vercel Deployments
- 🧩 Clean Nunjucks Templating
- 🔎 SEO Metadata & Structured Data
- 📱 Responsive UI

---

# 🛠 Tech Stack

| Category | Technology |
|---|---|
| Static Site Generator | Eleventy (11ty) |
| Templating Engine | Nunjucks |
| Content Format | Markdown + YAML Frontmatter |
| Deployment | Vercel |
| Analytics | Google Analytics 4 |
| Automation | GitHub Actions |
| SEO | Google Indexing API |
| Styling | CSS |
| Hosting | Vercel Edge Network |

---

# 📂 Project Structure

```text
clarifypost/
├── .github/
│   └── workflows/
│       └── instant-index.yml
│
├── src/
│   ├── _includes/
│   │   ├── base.njk
│   │   ├── header.njk
│   │   └── footer.njk
│   │
│   ├── posts/
│   │   └── *.md
│   │
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   │
│   ├── about.njk
│   ├── contact.njk
│   ├── privacy.njk
│   ├── financial-disclaimer.njk
│   └── index.njk
│
├── package.json
├── README.md
└── .eleventy.js
```

---

# ✨ Features

## ⚡ Ultra Fast Performance

ClarifyPost is statically generated using Eleventy which means:

- No heavy database queries
- No unnecessary backend rendering
- Extremely low hosting costs
- Better Core Web Vitals
- Faster Time-to-First-Byte (TTFB)

---

## 🔍 SEO Optimized

Every article supports:

- Meta Titles
- Meta Descriptions
- Open Graph Tags
- Twitter Cards
- Structured Data
- Canonical URLs
- Sitemap Support
- Instant Google Indexing

---

## 🤖 Instant Google Indexing

A custom GitHub Action automatically:

1. Detects newly published articles
2. Generates a Google OAuth access token
3. Pings the Google Indexing API
4. Forces rapid Google crawling

This helps reduce indexing delays compared to waiting for sitemap discovery.

---

## 📱 Responsive Design

The website is fully optimized for:

- Desktop
- Tablets
- Mobile Devices
- Dark Mode Interfaces

---

# ✍️ Writing a New Article

Create a new `.md` file inside:

```text
src/posts/
```

Example:

```text
src/posts/my-first-post.md
```

---

## 🧾 Required Frontmatter

```yaml
---
title: "Your Article Title Here"
description: "A brief, SEO-friendly article description."
date: 2026-05-16
updated: 2026-05-16
category: "Technology"
tags: ["tech", "software", "ai"]
slug: "your-article-url-slug"
author: "ClarifyPost"
readingTime: "5 min read"
schemaType: "Article"
featured: false
---
```

---

# ⚙️ Local Development

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/kdippan/clarifypost.git
cd clarifypost
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Start Development Server

```bash
npm start
```

The website will run locally at:

```text
http://localhost:8080
```

The development server automatically reloads whenever you update:

- Markdown files
- Nunjucks templates
- CSS
- JavaScript

---

# 🚀 Deployment

Deployment is fully automated through Vercel.

Every push to the `main` branch automatically:

- Builds the site
- Deploys to production
- Updates the live website
- Triggers indexing automation

## Git Workflow

```bash
git add .
git commit -m "Add new article"
git push origin main
```

---

# 🔐 GitHub Secrets Setup

To enable Instant Google Indexing, configure the following repository secrets:

| Secret | Description |
|---|---|
| GOOGLE_CLIENT_ID | OAuth Client ID |
| GOOGLE_CLIENT_SECRET | OAuth Client Secret |
| GOOGLE_REFRESH_TOKEN | OAuth Refresh Token |

Path:

```text
GitHub Repository → Settings → Secrets and variables → Actions
```

---

# 📸 Screenshots

## 🏠 Homepage

![Homepage Screenshot](https://api.microlink.io/?url=https%3A%2F%2Fclarifypost.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1920&viewport.height=1080&t=1778915447184)

---

## 📝 Article Page

![Article Screenshot](https://api.microlink.io/?url=https%3A%2F%2Fclarifypost.vercel.app%2Fposts%2Fwhat-is-a-vpn%2F&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1920&viewport.height=1080&t=1778915542718)

---

# 📈 SEO & Performance Goals

ClarifyPost aims for:

- ✅ 95+ Lighthouse Performance
- ✅ 100 SEO Score
- ✅ Optimized Accessibility
- ✅ Minimal JavaScript
- ✅ Clean Semantic HTML

---

# 💖 Support the Project

If you find ClarifyPost useful, consider supporting development.

## ☕ Buy Me a Coffee

👉 https://buymeacoffee.com/dippanbhusal

---

## 🎁 Ko-fi

👉 https://ko-fi.com/dippanbhusal

---

## 🌟 GitHub Sponsors

👉 https://github.com/sponsors/kdippan

---

# 👨‍💻 Developer

## 🔗 Social Links

| Platform | Profile |
|---|---|
| X (Twitter) | https://x.com/dippanbhusal |
| LinkedIn | https://linkedin.com/in/kdippan |
| GitHub | https://github.com/kdippan |

---

# 🧠 Future Roadmap

Planned features for future releases:

- 🔎 Advanced Search
- 🌙 Improved Dark Mode
- 🏷 Tag Pages
- 📬 Newsletter Integration
- 📊 Article Analytics Dashboard
- 🤖 AI Content Tools
- 🧵 Social Share Cards
- 📰 RSS Feed Enhancements

---

# 🤝 Contributing

Contributions are welcome.

If you'd like to improve ClarifyPost:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

## ⭐ Star the Repository if You Like the Project

Made with ❤️ by Dippan

🌐 https://clarifypost.vercel.app/

</div>