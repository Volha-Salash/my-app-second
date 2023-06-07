export default function (squares) {
    const winningConfig = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    //To loop through winnigConfig
    for (let i = 0; i < winningConfig.length; ++i) {
      const [a, b, c] = winningConfig[i];
  
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], winningConfig[i]];
      }
    }
    return [null, null];
  }
  