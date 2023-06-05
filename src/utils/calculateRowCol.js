const calculateRowCol = (index, numColumns) => 
{const row = Math.floor(index/numColumns);

const col = index%numColumns;
return {row, col};
};

export default calculateRowCol;