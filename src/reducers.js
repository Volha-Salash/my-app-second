import { combineReducers } from 'redux';

function historyReducer(state = [{ squares: Array(9).fill(null) }], action) {
  switch (action.type) {
    case 'ADD_SQUARE':
      return state.concat([{
        squares: action.squares,
        latestMoveSquare: action.latestMoveSquare
      }]);
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