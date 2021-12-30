import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Result from '../components/Results';
import SpotifyGetPlaylist from '../components/SpotifyGetPlaylist';
import '../style/Search.scss'

function Search() {

  const [displaySpotifyGetPlaylist, setDisplaySpotifyGetPlaylist] = useState(true);
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);
  const [results, setResults] = useState([]);

  if ( displaySpotifyGetPlaylist ) {
      return (
        <div className="Search">
          <SpotifyGetPlaylist displaySpotifyGetPlaylist={setDisplaySpotifyGetPlaylist} displaySearchBar={setDisplaySearchBar} />
        </div>
      );
  } else if ( displaySearchBar ) {

    if ( displayResults ) {
      
      return (
        <div className="Search">
          <SearchBar setResults={setResults}/>
          <Result results={results}/>
        </div>
      );

    } else {

      return (
        <div className="Search">
          <SearchBar displayResults={setDisplayResults} setResults={setResults}/>
        </div>
      );

    }
  }
}

export default Search;