const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  const postIndex = [];

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/cdn": "cdn" });
  eleventyConfig.addPassthroughCopy({
    "src/clarifypost-indexnow-2026.txt": "clarifypost-indexnow-2026.txt",
    "src/favicon.svg": "favicon.svg"
  });

  let markdownOptions = {
    html: true,
    linkify: true
  };
  eleventyConfig.setLibrary("md", markdownIt(markdownOptions));

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISODate();
  });

  eleventyConfig.addFilter("rfcDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toHTTP();
  });

  eleventyConfig.addFilter("truncate", (str, len = 100) => {
    if (str && str.length > len) {
      return str.substring(0, len) + "...";
    }
    return str;
  });

  eleventyConfig.addFilter("urlencode", (value) => encodeURIComponent(value || ""));
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("xmlEscape", (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;"));

  eleventyConfig.addFilter("relatedPosts", (posts, category, currentUrl, limit = 5) => {
    const categoryPosts = posts.filter(post => post.data.category === category);
    const relatedPool = categoryPosts.length > 1 ? categoryPosts : posts;
    const currentIndex = relatedPool.findIndex(post => post.url === currentUrl);

    if (currentIndex === -1) {
      return relatedPool.slice(0, limit);
    }

    const relatedPosts = [];
    for (let offset = 1; relatedPosts.length < limit && offset < relatedPool.length; offset++) {
      const previousPost = relatedPool[currentIndex - offset];
      const nextPost = relatedPool[currentIndex + offset];

      if (previousPost) relatedPosts.push(previousPost);
      if (nextPost && relatedPosts.length < limit) relatedPosts.push(nextPost);
    }

    return relatedPosts;
  });

  eleventyConfig.addCollection("posts", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
    postIndex.push(...posts);
    return posts;
  });

  eleventyConfig.addTransform("internalLinks", function(content) {
    if (!this.outputPath || !this.outputPath.endsWith(".html")) return content;

    const normalize = (value) => value
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

    const aliases = new Map([
      ["no tax on overtime explained obbba", "/posts/no-tax-on-overtime-explained-2026/"]
    ]);

    const findPost = (label) => {
      const target = normalize(label);
      const aliasUrl = aliases.get(target);
      if (aliasUrl) return { url: aliasUrl };
      const targetWords = new Set(target.split(" ").filter(word => word.length > 2));
      let bestMatch = null;
      let bestScore = 0;

      for (const post of postIndex) {
        const title = normalize(post.data.title || "");
        const titleWords = new Set(title.split(" ").filter(word => word.length > 2));
        const overlap = [...targetWords].filter(word => titleWords.has(word)).length;
        const score = overlap / Math.max(targetWords.size, 1);

        if ((title === target || title.includes(target) || (score >= 0.75 && overlap >= 3)) && score > bestScore) {
          bestMatch = post;
          bestScore = score;
        }
      }

      return bestMatch;
    };

    content = content.replace(/\[INTERNAL LINK:\s*([^\]]+)\]/gi, (match, label) => {
      const post = findPost(label);
      return post ? `<a href="${post.url}">${label.trim()}</a>` : label.trim();
    });

    return content.replace(/https:\/\/clarifypost\.vercel\.app(\/posts\/[^"'\s)<>]+)/g, "$1");
  });

  eleventyConfig.addCollection("searchIndex", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").map(post => {
      return {
        title: post.data.title,
        description: post.data.description,
        url: post.url,
        category: post.data.category
      };
    });
  });

  eleventyConfig.addCollection("categories", function(collectionApi) {
    let categories = new Set();
    collectionApi.getFilteredByGlob("src/posts/*.md").forEach(post => {
      if (post.data.category) {
        categories.add(post.data.category);
      }
    });
    return Array.from(categories).sort();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};