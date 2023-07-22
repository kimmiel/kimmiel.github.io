import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"; // ch 11
import { useAuthContext } from "../hooks/useAuthContext"; //ch n15

//匯入 WorkoutDetails 9
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/Workoutform.js"; //ch10
const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext(); //ch 11
  //ch n15 如果登入才会向後端發請求
  const { user } = useAuthContext();

  //ch9 將所有workout顯示在home page
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          //ch n15傳授权 下面是signature
          Authorization: `Bearer ${user.token}`,
        },
      }); //連到backend的routes/workouts.js
      const json = await response.json();

      if (response.ok) {
        //更新workout  dispatch 會觸法workoutsReducer 11
        dispatch({ type: "SET_WORKOUTS", payload: json }); //dispatch 格式({type:  ,xxx:  })
        //{type:'SET_WORKOUTS',payload:json} =action
      }
    };
    //ch n15登入才向後端發請求
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]); //ch n15登入才向後端發請求 //加上[]这令 useEffect只會在第一次觸發

  return (
    <div className="home">
      <div className="workouts">
        {/* 單獨觸發workout並回傳資料名称 ch9*/}
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm /> {/* ch 10 */}
    </div>
  );
};
export default Home; //令期他js可以用這function

//*開網站時 記得前後端都開起来
//看到ch2
