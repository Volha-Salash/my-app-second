import React from 'react';
import { addSquare, handleClick, jumpTo, handleSortToggle } from '../actions';
import Board from './Board';
import {connect} from 'react-redux'
//import store from './store';
//import calculateWinner from './utils/calculateWinner';
//import calculateRowCol from './utils/calculateRowCol';


const mapStateToProps = state => {
  return {
      history:state.history,
      stepNumber: state.stepNumber,
      xlsNext:state.xlsNext,
      isAscending: state.isAscending,
      clickCount:state.clickCount
  };
};

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
    const history = this.props.history;
    const stepNumber = this.props.stepNumber;
    const current = history[stepNumber];
    const winInfo = calculateWinner(current.squares);
    const winner = winInfo.winner;
   // const state = store.getState();
    //const history = state.history;
    //const stepNumber = state.stepNumber;
    //const current = history[stepNumber];
   // const winInfo = calculateWinner(current.squares);
   // const winner = winInfo.winner;

    let moves = history.map((step, move) => {
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        const latestMoveSquare = step.latestMoveSquare;

        return (
          <li key={move}>
            <button
              onClick={() => this.jumpTo(move)}
            >
              {desc} ({calculateRowCol(latestMoveSquare)})
            </button>
          </li>
        );
      }
      )
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



export default connect(mapStateToProps(Game));
//export default Game;