/* 
 * File path: .eleventy.js
 * Purpose: Configures Eleventy (11ty) build settings, custom filters, collections, and markdown parsing.
 * Dependencies: luxon (for dates), markdown-it
 */

const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  // 1. Passthrough copy for static assets (CSS, JS, Images)[cite: 1]
  eleventyConfig.addPassthroughCopy("src/assets");

  // 2. Markdown-it configuration (allows HTML inside Markdown and auto-links)
  let markdownOptions = {
    html: true,
    linkify: true
  };
  eleventyConfig.setLibrary("md", markdownIt(markdownOptions));

  // 3. Custom Filters for SEO and UI formatting[cite: 5]
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISODate();
  });

  eleventyConfig.addFilter("truncate", (str, len = 100) => {
    if (str && str.length > len) {
      return str.substring(0, len) + "...";
    }
    return str;
  });

  // 4. Collections: Posts (Filters all markdown files in src/posts/ and sorts by date descending)[cite: 1]
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
  });

  // 5. Search Index Generation for client-side Fuse.js[cite: 3]
  // This creates a collection of objects that we will output as search-index.json later
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

  // 6. Directory Configuration
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