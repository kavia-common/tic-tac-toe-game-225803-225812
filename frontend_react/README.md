# React Tic Tac Toe (frontend_react)

This is a lightweight React implementation of a classic Tic Tac Toe game. It features a centered 3x3 grid, a turn indicator, automatic win and draw detection, and a reset button. The UI follows a modern light theme with #3b82f6 (primary) and #06b6d4 (accent) highlights and includes accessible keyboard navigation and live status updates.

## Overview

The app renders a full Tic Tac Toe experience for two local players (X and O). Players alternate turns by selecting cells in a 3x3 board. The app prevents overwriting moves, announces the winner when three in a row are achieved, and detects draws when the board is full without a winning line. A reset button clears the board and returns the game to X’s turn. A theme toggle is provided to switch between light and dark modes.

## Getting Started

From the frontend_react directory:

- npm start  
  Starts the development server at http://localhost:3000 and enables hot reload.
- npm test  
  Runs the test suite in watch mode using react-scripts and Testing Library.
- npm run build  
  Produces an optimized production build in the build folder.

Environment variables are optional and not required for local development. If needed, the following variables are recognized by Create React App-style builds: REACT_APP_API_BASE, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL, REACT_APP_WS_URL, REACT_APP_NODE_ENV, REACT_APP_NEXT_TELEMETRY_DISABLED, REACT_APP_ENABLE_SOURCE_MAPS, REACT_APP_PORT, REACT_APP_TRUST_PROXY, REACT_APP_LOG_LEVEL, REACT_APP_HEALTHCHECK_PATH, REACT_APP_FEATURE_FLAGS, REACT_APP_EXPERIMENTS_ENABLED. None are required by this app’s core features.

## Features

The implemented app provides:

- 3x3 game grid  
  The board uses nine interactive buttons arranged in a responsive square grid. Each tile shows X or O after selection and is disabled once filled or when the game is over.
- Turn indicator  
  A status area displays “Turn: X” or “Turn: O” while the game is active so players always know whose move it is.
- Win detection  
  The app checks all rows, columns, and diagonals each move. When a player has three in a row, the game announces the winner and disables further moves.
- Draw detection  
  If the board fills without a winning line, the app announces a draw and disables further moves.
- Reset control  
  A Reset button clears the board and returns the turn to X. It remains disabled until a move has been made or the game has ended.

## Styling and Theme

The UI uses a centered layout with a stacked structure: title, board, and a status bar with Reset. The light theme is the default and uses the following accent colors:
- Primary: #3b82f6
- Accent: #06b6d4

These colors are applied to borders, focus rings, hover states, and the reset button. The game area stays centered and responsive with a consistent square board. A theme toggle in the top-right corner switches between light and dark modes by adjusting CSS variables on the root element. See src/App.css for theme tokens and component styles.

## Accessibility

The app is designed to be usable with a keyboard and screen readers:
- Keyboard navigation  
  Each board tile is a button with a visible focus style. You can Tab through tiles and activate them with Enter/Space.
- Live status updates  
  The game’s status is exposed via an aria-live="polite" region so assistive technologies receive turn, win, and draw updates without extra interaction.
- ARIA roles and labels  
  The board uses role="grid" and tiles use role="gridcell" with descriptive aria-labels for cell positions and contents. The currently intended action is announced, such as “Place X”.
- Visible focus  
  Focus rings are clearly visible against the light theme using dual-color outlines to ensure sufficient contrast.

## Testing

This project includes a thorough test suite with React Testing Library:
- How to run  
  Use npm test to run tests in watch mode. CI environments can set CI=true for non-interactive runs.
- What is covered  
  Tests verify initial rendering, move placement and turn toggling, prevention of overwriting moves, win detection and board lock after win, draw detection and lock after draw, and reset behavior (including re-enabling/disabling as appropriate).

## Project Structure

Key files related to the game:
- src/App.js: Main game component, game state, winner/draw logic, interactions, and accessibility.
- src/App.css: Theme tokens and component styles for the board, tiles, status bar, buttons, and focus outlines.
- src/App.test.js: Test suite for core gameplay flows and UI states.
- src/index.js and src/index.css: App bootstrap and global styles.

