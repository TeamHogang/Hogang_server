
const express = require("express");
const {RequestedMarker} = require("../models/RequestedMarker");
const router = express.Router();

router.get("/admin", async(req,res)=>{
    RequestedMarker.find({})
        .sort("-createdAt")
        .populate('userFrom','nickname')
        .exec((err, requestedmarker)=>{
            if (err) return res.json(err);
            // console.log(requestedmarker)
            return res.status(200).send({ requestedmarker : requestedmarker});
          
        });
});

router.delete("/admin/reject/:id", (req,res)=>{
    RequestedMarker.deleteOne({ _id: req.params.id }, (req, res), (err) => {
        if (err) return res.json(err);
    
        return res.status(200).send("ok");
      });
})



module.exports = router;