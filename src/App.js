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
  const chanel_pict =
    "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350";
  const [minutesPersentage, setMinutesPersentage] = React.useState(new Date());
  const myRef = React.useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "start",
    });

  React.useEffect(() => {
    let bili = setInterval(() => setMinutesPersentage(new Date()), 10000);

    return function cleanup() {
      clearInterval(bili);
    };
  }, []);

  return (
    <div className="App" style={{ height: "100%" }}>
      <SC.Container>
        <SC.Board>
          {[
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23,
          ].map((a, index0) => (
            <SC.Column>
              {/**this function makes the margin being the same size of the minutes */}
              {a === minutesPersentage.getHours() ? (
                <div ref={myRef} style={{ width: "100%" }}>
                  <SC.MovingLine minutes={minutesPersentage} />
                </div>
              ) : null}
              <SC.ColumnHeader>
                <div>{a}</div>
                <div
                  style={{
                    alignSelf: "center",
                    width: "1px",
                    height: "13px",
                    background: "yellow",
                  }}
                ></div>
              </SC.ColumnHeader>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/**a column */}
                {advice.map((b, index1) => {
                  const videoList = [];

                  let fruits = [...b.schedules].reduce(function (
                    fruitsCount,
                    currentFruit
                  ) {
                    if (
                      typeof fruitsCount[
                        new Date(currentFruit.start).getHours()
                      ] !== "undefined"
                    ) {
                      fruitsCount[new Date(currentFruit.start).getHours()]++;
                      videoList.push({
                        ...currentFruit,
                        place: false,
                      });
                      return fruitsCount;
                    } else {
                      fruitsCount[new Date(currentFruit.start).getHours()] = 1;
                      videoList.push({
                        ...currentFruit,
                        place: true,
                      });
                      return fruitsCount;
                    }
                  },
                  {});

                  return (
                    <div style={{ background: "green", height: "100%" }}>
                      <div
                        style={{
                          background: "pink",
                          display: "flex",
                          height: '100%',
                        }}
                      >
                        {videoList?.map((c, index2) => {
                          const ml =
                            new Date(videoList[index2].start)?.getMinutes() * 4;

                          if (new Date(c.start).getHours() === a) {
                            const startDate = new Date(c.start);
                            const endDate = new Date(c.end);
                            const diff = ((endDate - startDate) / 60000) * 4;

                            return (
                              <div
                                style={{
                                  minWidth: `${diff}px`,
                                  zIndex: "1",
                                  marginLeft: c.place && `${ml}px`,
                                  border: "0.5px grey solid",
                                  background: "#333",
                                  color: "#ddd",
                                  display: "flex",
                                  minHeight: "60px",
                                  flexDirection: "column",
                                }}
                              >
                                <div>{c.title}</div>
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
                                  <div style={{}}>-</div>

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

        <aside style={{ position: "absolute", top: "0", zIndex: "2" }}>
          <div
            style={{
              background: `black`,
              height: "34px",
              width: "40px",
            }}
          />
          {advice.map((a) => {
            return (
              <div
                style={{
                  background: `url(${chanel_pict}) no-repeat center/cover`,
                  height: "61px",
                  width: "40px",
                }}
              />
            );
          })}
        </aside>
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
        }}
      >
        NOW
      </button>
    </div>
  );
}

export default App;
