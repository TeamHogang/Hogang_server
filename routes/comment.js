const express = require("express");
const { User } = require("../models/User");
const { Board } = require("../models/Board");
const { Comment } = require("../models/Comment");
const router = express.Router();


router.post("/comment", (req, res) => {
  const comment = new Comment(req.body)
  
  comment.save((err, commentInfo) => {
    if (err) return res.json({ success: false, err});
    return res.status(200).json({
      comment: comment
    });
  });
}); 

router.put("/comment/:id", (req, res) => {
  req.body.updateAt = Date.now();
  Comment.findOneAndUpdate({ _id: req.params.id }, req.body, (err, comment) => {
    if (err) return res.json(err);

    return res.status(200).send({ comment: comment });
  });
});
router.delete("/comment/:id", (req, res) => {
  Comment.deleteOne({ _id: req.params.id }, (req, res) => {
    if (err) return res.json(err);
  });
});

module.exports = router;
