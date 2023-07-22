import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"; // ch 11
import { useAuthContext } from "../hooks/useAuthContext"; //ch n15
import { YTvideos } from "../hooks/getYoutudeApi";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout"; //ch n11 get useLogout fountion




//匯入 WorkoutDetails 9
// import WorkoutDetails from "../components/WorkoutDetails";
// import WorkoutForm from "../components/Workoutform.js"; //ch10
const NewHome = () => {
  const [dates, setDates] = useState(null); //ch 11
  //ch n15 如果登入才会向後端發請求

  // //ch9 將所有workout顯示在home page//new
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/api/data");
  //     const json = await response.json();

  //     if (response.ok) {
  //       setDates(json);
  //       // console.log();
  //     }
  //   };
  //   //ch n15登入才向後端發請求

  //   fetchData();
  // }, []); //ch n15登入才向後端發請求 //加上[]这令 useEffect只會在第一次觸發

  // ch n11  call useLogout function to delete the local storage
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
//youtude api


  return (
    <div className="NewHome">
      <div className="wrap">
        <div className="Navigation left">
          <h1> Youtude vidio list </h1>
          {dates &&
            dates.map((a) => (
              <p key={a._id}>{a.name}</p> //這行把资料顯示在web
            ))}
          <p>
            {" "}
            <i className="fa-brands fa-youtube"></i>streaming
          </p>
          <p>
            <i className="fa-brands fa-square-youtube"></i>upcoming
          </p>
          <p>
            <i className="fa-brands fa-twitter"></i>twitter
          </p>
        </div>
        <div className="right">
          {/* navbar */}
          <div className="right_navbar">
            {/* ch n13 then show user email in web */}

            <button onClick={handleClick}>Log out</button>
          </div>
          <div className="context">
           
            <YTvideos  /> 
          </div>
          {/* <content/> */}
        </div>
      </div>
    </div>
  );
};
export default NewHome; //令期他js可以用這function

//*開網站時 記得前後端都開起来
//看到ch2
