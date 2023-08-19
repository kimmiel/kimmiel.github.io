import react, { useEffect, useState } from "react";

const GET_TOKEN = "https://id.twitch.tv/oauth2/token";

export const TwtichVideos = ({ workout }) => {
  // console.log("workout  Twtich " + JSON.stringify(workout));

  const CLTENT_ID = workout.reps;
  const CLTENT_SECRET = workout.twitchSecret;

  const [allvideosName, setAllvideosName] = useState([]);

  useEffect(() => {
    const streamArray = [];
    let stream = "";
    let streamLength = "";

    function getTwitchAuthorization() {
      let url = `${GET_TOKEN}?client_id=${CLTENT_ID}&client_secret=${CLTENT_SECRET}&grant_type=client_credentials`;

      return fetch(url, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
    }

    async function getStreams() {
      const endpoint =
        `https://api.twitch.tv/helix/streams?user_login=${workout.twitchchannel}`;

      let authorizationObject = await getTwitchAuthorization();
      let { access_token, expires_in, token_type } = authorizationObject;

      //token_type first letter must be uppercase
      token_type =
        token_type.substring(0, 1).toUpperCase() +
        token_type.substring(1, token_type.length);

      let authorization = `${token_type} ${access_token}`;

      let headers = {
        authorization,
        "Client-Id": CLTENT_ID,
      };

      fetch(endpoint, {
        headers,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("how much Data : " + data.data.length);
          streamLength = data.data.length;
          stream = data;
          console.log("length " + streamLength);
          for (let i = 0; i < streamLength; i++) {
            console.log(
              "twich Data: " + i + " " + JSON.stringify(stream.data[i])
            );

            streamArray.push(
              `https://player.twitch.tv/?channel=${stream.data[i].user_login}&parent=www.example.com`
            );
          }
          setAllvideosName(streamArray);
          // console.log("JSON.stringify(data) : "+JSON.stringify(data));
        });
    }

    getStreams();
  }, []);
  // for (let i = 0; i < allvideosName.length; i++) {
  //   console.log("allvideosName " + allvideosName[i] + " No " + i);
  // }

  return (
    <div className="twtich">
      <h1>Twtich Videos</h1>
      {allvideosName.map((item) => {
        //map() 會分配內存空間儲存新資料並返回， forEach() 不會回傳資料
        console.log("item foreach : " + item);
        return (
          <div>
            {" "}
            <iframe
              width="620"
              height="378"
              className="video"
              src={item}
              frameborder="0"
              allowfullscreen="false"
              scrolling="no"
              title="youtude vidio"
            ></iframe>
          </div>
        );
      })}
    </div>
  );
};
// "https://player.twitch.tv/?channel=shxtou&parent=www.example.com"
