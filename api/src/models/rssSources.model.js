const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const rssSourcesSchema = mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      trim: true,
    },
    enabled: {
      type: Boolean,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
rssSourcesSchema.plugin(toJSON);
rssSourcesSchema.plugin(paginate);

const RssSources = mongoose.model("RssSources", rssSourcesSchema);

module.exports = RssSources;
