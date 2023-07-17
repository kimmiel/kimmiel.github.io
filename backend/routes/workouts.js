//ch3
//1開頭
const express = require("express");
//從workoutcontroller拿function
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout
} = require("../controllers/workoutController.js"); //ch 6
const requireAuth=require("../middleware/requireAuth")//ch n14拿驗证json web token 的function

const router = express.Router(); //造路由器
//ch n14 require auth for all workout routes
router.use(requireAuth);//ch n14 驗证

//2實作router get all workout
router.get("/", getWorkouts); //ch 6

//get single workout
router.get("/:id", getWorkout); //ch 6
//post a new workout
router.post("/", createWorkout); //叫其他js的function//ch 6
//delete a workout
router.delete("/:id", deleteWorkout);//ch7
//update a workout
router.patch("/:id", updateWorkout);//ch 7
//結尾
module.exports = router;


