//ch n14 middleware去確應json web token 是否有效
const jwt = require("jsonwebtoken"); // 從jsonwebtoken這libry拿功能
const User = require("../models/userModel");
//ch n14 middleware去確應json web token 是否有效
const requireAuth = async (req, res, next) => {
  //verify authentication 1 身份驗证 authorization=授权
  const { authorization } = req.headers; //json wed token
  //如果没有授权
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  //從 authorization get token
  //token是這樣 "sadf 34rfregfregfrr4eg"所以要用拆開兩份
  const token = authorization.split(" ")[1]; //從空白拆開兩份 , 並拿取笫二份
  //確保web token没有被修改
  try {
    //  拿SECRET去驗這json web token是否真的,如是真存id
    const { _id } = jwt.verify(token, process.env.SECRET);
    //用id找用户
    req.user = await User.findOne({ _id }).select("_id");
    next(); //去route那邊執行function
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Reqest is not authorized" });
  }
};
module.exports = requireAuth;//滙出
