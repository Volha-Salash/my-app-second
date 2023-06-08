import React from "react";
import { connect } from "react-redux";
import { playCreator } from '../reducers/reducer.js';

//Question: How to only redender the squares that have been changed

class Square extends React.Component {
  shouldComponentUpdate(nextProps) {
    //console.log("Should Update", this.props.number);
    //console.log("Props", this.props.getSquare(this.props.number));
    //console.log("Next Props", nextProps.getSquare(nextProps.number));
    if (nextProps.winner) {
      return true;
    }
    if (
      nextProps.getSquare(nextProps.number) ===
      this.props.getSquare(this.props.number)
    ) {
      return false;
    }
    return true;
  }

   componentDidUpdate() {
     console.log("Square.js Updated for ", this.props.number);
   }

  handleClick = (number) => {
    const { getSquare, winner, play } = this.props;

   
    if (!winner && !getSquare(number)) {
      play(number);
    }
  };
  render() {
    const { number, getSquare, winningConfig } = this.props;

    //Check if current square number is part of winningConfig
    let squareClass = "square";
    const isPartOfWinningConfig = winningConfig.includes(number);
    if (isPartOfWinningConfig) {
      squareClass = "square winner";
    }

    return (
      <div
        className={squareClass}
        onClick={() => {
          this.handleClick(number);
        }}
      >
        {getSquare(number)}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    getSquare(number) {
      return state.squares[number];
    },
    winner: state.winner,
    winningConfig: state.winningConfig
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    play(number) {
      dispatch(playCreator(number));
    }
  };
};

const SquareContainer = connect(mapStateToProps, mapDispatchToProps)(Square);

export default function SqFunc (props) {
  return (
    <SquareContainer {...props}>
      <Square />
    </SquareContainer>
  );
}
