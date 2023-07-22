//ch3
//1開頭
const express = require("express");
//從workoutcontroller拿function
const {
  createData,
  getData,
  getDatas,
  deleteData,
  updateData
} = require("../controllers/dataController"); //ch 6
const requireAuth=require("../middleware/requireAuth")//ch n14拿驗证json web token 的function

const router = express.Router(); //造路由器
//ch n14 require auth for all Data routes
router.use(requireAuth);//ch n14 驗证

//2實作router get all workout
router.get("/data", getDatas); //ch 6

//get single Data
router.get("/data/:id", getData); //ch 6
//post a new Data
router.post("/data", createData); //叫其他js的function//ch 6
//delete a Data
router.delete("/data/:id", deleteData);//ch7
//update a Data
router.patch("/data/:id", updateData);//ch 7
//結尾
module.exports = router;


