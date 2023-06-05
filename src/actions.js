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
