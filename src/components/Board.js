import React from "react";
import Square from "./Square";



class Board extends React.Component {

  renderSquare(number) {
    return <Square number={number}
    onClick={()=> this.props.handleClickCount(number)}
   />;
  }
  render() {
        
    return (
      <div>
        <div className="row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        
      </div>
    );
  }
}


export default Board;
