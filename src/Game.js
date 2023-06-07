import "./styles.css";
import Board from "./components/Board";
import React from "react";
import { connect } from "react-redux";
import checkWinner from "./utils/checkWinner";
import { winnerCreator, resetCreator } from "./store/square";

class Game extends React.Component {
  //Dispatching Action from render was throwing an error and hence shifted it to componentDidUpdate
  componentDidUpdate() {
    const { winner: stateWinner, squares, newWinner } = this.props;
    const [winner, winningConfig] = checkWinner(squares);

    if (winner && !stateWinner) {
      newWinner({
        winner,
        winningConfig
      });
    }
  }
  render() {
    const { winner: stateWinner, isXPlaying, reset } = this.props;

    return (
      <div className="App">
        {stateWinner ? (
          <h2>Winner is {stateWinner}</h2>
        ) : (
          <h2>{`Next Move ${isXPlaying ? "X" : "O"}`}</h2>
        )}
        <Board />
        <button className="reset-button" onClick={reset}>
          Reset
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    squares: state.squares,
    winner: state.winner,
    isXPlaying: state.isXPlaying
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newWinner(winner) {
      dispatch(winnerCreator(winner));
    },
    reset() {
      dispatch(resetCreator());
    }
  };
};

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game);

export default function (props) {
  return (
    
    <GameContainer {...props}>
      <Game />
    </GameContainer>
  );
}