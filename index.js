//서버의 시작점
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");


const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://rkdgml:choi0730!A@cluster0.zctomf9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(require("./routes/users"))
app.use(require("./routes/board"))
app.use(require("./routes/comment"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

test