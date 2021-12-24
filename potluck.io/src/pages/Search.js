import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SpotifyGetPlaylist from '../components/SpotifyGetPlaylist';
import '../style/Search.scss'

function Search() {

  const [displaySpotifyGetPlaylist, setDisplaySpotifyGetPlaylist] = useState(true);
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  if ( displaySpotifyGetPlaylist ) {
      return (
        <div className="Search">
          <SpotifyGetPlaylist displaySpotifyGetPlaylist={setDisplaySpotifyGetPlaylist} displaySearchBar={setDisplaySearchBar} />
        </div>
      );
  } else if ( displaySearchBar ) {
      return (
        <div className="Search">
          <SearchBar />
        </div>
      );
  }
}

export default Search;