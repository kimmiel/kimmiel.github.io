const Workout = require("../models/workoutModel"); //ch 6
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  //ch n17限制只能拿自己造的workout
  const user_id = req.user.id;
  //ch n17只能find自己造的workout  額外例子find({twitchId:20}),get所有twitchId:20的document
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 }); //按時間sort({createdAt: })降序顯示-1
  res.status(200).json(workouts);
};

//get a single workout 可以在網
const getWorkout = async (req, res) => {
  const { id } = req.params;
  //如果id不是mongoose的格式顯示404
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout!" });
  }
  const workout = await Workout.findById(id); //get id
  if (!workout) {
    //如果錯誤顯示下面信息
    return res.status(404).json({ error: "No such wotkout" });
  }
  res.status(200).json(workout); //表示運行正常?
};

//create new workout
const createWorkout = async (req, res) => {
  // ch5 加上async变成異步
  const { youtubeKey, ChannelId, twitchId, channalTitle, twitchSecret, twitchchannel ,image} =
    req.body; //ch5 設好req有咩屬性

  //ch 13 改error message 傳出的信息
  let emptyFields = [];

  // // if title is emtype
  // if (!youtubeKey) {
  //   emptyFields.push("youtubeKey"); //array.push = 加上
  // }
  // // if ChannelId is emtype
  // if (!ChannelId) {
  //   emptyFields.push("ChannelId");
  // }

  // // if channalTitle is emtype
  // if (!channalTitle) {
  //   emptyFields.push("channalTitle");
  // }

  // // if twitchId is emtype
  // if (!twitchId) {
  //   emptyFields.push("twitchId");
  // }

  // if (!twitchSecret) {
  //   emptyFields.push("twitchSecret");
  // }

  // if (!twitchchannel) {
  //   emptyFields.push("twitchchannel");
  // }

  // if (emptyFields.length > 0) {
  //   // return error massege
  //   return res
  //     .status(400)
  //     .json({ error: "Please fill in all the fields", emptyFields });
  // }

  //add new doc to datatbase
  try {
    const user_id = req.user._id; //ch n17在middleware獲得id
    const workout = await Workout.create({
      youtubeKey,
      ChannelId,
      twitchId,
      channalTitle,
      twitchchannel,
      twitchSecret,
      image,
      user_id,
    }); //ch n17 user_id
    res.status(200).json(workout); //回覆成功
  } catch (error) {
    //失败時catch会捉到error and return error message
    res.status(400).json({ error: error.message }); //回覆失败
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  //ch7
  const { id } = req.params;
  //如果id不是mongoose的格式顯示404
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such workout!" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    //如果錯誤顯示下面信息No such wotkout
    return res.status(400).json({ error: "No such wotkout" });
  }

  res.status(200).json(workout); //表示運行正常
};

//uqdate a workout
const updateWorkout = async (req, res) => {
  //ch7
  const { id } = req.params;
  //如果id不是mongoose的格式顯示404
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout!" });
  }
  //update全部 ...把req.body变成objuct
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    //如果錯誤顯示下面信息No such wotkout
    return res.status(400).json({ error: "No such wotkout" });
  }

  res.status(200).json(workout); //表示運行正常
};
//外其他js檔也能用這function
module.exports = {
  getWorkout,
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
