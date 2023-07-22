import react, { useEffect, useState } from "react";
const key = "AIzaSyD-theftwz5hax5Flh9O6E1CheKZ5Kj4Yc";
const id = "UChJ5FTsHOu72_5OVx0rvsvQ";
const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&maxResults=5&order=date&key=${key}`;
export const YTvideos = () => {
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
    <div>
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
