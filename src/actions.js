export function addSquare(squares, latestMoveSquare) {
  return {
    type: 'ADD_SQUARE',
    squares: squares,
    latestMoveSquare: latestMoveSquare
  };
}

export function jumpTo(step) {
  return {
    type: 'JUMP_TO',
    step: step
  };
}

export function handleClick(i) {
  return {
    type: 'HANDLE_CLICK',
    i: i
  };
}

export function handleSortToggle() {
  return {
    type: 'HANDLE_SORT_TOGGLE'
  };
}

export const incrementClickCount = ()=>({
  type:'INCREMENT_CLICK_COUNT'
});


/*
export function turn_change(history, squares) {
  return {
    type: "TURN_CHANGE",
    history: history,
    squares: squares
  };
}

export function jump_history(step) {
  return {
    type: "JUMP_HISTORY",
    step: step
  };
}
*/