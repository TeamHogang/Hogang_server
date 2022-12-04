const express = require("express");
const { User } = require("../models/User");
const { Board } = require("../models/Board");
const { Comment } = require("../models/Comment");
const router = express.Router();

// 댓글 작성
router.post("/:id/comment", (req, res) => {
  const comment = new Comment({
    userFrom : req.body.userFrom,
    boardFrom : req.params.id,
    contents : req.body.contents
  })
  
  
  
  comment.save((err, commentInfo) => {
    if (err) return res.json({ success: false, err});
    return res.status(200).json({
      comment: comment
    });
  });
}); 



//댓글 삭제
router.delete("/comment/:id", (req, res)=>{
  Comment.deleteOne({_id: req.params.id}, (req, res) , (err)=>{
    if(err) return res.json(err);
  })
})

//댓글 수정
router.patch("/comment/:id", (req, res) => {
  req.body.updateAt = Date.now();
  Comment.findOneAndUpdate({ _id: req.params.id }, req.body, (err, comment) => {
    if (err) return res.json(err);

    return res.status(200).send({ comment: comment });
  });
});


//피드 전체 리스트
router.get("/board", (req, res) => {
  Feed.find({})
    .sort("-createdAt")
    .exec((err, feeds) => {
      if (err) return res.json(err);
      return res.status(200).send({ board: board });
    });
});

module.exports = router;