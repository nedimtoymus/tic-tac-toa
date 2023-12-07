import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Game component handling the Tic-Tac-Toe game
const Game = ({ gameSettings, createdGames, setCreatedGames, userName }) => {
  const navigate = useNavigate();
  const { size, backgroundColor } = gameSettings;

  // State variables for the game board, player turn, winner, and previous winner
  const [board, setBoard] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [previousWinner, setPreviousWinner] = useState(null);

  // Effect to handle navigation on game end
  useEffect(() => {
    if (winner === "Draw") {
      setTimeout(() => {
        navigate("/game");
      }, 2000);
    } else if (winner) {
      setTimeout(() => {
        navigate("/game-list");
      }, 2000);
    }
  }, [winner]);

  // Effect to initialize the game board
  useEffect(() => {
    initializeBoard();
  }, [size]);

  // Function to initialize the game board
  const initializeBoard = () => {
    const newBoard = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );
    setBoard(newBoard);
    setWinner(null);
  };

  // Function to render the game board
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} style={styles.row}>
        {row.map((cell, cellIndex) => (
          <StyledCell
            key={cellIndex}
            onClick={() => handleCellClick(rowIndex, cellIndex)}
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

  // Function to handle cell click during the game
  const handleCellClick = (row, col) => {
    // Check if cell is empty and it's the player's turn
    if (board[row][col] === null && playerTurn && winner === null) {
      const updatedBoard = [...board];
      updatedBoard[row][col] = "X";
      setBoard(updatedBoard);
      setPlayerTurn(false);
      checkWinner(updatedBoard);
      // If there's no winner yet, let the computer make a move
      if (!winner) {
        setTimeout(() => {
          makeComputerMove(updatedBoard);
        }, 500);
      }
    }
  };

  // Function to handle the computer's move
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
  // Function to check for a winner
  const checkWinner = (currentBoard) => {
    // Function to check if all cells in a line are the same
    // and not null, determining a winner
    // (Checking rows, columns, and diagonals)
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
    let message;
    if (winner === "Draw") {
      message = "Game ended in a draw!";
    } else {
      message = winner === "X" ? `${userName} won!` : "Computer won!";
    }

    const confirmation = window.confirm(message);

    if (confirmation) {
      setPreviousWinner(winner);
      initializeBoard();
      navigate("/game-list");
    }
  };

  useEffect(() => {
    if (winner === "Draw" || winner) {
      setTimeout(() => {
        handleRestart();
      }, 2000);
    }
  }, [winner]);


  // JSX layout for the game area
  return (
    <div style={{ minHeight: "100vh", backgroundColor: backgroundColor }}>
      <div style={styles.container}>
        <h2 style={styles.title}>
          Game Area ({size}x{size})
        </h2>
        {winner ? (
          <div>
            <h3>
              {winner === "X"
                ? userName
                : winner === "O"
                ? "Computer"
                : "Draw"}{" "}
            </h3>
          </div>
        ) : (
          <div style={styles.boardContainer}>{renderBoard()}</div>
        )}
        {previousWinner && (
          <div>
            <h4>
              {previousWinner === "X"
                ? "Player"
                : previousWinner === "O"
                ? "Computer"
                : "Draw"}{" "}
              won the previous game!
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
    background-color: #999;
  }

  span {
    font-size: 28px;
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
    background: "background-image: linear-gradient( 111.4deg,  rgba(238,113,113,1) 1%, rgba(246,215,148,1) 58% );",
    backgroundImage: "url('')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    
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








