// const gameBoard = Array(9)
//   .fill(null)
//   .map(() => Array(9).fill(0));

// for (let x = 0; x < gameBoard.length; x++) {
//   for (let y = 0; y < gameBoard[x].length; y++) {
//     console.log(x, y);
//   }
// }

// console.log(Math.floor(Math.random() * 2));

const forbiddenHorizontalSquares = [];

// for (let i = 0; i < 10; i++) {
//   forbiddenHorizontalSquares.push(i * 9);
// }
// for (let i = 0; i < 10; i++) {
//   forbiddenHorizontalSquares.push(i * 9 + 1);
// }
// for (let i = 0; i < 10; i++) {
//   forbiddenHorizontalSquares.push(i * 9 + 2);
// }
// for (let i = 0; i < 10; i++) {
//   forbiddenHorizontalSquares.push(i * 9 + 3);
// }

for (let i = 81; i >= 41; i--) {
  forbiddenHorizontalSquares.push(i);
}
console.log(forbiddenHorizontalSquares);
