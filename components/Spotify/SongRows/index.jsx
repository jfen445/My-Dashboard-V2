import React from "react";
import { Grid } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
// import { spotifyObject } from "./spotifyAlbum";

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function SongRow({ track, spotifyObject }) {
  return (
    <div className="flex flex-row p-1">
      <Grid
        // going accross
        container
        direction="row"
        justifyContent="full"
        alignItems="stretch"
        className="content-between"
      >
        <Grid>
          <ButtonBase
            onClick={() => {
              spotifyObject.transferMyPlayback(track.track.id);
            }}
          >
            <img
              src={track.track?.album?.images[0]?.url}
              alt=""
              height={60}
              width={60}
            />
          </ButtonBase>
        </Grid>
        <Grid style={{ marginLeft: "10%" }}>
          <div>
            <h1>{track.track.name}</h1>
            <h4 className="text-slate-600">{track.track.artists[0].name}</h4>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SongRow;
