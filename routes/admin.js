const express = require("express");
const { Marker } = require("../models/Marker");
const { RequestedMarker } = require("../models/RequestedMarker");
const router = express.Router();

router.get("/admin", async (req, res) => {
  RequestedMarker.find({})
    .sort("-createdAt")
    .populate("userFrom", "nickname")
    .exec((err, requestedmarker) => {
      if (err) return res.json(err);
      // console.log(requestedmarker)
      return res.status(200).send({ requestedmarker: requestedmarker });
    });
});

//요청 사항 거절
router.delete("/admin/reject/:id", (req, res) => {
  RequestedMarker.deleteOne({ _id: req.params.id }, (req, res), (err) => {
    if (err) return res.json(err);

    return res.status(200).send("ok");
  });
});

//요청 사항 수락
router.post("/admin/accept/:id", async (req, res) => {
  const newmarker = await RequestedMarker.findOne({ _id: req.params.id });
  // console.log(newmarker)
  // Marker.create(newmarker, (err, newmarker) => {
  //     if(err) return res.json(err);
  //     return res.status(200).send({ newmarker: newmarker });
  //   })
  const marker = new Marker({
    prhsmkar: 0,
    prhsmknm: newmarker.prhsmknm,
    longitude: newmarker.longitude,
    latitude: newmarker.latitude,
    type: 1,
    info: newmarker.content,
    img: newmarker.img,
    userFrom: newmarker.userFrom,
  });
  RequestedMarker.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return res.json(err);
  });

  marker.save((err, markerInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      marker: marker,
    });
  });
});

module.exports = router;
