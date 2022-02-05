import * as React from "react";

function Time() {
  const [time, setTime] = React.useState("");
  const current = new Date();
  React.useEffect(() => {
    // setTime(Date().toLocaleString());

    // By default US English uses 12hr time with AM/PM
    const currentTime = current.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setTime(currentTime);
  }, [current]);

  return <div>{time}</div>;
}

export default Time;
