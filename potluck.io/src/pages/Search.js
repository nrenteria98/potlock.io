import React, { useState, useEffect } from 'react';
import SpotifyGetPlaylist from '../components/SpotifyGetPlaylist';
import '../style/Search.scss'

function Search() {

  return (
    <div className="Search">
      <SpotifyGetPlaylist />
    </div>
  );
}

export default Search;