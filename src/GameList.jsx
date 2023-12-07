import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Game from './Game'; 

const StyledButton = styled.button`
  width: 200px;
  height: 200px;
  margin-right: 10px;
  border-radius: 10px;
  background-size: cover;
  font-size: 24px;
  position: relative;
  overflow: hidden;

  &:hover {
    opacity: 0.8;
  }

  span {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 5px;
    text-align: center;
    box-sizing: border-box;
  }
`;






const GameList = ({ updateGameSettings, username }) => {
  const navigate = useNavigate();
 

  const [gameSize, setGameSize] = useState(3);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [createdGames, setCreatedGames] = useState([]);

  useEffect(() => {
    const storedGameSize = localStorage.getItem('gameSize');
    const storedBackgroundColor = localStorage.getItem('backgroundColor');
    const storedGames = JSON.parse(localStorage.getItem('createdGames')) || [];

    if (storedGameSize && storedBackgroundColor) {
      setGameSize(parseInt(storedGameSize));
      setBackgroundColor(storedBackgroundColor);
    }

    if (storedGames.length > 0) {
      setCreatedGames(storedGames);
    }
  }, []);

  const handleGameSizeChange = (size) => {
    setGameSize(size);
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
  };

  const saveUserPreferences = () => {
    localStorage.setItem('gameSize', gameSize);
    localStorage.setItem('backgroundColor', backgroundColor);
  };

  const handleStartGame = () => {
    let newSize = gameSize;
    if (gameSize === 9) {
      newSize = 7; // 9x9'u 7x7'ye değiştir
    }
    updateGameSettings(newSize, backgroundColor);
    saveUserPreferences();
    addCreatedGame(newSize, backgroundColor);
    navigate("/game", { state: { backgroundColor } }); // 'Game' bileşenine backgroundColor'ı props olarak iletiyoruz.
  };
  
  

  const addCreatedGame = (size, color) => {
    const newGame = {
      size: size,
      backgroundColor: color,
      username: username,
    };

    const updatedGames = [...createdGames, newGame];
    setCreatedGames(updatedGames);
    localStorage.setItem('createdGames', JSON.stringify(updatedGames));
  };

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("https://www.shutterstock.com/shutterstock/photos/2253105475/display_1500/stock-vector-seamless-valentine-s-day-xoxo-pattern-black-and-white-vector-2253105475.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 style={{ color: '#211F20', fontSize: '28px', margin: 0 }}>Tic-Tac-Toe Oyun Seçimi</h2>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <StyledButton
          type="button"
          onClick={() => handleGameSizeChange(3)}
          style={{
            backgroundImage:
              'url("https://thumbs.dreamstime.com/b/xox-letter-logo-design-black-background-creative-initials-concept-250063309.jpg")',
          }}
        >
          <span>3x3</span>
        </StyledButton>
        <StyledButton
          type="button"
          onClick={() => handleGameSizeChange(6)}
          style={{
            backgroundImage:
              'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7dUCz2V-rzx0wtVEI_FI5qwK92zDtCV5WvYUgb8kjCYxR3zejQw9rLWRKpdU77aVRX4U&usqp=CAU")',
          }}
        >
          <span>6x6</span>
        </StyledButton>
        <StyledButton
          type="button"
          onClick={() => handleGameSizeChange(9)}
          style={{
            backgroundImage:
              'url("https://i1.sndcdn.com/artworks-000062493806-d5qigb-t500x500.jpg")',
          }}
        >
          <span>7x7</span>
        </StyledButton>
      </div>
      <div style={{ marginTop: '20px' }}>
        <label style={{ marginRight: '10px', fontSize: '18px', fontWeight: 'bold' }}>
          Arka Plan Rengi:
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => handleBackgroundColorChange(e.target.value)}
            style={{
              marginLeft: '10px',
              width: '30px',
              height: '30px',
              padding: '0',
              border: 'none',
              borderRadius: '50%',
              boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
              cursor: 'pointer',
            }}
          />
        </label>
      </div>
      <button
        type="button"
        onClick={handleStartGame}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Oyuna Başla
      </button>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h3 style={{ color: '#211F20', fontSize: '24px' }}>Oluşturulan Oyunlar</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {createdGames.map((game, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <p>Oyun {index + 1} - Boyut: {game.size}, Arka Plan Rengi: {game.backgroundColor}</p>
              {/* Gerekliyse oyun verilerini buraya ekleyin */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameList;
