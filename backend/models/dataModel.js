//ch 5
const mongoose = require("mongoose");

//定下workout的格式
const Schema = mongoose.Schema;
const dataschema = new Schema({
  
  key: {
    type: String,
    required: true
  },
 id:[ {
    type: String, 
    required: true
  }]
  // ,
  // // ch n17 workout記下創立它的用户id
  // user_id:{ 
  //   type:String,
  //   required:true
  // }
},{timestamps: true//當文件產生自動產生上面的屬性
});

//創建module
module.exports = mongoose.model('datas', dataschema)

//Workout.find();//find上面所有屬性