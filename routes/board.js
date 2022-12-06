const express = require("express");
const { User } = require("../models/User");
const { Board } = require("../models/Board");
const { Comment } = require("../models/Comment");
const router = express.Router();
// var search = createSearch(req.query);/
// 글 생성
router.post("/board", (req, res) => {
  Board.create(req.body, async (err, board) => {
    if (err) return res.json(err);
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
  Promise.all([Comment.find({ boardFrom: req.params.id }).populate('userFrom', 'nickname'),
    board, user.nickname])
    .then(([comment, board, usernickname]) => { res.status(200).send({ comment: comment, board: board, usernickname: usernickname }) })

});

//피드 삭제
router.delete("/board/:id", (req, res) => {
  Board.deleteOne({ _id: req.params.id }, (req, res), (err) => {
    if (err) return res.json(err);

    return res.status(200).send("ok");
  });
});

//피드 전체 리스트
router.get("/board", async (req, res) => {
  Board.find({})
    .sort("-createdAt")
    .exec((err, board) => {
      if (err) return res.json(err);
      return res.status(200).send({ board: board });
    });
 



  // const board = await Board.find({})

  // Promise.all([Board.find({})])
  // .then(([boardtitle])=>{res.status(200).send({boardtitle : board.title})})

});




// router.get("/search", async(req,res)=>{
//   Board.find({$text : {$search : req.query.value}}).toArray((err,result) =>{
//        res.render('search.ejs', {searchboard : result});
//       // if (err) return res.json(err);
//       // return res.status(200).send({ board: result });
//     })
// })
// function createSearch(queries){
//   var findPost = {};
//   if(queries.searchType && queries.searchText && queries.searchText.length >= 3){
//     var searchTypes = queries.searchType.toLowerCase().split(",");
//     var postQueries = [];
//     if(searchTypes.indexOf("title")>=0){
//       postQueries.push({ title : { $regex : new RegExp(queries.searchText, "i") } });
//     }
//     if(searchTypes.indexOf("body")>=0){
//       postQueries.push({ body : { $regex : new RegExp(queries.searchText, "i") } });
//     }
//     if(postQueries.length > 0) findPost = {$or:postQueries};
//   }
//   return { searchType:queries.searchType, searchText:queries.searchText,
//     findPost:findPost};
// }
// router.get('/search', (req, res) => {
//   let options = []
//   if (req.query.option == 'title') {
//     options = [{ title: new RegExp(req.query.content) }]
//   } else if (req.query.option == 'content') {
//     options = [{ content: new RegExp(req.query.content) }]
//   } else if (req.query.option == 'title+content') {
//     options = [
//       { title: new RegExp(req.query.content) },
//       { content: new RegExp(req.query.content) },
//     ]
//   } else {
//     const err = new Error('검색 옵션이 없습니다.')
//     err.status = 400
//     throw err
//   }
// })
// router.get('/search', (req,res)=>{
//   console.log(req.query.content)
//   Board.find({title : new RegExp(req.query.content)})
//   return res.json
//   // let option = []
//   // if (req.query.option == 'title'){
//   //   option = [{title: new RegExp(req.query.content)}]
//   // } else if (req.query.option == 'contents'){
//   //   option = [{contents: new RegExp(req.query.content)}]
//   // }else if (req.query.option == 'contents+title'){
//   //   option = [
//   //     {title: new RegExp(req.query.content)},
//   //     {contents: new RegExp(req.query.content)},
      
//   //   ]
//   // }else {
//   //   const err = new Error('no search')
//   //   err.status = 400
//   //   throw err
//   // }
  
//   // const board = Board.find({$or : option}) 
//   // ;
// })

router.get('/search', (req,res)=>{
  console.log(req.query.keyword)
  Board.find().or([{title: new RegExp(req.query.keyword)}, {contents: new RegExp(req.query.keyword)}])
  .exec((err, board) => {
    if (err) return res.json(err);
    return res.status(200).send({ board: board });
  
})
})
module.exports = router;
