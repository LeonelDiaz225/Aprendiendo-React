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
  const checkWinner = (boardToCheck) => {
    for (const combo of winnerCombo) {
      const [a, b, c] = combo;
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]; // Retorna el ganador (X o O)
      }
    }
    return null; // No hay ganador
  }

   const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const isBoardFull = (newBoard) => {
    return newBoard.every((square) => square !== null);
  }
    
  const updateBoard = (index) => {
    // Verificar que la casilla esté vacía
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (isBoardFull(newBoard)) {
      setWinner(false); // false indica empate
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Game</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
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

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {winner === false 
                  ? '¡Empate!' 
                  : `El ganador es: ${winner}`
                }
              </h2>
              <button onClick={resetGame}>
                Empezar de nuevo
              </button>
            </div>
          </section>
        )
      }
    </main>
  );
}

export default App;
