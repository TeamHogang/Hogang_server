const express = require("express");
const router = express.Router();
const { Marker } = require("../models/Marker");
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data\\non-smoking.json", "utf8"));

const addMarker = async () => {
  try {
    await Marker.create(data["DATA"])
  } catch (err) {
    console.log(err);
  }
}
addMarker();

module.exports = router;