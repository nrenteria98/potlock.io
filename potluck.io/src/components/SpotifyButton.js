import { Button } from 'antd';

function SpotifyButton() {

  const authEndpoint = "https://accounts.spotify.com/authorize";
  const redirectUri = "https://localhost:3000/";
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
  const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "streaming"
  ];

  const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
    )}`;

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
        }
        }>
        <a href={loginUrl} class="button">Welcome to Potluck!</a>
      </Button>
    </div>
  );
}

export default SpotifyButton;