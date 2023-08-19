const Data = require("../models/dataModel"); //ch 6
const mongoose = require("mongoose");
const scrape = require("../models/scrapeYutubeHomePage"); //ch 6
//get all datas
const getDatas = async (req, res) => {
  //ch n17限制只能拿自己造的Data
  // const user_id = req.user.id;
  // //ch n17只能find自己造的Data  額外例子find({reps:20}),get所有reps:20的document
  const datas = await Data.find({}).sort({ createdAt: -1 }); // const datas = await Data.find({ user_id }).sort({ createdAt: -1 }); //按時間sort({createdAt: })降序顯示-1
  res.status(200).json(datas);
};

//get a single data 可以在網
const getData = async (req, res) => {
  const { id } = req.params;
  //如果id不是mongoose的格式顯示404
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such data!" });
  }
  const data = await Data.findById(id); //get id
  if (!data) {
    //如果錯誤顯示下面信息
    return res.status(404).json({ error: "No such wotkout" });
  }
  res.status(200).json(data); //表示運行正常?
};

//create new data
const createData = async (req, res) => {
 // res.json({mssg:"sdcfdssd"});
  // ch5 加上async变成異步

  const { key , id } = req.body; //ch5 設好req有咩屬性
  // res.json({mssg:key});
  //ch 13 改error message 傳出的信息
  let emptyFields = [];

  // if key is emtype
  if (!key) {
    emptyFields.push("key"); //array.push = 加上
  }
  // if id is emtype
  if (!id) {
    emptyFields.push("id");
  }

  if (emptyFields.length > 0) {
    // return error massege
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  //add new doc to datatbase
  try {
    // const user_id = req.user._id; //ch n17在middleware獲得id
    const data = await Data.create({ key, id}); //ch n17 user_id //, user_id 
    res.status(200).json(data); //回覆成功
  } catch (error) {
    //失败時catch会捉到error and return error message
    res.status(400).json({ error: error.message }); //回覆失败
  }
};

//delete a data
const deleteData = async (req, res) => {
  //ch7
  const { id } = req.params;
  //如果id不是mongoose的格式顯示404
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such data!" });
  }
  const data = await Data.findOneAndDelete({ _id: id });

  if (!data) {
    //如果錯誤顯示下面信息No such wotkout
    return res.status(400).json({ error: "No such wotkout" });
  }

  res.status(200).json(Data); //表示運行正常
};

//uqdate a data
const updateData = async (req, res) => {
  //ch7
  const { id } = req.params;
  //如果id不是mongoose的格式顯示404
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such data!" });
  }
  //update全部 ...把req.body变成objuct
  const data = await Data.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!data) {
    //如果錯誤顯示下面信息No such wotkout
    return res.status(400).json({ error: "No such wotkout" });
  }

  res.status(200).json(data); //表示運行正常
};


//外其他js檔也能用這function
module.exports = {
  getData,
  getDatas,
  createData,
  deleteData,
  updateData,
};
