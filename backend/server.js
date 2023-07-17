//ch2 入門
require("dotenv").config(); //令env的東西可以用

//1 開始建json npm init -y
//2 安裝express npm install express
// 3.1 在server中創建express應用程式
const express = require("express");
const mongoose = require("mongoose"); //ch.4
const workoutRoutes = require("./routes/workouts.js"); //ch.3

const userRoutes = require("./routes/user"); //ch.2 new 拿userRoutes(有理处理user登入登出功能的网址)

const app = express(); //express app 啟動express

//3.2 listen for requests(原本)
// app.listen(4000, () => {
//   console.log('listeneing on port 400');
// });
// node server.js 在終端顯示console.log的句子
//  npm install -g nodemon save 完之后可以立刻在終端顯示

//3.3 middlewasre 拿req.path和req.method eg / GET(每個request進来都有反應)
app.use(express.json()); //有這個在workouts.js才能用middlewasre,拿req.path req.method req.body 之類的
app.use((req, res, next) => {
  //有next才能到下一個function
  console.log(req.path, req.method);
  next(); //有next才能到下一個function
});

//對expresss做反应,即对前端做反应
//routes
//做網站分頁(原本)
// app.get("/", (req, res) => {
//   //req要求 res respon
//   res.json({ mssg: "Welcome to app" }); //在網顯示站
// }); //localhost:4000
//routes 改成ch3
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);// ch new 2

//ch 4 connect to database//npm install mongoose
mongoose.set("strictQuery",false)//.set("strictQuery",false)严格模式 不会讀入格式不对的data
  .connect(process.env.MONG_URI) //做 .env 令某些東西不会被别人看到例如 github,同學 先下载 npm install dotenv
  .then(() => {
 
    app.listen(process.env.PORT, () => {   //3.2listen for requests(改成)
      console.log("connect to databaseon port ", process.env.PORT); //,process.env.PORT 不要忘了
    }); //npm run dev
  }) //當连上database時啓動這function

  .catch((error) => {
    //當出现error時啓動這function
    console.log(error);
  });

//npm run dev

//出現無解error時試试
//killall node
//npm start
