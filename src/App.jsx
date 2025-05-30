

import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? '✕' : '◯';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (!board.includes(null)) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="game-container">
      <h1 className="title"> Tic Tac Toe </h1>
      <div className="board">
        {board.map((cell, idx) => (
          <div key={idx} className="cell" onClick={() => handleClick(idx)}>
            {cell}
          </div>
        ))}
      </div>

      {winner && (
        <div className="result">
          {winner === 'Draw' ? "It's a draw!" : `Winner: ${winner}`}
          <br />
          <button className="button" onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
