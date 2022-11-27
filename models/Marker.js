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
  },
);

const Marker = mongoose.model("Marker", MarkerSchema);
module.exports = { Marker };
