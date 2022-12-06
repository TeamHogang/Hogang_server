const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const MarkerSchema = mongoose.Schema(
  {
    prhsmkar: {
      type: Number,
    },
    prhsmknm: {
      type: String,
    },
    longitude: {
      type: String,
    },
    latitude: {
      type: String,
    },
    type: {
      type: Number,
      default: 0,
    },
    info: {
      type: String,
    },
    imgurl: {
      type: String,
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Marker = mongoose.model("Marker", MarkerSchema);
module.exports = { Marker };
