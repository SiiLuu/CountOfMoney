const express = require("express");
const rssController = require("../controllers/rss.controller");
const RssFeed = require("../models/rssFeed.model");
const RssSources = require("../models/rssSources.model");
const userMiddleware = require("../middlewares/users.middlewares");

const router = express.Router();
const RSSFeed = require("../rssFeed/rssFeed.js");

setInterval(async () => {
  const feed = new RSSFeed();
  let sources = await RssSources.find();
  sources = sources.filter((source) => source.enabled);
  let resultArticles = [];
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    const result = await feed.init(source.source);
    resultArticles.push(...result);
  }
  await RssFeed.deleteMany({});
  resultArticles.forEach(async (item) => {
    let newArticle = new RssFeed({
      creator: item.creator,
      title: item.title,
      contentSnippet: item.contentSnippet,
      enclosure: item.enclosure,
      categories: item.categories,
    });
    await newArticle.save();
  });
}, 120000);

router.get("/sources", rssController.getRssSources);

router.put("/sources", userMiddleware.auth(), rssController.updateRssSources);

router.get("/", rssController.getRssFeed);

router.get("/:id", rssController.getRssFeedDetails);

module.exports = router;

// https://cointelegraph.com/feed
// https://cointelegraph.com/rss/tag/altcoin
// https://cointelegraph.com/rss/tag/blockchain
