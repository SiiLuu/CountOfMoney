const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const rssFeedSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      trim: true,
    },
    creator: {
      type: String,
      required: false,
      trim: true,
    },
    contentSnippet: {
      type: String,
      required: false,
      trim: true,
    },
    enclosure: {
      type: Object,
      required: false,
      trim: true,
    },
    categories: {
      type: Array,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
rssFeedSchema.plugin(toJSON);
rssFeedSchema.plugin(paginate);

const RssFeed = mongoose.model("RssFeed", rssFeedSchema);

module.exports = RssFeed;
