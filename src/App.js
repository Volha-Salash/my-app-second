import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9)
      .fill(null), xIsNext: true,
  };
}

handleClick(index){
  const squares = [this.state.board];
  //если кто то выиграл игнорим клик
  if (calculateWinner(squares) || squares[index]) {
    return
  }
  //записываем текущий символ в выбранную клетку
  squares[index] = this.state.xIsNext ? 'X' : '0';
  this.setState({
    board: squares,
    xIsNext : !this.state.xIsNext,
  });
}


  renderSquare(index){
    return (
      <button className='square' onClick={() => this.handleClick(index)}>
        {this.state.board[index]}
      </button>
    );
  }

  render(){
    const winner = calculateWinner(this.state.board);
    const status = winner ? `Winner:${winner}` : `Next player:${this.state.xIsNext ? 'X' : '0'}`;

    return (
      <div className='game'>
        <div className='game board'>
          <div className='board-row'>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className='board-row'>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className='board-row'>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        <div className='game-info'>
          <div>{status}</div>
        </div>
      </div>
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
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  export default App;
