import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Tic Tac Toe title and board', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /tic tac toe/i })).toBeInTheDocument();
  const cells = screen.getAllByRole('gridcell');
  expect(cells).toHaveLength(9);
});

test('allows a player to make a move and toggles turn', () => {
  render(<App />);
  const cells = screen.getAllByRole('gridcell');
  fireEvent.click(cells[0]);
  expect(cells[0]).toHaveTextContent('X');
  // after first move, it's O's turn
  expect(screen.getByText(/turn:\s*o/i)).toBeInTheDocument();
});

test('prevents clicking occupied cells', () => {
  render(<App />);
  const cells = screen.getAllByRole('gridcell');
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[0]); // should be ignored
  expect(cells[0]).toHaveTextContent('X');
});

test('reset button appears enabled after some moves and resets the game', () => {
  render(<App />);
  const cells = screen.getAllByRole('gridcell');
  const resetButton = screen.getByRole('button', { name: /reset game/i });
  // initially board empty, reset disabled
  expect(resetButton).toBeDisabled();

  fireEvent.click(cells[0]); // make a move
  expect(resetButton).not.toBeDisabled();

  fireEvent.click(resetButton);
  cells.forEach(c => expect(c).toHaveTextContent(''));
  expect(screen.getByText(/turn:\s*x/i)).toBeInTheDocument();
});
