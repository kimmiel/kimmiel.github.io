//ch3
//1開頭
const express = require("express");
const router = express.Router();

//從workoutcontroller拿function
const {
  createData,
  getData,
  getDatas,
  deleteData,
  updateData
} = require("../controllers/dataController"); //ch 6

const requireAuth=require("../middleware/requireAuth")//ch n14拿驗证json web token 的function

//ch n14 require auth for all Data routes
router.use(express.json());//ch n14 驗证

//2實作router get all workout
router.get("/", getDatas); //ch 6

//get single Data
router.get("/:id", getData); //ch 6
//post a new Data
router.post("/", 
createData
); //叫其他js的function//ch 6
//delete a Data
router.delete("/:id", deleteData);//ch7
//update a Data
router.patch("/:id", updateData);//ch 7
//結尾
module.exports = router;


// (req,res)=>{
//   req.json({mssg:"cxcgvs"})}