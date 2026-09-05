const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

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

  eleventyConfig.addFilter("truncate", (str, len = 100) => {
    if (str && str.length > len) {
      return str.substring(0, len) + "...";
    }
    return str;
  });

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
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
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