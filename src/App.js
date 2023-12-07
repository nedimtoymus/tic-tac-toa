// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import GameList from './GameList';
import Game from './Game';

const App = () => {
  // State to manage the current page displayed
  const [currentPage, setCurrentPage] = useState('login');

  // State to hold game settings such as size and background color
  const [gameSettings, setGameSettings] = useState({ size: 3, backgroundColor: '#FFFFFF' });

  // Function to handle login and switch to the game list page
  const handleLogin = () => {
    setCurrentPage('gameList');
  };

  // Function to update game settings and switch to the game page
  const updateGameSettings = (size, color) => {
    setGameSettings({ size, backgroundColor: color });
    setCurrentPage('game');
  };

  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />

        {/* Route for the game list page */}
        <Route path="/game-list" element={<GameList updateGameSettings={updateGameSettings} />} />

        {/* Route for the game page */}
        <Route path="/game" element={<Game gameSettings={gameSettings} />} />
      </Routes>
    </Router>
  );
};

export default App;
