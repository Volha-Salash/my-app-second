import "./App.css";
import Board from "./components/Board";
import React from "react";
import { connect } from "react-redux";
import checkWinner from "./utils/checkWinner";
import { winnerCreator, resetCreator, incrementClickCount } from './reducers/reducer';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0 // добавленный счетчик
    };
  }
  handleButtonClick = () => {
    this.state({
      clickCount: this.state.clickCount + 1
    });
  };

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
        <p>clickCount: {this.state.clickCount}</p>
        <button
          onClick={this.handleButtonClick}>this.props.incrementClickCount
        </button>
      </div >
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

export default function GameFunc(props) {
  return (
    <GameContainer {...props}>
      <Game />
    </GameContainer>
  );
}
