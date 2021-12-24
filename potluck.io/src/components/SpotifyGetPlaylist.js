import { useEffect, useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';

const spotifyUserId = "u44czhoefczhjdeutdqg09hms"
const PLAYLISTS_ENDPOINT = `https://api.spotify.com/v1/users/${spotifyUserId}/playlists`;

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

// const parseSpotifyPlaylistResponse = (responseData) => {
//     const playlistList = [];

// }

function SpotifyGetPlaylist(props) {
    const [token, setToken] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {  
        if (window.location.hash) {
            const {
              access_token,
              expires_in,
              token_type,
            } = getReturnedParamsFromSpotifyAuth(window.location.hash);
      
            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("expiresIn", expires_in);
            localStorage.setItem("tokenType", token_type);
          };

        if (localStorage.getItem("accessToken")) {    
            setToken(localStorage.getItem('accessToken'));
        }
    }, []);

    const getPlaylists = () => {
        axios.get(PLAYLISTS_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + token,
            },
            params: {
                limit: 50
            }
        })
        .then(response => {
            setData(response.data);
            console.log(response.data);
            props.displaySearchBar(true);
            props.displaySpotifyGetPlaylist(false);

        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <Button 
            shape="round"
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
              onClick={getPlaylists}>Start Search</Button>
        </div>
    );
};

export default SpotifyGetPlaylist;