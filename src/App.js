import React, {useEffect} from "react";
import './App.css';
import Login from "./Login";
import {getAccessToken} from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import {useStateProviderValue} from "./StateProvider";

const spotify = new SpotifyWebApi();

function App() {
  const[{user, token}, dispatch] = useStateProviderValue();

  useEffect(() => {
    const hash = getAccessToken();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token){

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      })

      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        })
      })
    }

    spotify.getUserPlaylists().then((playlists) => {
      dispatch({
        type: "SET_PLAYLISTS",
        playlists: playlists,
      })
    })

    spotify.getPlaylist('2kV2g7uCTlYvASTkQGHx1l').then(response => {
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,
      })
    })

    spotify.getMyTopArtists().then((response) => {
      dispatch({
        type: "SET_TOP_ARTISTS",
        top_artists: response,
      })
    })

    dispatch({
      type: "SET_SPOTIFY",
      spotify: spotify,
    })

    console.log("Token Recieved: ", _token);
  }, [token, dispatch])

  console.log('User details: ', user);
  console.log('Token detials: ', token);



  return (
    <div className="App">
      {
        token ? <Player spotify={spotify} /> : <Login />
      }
    </div>
  );
}

export default App;
