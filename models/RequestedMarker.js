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
    content: {
      type: String,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

const RequestedMarker = mongoose.model(
  "RequestedMarker",
  RequestedMarkerSchema
);
module.exports = { RequestedMarker };
