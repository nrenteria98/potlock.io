import { Button } from 'antd';
import { useEffect } from 'react';

const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/search";
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "streaming"
];

const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
  )}&response_type=token&show_dialogue=true`;
  
const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
  }, {});

  return paramsSplitUp;
};

function SpotifyButton() {

  useEffect(() => {
    if (window.location.hash) {
      const {
        access_token,
        expires_in,
        token_type,
      } = getReturnedParamsFromSpotifyAuth(window.location.hash);

      localStorage.clear();
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", expires_in);
      localStorage.setItem("token_type", token_type);
    }
  })

  const handleLogIn = () => {
    window.location = loginUrl
  };

  return (
    <div>
      <Button shape="round"
      style={
        {
          color: 'silver',
          zIndex: 2,
          borderColor: '#D4AF37',
          height: '5vw',
          width: '30vw',
          minHeight: '50px',
          minWidth: '250px',
          fontSize: 'x-large',
          alignContent: 'center',
          justifyContent: 'center'
        }}
        onClick={handleLogIn}>
          Welcome to Potluck!
        
      </Button>
    </div>
  );
};

export default SpotifyButton;