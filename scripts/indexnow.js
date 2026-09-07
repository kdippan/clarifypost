const fs = require("fs");
const path = require("path");

const siteUrl = (process.env.INDEXNOW_SITE_URL || "https://clarifypost.dippan.com.np").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY || "clarifypost-indexnow-2026";
const sitemapPath = path.join(__dirname, "..", "_site", "sitemap.xml");
const endpoint = "https://api.indexnow.org/indexnow";

if (!process.env.VERCEL && process.env.INDEXNOW_FORCE !== "true") {
  console.log("IndexNow: local build detected; skipping submission.");
  process.exit(0);
}

function getSitemapUrls() {
  if (!fs.existsSync(sitemapPath)) return [];

  return [...fs.readFileSync(sitemapPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(match => match[1].trim())
    .filter(Boolean);
}

async function submitUrls(urls) {
  if (urls.length === 0) {
    console.log("IndexNow: no sitemap URLs found; skipping submission.");
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(siteUrl).hostname,
      key,
      keyLocation: `${siteUrl}/${key}.txt`,
      urlList: urls
    })
  });

  if (!response.ok) {
    throw new Error(`IndexNow responded with HTTP ${response.status}`);
  }

  console.log(`IndexNow: submitted ${urls.length} URLs successfully.`);
}

submitUrls(getSitemapUrls()).catch(error => {
  console.warn(`IndexNow: submission skipped (${error.message}).`);
});