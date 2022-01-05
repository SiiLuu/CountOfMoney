const Parser = require("rss-parser");
const fetch = require("node-fetch");

const parser = new Parser();

module.exports = class RSSFeed {
  init = async (url, tags) =>
    await fetch(url)
      .then((response) => response.text())
      .then((xml) => parser.parseString(xml))
      .then((data) => {
        data = data.items.map(
          ({ creator, title, contentSnippet, enclosure, categories }) => ({
            creator,
            title,
            contentSnippet,
            enclosure,
            categories,
          })
        );
        return data;
      });
};
