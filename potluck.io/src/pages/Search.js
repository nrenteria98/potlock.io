import React, { useState } from 'react';
import { useEffect } from 'react';
import '../style/Search.scss'

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

function Search() {

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
        };
      });

  return (
    <div className="Search">
      hello
    </div>
  );
}

export default Search;