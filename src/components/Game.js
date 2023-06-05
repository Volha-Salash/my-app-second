import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSquare, handleClick, jumpTo, handleSortToggle } from './actions';



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


const mapStateToProps = (state) => {
  return {
    history: state.history,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext,
    isAscending: state.isAscending
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addSquare, handleClick, jumpTo, handleSortToggle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);