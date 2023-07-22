//ch new 2 make a model去放user资料
//1 拿mongoose libiray
const mongoose = require("mongoose");
const Schema = mongoose.Schema; //Schema 允許您更改存儲在每個文檔中的字段，及其驗證要求和默認值

const bcrypt = require("bcrypt"); ///ch n3 2 bcrypt=加密libiary
const validator = require("validator"); //ch n4 1 validator用來驗password和email格式對不對,強度夠不夠
//2 決定model(=表)要放什麽
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//ch n3 1 make a static signup method 做一個靜態? signup method
userSchema.statics.signup = async function (email, password) {
  //用this不能用=> arrow funtion

  //validator ch n4 2 驗password和email格式對不對,強度夠不夠
  //如果有欄留空,傳error message
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  //看email是不是有效email,不是傳error message
  if (!validator.isEmail(email)) {
    throw Error("Emaill is not valid");
  }
  //password強度夠不夠,不夠傳error message
  if (!validator.isStrongPassword(password)) {
    throw Error("password is not a strong password");
  }

  //看和已註冊的email相不相同 , 回報錯误
  const exists = await this.findOne({ email }); // findone? this=mongoose.model('User', userSchema);
  //if "exists" is not emtye, it mean 己有相同email被註册 , 回報error msseage
  if (exists) {
    throw Error("Email already in use"); //throw?
  }
  //

  //ch n3 3 產生salt用來和password一起加密  防止黑客用多個相同password來破解hash
  const salt = await bcrypt.genSalt(10); //genSalt? (數字) 數字愈大愈破解,但使用者等候註冊時間也會增加
  //用salt,password一起加密*
  const hash = await bcrypt.hash(password, salt);
  //創造新用户
  const user = await this.create({ email, password: hash }); //this=mongoose.model('User', userSchema);
  return user;
};

//static login method ch n7 1 login時！看email和密码對不對
userSchema.statics.login=async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
//從database找同一個email
  const user = await this.findOne({ email }); // findone 
  //如果database找没有這email
  if (!user) {
    throw Error("Incorrect email"); 
  }
  //看hash相不相同(對密碼)
  const match= await bcrypt.compare(password,user.password);
  //如果password不同
  if (!match) {
    throw Error('Incorrect password')
  }
  return user;
}


//令 controller 可以連到 model /連到database時要用 mongoose.model('User',  )
module.exports = mongoose.model("User", userSchema);

//ch n3 the start of building a data base:build login signin 的 controll router  model
