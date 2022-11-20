const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // ObjectId를 타입으로 하면 ref:"User"를 통해 User.js 에서 유저 정보를 가져올 수 있음.
    postFrom: {
      type: Schema.Types.ObjectId,
      ref: "Board"
    },
    contents: {
      type: String,
    },
    // 게시물 내용
  },
  { timestamps: true }
  //게시물 작성 시간 기록
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = { Comment };
