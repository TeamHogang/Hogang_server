const express = require("express");
const { User } = require("../models/User");
const { Board } = require("../models/Board");
const { Comment } = require("../models/Comment");
const router = express.Router();


router.post("/board", (req, res) => {
  Board.create(req.body, async(err, board) => {
    if(err) return res.json(err);
    return res.status(200).send({ board: board });
  })
});

//피드 수정
router.patch("/board/:id", (req, res) => {
  req.body.updateAt = Date.now();
  Board.findOneAndUpdate({ _id: req.params.id }, req.body, (err, board) => {
    if (err) return res.json(err);

    return res.status(200).send({ board: board });
  });
});

//글 조회
router.get("/board/:id", async (req, res) => {
  const board = await Board.findOne({ _id: req.params.id });
  // if (!board) return res.json(err);
  
  const user = await User.findOne({ _id: board.userFrom });
  // if (!user) return res.json(err);
  // const comment = [Comment.find({boardFrom : req.params.id})];
  // return res.status(200).send({ board: board, userEmail: user.email, comment: comment });
  Promise.all([Comment.find({boardFrom: req.params.id}),
              board,user])
  .then(([comment,board,userEmail])=>{res.status(200).send({comment : comment, board: board, userEmail: user.email})})

  
});

//피드 삭제
router.delete("/board/:id", (req, res) => {
  Board.deleteOne({ _id: req.params.id }, (req, res) => {
    if (err) return res.json(err);
  });
});

//피드 전체 리스트
router.get("/board", (req, res) => {
  Board.find({})
    .sort("-createdAt")
    .exec((err, board) => {
      if (err) return res.json(err);
      return res.status(200).send({ board: board });
    });
});

module.exports = router;
