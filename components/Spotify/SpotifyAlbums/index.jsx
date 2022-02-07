import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import SongRow from "../SongRows";
import Carousel from "react-elastic-carousel";
import ButtonBase from "@material-ui/core/ButtonBase";
import styled from "styled-components";
// import useChosenAlbum from './useChosenAlbum';

const Button = styled.button`
  background-colour: #1db954;
`;

export const spotifyObject = new SpotifyWebApi();

export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectURI = "http://localhost:3000/music";
const clientID = "66ea4aba7f9344fea526f6a5bf14d6bf";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromResponse = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      const parts = item.split("=");
      // eslint-disable-next-line no-param-reassign
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const musisAccessUrl = `${authEndpoint}?client_id=${
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

function SpotifyAlbums() {
  const [token, setToken] = React.useState(""); // to set the spotify authorization token
  const [albumImages, setAlbumImages] = useState([]);
  const [albumNames, setAlbumNames] = useState([]);
  const [playlistID, setPlaylistID] = useState([]);
  const [trackToGet, setTrackToGet] = useState([]);
  const [songs, setSongs] = React.useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("Select a playlist:");

  useEffect(() => {
    const hash = getTokenFromResponse();
    const ttoken = hash.access_token;
    if (ttoken) {
      setToken(ttoken);
      // giving the access token to that spotify api
      spotifyObject.setAccessToken(ttoken);
      spotifyObject
        .getUserPlaylists() // note that we don't pass a user id
        .then((response) => {
          console.log("listtt", response.items[2]);
          setPlaylistID(response.items.map((n) => n.id));
          setAlbumImages(response?.items);
          setAlbumImages(
            response.items.map((im) => im.images.map((hi) => hi.url))
          );
          setAlbumNames(response.items.map((n) => n.name));
        });

      spotifyObject.getPlaylist("0uKVpMTHWeflpqa04676Qo").then((response) => {
        setPlaylist(response);
      });
    }
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 200, itemsToShow: 2 },
    { width: 500, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
  ];

  const getPlaylistInformation = (id) => {
    // console.log('fefeafefefe', albumImage);
    spotifyObject.getPlaylist(id).then((response) => {
      console.log(response);
      setSongs(response.tracks.items);
      setPlaylistName(response.name);
    });
    console.log(playlistName);
  };

  return (
    <>
      {albumImages.length !== 0 ? (
        <>
          <div className="text-2xl font-bold" style={{ marginBottom: "2%" }}>
            Playlists
          </div>
          <div>
            <Carousel breakPoints={breakPoints}>
              {albumImages.map((albumImage, index) => (
                <>
                  <ButtonBase
                    onClick={() => {
                      console.log("iddddd", playlistID[index]);
                      setTrackToGet(playlistID[index]);
                      getPlaylistInformation(playlistID[index]);
                    }}
                  >
                    <img
                      alt=""
                      src={albumImage[0]}
                      height={160}
                      width={160}
                      style={{ marginRight: "20%" }}
                    />
                  </ButtonBase>
                </>
              ))}
            </Carousel>
            <div
              className="sm:px-6 md:px-8 bg-primary-blue-100 order-4 border-dashed border-gray-200 rounded-lg h-96 overflow-auto"
              style={{ marginTop: "5%" }}
            >
              <div
                className="text-2xl font-bold"
                style={{ marginBottom: "5%", marginTop: "2%" }}
              >
                {playlistName}
              </div>
              {songs.map((song, index) => {
                console.log(index, song.track.name);
                return (
                  <>
                    <SongRow track={song} spotifyObject={spotifyObject} />
                  </>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <button className="bg-[#1db954] text-white font-bold py-2 px-4 rounded-full">
            <a href={musisAccessUrl}>LOG IN TO SPOTIFY</a>
          </button>
        </>
      )}
    </>
  );
}

export default SpotifyAlbums;
