import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext"; //ch n15

//ch 10 一個form可創造資料
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext(); //ch n15

  const [youtubeKey, setyoutubeKey] = useState("");
  const [ChannelId, setChannelId] = useState("");
  const [twitchId, settwitchId] = useState("");
  const [channalTitle, setchannalTitle] = useState("");
  const [twitchSecret, settwitchSecret] = useState("");
  const [twitchchannel, settwitchchannel] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]); //ch 13

  //提交功能
  const handleSubmit = async (e) => {
    e.preventDefault(); // 提交時不會refres the page
    //ch n15 如果没有login
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = {
      youtubeKey,
      ChannelId,
      twitchId,
      channalTitle,
      twitchSecret,
      twitchchannel,
    };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout), //把workout={title,ChannelId,twitchId}变成json字串
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, //ch n15send token到後端
      },
    });
    const json = await response.json();

    //如果response有error
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields); //ch 13
    }
    if (response.ok) {
      //初始化
      setyoutubeKey("");
      setChannelId("");
      settwitchId("");
      setchannalTitle("");
      settwitchSecret("");
      settwitchchannel("");
      setError(null);
      setEmptyFields([]);

      //console.log("new workout added", json);
      //即時在網頁上更新
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  return (
    //表格 的html
    <form className="create" onSubmit={handleSubmit}>
      <h3>Adding New channel</h3>

      <div className="fristLevel">
        {/* 把data綁到 youtubeKey,setyoutubeKey */}
        <input
          type="text"
          placeholder="your youtube key"
          onChange={(e) => setyoutubeKey(e.target.value)}
          value={youtubeKey}
          className={emptyFields.includes("youtubeKey") ? "error" : ""} //ch 13 如果title是空會 得到error class
          //空的話可以用css在這class令它变紅
        />

        {/* channal name */}
        <input
          type="text"
          placeholder="channal name"
          onChange={(e) => setchannalTitle(e.target.value)}
          value={channalTitle}
          className={emptyFields.includes("channalTitle") ? "error" : ""} //ch 13 如果channalTitle是空會 得到error class
        />
      </div>
      
      {/*ChannelId  */}
      <div className="secondLevel">
      <input
        type="text"
        placeholder="Youtube Channel Id"
        onChange={(e) => setChannelId(e.target.value)}
        value={ChannelId}
        className={emptyFields.includes("ChannelId") ? "error" : ""} //ch 13 如果ChannelId是空會 得到error class
      />
      </div>
      {/* <p>you can find Channel Id by Channel name through below web site </p>
      <a href="https://commentpicker.com/youtube-channel-id.php#google_vignette">https://commentpicker.com/youtube-channel-id.php#google_vignette</a> */}

      <button>Add</button>
      {/* 如果有error 輸出 */}
      {error && <div className="error">{error}</div>}
      {/* ////////////////Twitch/////////// */}
      <br />
      <div className="fristLevel">
        <input
          type="text"
          placeholder="Your Twitch Key"
          onChange={(e) => settwitchId(e.target.value)}
          value={twitchId}
          className={emptyFields.includes("twitchId") ? "error" : ""} //ch 13 如果twitchId是空會 得到error class
        />

        {/* <label>Twitch Secret:</label> */}
        <input
          type="text"
          placeholder="Twitch Secret"
          onChange={(e) => settwitchSecret(e.target.value)}
          value={twitchSecret}
          className={emptyFields.includes("twitchSecret") ? "error" : ""} //ch 13 如果twitchSecret是空會 得到error class
        />
      </div>
      <div className="secondLevel">
      {/* <label>Twitch Channel:</label> */}
      <input
        type="text"
        placeholder="Twitch Channel"
        onChange={(e) => settwitchchannel(e.target.value)}
        value={twitchchannel}
        className={emptyFields.includes("twitchchannel") ? "error" : ""} //ch 13 如果twitchchannel是空會 得到error class
      />
</div>
      <button>Add</button>
      {/* 如果有error 輸出 */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
