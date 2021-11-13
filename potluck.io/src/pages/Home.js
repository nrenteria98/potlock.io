import React, { useState } from 'react';
import SpotifyButton from '../components/SpotifyButton';
import '../style/Home.scss'

function Home() {

  return (
    <div className="Home">
      <SpotifyButton></SpotifyButton>
    </div>
  );
}

export default Home;