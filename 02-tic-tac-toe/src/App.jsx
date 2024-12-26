import { useState } from "react";
import "./App.css";
import confetti from 'canvas-confetti';
import {Square} from '../src/components/Square.jsx'
import {TURNS} from '../src/constants.js'
import {checkWinnerFrom, checkEndGame } from '../src/login/board.js'
import {WinnerModal} from '../src/components/WinnerModal'
function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage) 
      return Array(9).fill(null)});


  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X});

  const [winner, setWinner] = useState(null);


  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    // reseteamo localStorage
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return; // Evitar movimientos si ya hay ganador

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // guardar aqui partida

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)



    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // Indicar empate
    }
  };

  return (
    <main className="board">
      <h1>Tres en Raya</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className="game">
        {board.map((value, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {value}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

     <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  );
}

export default App;

//npm install canvas-confetti -E