const express = require("express");
const {RequestedMarker} = require("../models/RequestedMarker");
const router = express.Router();

router.get("/admin", async(req,res)=>{
    RequestedMarker.find({})
        .sort("-createdAt")
        .exec((err, requestedmarker)=>{
            if (err) return res.json(err);
            return res.status(200).send({ requestedmarker : requestedmarker});
        })
})



module.exports = router