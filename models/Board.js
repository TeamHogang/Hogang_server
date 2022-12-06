const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // ObjectId를 타입으로 하면 ref:"User"를 통해 User.js 에서 유저 정보를 가져올 수 있음.
    title: {
      type: String,
    },
    // 게시물 제목
    contents: {
      type: String,
    },
    // 게시물 내용
  },
  { timestamps: true }
  //게시물 작성 시간 기록
);
BoardSchema.index({title : ' text'});
const Board = mongoose.model("Board", BoardSchema);

module.exports = { Board };
