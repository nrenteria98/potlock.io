import { useEffect, useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import playlistData from '../data/playlistData';

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

const parseItems = (items) => {
    const trackList = [];
    for (let item of items) {
        let artistList = [];
        for ( let artist of item.track.artists) {
            artistList.push(artist.name);
        };
        let trackInfo = {
            name: item.track.name,
            artists: artistList
        }
        trackList.push(trackInfo)
    };
    return trackList;
};

function SpotifyGetPlaylist(props) {
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
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
        };

    }, []);

    const recursiveNextUrl = (nextUrl, previousTrackList) => {
        return axios.get(nextUrl, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then(newResponse => {
            let newTrackList = parseItems(newResponse.data.items);
            const response = [...previousTrackList, ...newTrackList];

            let nextUrl = newResponse.data.next;
            if (nextUrl != null) {
                return recursiveNextUrl(nextUrl, response)
            }

            return response
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const getSongs = async () => {
        setIsLoading(true);

        const completeDataSet = {};

        for (let playlist of playlistData) {
            const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;

            await recursiveNextUrl(PLAYLIST_ENDPOINT, [])
            .then(trackList => {
                completeDataSet[playlist.name] = trackList;                
            })
            .catch((error) => {
                console.log(error);
            });
        };
        
        localStorage.setItem("data", JSON.stringify(completeDataSet));
        props.displaySearchBar(true);
        props.displaySpotifyGetPlaylist(false);
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
              onClick={getSongs}
              loading={isLoading}>Start Search</Button>
        </div>
    );
};

export default SpotifyGetPlaylist;