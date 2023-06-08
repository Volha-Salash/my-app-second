//Action Types
const PLAY = "PLAY";
const WINNER = "WINNER";
const RESET = "RESET";
const INCREMENT_CLICK_COUNT = "INCREMENT_CLICK_COUNT"

//Action Creatores
export const playCreator = (number) => ({
  type: PLAY,
  payload: {
    number
  }
});
export const winnerCreator = (winner) => ({
  type: WINNER,
  payload: {
    winner
  }
});
export const resetCreator = () => ({
  type: RESET
});
export const incrementClickCountCreator = () => ({
  type: INCREMENT_CLICK_COUNT
});


//Initial State
const initialState = {
  squares: new Array(9).fill(null),
  isXPlaying: true,
  winner: null,
  winningConfig: [],
  clickCount: 0 // добавленный счетчик
};

//Reducer
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY:
      const squares = state.squares.slice();
      if (!state.winner) {
        if (state.isXPlaying) {
          squares[action.payload.number] = "X";
        } else {
          squares[action.payload.number] = "O";
        }
      }
      return {
        ...state,
        squares,
        isXPlaying: !state.isXPlaying,

      };
    case INCREMENT_CLICK_COUNT:
      return {
        ...state,
        clickCount: state.clickCount + 1

      };


    case WINNER:
      const winner = action.payload.winner.winner;
      const winningConfig = action.payload.winner.winningConfig;

      return {
        ...state,
        winner,
        winningConfig
      };

    case RESET:
      return {
        ...state,
        isXPlaying: true,
        winner: null,
        winningConfig: [],
        squares: Array(9).fill(null),
        clickCount: 0
      };

    default: return state;
  }
}


