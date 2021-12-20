import { useEffect, useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

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

function SpotifyGetPlaylist() {
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
        })
        .then(response => {
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <Button onClick={getPlaylists}>Hello</Button>
        </div>
    );
};

export default SpotifyGetPlaylist;