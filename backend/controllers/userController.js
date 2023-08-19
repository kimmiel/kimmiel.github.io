//ch new 2 開始去建user登入系统

const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); //jsonwebtoken 用來make json web Token ch n6 1

//make json web Token ch n6 2
const createToken = (_id) => {
  //制造,回傳json web Token
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" }); //id,只有server知的字串,option eg有效期
};

//login user
const loginUser = async (req, res) => {
  //ch n7 login 時對email, password 和創造token
  const { email, password } = req.body;
   // res.json({mssg:email});
  try {
    //把用户資料加入database
    const user = await User.login(email, password); // login 是來自userModel的function
    //ch n6 3 create token
    const token = createToken(user._id);
    //回傳用户資料  res.status(200)?
    res.status(200).json({ email, token });
  } catch (error) {
    //回傳error message
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  //ch n3 get user data
  const { email, password } = req.body;
  try {
    //把用户資料加入database
    const user = await User.signup(email, password); // signup 是來自userModel的function
    //ch n6 3 create token
    const token = createToken(user._id);
    //回傳用户資料  res.status(200)?
    res.status(200).json({ email, token });
  } catch (error) {
    //回傳error message
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };

//在controll每function 都用 res.status( ).json( )
