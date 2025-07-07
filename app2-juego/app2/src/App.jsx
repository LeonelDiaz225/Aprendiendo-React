import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "x",
  O: "o",
};


const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;
  const handleClick = () => {
    updateBoard(index); // Pasar el index aquí
  };

  return ( 
    <div onClick={handleClick} className={className}> {/* Usar handleClick en lugar de updateBoard directamente */}
      {children}
    </div>
  );
};

const winnerCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    // Verificar que la casilla esté vacía
    if (board[index]) return;
    
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  };

  return (
    <main className="board">
      <h1>Tic Tac Game</h1>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard}
            >
              {square} {/* Mostrar el contenido del tablero (X o O) */}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square> 
      </section>
    </main>
  );
}

export default App;
