const express = require("express");
const router = express.Router();
const {User} =require("../models/User");
const {Board} = require ("../models/Board");

router.get("/",(req, res) =>{
    Board.find({})
        .sort("-createdAt")
        .exec((err,board)=>{
            if(err) return res.json(err);
            return res.status(200).send({boardtitle: Board.title})
        })
})


module.exports = router