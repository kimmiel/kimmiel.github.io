import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"; // ch 11
import { useAuthContext } from "../hooks/useAuthContext"; //ch n15
import { YTvideos } from "../components/YoutudeApi";
import { TwtichVideos } from "../components/TwitchApi";
import { LeftNavbar } from "../components/leftbar";
import { TopNavigation } from "../components/topNavigation";

import React, { useRef } from "react";
import { render } from "react-dom";
// get our fontawesome imports
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { TopNavigatxion } from "../img/pex"

import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout"; //ch n11 get useLogout fountion

//匯入 WorkoutDetails 9
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/Workoutform.js"; //ch10
const NewHome = () => {
  const [dates, setDates] = useState(null); //ch 11
  const { workouts, dispatch } = useWorkoutsContext(); //ch 11
  const myRef = useRef < HTMLDivElement > null;

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

  // 平滑滚动
  const handleClickScroll = () => {
    const element = document.getElementById("content");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClickScrollFillForm = () => {
    const element = document.getElementById("Form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  //youtude api
  // function scroll(){                          {/* ??? */}}
  return (
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
              <div className="fristPage">
                <div className="fristPageInner">
                  <div className="backImg">
                    <div>
                      <h1>Live Collection</h1>
                      <p>
                        Know for the first time that there are those streamer
                        you like live now
                      </p>
                      <div className="start">
                        <div>
                          {/* <a href="#content">  */}
                          <button onClick={handleClickScroll}>start</button>
                          {/* </a>                      */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="content"></div>
              <div className="intro">
                <h1>follow steps below</h1>
                <div className="introp">
                  <p>
                    Apply tour youtube and twitch api key. To fill in all stearm
                    information.
                  </p>
                </div>
              </div>
              <div className="allStep">
                <div className="step step1">
                  <a href="https://developers.google.com/youtube/v3/getting-started?hl=zh-tw">
                    <div className="stepImg1"></div>
                  </a>
                  <div className="stepInto">
                    <p>
                      <a href="https://developers.google.com/youtube/v3/getting-started?hl=zh-tw">
                        apply youtube api key
                      </a>
                    </p>
                  </div>
                  <div className="introDetail">
                    <p>
                      youtube api can help you to To get <br /> youtube stream's
                      information.
                    </p>
                  </div>
                </div>
                <div className="step step2">
                  <a href="https://developers.google.com/youtube/v3/getting-started?hl=zh-tw">
                    <div className="stepImg2"></div>
                  </a>
                  <div className="stepInto">
                    <p>
                      <a href="https://dev.twitch.tv/docs/api/get-started/">
                        twitch api key and secret
                      </a>
                    </p>
                  </div>
                  <div className="introDetail">
                    <p>
                      twitch api can help you to To get <br /> twitch stream's
                      information.
                    </p>
                  </div>
                </div>
                <div className="step step3">
                  <Link to="/streamDatas">
                    <div className="stepImg3"></div>
                  </Link>
                  <div className="stepInto">
                    <p onClick={handleClickScrollFillForm}>Fill in the form</p>
                  </div>
                  <div className="introDetail">
                    <p>
                      {" "}
                      The video to be played will be <br /> displayed on
                      streaming page
                    </p>
                  </div>
                </div>
              </div>
              <div className="fromAndStream" id="Form">
                {/* add data */}
                <WorkoutForm /> {/* ch 10 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewHome; //令期他js可以用這function

//*開網站時 記得前後端都開起来
//看到ch2

// 暫離
