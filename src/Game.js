import React from 'react';
import Board from './Board';

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
        clickCount:0 // добавленный счетчик
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
      this.setState({
        history: history.concat([
          {
            squares: squares,
            
            latestMoveSquare: i
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        clickCount: this.state.clickCount+1 //увеличиваем счетчик кликов
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
  
    handleSortToggle() {
      this.setState({
        isAscending: !this.state.isAscending
      });
    }
  
    render() {
      const history = this.state.history;
      const stepNumber = this.state.stepNumber;
      const current = history[stepNumber];
      const winInfo = calculateWinner(current.squares);
      const winner = winInfo.winner;
  
      const moves = history.map((step, move) => {
        const latestMoveSquare = step.latestMoveSquare;
        const col = 1 + latestMoveSquare % 3;
        const row = 1 + Math.floor(latestMoveSquare / 3);
        const desc = move ?
          `Go to move #${move} (${col}, ${row})` :
          'Go to game start';
        return (
          <li key={move}>
            {/* Bold the currently selected item */ 
          }
            <button
              className={move === stepNumber ? 'move-list-item-selected' : ''}
              onClick={() => this.jumpTo(move)}>{desc}
            </button>
          </li>
        );
      });
  
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        if (winInfo.isDraw) {
          status = "Draw";
        } else {
          status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
      }
  
      const isAscending = this.state.isAscending;
      if (!isAscending) {
        moves.reverse();
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
              winLine={winInfo.line}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button onClick={() => this.handleSortToggle()}>
              {isAscending ? 'descending' : 'ascending'}
            </button>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  

  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          line: lines[i],
          isDraw: false,
        };
      }
    }
  
    let isDraw = true;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        isDraw = false;
        break;
      }
    }
    return {
      winner: null,
      line: null,
      isDraw: isDraw,
    };
  }
  export default Game;