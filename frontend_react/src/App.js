import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

/**
 * Calculates the winner of a Tic Tac Toe board.
 * @param {Array<string|null>} board - An array of 9 cells ("X", "O" or null)
 * @returns {"X"|"O"|null} The winner symbol if any, otherwise null.
 */
function calculateWinner(board) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

/**
 * Checks whether the game is a draw (no empty cells and no winner).
 * @param {Array<string|null>} board
 * @returns {boolean}
 */
function isDraw(board) {
  return board.every(cell => cell !== null) && !calculateWinner(board);
}

// PUBLIC_INTERFACE
function App() {
  /**
   * The application renders a complete Tic Tac Toe game.
   * - board: array of 9 cells (null | "X" | "O")
   * - currentPlayer: "X" or "O"
   * - winner: derived from board
   * - gameOver: derived from winner or draw
   * A theme toggle is preserved for light/dark modes from the base template.
   */
  const [theme, setTheme] = useState('light');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  // Apply theme to document element for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const winner = useMemo(() => calculateWinner(board), [board]);
  const draw = useMemo(() => isDraw(board), [board]);
  const gameOver = Boolean(winner) || draw;

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  /**
   * Handle a move at the provided index.
   * - Ignore if cell occupied or game over.
   * - Place current player's symbol.
   * - Toggle current player.
   */
  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    if (board[index] !== null || gameOver) return;

    setBoard(prev => {
      const copy = [...prev];
      copy[index] = currentPlayer;
      return copy;
    });

    setCurrentPlayer(prev => (prev === 'X' ? 'O' : 'X'));
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
  };

  // Accessibility: aria-live polite status for screen readers
  const statusText = winner
    ? `Winner: ${winner}`
    : draw
    ? 'Draw! No more moves.'
    : `Current player: ${currentPlayer}`;

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <main className="tictactoe" role="application" aria-label="Tic Tac Toe game">
          <h1 className="game-title">Tic Tac Toe</h1>

          <section
            className="board"
            role="grid"
            aria-label="Game board"
            aria-disabled={gameOver ? 'true' : 'false'}
          >
            {board.map((value, idx) => {
              const disabled = value !== null || gameOver;
              const label = value
                ? `Cell ${idx + 1}, ${value} placed`
                : `Cell ${idx + 1}, empty. Place ${currentPlayer}`;
              return (
                <button
                  key={idx}
                  type="button"
                  className="tile"
                  role="gridcell"
                  aria-label={label}
                  aria-pressed={value ? 'true' : 'false'}
                  disabled={disabled}
                  onClick={() => handleSquareClick(idx)}
                >
                  <strong aria-hidden="true">{value ?? ''}</strong>
                </button>
              );
            })}
          </section>

          <section className="status-bar">
            <p className="status-text" aria-live="polite" aria-atomic="true">
              {winner && <span>Game over. Winner: <strong>{winner}</strong></span>}
              {!winner && draw && <span>Game over. <strong>Draw</strong></span>}
              {!gameOver && (
                <span>
                  Turn: <strong>{currentPlayer}</strong>
                </span>
              )}
            </p>
            <button
              type="button"
              className="btn-reset"
              onClick={resetGame}
              aria-label="Reset game"
              disabled={!gameOver && board.every(cell => cell === null)}
            >
              Reset
            </button>
          </section>
        </main>
      </header>
    </div>
  );
}

export default App;
