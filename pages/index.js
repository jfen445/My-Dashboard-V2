import { NextPage } from "next";
import styles from "../styles/Home.module.css";
// import Weather from "../Components/Weather";
// import Spotify, { accessUrl } from "../Components/Spotify/Spotify";

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <div className="fpy-4">
          <div className="flex flex-row border-4 border-dashed border-gray-200 rounded-lg">
            {/* LHS box */}
            <div
              className="flex-auto w-32 align-items: center sm:px-6 md:px-8 bg-primary-blue-15 order-4 border-dashed border-gray-200 rounded-lg h-96"
              style={{
                paddingTop: "20px",
                marginRight: "10%",
                alignItems: "center",
              }}
            >
              <div
                className="sm:px-6 md:px-8 order-4 border-gray-200 rounded-lg"
                style={{ marginBottom: "5%" }}
              >
                {/* <Weather /> */}
              </div>
              <div className="sm:px-6 md:px-8 order-4 border-gray-200 rounded-lg h-24 min-h-[50%]">
                {/* <Spotify /> */}
              </div>
              {/* <a href={accessUrl}>LOGIN TO SPOTIFY</a> */}
            </div>

            {/* RHS Box */}
            <div
              className="flex-auto w-32 sm:px-6 md:px-8 bg-blue-500 order-4 border-dashed border-gray-200 rounded-lg h-150"
              style={{
                paddingTop: "20px",
                right: "0",
                maxWidth: "30%",
              }}
            >
              <div className="flex-auto w-32 sm:px-6 md:px-8 bg-blue-500 order-4 border-dashed border-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
