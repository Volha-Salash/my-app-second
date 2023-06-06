import { combineReducers } from 'redux'

const InitialState = {
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
function historyReducer(state=InitialState, action) {
  switch (action.type) {
    case 'ADD_SQUARE':
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      squares[action.index] = state.xIsNext ? "X" : "O";
      return {
        ...state,
        history: [...history, { squares }],
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
      };
    default:
      return state;
  }
}

function stepNumberReducer(state = 0, action) {
  switch (action.type) {
    case 'JUMP_TO':
      return action.step;
    default:
      return state;
  }
}

function xIsNextReducer(state = true, action) {
  switch (action.type) {
    case 'HANDLE_CLICK':
      return !state;
    default:
      return state;
  }
}

function isAscendingReducer(state = true, action) {
  switch (action.type) {
    case 'HANDLE_SORT_TOGGLE':
      return !state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  history: historyReducer,
  stepNumber: stepNumberReducer,
  xIsNext: xIsNextReducer,
  isAscending: isAscendingReducer
});

export default rootReducer;




/*

const InitialState = {
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


//const store = createStore(rootReducer, InitialState);
const reducer = (state = InitialState, action) => {

  switch (action.type) {
    case 'ADD_SQUARE':
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      squares[action.index] = state.xIsNext ? "X" : "O";
      return {
        ...state,
        history: [...history, { squares }],
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
      };
    case 'JUMP_TO':
      return {
        ...state,
        stepNumber: action.step,
        xIsNext: action.step % 2 === 0,
      };
    case 'HANDLE_CLICK':
      const { index } = action;
      const currHistory = state.history.slice(0, state.stepNumber + 1);
      const currSquare = currHistory[currHistory.length - 1].squares.slice();
      if (calculateWinner(currSquare.squares) || currSquare[index]) {
        return state;
      }
      return {
        ...state,
        stepNumber: currHistory.length,
        xIsNext: !state.xIsNext,
      };
    case 'HANDLE_SORT_TOGGLE':
      return {
        ...state,
        isAscending: !state.isAscending,
      };
    default: return state;
  }
};
const store = createStore(reducer);


*/

/*
export default function Reducer(state=initialState, action) {
  switch(action.type){
    case "TURN_CHANGE":
      let squares = action.squares
      const Return_Turn_Value = {
        history: action.history.concat([{squares: squares}]),
        stepNumber: action.history.length,
        xIsNext: !state.xIsNext
      }
      return Return_Turn_Value;
    case "JUMP_HISTORY":
      const Return_Jump_Value = {
        history: state.history,
        stepNumber: action.step,
        xIsNext: action.step % 2 ? false : true
      }
      return Return_Jump_Value;
    default:
      return state;
  }
}
*/