const RssFeed = require("../models/rssFeed.model");
const RssSources = require("../models/rssSources.model");
const RSSFeed = require("../rssFeed/rssFeed.js");

const getRssFeedList = async () => {
  return await RssFeed.find();
};

const getRssFeedListDetails = async (id) => {
  return await RssFeed.findById(id);
};

const getRssSourcesList = async () => {
  return await RssSources.find();
};

const modifySource = async (sourceID, enabled) => {
  try {
    let source = await RssSources.findById(sourceID);
    if (source) {
      source.enabled = enabled;
      await source.save();
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
    }
    return 1;
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, e);
  }
};

module.exports = {
  getRssFeedList,
  getRssFeedListDetails,
  getRssSourcesList,
  modifySource,
};
