import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext"; //ch n15

//ch 10 一個form可創造資料
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext(); //ch n15

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
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

    const workout = { title, load, reps, twitchSecret, twitchchannel };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout), //把workout={title,load,reps}变成json字串
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
      setTitle("");
      setLoad("");
      setReps("");
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
      <h3>Add a New date</h3>
      {/* <label>your youtube key :</label> */}
      {/* 把data綁到 title,setTitle */}
      <input
        type="text" 
        placeholder="your youtube key"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""} //ch 13 如果title是空會 得到error class
        //空的話可以用css在這class令它变紅
      />

      {/* //表格 的html   */}
      {/* <label>Youtube Channel Id:</label> */}
      <input
        type="text"
        placeholder="Youtube Channel Id"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""} //ch 13 如果load是空會 得到error class
      />

      {/* //表格 的html   */}
      {/* <label>Your Twitch Key :</label> */}
      <input
        type="text"
        placeholder="Your Twitch Key"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""} //ch 13 如果reps是空會 得到error class
      />

      {/* //表格 的html   */}
      {/* <label>Twitch Secret:</label> */}
      <input
        type="text"
        placeholder="Twitch Secret"
        onChange={(e) => settwitchSecret(e.target.value)}
        value={twitchSecret}
        className={emptyFields.includes("twitchSecret") ? "error" : ""} //ch 13 如果twitchSecret是空會 得到error class
      />

      {/* //表格 的html   */}
      {/* <label>Twitch Channel:</label> */}
      <input
        type="text"
        placeholder="Twitch Channel"
        onChange={(e) => settwitchchannel(e.target.value)}
        value={twitchchannel}
        className={emptyFields.includes("twitchchannel") ? "error" : ""} //ch 13 如果twitchchannel是空會 得到error class
      />

      <button>Add</button>
      {/* 如果有error 輸出 */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
