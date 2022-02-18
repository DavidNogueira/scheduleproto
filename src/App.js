import React from "react";
import * as SC from "./components.css";
function App() {
  const [advice, setAdvice] = React.useState([]);

  React.useEffect(() => {
    const url = "http://localhost:1337/epg";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setAdvice(json.channels);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  const [minutesPersentage, setMinutesPersentage] = React.useState(new Date());
  const myRef = React.useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "start",
    });

  React.useEffect(() => {
    let interval = setInterval(() => setMinutesPersentage(new Date()), 10000);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App" style={{ height: "100%" }}>
      <SC.Container>
        <SC.Board>
          {[
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23,
          ].map((hour) => (
            <SC.Column>
              {/**this function makes the margin being the same size of the minutes */}
              {hour === minutesPersentage.getHours() ? (
                <div ref={myRef} style={{ width: "100%" }}>
                  <SC.MovingLine minutes={minutesPersentage} />
                </div>
              ) : null}
              <SC.ColumnHeader>
                <div>{`${hour > 9 ? hour : "0" + hour}:00`}</div>
                <SC.ShortLine />
              </SC.ColumnHeader>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/**a column */}
                {advice.map((b) => {
                  const videoList = [];
                  [...b.schedules].reduce(function (videoCount, currentVideo) {
                    if (
                      typeof videoCount[
                        new Date(currentVideo.start).getHours()
                      ] !== "undefined"
                    ) {
                      videoCount[new Date(currentVideo.start).getHours()]++;
                      videoList.push({
                        ...currentVideo,
                        place: false,
                      });
                      return videoCount;
                    } else {
                      videoCount[new Date(currentVideo.start).getHours()] = 1;
                      videoList.push({
                        ...currentVideo,
                        place: true,
                      });
                      return videoCount;
                    }
                  }, {});

                  return (
                    <div style={{ height: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          height: "100%",
                        }}
                      >
                        {videoList?.map((video, index) => {
                          const ml =
                            new Date(videoList[index].start)?.getMinutes() * 4;
                          if (new Date(video.start).getHours() === hour) {
                            const startDate = new Date(video.start);
                            const endDate = new Date(video.end);
                            const diff = ((endDate - startDate) / 60000) * 4;

                            return (
                              <div
                                style={{
                                  minWidth: `${diff}px`,
                                  zIndex: "1",
                                  marginLeft: video.place && `${ml}px`,
                                  border: "0.5px grey solid",
                                  background: "#333",
                                  color: "#ddd",
                                  display: "flex",
                                  minHeight: "60px",
                                  flexDirection: "column",
                                }}
                              >
                                <div>{video.title}</div>
                                <div
                                  style={{
                                    display: "flex",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                    }}
                                  >
                                    {`${startDate.getHours()}:${startDate.getMinutes()}`}
                                  </div>
                                  <div>-</div>
                                  <div
                                    style={{
                                      display: "flex",
                                    }}
                                  >
                                    {`${endDate.getHours()}:${endDate.getMinutes()}`}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </SC.Column>
          ))}
        </SC.Board>
      </SC.Container>

      <button
        onClick={executeScroll}
        style={{
          position: "fixed",
          width: "60px",
          height: "60px",
          bottom: "40px",
          right: "40px",
          background: "#0C9",
          color: "#FFF",
          borderRadius: "50px",
          textAlign: "center",
          boxShadow: "2px 2px 3px #999",
          zIndex: "1",
        }}
      >
        NOW
      </button>
    </div>
  );
}

export default App;
