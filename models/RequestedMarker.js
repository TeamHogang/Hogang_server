const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const RequestedMarkerSchema = mongoose.Schema(
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
      default: 1,
    },
    img: {
      type: String,
      require: false,
    }
  },
);

const RequestedMarker = mongoose.model("Marker", RequestedMarkerSchema);
module.exports = { RequestedMarker };
