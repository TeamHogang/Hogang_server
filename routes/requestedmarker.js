const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer');
const { RequestedMarker } = require("../models/RequestedMarker");

// 마커 추가 요청
router.post("/map/putMarkerDetail", upload.single('img'), (req, res) => {
      console.log(req.body);
      console.log(req.file);
      console.log(res.req.file);
      const newMarker = new RequestedMarker({
        prhsmkar: req.body.prhsmkar,
        prhsmknm: req.body.prhsmknm,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        type: req.body.type,
        content: req.body.content,
        imgurl: req.file.location,
        userFrom: req.body.userFrom,
      });
      newMarker
        .save()
        .then((result) => {
          res.status(200).json({
            msg: "successfully uploaded",
            img: req.file.location,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });

module.exports = router;
