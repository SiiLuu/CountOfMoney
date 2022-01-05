const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    nickname: {
      type: String,
      required: false,
      trim: true,
    },
    currency: {
      type: String,
      required: false,
      trim: true,
    },
    keywords: {
      type: Array,
      required: false,
      trim: true,
    },
    rank: {
      type: Number,
      required: true,
      trim: true,
    },
    favorited: {
      type: Array,
      required: false,
      trim: true,
    },
    oAuthGoogle: {
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
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
