const express = require("express");
const router = express.Router();
const { RequestedMarker } = require("../models/RequestedMarker");

const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})

var upload = multer ({
  storage: storage,
  fileFilter: function(req, file, callback) {
    
  }
})
// 마커 추가 요청
router.post("/map/putMarkerDetail", (req, res) => {
  RequestedMarker.create(req.body, async(err, requestedmarker) => {
    if(err) return res.json(err);
    return res.status(200).send({ requestedmarker: requestedmarker });
  })
});

router.get("/admin", async(req,res)=>{
  RequestedMarker.find({})
      .sort("-createdAt")
      .exec((err, requestedmarker)=>{
          if (err) return res.json(err);
          console.log(requestedmarker)
          return res.status(200).send({ requestedmarker : requestedmarker});
        
      });
});


module.exports =router