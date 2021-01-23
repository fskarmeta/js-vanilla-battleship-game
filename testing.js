const gameBoard = Array(9)
  .fill(null)
  .map(() => Array(9).fill(0));

for (let x = 0; x < gameBoard.length; x++) {
  for (let y = 0; y < gameBoard[x].length; y++) {
    console.log(x, y);
  }
}
