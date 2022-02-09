import SpotifyAlbums from "../components/Spotify/SpotifyAlbums";
import { musisAccessUrl } from "../components/Spotify/SpotifyAlbums";
import SpotifyPlayer from "../components/Spotify/SpotifyPlayer";

function MusicPage() {
  return (
    <>
      <div className="fpy-4 sm:px-6 md:px-8">
        <div className="flex flex-row rounded-lg h-80px">
          {/* LHS box */}
          <div
            className="flex-auto w-32 align-items: center sm:px-6 md:px-8 bg-primary-blue-15 order-4 border-dashed border-gray-200 rounded-lg"
            style={{
              paddingTop: "20px",
              marginRight: "10%",
              alignItems: "center",
            }}
          >
            <div>
              <SpotifyAlbums />
            </div>
          </div>
          {/* RHS Box */}
          <div
            className="flex-auto w-32 sm:px-6 md:px-8 bg-primary-blue-100 order-4 border-dashed border-gray-200 rounded-lg h-150"
            style={{
              paddingTop: "20px",
              right: "0",
              maxWidth: "30%",
            }}
          >
            <div className="grid place-items-center h-full">
              <SpotifyPlayer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPage;
