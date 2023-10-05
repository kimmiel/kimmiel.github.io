//ch 5
const mongoose = require("mongoose");

//定下workout的格式
const Schema = mongoose.Schema;
const workoutSchema = new Schema(
  {
    youtubeKey: {
      type: String,
      required: function () {
        return this.ChannelId === 1;
      },
    },
    ChannelId: {
      type: String,
    },

    channalTitle: {
      type: String,
    },
    twitchId: {
      type: String,
      required: function () {
        return this.twitchSecret === 1;
      },
    },
    twitchSecret: {
      type: String,
    },
    twitchchannel: {
      type: String,
    },
    image: {
      type: String,
    },
    // ch n17 workout記下創立它的用户id
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //當文件產生自動產生上面的屬性
  }
);

//創建module
module.exports = mongoose.model("Workout", workoutSchema);

//Workout.find();//find上面所有屬性
