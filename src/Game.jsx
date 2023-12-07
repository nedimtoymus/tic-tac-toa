import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import GameBoard from "./GameBoard";


const Game = ({ gameSettings, createdGames, setCreatedGames, userName }) => {
  const navigate = useNavigate();
  const { size, backgroundColor } = gameSettings;

  const [board, setBoard] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [previousWinner, setPreviousWinner] = useState(null);

  

  useEffect(() => {
    if (winner === "Berabere") {
      setTimeout(() => {
        navigate("/game");
      }, 2000);
    } else if (winner) {
      setTimeout(() => {
        navigate("/game-list");
      }, 2000);
    }
  }, [winner]);

  useEffect(() => {
    initializeBoard();
  }, [size]);

  const initializeBoard = () => {
    const newBoard = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );
    setBoard(newBoard);
    setWinner(null);
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} style={styles.row}>
        {row.map((cell, cellIndex) => (
          <StyledCell
            key={cellIndex}
            onClick={() => handleCellClick(rowIndex, cellIndex)}
            backgroundImage={getBackgroundImage(rowIndex, cellIndex)}
            backgroundColor={backgroundColor}
          >
            {cell === "X" || cell === "O" ? (
              <span>{cell}</span>
            ) : (
              ""
            )}
          </StyledCell>
        ))}
      </div>
    ));
  };

  const getBackgroundImage = (row, col) => {
    return (row + col) % 2 === 0 ? "" : "";
  };

  const handleCellClick = (row, col) => {
    if (board[row][col] === null && playerTurn && winner === null) {
      const updatedBoard = [...board];
      updatedBoard[row][col] = "X";
      setBoard(updatedBoard);
      setPlayerTurn(false);
      checkWinner(updatedBoard);
      if (!winner) {
        setTimeout(() => {
          makeComputerMove(updatedBoard);
        }, 500);
      }
    }
  };

  const makeComputerMove = (currentBoard) => {
    const updatedBoard = currentBoard.map((row) => [...row]);
    let row, col;
    do {
      row = Math.floor(Math.random() * size);
      col = Math.floor(Math.random() * size);
    } while (updatedBoard[row][col] !== null);

    updatedBoard[row][col] = "O";
    setBoard(updatedBoard);
    setPlayerTurn(true);
    checkWinner(updatedBoard);
  };
  const checkWinner = (currentBoard) => {
    const checkLine = (line) => {
      if (line.every((cell) => cell === line[0] && cell !== null)) {
        setWinner(line[0]);
        return true;
      }
      return false;
    };

    const checkLines = () => {
      for (let i = 0; i < size; i++) {
        const row = currentBoard[i];
        const col = [];
        for (let j = 0; j < size; j++) {
          col.push(currentBoard[j][i]);
        }
        if (checkLine(row) || checkLine(col)) return true;
      }
      return false;
    };

    const checkDiagonals = () => {
      const diagonal1 = [];
      const diagonal2 = [];
      for (let i = 0; i < size; i++) {
        diagonal1.push(currentBoard[i][i]);
        diagonal2.push(currentBoard[i][size - i - 1]);
      }
      if (checkLine(diagonal1) || checkLine(diagonal2)) return true;
      return false;
    };

    if (checkLines() || checkDiagonals()) return;

    if (isBoardFull(currentBoard)) {
      setWinner("Berabere");
    }
  };

  const isBoardFull = (currentBoard) => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (currentBoard[i][j] === null) {
          return false;
        }
      }
    }
    return true;
  };

  const handleRestart = () => {
    setPreviousWinner(winner);
    initializeBoard();
    setTimeout(() => {
      navigate("/game-list");
    }, 2000);
  };

  useEffect(() => {
    if (winner === "Berabere" || winner) {
      setTimeout(() => {
        handleRestart();
      }, 2000);
    }
  }, [winner]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: backgroundColor }}>
      <div style={styles.container}>
        <h2 style={styles.title}>
          Oyun Alanı ({size}x{size})
        </h2>
        {winner ? (
          <div>
            <h3>
              {winner === "X"
                ? userName
                : winner === "O"
                ? "Bilgisayar"
                : "Berabere"}{" "}
              oyuncu kazandı!
            </h3>
          </div>
        ) : (
          <div style={styles.boardContainer}>{renderBoard()}</div>
        )}
        {previousWinner && (
          <div>
            <h4>
              {previousWinner === "X"
                ? "Oyuncu"
                : previousWinner === "O"
                ? "Bilgisayar"
                : "Berabere"}{" "}
              önceki oyunu kazandı!
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};


const StyledCell = styled.div`
  width: 70px;
  height: 70px;
  border: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 10px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: gray; /* İlgili hover rengini buraya ekleyin */
  }

  span {
    font-size: 28px; /* Font size of 'X' and 'O' */
  }
`;

const styles = {
  container: {
    textAlign: "center",
    marginTop: "30px",
    marginRight: "50px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f7f7f7 0%, #ececec 100%)",
    backgroundImage: "url('https://www.shutterstock.com/shutterstock/photos/2253105475/display_1500/stock-vector-seamless-valentine-s-day-xoxo-pattern-black-and-white-vector-2253105475.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // This closing curly brace should be placed at the end of the styles object
  },
  title: {
    fontSize: "25px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#333",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  boardContainer: {
    margin: "0 auto",
    display: "grid",
    gap: "10px",
    maxWidth: "500px",
  },
  row: {
    display: "flex",
  },
};

export default Game;