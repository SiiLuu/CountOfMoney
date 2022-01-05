const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const cryptoSchema = mongoose.Schema(
  {
    cmid: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
cryptoSchema.plugin(toJSON);
cryptoSchema.plugin(paginate);

const Crypto = mongoose.model("Crypto", cryptoSchema);

module.exports = Crypto;
