import React from "react";
// require("react-big-calendar/lib/css/react-big-calendar.css");
import "react-big-calendar/lib/css/react-big-calendar.css";
import ApiCalendar from "react-google-calendar-api";
import moment from "moment";
// import Calendar from "react-big-calendar";
import BigCalendar from "react-big-calendar";
import GoogleIcon from "../../../images/GoogleIcon.png";
import Image from "next/image";
import styled from "styled-components";

const CalendarList = () => {
  const [events, setEvents] = React.useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [signedIn, setSignedIn] = React.useState(false);

  function handleItemClick(event, name) {
    if (name === "sign-in") {
      ApiCalendar.handleAuthClick();
      listUpcomingEvents();
      console.log("logged in");
    } else if (name === "sign-out") {
      ApiCalendar.handleSignoutClick();
      console.log("logged out");
    }
  }

  const getUserInfo = async () => {
    if (ApiCalendar.sign) {
      const response = await ApiCalendar.getBasicUserProfile();
      console.log(response);
    }
  };

  function listUpcomingEvents() {
    const eventsPlaceholder = { ...events };
    if (ApiCalendar.sign) {
      ApiCalendar.listUpcomingEvents(5).then(({ result }) => {
        console.log("upcomsing events", result.items);
        setSignedIn(true);
        result.items.map((event) => {
          // console.log(
          //   "dayyyy",
          //   new Date(event.start.dateTime).toLocaleString("NZ", {
          //     hour: "numeric",
          //     hour12: true,
          //   })
          // );
          // console.log("tester", events[0].schedule);

          const eventObj = {
            title: event.summary,
            start: new Date(event.start.dateTime).toLocaleString("NZ", {
              hour: "numeric",
              hour12: true,
            }),
            end: new Date(event.end.dateTime).toLocaleString("NZ", {
              hour: "numeric",
              hour12: true,
            }),
          };
          console.log(eventObj, new Date(event.start.dateTime).getDay());
          // if (new Date(event.start.dateTime).toDay() !== 0) {
          //   console.log("alirghy");
          // }
          switch (new Date(event.start.dateTime).getDay()) {
            case 0:
              console.log("adding ");
              eventsPlaceholder["Sunday"] =
                eventsPlaceholder["Sunday"].concat(eventObj);
              break;
            case 1:
              eventsPlaceholder["Monday"] =
                eventsPlaceholder["Monday"].concat(eventObj);
              break;
            case 2:
              eventsPlaceholder["Tuesday"] =
                eventsPlaceholder["Tuesday"].concat(eventObj);
              break;
            case 3:
              eventsPlaceholder["Wednesday"] =
                eventsPlaceholder["Wednesday"].concat(eventObj);
              break;
            case 4:
              eventsPlaceholder["Thursday"] =
                eventsPlaceholder["Thursday"].concat(eventObj);
              break;
            case 5:
              eventsPlaceholder["Friday"] =
                eventsPlaceholder["Friday"].concat(eventObj);
              break;
            case 6:
              eventsPlaceholder["Saturday"] =
                eventsPlaceholder["Saturday"].concat(eventObj);
              break;
            default:
              break;
          }
          console.log("hereere");
        });
        console.log("yooooooooooo", eventsPlaceholder);
        setEvents(eventsPlaceholder);
      });
    }
  }

  function listAllEvents() {
    if (ApiCalendar.sign)
      ApiCalendar.listEvents({
        // timeMin: new Date().toISOString(),
        // timeMax: new Date().addDays(10).toISOString(),
        maxResults: 10,
        orderBy: "updated",
      }).then(({ result }) => {
        console.log(result.items);
      });
  }

  function updateEvent() {
    const eId = "7eppmkfbhi4gtvvapv9hvej1lm";
    const event = {
      summary: "changed name to meet30june for demo purposes",
    };
    ApiCalendar.updateEvent(event, eId).then((res) => {
      console.log(res);
    });

    ApiCalendar.getEvent(eId).then(console.log);
  }

  function createEventFromNow() {
    const eventFromNow = {
      summary: "Poc Dev From Now",
      time: 180,
    };

    ApiCalendar.createEventFromNow(eventFromNow)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  function createEvent() {
    let stDate = "2021-07-01T12:00:00+05:30";
    let endDate = "2021-07-01T15:00:00+05:30";
    const event = {
      summary: "new event created",
      description: "demo of create event function",
      start: {
        dateTime: stDate,
      },
      end: {
        dateTime: endDate,
      },
    };

    ApiCalendar.createEvent(event)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {}, []);

  return (
    <>
      <div className="bg-primary-blue-15 w-1/2 xl:w-1/4 rounded-xl mt-20">
        <div className=" bg-primary-blue-100 px-4 rounded-xl py-6">
          <div>
            <h1
              className="font-black text-white"
              style={{ "font-size": "30px" }}
            >
              Upcoming Events
            </h1>
          </div>
        </div>
        <div className="bg-primary-blue-15 p-4 rounded-b-xl">
          {!signedIn ? (
            <button
              className="bg-transparent hover:bg-blue-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center"
              onClick={(e) => handleItemClick(e, "sign-in")}
            >
              <Image src={GoogleIcon} alt="" height={30} width={40} />
              <text className="my-auto">Sign in to Google</text>
            </button>
          ) : null}

          {signedIn ? (
            <>
              <h2 className="font-semibold">Monday</h2>
              <div className="ml-4">
                {events["Monday"].map((event) => {
                  return (
                    <>
                      <div>
                        <h1 style={{ "font-size": "12px" }}>
                          {event.start} - {event.end}{" "}
                        </h1>
                        <div key={event.title}>{event.title}</div>
                      </div>
                    </>
                  );
                })}
              </div>

              <h2 className="font-semibold">Tuesday</h2>
              <div className="ml-4">
                {events["Tuesday"].map((event) => {
                  return (
                    <>
                      <div>
                        <h1 style={{ "font-size": "12px" }}>
                          {event.start} - {event.end}{" "}
                        </h1>
                        <div key={event.title}>{event.title}</div>
                      </div>
                    </>
                  );
                })}
              </div>

              <h2 className="font-semibold">Wednesday</h2>
              <div className="ml-4">
                {events["Wednesday"].map((event) => {
                  return (
                    <>
                      <div>
                        <h1 style={{ "font-size": "12px" }}>
                          {event.start} - {event.end}
                        </h1>
                        <div key={event.title}>{event.title}</div>
                      </div>
                    </>
                  );
                })}
              </div>

              <h2 className="font-semibold">Thursday</h2>
              <div className="ml-4">
                {events["Thursday"].map((event) => {
                  return (
                    <>
                      <div>
                        <h1 style={{ "font-size": "12px" }}>
                          {event.start} - {event.end}{" "}
                        </h1>
                        <div key={event.title}>{event.title}</div>
                      </div>
                    </>
                  );
                })}
              </div>

              <h2 className="font-semibold">Friday</h2>
              <div className="ml-4">
                {events["Friday"].map((event) => {
                  return (
                    <>
                      <div>
                        <h1 style={{ "font-size": "12px" }}>
                          {event.start} - {event.end}{" "}
                        </h1>
                        <div key={event.title}>{event.title}</div>
                      </div>
                    </>
                  );
                })}
              </div>

              <h2 className="font-semibold">Saturday</h2>
              <div className="ml-4">
                {events["Saturday"].map((event) => {
                  return (
                    <>
                      <div>
                        <h1 style={{ "font-size": "12px" }}>
                          {event.start} - {event.end}{" "}
                        </h1>
                        <div key={event.title}>{event.title}</div>
                      </div>
                    </>
                  );
                })}
              </div>

              <h2 className="font-semibold">Sunday</h2>
              <div className="ml-4">
                {events["Sunday"].map((event) => {
                  return (
                    <>
                      <div>
                        <h1 style={{ "font-size": "12px" }}>
                          {event.start} - {event.end}{" "}
                        </h1>
                        <div key={event.title}>{event.title}</div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CalendarList;
