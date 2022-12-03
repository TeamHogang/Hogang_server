const express = require("express");
const router = express.Router();
const { Marker } = require("../models/Marker");
const { RequestedMarker } = require("../models/RequestedMarker");
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./data/non-smoking.json", "utf8"));

// const addMarker = async () => {
//   for(idx in data["DATA"]){
//     if(data["DATA"][idx]["prhsmkar"]){
//       data["DATA"][idx]["prhsmkar"] = Number(Math.sqrt(data["DATA"][idx]["prhsmkar"]/Math.PI)).toFixed(2)
//     }
//     else {
//       data["DATA"][idx]["prhsmkar"] = Number(Math.sqrt(10/Math.PI)).toFixed(2)
//     }
//   }
//   try {
//     await Marker.create(data["DATA"])
//   } catch (err) {
//     console.log(err);
//   }
// }
// addMarker();

// 마커 조회
router.get("/map/MarkerList", (req, res) => {
  Marker.find({})
    .exec((err, marker) => {
      if (err) return res.json(err);
      return res.status(200).send({ marker: marker });
    });
});

//마커 삭제
router.delete("/map/:id", (req, res)=>{
  Marker.deleteOne({_id: req.params.id}, (req, res)=>{
    if(err) return res.json(err);
  })
})

//마커 수정
router.patch("/map/:id", (req, res) => {
  req.body.updateAt = Date.now();
  Marker.findOneAndUpdate({ _id: req.params.id }, req.body, (err, comment) => {
    if (err) return res.json(err);

    return res.status(200).send({ comment: comment });
  });
});

module.exports = router;