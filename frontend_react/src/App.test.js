import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Tic Tac Toe App', () => {
  test('initial state: renders title, 9 cells, X starts, reset disabled', () => {
    render(<App />);

    // Title and board exist
    expect(
      screen.getByRole('heading', { name: /tic tac toe/i })
    ).toBeInTheDocument();

    const cells = screen.getAllByRole('gridcell');
    expect(cells).toHaveLength(9);

    // All cells empty
    cells.forEach((c) => expect(c).toHaveTextContent(''));

    // Status shows X to start
    expect(screen.getByText(/turn:\s*x/i)).toBeInTheDocument();

    // Reset disabled while board is empty and no game over
    const resetButton = screen.getByRole('button', { name: /reset game/i });
    expect(resetButton).toBeDisabled();
  });

  test('placing moves: first move is X, then turn toggles to O', () => {
    render(<App />);
    const cells = screen.getAllByRole('gridcell');

    fireEvent.click(cells[0]); // X goes
    expect(cells[0]).toHaveTextContent('X');
    expect(screen.getByText(/turn:\s*o/i)).toBeInTheDocument();

    fireEvent.click(cells[1]); // O goes
    expect(cells[1]).toHaveTextContent('O');
    expect(screen.getByText(/turn:\s*x/i)).toBeInTheDocument();
  });

  test('prevent overwriting: clicking an occupied cell does nothing', () => {
    render(<App />);
    const cells = screen.getAllByRole('gridcell');

    fireEvent.click(cells[0]); // X
    expect(cells[0]).toHaveTextContent('X');

    fireEvent.click(cells[0]); // attempt overwrite — should be ignored
    expect(cells[0]).toHaveTextContent('X');
  });

  test('win detection: detects a row win and disables further moves', () => {
    render(<App />);
    const cells = screen.getAllByRole('gridcell');

    // Create X win on the top row: X at 0,2 and 1 with O interleaved elsewhere
    // Sequence: X(0), O(3), X(1), O(4), X(2) -> X wins
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X -> win

    // Winner shown
    expect(screen.getByText(/winner:\s*x/i)).toBeInTheDocument();

    // After game over, board is disabled; try to click another empty cell
    const nextEmpty = cells[5];
    expect(nextEmpty).toHaveTextContent(''); // ensure empty before click
    fireEvent.click(nextEmpty);
    expect(nextEmpty).toHaveTextContent(''); // remains unchanged
  });

  test('draw detection: fills board without winner and shows draw', () => {
    render(<App />);
    const cells = screen.getAllByRole('gridcell');

    // One known draw sequence (no three in a row):
    // Index mapping:
    // 0 | 1 | 2
    // 3 | 4 | 5
    // 6 | 7 | 8
    //
    // Moves: X O X O X O O X O
    const order = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    order.forEach((idx) => fireEvent.click(cells[idx]));

    // Verify draw status is displayed
    expect(screen.getByText(/draw/i)).toBeInTheDocument();

    // Board should be disabled after draw; clicking extra should not change
    // (all cells are already filled, but ensure gameOver prevents changes)
    const anyCell = cells[0];
    const contentBefore = anyCell.textContent;
    fireEvent.click(anyCell);
    expect(anyCell).toHaveTextContent(contentBefore);
  });

  test('reset: enabled after any move or game over and clears board and turn', () => {
    render(<App />);
    const cells = screen.getAllByRole('gridcell');
    const resetButton = screen.getByRole('button', { name: /reset game/i });

    // Initially disabled
    expect(resetButton).toBeDisabled();

    // After a single move, reset should be enabled
    fireEvent.click(cells[0]); // X
    expect(resetButton).not.toBeDisabled();

    // Perform reset
    fireEvent.click(resetButton);

    // All cells cleared
    cells.forEach((c) => expect(c).toHaveTextContent(''));

    // Back to X's turn
    expect(screen.getByText(/turn:\s*x/i)).toBeInTheDocument();

    // And reset disabled again until another move or gameOver
    expect(resetButton).toBeDisabled();
  });
});
