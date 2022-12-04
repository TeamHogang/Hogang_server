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
router.post("/map/putMarkerDetail", (req, res) => {
  upload(req, res, (err) => {
    if(err){
      console.log(err)
    }
    else{
      const newMarker = new RequestedMarker({
        prhsmkar: req.body.prhsmkar,
        prhsmknm: req.body.prhsmknm,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        type: req.body.type,
        content: req.body.content,
        img: {
          data: req.file.filename,
          contentType: req.file.mimetype
        }
      })
      newMarker.save().then(result => {
        res.status(200).json({
          msg: 'successfully uploaded'
        })
      }).catch(err => {
        console.log(err);
      })
    }
  })
});



module.exports =router

