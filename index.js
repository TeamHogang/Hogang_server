//서버의 시작점
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./data/non-smoking.json", "utf8"));


const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};


app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://parkracoon:pt1221@kangho.k4mc7hv.mongodb.net/?retryWrites=true&w=majority"
    //  "mongodb+srv://rkdgml:choi0730!A@cluster0.zctomf9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// var db;
// MongoClient
//   .connect("mongodb+srv://rkdgml:choi0730!A@cluster0.zctomf9.mongodb.net/?retryWrites=true&w=majority", function(err, client){
//   if(err) {return console.log(err)};

//   db = client.db('test');
// })


app.use(require("./routes/users"))
app.use(require("./routes/board"))
app.use(require("./routes/comment"))
app.use(require("./routes/marker"))
app.use(require("./routes/main"))
app.use(require("./routes/admin"))
app.use(require("./routes/requestedmarker"))


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
