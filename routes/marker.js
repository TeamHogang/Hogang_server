const express = require("express");
const router = express.Router();
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data\\non-smoking.json", "utf8"));

router.get("/map", (req, res, next) => {
  res.json(data);
});

module.exports = router;