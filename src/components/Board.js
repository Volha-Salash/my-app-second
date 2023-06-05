import { connect } from 'react-redux';


function Square(props) {
    const className = 'square' + (props.highlight ? ' highlight' : '');
    return (
      <button
        className={className}
        onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

class Board extends React.Component {
    renderSquare(i) {
      const winLine = this.props.winLine;
      return (
        <Square
          key={i}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          highlight={winLine && winLine.includes(i)}
        />
      );
    }
  
    render() {
      // Use two loops to make the squares
      const boardSize = 3;
      let squares = [];
      for (let i = 0; i < boardSize; ++i) {
        let row = [];
        for (let j = 0; j < boardSize; ++j) {
          row.push(this.renderSquare(i * boardSize + j));
        }
        squares.push(<div key={i} className="board-row">{row}</div>);
      }
  
      return (
        <div>{squares}</div>
      );
    }
    
  }
  

const mapStateToProps = (state) => {
  return {
    squares: state.squares,
    winLine: state.winLine
  }
}

export default connect(mapStateToProps)(Board);

