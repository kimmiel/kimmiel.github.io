import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"; // ch 11
import { useAuthContext } from "../hooks/useAuthContext"; //ch n15
import { YTvideos } from "../components/YoutudeApi";
import { YTvideosUpComing } from "../components/YoutudeApiUpcomeing";
import { TwtichVideos } from "../components/TwitchApi";
import { LeftNavbar } from "../components/leftbar";
import { TopNavigation } from "../components/topNavigation";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout"; //ch n11 get useLogout fountion

//匯入 WorkoutDetails 9
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/Workoutform.js"; //ch10
const Streaming = () => {
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
    <div className="BackColorStream">
      
      <div className="NewHome">
        <div className="wrap">
          {/* left Navigation bar 所有分頁開頭必須大寫*/}
          <LeftNavbar />

          <div className="right">
            {/* navbar */}
            <TopNavigation />
            <div className="rightInner">
              {/* navbar */}
              <div className="right_navbar">
                {/* ch n13 then show user email in web */}

                <button onClick={handleClick}>Log out</button>
              </div>

              <div className="context">
                <div className="fromAndStream">
                  <h1>streaming</h1>
             
                    {/* <h1>Youtube Videos</h1> */}
                    {workouts &&
                      workouts.map((workout) => (
                        <YTvideos workout={workout} key={workout._id} />
                      ))}
                    {/* <h1>Twtich Videos</h1> */}
                    {workouts &&
                      workouts.map((workout) => (
                        <TwtichVideos workout={workout} key={workout._id} />
                      ))}
        
                  <h1>upcoming</h1>
  
                    {workouts &&
                      workouts.map((workout) => (
                        <YTvideosUpComing workout={workout} key={workout._id} />
                      ))}
                  </div>
                </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Streaming;
