 import { winnerCombo } from "../constants";

 export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of winnerCombo) {
      const [a, b, c] = combo;
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]; // Retorna el ganador (X o O)
      }
    }
    return null; // No hay ganador
  }