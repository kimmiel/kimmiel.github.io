import react, { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js";
import { useAuthContext } from "../hooks/useAuthContext"; //ch n15
import { Link } from "react-router-dom";

export const YTvideos = ({ workout }) => {
  const key = workout.youtubeKey;
  const id = workout.ChannelId;
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&eventType=live&type=video&key=${key}`;
  // const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&maxResults=1&order=date&key=${key}`;


  const [ChannalTitle, setChannalTitle] = useState([]);
  const [ChannalImg, setChannalImg] = useState([]);
  const [allvideos, setAllvideos] = useState([]);
  useEffect(() => {
    let viodeoNumber = 0;
    fetch(url)
      .then((response) => {
        // console.log(response.json);
        return response.json();
      })
      .then((data) => {
        viodeoNumber = data.pageInfo.totalResults;
        console.log("totalResults :" + viodeoNumber);

          const result = data.items.map((doc) => ({
            ...doc,
            videolink: "https://www.youtube.com/embed/" + doc.id.videoId,
          }));
          console.log("key " + key);
          // console.log("Youtube data :" + JSON.stringify(data));
          // setChannalTitle(data.items[0].snippet.channelTitle);
          // console.log("channelTitle :" + data.items[0].snippet.channelTitle);
          console.log(
            "channelTitle :" + data.items[0].snippet.thumbnails.default.url
          );
          setAllvideos(result);
    
      });
  }, []);

  // console.log(" videoGrop " + allvideos);
  return (
    <div className="youtube">
      {allvideos.map((item) => {
        return (
          
          <div >
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


