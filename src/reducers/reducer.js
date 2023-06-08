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
export const incrementClickCount = () => ({
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
  if (action.type === PLAY) {
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
  }
  if (action.type === INCREMENT_CLICK_COUNT) {
    const InitialStateClick = { clickCount: 0 };
         return {
        ...state, InitialStateClick, clickCount: state.clickCount + 1
      };
    }

if (action.type === WINNER) {
  const winner = action.payload.winner.winner;
  const winningConfig = action.payload.winner.winningConfig;

  return {
    ...state,
    winner,
    winningConfig
  };
}
if (action.type === RESET) {
  const squares = new Array(9).fill(null);
  return {
    ...state,
    isXPlaying: true,
    winner: null,
    winningConfig: [],
    squares
  };
}
return state;
}

