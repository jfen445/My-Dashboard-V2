import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import play from "../../../images/playCircle.png";
import next from "../../../images/next.png";
import previous from "../../../images/previous.png";
import pause from "../../../images/pause2.png";
import { spotifyObject } from "../SpotifyAlbums";

// const handleClickPause = () => {
//   spotifyObject.pause();
//   setImage(play);
// };

function SpotifyPlayer() {
  const [song, setSong] = useState(null); // song name
  const [artist, setArtist] = useState(null); // song artitst
  const [image, setImage] = useState(null); // song album image
  const [playBackStatus, setPlayBackStatus] = useState(null); // if song is playing or not
  const [playPause, setPlayPause] = useState(play); // play pause image
  const [skip, setSkip] = useState(false); // play pause image
  const [albumImages, setAlbumImages] = useState([]);

  React.useEffect(() => {
    console.log("going throguh");
    spotifyObject
      .getMyCurrentPlayingTrack("37i9dQZEVXcJZyENOWUFo7")
      .then((response) => {
        setSong(response?.item?.name);
        setImage(response.item?.album?.images?.[0].url);
        setArtist(response?.item?.artists?.[0]?.name);
        setPlayBackStatus(response?.is_playing);
      });
    spotifyObject
      .getMyCurrentPlaybackState("37i9dQZEVXcJZyENOWUFo7")
      .then((response) => {
        if (response) {
          setPlayPause(pause);
        } else {
          setPlayPause(play);
        }
      });
  }, [skip]);

  React.useEffect(() => {
    spotifyObject
      .getUserPlaylists() // note that we don't pass a user id
      .then((response) => {
        setAlbumImages(response?.items);
      });
  }, []);

  const handleClickSkip = () => {
    spotifyObject.skipToNext();
    setSkip(!skip);
  };
  const handleClickPrevious = () => {
    spotifyObject.skipToPrevious();
    setSkip(!skip);
  };

  // method that toggles the play pause image
  const playPauseToggle = () => {
    if (playBackStatus) {
      spotifyObject.pause();
      setPlayPause(play);
      setPlayBackStatus(false);
    } else {
      spotifyObject.play();
      setPlayPause(pause);
      setPlayBackStatus(true);
    }
  };

  return (
    <div className="grid justify-items-center">
      <h1 className="py-4 font-bold">NOW PLAYING</h1>
      <div className="py-8">
        <img
          alt=""
          src={image}
          height={200}
          width={200}
          className="rounded-lg"
        />
      </div>
      <h1 className="text-3xl font-bold">{song}</h1>
      <h1>{artist}</h1>
      <div className="flex flex-auto py-4">
        <ButtonBase onClick={() => handleClickPrevious()}>
          <img src={previous.src} alt="" height={40} width={40} />
        </ButtonBase>
        <ButtonBase onClick={() => playPauseToggle()}>
          <img src={playPause.src} alt="" height={40} width={40} />
        </ButtonBase>
        <ButtonBase onClick={() => handleClickSkip()}>
          <img src={next.src} alt="" height={40} width={40} />
        </ButtonBase>
      </div>
    </div>
  );
}

export default SpotifyPlayer;
