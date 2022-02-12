import React from "react";
// require("react-big-calendar/lib/css/react-big-calendar.css");
import "react-big-calendar/lib/css/react-big-calendar.css";
import ApiCalendar from "react-google-calendar-api";
import moment from "moment";
// import Calendar from "react-big-calendar";
import BigCalendar from "react-big-calendar";
import GoogleIcon from "../../images/GoogleIcon.png";
import Image from "next/image";

const localizer = BigCalendar.momentLocalizer(moment);
const scrollToDate = moment().hour(9).minute(0).second(0).toDate();

const CalendarPage = () => {
  const [events, setEvents] = React.useState([]);
  const [signedIn, setSignedIn] = React.useState(false);
  // this.signUpdate = this.signUpdate.bind(this);
  // ApiCalendar.onLoad(() => {
  //   ApiCalendar.listenSign(this.signUpdate);
  // });

  // signUpdate(sign) {
  //   this.setState({ sign }, () => console.log(this.state.sign));
  // }

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
    const eventsPlaceholder = [...events];
    if (ApiCalendar.sign) {
      ApiCalendar.listUpcomingEvents(10).then(({ result }) => {
        console.log("upcomsing events", result.items);
        setSignedIn(true);
        result.items.map((event) => {
          const eventObj = {
            title: event.summary,
            start: new Date(event.end.dateTime),
            end: new Date(event.start.dateTime),
          };

          eventsPlaceholder = eventsPlaceholder.concat(eventObj);
        });

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

  return (
    <>
      <div>
        {!signedIn ? (
          <button
            className="bg-transparent hover:bg-blue-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex items-center mt-4"
            onClick={(e) => handleItemClick(e, "sign-in")}
          >
            <Image src={GoogleIcon} alt="" height={30} width={40} />
            <text className="my-auto">Sign in to Google</text>
          </button>
        ) : null}

        {/* <button onClick={(e) => handleItemClick(e, "sign-out")}>
          sign-out
        </button>
        <button onClick={(e) => getUserInfo()}>get user info</button>
        <button onClick={(e) => listUpcomingEvents()}>
          list upcoming events
        </button>
        <button onClick={(e) => listAllEvents()}>list all events</button>
        <button onClick={(e) => updateEvent()}>update an Event</button>
        <button onClick={(e) => createEventFromNow()}>
          create an Event from now
        </button>
        <button onClick={(e) => createEvent()}>create an Event</button> */}
      </div>
      <div>
        <BigCalendar
          className="w-full mt-4"
          style={{ height: 500 }}
          localizer={localizer}
          scrollToTime={scrollToDate}
          events={events}
          startAccessor="start"
          endAccessor="end"
        />
        {/* <BigCalendar
            style={{ height: 500 }}
            className="w-full"
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            date={new Date(2022, 0, 20)}
            view={"week"}
          /> */}
      </div>
    </>
  );
};

export default CalendarPage;
