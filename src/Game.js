import "./App.css";
import Board from "./components/Board";
import React from "react";
import { connect } from "react-redux";
import checkWinner from "./utils/checkWinner";
import { winnerCreator, resetCreator, incrementClickCountCreator } from './reducers/reducer';

class Game extends React.Component {

  handleClick = () => {
    this.props.incrementClickCount();
  };

  componentDidUpdate() {
    const { winner: stateWinner, squares, newWinner } = this.props;
    const [winner, winningConfig] = checkWinner(squares);

    if (winner && !stateWinner) {
      newWinner({
        winner,
        winningConfig,
      });
    }
  }

  render() {
    const { winner: stateWinner, isXPlaying, reset, clickCount } = this.props;

    console.log('clickCount ' + clickCount)

    return (
      <div className="App">
        {stateWinner ? (
          <h2>Winner is {stateWinner}</h2>
        ) : (
          <h2>{`Next Move ${isXPlaying ? "X" : "O"}`}</h2>)}
        <Board
          handleClick={this.handleClick} />
        <button className="reset-button" onClick={reset}>
          Reset
        </button>
         <p>clickCount: {this.props.clickCount}</p>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    squares: state.squares,
    winner: state.winner,
    isXPlaying: state.isXPlaying,
    clickCount: state.clickCount
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    newWinner(winner) {
      dispatch(winnerCreator(winner));
    },
    reset() {
      dispatch(resetCreator());
    },
    incrementClickCount() {
      dispatch(incrementClickCountCreator());
    }
  };
};


const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game);

export default function GameFunc(props) {
  return (
    <GameContainer {...props}>
      <Game />
    </GameContainer>
  );
}
