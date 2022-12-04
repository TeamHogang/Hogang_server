const express = require("express");
const router = express.Router();
const { RequestedMarker } = require("../models/RequestedMarker");
const multer = require("multer");

// storage
const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const upload = multer({
  storage: Storage
}).single('img')

module.exports = upload
// 마커 추가 요청
// router.post("/map/putMarkerDetail", (req, res) => {
//   upload(req, res, (err) => {
//     if(err){
//       console.log(err)
//     }
//     else{
//       const newMarker = new RequestedMarker({
//         prhsmkar: req.body.locationDetail,
//         longitude: req.body.longitude,
//         latitude: req.body.latitude,
//         type: req.body.type,
//         img: {
//           data: req.file.filename,
//           contentType: req.file.mimetype
//         }
//       })
//       newMarker.save().then(result => {
//         res.status(200).json({
//           msg: 'successfully uploaded'
//         })
//       }).catch(err => {
//         console.log(err);
//       })
//     }
//   })
// });

router.post("/map/putMarkerDetail", (req, res) => {
  upload(req, res, (err) => {
    if(err) {
      console.log(err)
    }
    else {
      RequestedMarker.create(req.body, async(err, requestedmarker) => {
        if(err) return res.json(err);
        return res.status(200).send({ requestedmarker: requestedmarker });
      })
    }
  })
});

module.exports = router