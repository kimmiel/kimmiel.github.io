import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"; // ch 11
import { useAuthContext } from "../hooks/useAuthContext"; //ch n15

import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout"; //ch n11 get useLogout fountion

//匯入 WorkoutDetails 9

export const TopNavigation = () => {
  const [dates, setDates] = useState(null); //ch 11
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
  // ch n11  call useLogout function to delete the local storage
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  return (
    <div className="topNavigation">
      {/* <h1> Youtude vidio list </h1> */}

      {/* 分頁 */}
      <Link to="/streaming">
        <p>
          <i className="fa-brands fa-youtube"></i>Streaming
        </p>
      </Link>

      <Link to="/upcomeing">
        <p>
          <i className="fa-brands fa-youtube"></i>Upcoming
        </p>
      </Link>

      <Link to="/streamDatas">
        <p>
          <i className="fa-brands fa-youtube"></i>Data
        </p>
      </Link>

     <p> <button onClick={handleClick}>Log out</button></p>
    </div>
  );
};
