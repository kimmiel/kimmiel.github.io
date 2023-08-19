import react, { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js";
import { useAuthContext } from "../hooks/useAuthContext"; //ch n15
import { Link } from "react-router-dom";



export const YTvideos = ({ workout }) => {


  const key = workout.title; 
  const id = workout.load;
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&maxResults=1&order=date&key=${key}`;

  const [allvideos, setAllvideos] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => {
        // console.log(response.json);
        return response.json();
      })
      .then((data) => {
        const result = data.items.map((doc) => ({
          ...doc,
          videolink: "https://www.youtube.com/embed/" + doc.id.videoId,
        }));
        console.log("data :" + data);
        setAllvideos(result);
      });
  }, []);

  console.log(" videoGrop " + allvideos);
  return (
    <div className="youtube">
      <h1>Youtube Videos</h1>
      {allvideos.map((item) => {
        return (
          <div>
            {" "}
            <iframe
              width="400"
              height="220"
              className="video"
              src={item.videolink}
              title="youtude vidio"
            ></iframe>
          </div>
        );
      })}
    </div>
  );
};
