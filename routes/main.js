const express = require("express");
const router = express.Router();
const {User} =require("../models/User");
const {Board} = require ("../models/Board");

router.get("/main/:id", async(req, res) =>{
    // Board.find({})
    // .sort("-createdAt")
    // .exec((err, board) => {
    //   if (err) return res.json(err);
    //   return res.status(200).send({ board: board });
    // });
    const user = await User.findOne({_id:req.params.id})
    Promise.all([Board.find({}),
      user])
.then(([board,nickname])=>{res.status(200).send({board : board, usernickname: user.nickname})})

  
});


module.exports = router