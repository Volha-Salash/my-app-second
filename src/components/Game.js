import { createStore } from 'redux';
import rootReducer from './reducers';
import {
  addSquare,
  handleClick,
  jumpTo,
  handleSortToggle
} from './actions';
import Board from './Board';
import calculateWinner from './utils/calculateWinner';
import calculateRowCol from './utils/calculateRowCol';
import React from "react";
import classNames from "classnames";

const store = createStore(rootReducer);


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isAscending: true,
      clickCount: 0 // добавленный счетчик
    };
  }


  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    store.dispatch(addSquare(squares, i));
    store.dispatch(handleClick(i));
  }

  jumpTo(step) {
    store.dispatch(jumpTo(step));
  }

  handleSortToggle() {
    store.dispatch(handleSortToggle());
  }

  render() {
    const state = store.getState();
    const history = state.history;
    const stepNumber = state.stepNumber;
    const current = history[stepNumber];
    const winInfo = calculateWinner(current.squares);
    const winner = winInfo.winner;

    let moves = history.map((step, move) => {
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        const latestMoveSquare = step.latestMoveSquare;

        return (
          <li key={move}>
            <button
              className={classNames({ bold: move === stepNumber })}
              onClick={() => this.jumpTo(move)}
            >
              {desc} ({calculateRowCol(latestMoveSquare)})
            </button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else if (winInfo.isDraw) {
        status = "Draw!";
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }

      return (
        <div className="game">
          < div className="game-board" >
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
              winLine={winInfo.line}
            />
          </div >
          <div className="game-info">
            <div className="status">{status}</div>
            <button onClick={() => this.handleSortToggle()}>
              {state.isAscending ? "Descending" : "Ascending"}
            </button>
            <ol>{state.isAscending ? moves : moves.reverse()}</ol>
          </div>
        </div >
      );
    }
    }

export default Game;