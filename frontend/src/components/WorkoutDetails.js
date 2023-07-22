import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js";
import { useAuthContext } from "../hooks/useAuthContext"; //ch n15

//data fns ch 14日期排版
import formatDistanceToNow from "date-fns/formatDistanceToNow";

//ch9 WorkoutDetails 把资料都顯示到網頁
const WorkoutDetails = ({ workout }) => {
  //ch 12 dele function
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext(); //ch n15

  //要傳東西到後端時要用async,在async的function内一定要用await ,await在得到後端的资料(eg json) 時用
  const handleClick = async () => {
    //ch n15 如果没有login
    if (!user) {
      return;
    }

    //fetch=發送請求 终點是/api/workouts/或有該id 行動是 method:'DELETE'
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      //ch n15傳授权 下面是signature
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    });

    const json = await response.json(); //記下回應的文字

    if (response.ok) {
      //get context while action is delete ,payload is json
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load(kg):</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps:</strong>
        {workout.reps}
      </p>
      {/* 用date-fns去排版以下日期 addSuffix後缀 eg xxday ago */}
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      {/* ch14 material-symbols-outlined 是來自google icon libriy ,delete 也是來自libriy 的修件 */}
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
      {/* onClick 按下之後會執行handleClickfunction   //ch 12 dele function*/}
    </div>
  );
};

export default WorkoutDetails;

// 可以看到async函數return的是一個Promise Object，如果在async function中return一個直接的變數，async會通過Promise.resolve()將它封裝成Promise，若在沒有await的情況下執行async函數會"立即"執行返回一個Promise Object。

// await ?
// 一般來說await是在等待一個async函數的完成，因為async函數return一個Promise Object，所以await可以用於等待一個async的return值。注意!!await不僅用於等Promise Object它也可以接普通函數或是直接的變數。
//日期排版
