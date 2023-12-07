import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const moveAway = keyframes`
  to {
    transform: translate(500px, -500px);
    opacity: 0;
  }
`;

const GameCell = styled.div`
  width: 100px;
  height: 100px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }

  /* Eğer oyun biterse hareket edecek olan animasyon */
  ${(props) =>
    props.gameOver &&
    `
    animation: ${moveAway} 1s forwards;
  `}
`;

const GameBoard = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);

  const handleCellClick = (index) => {
    const updatedCells = [...cells];
    updatedCells[index] = "X";
    setCells(updatedCells);
    // Oyun bittiğinde gameOver state'ini true yapalım
    setGameOver(true);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "306px" }}>
      {cells.map((cell, index) => (
        <GameCell
          key={index}
          onClick={() => handleCellClick(index)}
          gameOver={gameOver}
        >
          {cell}
        </GameCell>
      ))}
    </div>
  );
};

export default GameBoard;
