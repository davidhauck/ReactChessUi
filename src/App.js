import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { clone } from 'lodash'
import { ChessjsToReactChess } from './ChessjsToReactChess'

import Chess from 'react-chess';

import * as chessjs from 'chess.js';

import * as axios from 'axios';

function App() {
  const cb = new chessjs();

  const [chessboard, setChessboard] = useState(cb)

  const onPieceMoved = async (piece, from, to) => {
    const newChessboard = clone(chessboard);
    var move = newChessboard.move({ from: from, to: to });
    setChessboard(newChessboard);

    const response = await axios.get('https://lhj95co9q9.execute-api.us-east-1.amazonaws.com/Prod/move?fen=' + newChessboard.fen());
    const f = String.fromCharCode(response.data.FromX + 97) + (response.data.FromY + 1)
    const t = String.fromCharCode(response.data.DestX + 97) + (response.data.DestY + 1)
    console.log(response.data)
    console.log("from: ", f)
    console.log("to: ", t)
    const newChessboard2 = clone(chessboard);
    var move = newChessboard2.move({ from: f, to: t });
    setChessboard(newChessboard2);
  }

  const pieces = ChessjsToReactChess(chessboard);

  return (
    <div className="main">
      <div className="center-children">
        <div className="chess-container">
          <Chess onMovePiece={onPieceMoved} pieces={pieces} />
        </div>
      </div>
    </div>
  );
}

export default App;
