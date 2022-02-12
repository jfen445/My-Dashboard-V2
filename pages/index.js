import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Weather from "../components/Weather";
import CalendarList from "../components/Calendar/CalendarListView";
// import Weather from "../Components/Weather";
// import Spotify, { accessUrl } from "../Components/Spotify/Spotify";

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <div className="fpy-4">
          <div className="flex flex-row">
            <Weather />
            <CalendarList className="pt-20" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
