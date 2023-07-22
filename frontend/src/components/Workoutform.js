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

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout), //把workout={title,load,reps}变成json字串
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`, //ch n15send token到後端
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
      <h3>Add a New Workout</h3>
      <label>Excersize Title:</label>
      {/* 把data綁到 title,setTitle */}
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""} //ch 13 如果title是空會 得到error class
        //空的話可以用css在這class令它变紅
      />

      {/* //表格 的html   */}
      <label>Load(in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""} //ch 13 如果load是空會 得到error class
      />

      {/* //表格 的html   */}
      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""} //ch 13 如果reps是空會 得到error class
      />

      <button>Add Workout</button>
      {/* 如果有error 輸出 */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
