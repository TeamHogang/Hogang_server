const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const MarkerSchema = mongoose.Schema(
  {
    prhsmkar: {
      type: String,
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
    img: {
      type: String,
      require: false,
    }
  },
);

const Marker = mongoose.model("Marker", MarkerSchema);
module.exports = { Marker };
