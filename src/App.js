// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import GameList from './GameList';
import Game from './Game';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [gameSettings, setGameSettings] = useState({ size: 3, backgroundColor: '#FFFFFF' });

  const handleLogin = () => {
    setCurrentPage('gameList');
  };

  const updateGameSettings = (size, color) => {
    setGameSettings({ size, backgroundColor: color });
    setCurrentPage('game');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/game-list" element={<GameList updateGameSettings={updateGameSettings} />} />
        <Route path="/game" element={<Game gameSettings={gameSettings} />} />
      </Routes>
    </Router>
  );
};

export default App;
