// Array for user
const userArray = [];
//Array for computer
const computerArray = [];
// matrix size
const matrixSize = 9;
// Ships to pick actual position
let shipsHorizontal = true;
// is game over
let gameOver = false;
// current player
let currentPlayer = "user";
////////////////////////// SHIPS OBJECTS //////////////////////////////
const smallShipObj = {
  name: "Small-Ship",
  horizontal: [0, 1],
  vertical: [0, matrixSize],
};

const mediumShipObj = {
  name: "Medium-Ship",
  horizontal: [0, 1, 2],
  vertical: [0, matrixSize, matrixSize * 2],
};

const bigShipObj = {
  name: "Big-Ship",
  horizontal: [0, 1, 2, 3],
  vertical: [0, matrixSize, matrixSize * 2, matrixSize * 3],
};

////////////////// CREATE GAMEBOARDS ///////////////////////////
function createGameBoard(matrixSize, gameboard, array) {
  for (let i = 0; i < matrixSize * matrixSize; i++) {
    const square = document.createElement("div");
    square.dataset.id = i;
    gameboard.appendChild(square);
    array.push(square);
  }
}

createGameBoard(matrixSize, userGameboard, userArray);
createGameBoard(matrixSize, computerGameboard, computerArray);

//////////////////////////// ROTATE SHIPS /////////////////////////

// Rotate Ships to drag
function rotateShips() {
  smallShip.classList.toggle("small-ship-container-v");
  mediumShip1.classList.toggle("medium-ship-container-0-v");
  mediumShip2.classList.toggle("medium-ship-container-1-v");
  bigShip1.classList.toggle("big-ship-container-0-v");
  bigShip2.classList.toggle("big-ship-container-1-v");
  shipsHorizontal = !shipsHorizontal;
}

rotateButton.addEventListener("click", rotateShips);

///////////////////////////// DRAG AND DROP SHIPS ////////////////////////////////
ships.forEach((ship) => ship.addEventListener("dragstart", dragStart));
userArray.forEach((array) => array.addEventListener("dragstart", dragStart));
userArray.forEach((array) => array.addEventListener("dragover", dragOver));
userArray.forEach((array) => array.addEventListener("dragenter", dragEnter));
userArray.forEach((array) => array.addEventListener("dragleave", dragLeave));
userArray.forEach((array) => array.addEventListener("drop", dragDrop));
userArray.forEach((array) => array.addEventListener("dragend", dragEnd));

// Name and Index of ship when mousedown
let currentShipIndex;
//Ship that is beeing dragged
let currentShip;
//Length of the ship thans to children.length of the element
let currentShipLength;

ships.forEach((ship) =>
  ship.addEventListener("mousedown", (event) => {
    currentShipIndex = event.target.id;
    // console.log(currentShipIdex);
  })
);

function dragStart() {
  currentShip = this;
  currentShipLength = currentShip.children.length;
  console.log(currentShipLength);
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
}

function dragLeave() {
  console.log("drag leave");
}

function dragDrop() {
  let shipWithLastId = currentShip.lastElementChild.id;
  let shipClass = currentShip.lastElementChild.id.slice(0, -2);
  let lastShipIndex = parseInt(shipWithLastId.substr(-1));

  //Adding ship size (from substrig) with datasetId (position in gameboard)
  let lastId = lastShipIndex + parseInt(this.dataset.id);

  let selectedShipIndex = parseInt(currentShipIndex.substr(-1));

  console.log(`currentShipIndex: ${currentShipIndex}`);
  console.log(`shipWithLastId: ${shipWithLastId}`);
  console.log(`shipClass : ${shipClass}`);
  console.log(`lastShipIndex: ${lastShipIndex}`);
  console.log(`lastId: ${lastId}`);
  console.log(`selectedShipIndex: ${selectedShipIndex}`);

  lastId = lastId - selectedShipIndex;

  console.log(`lastId: ${lastId}`);
  // Coordinates where I should not drop a ship horizontal
  const forbiddenHorizontalSquares = [];
  for (let i = 0; i < 10; i++) {
    forbiddenHorizontalSquares.push(i * 9);
  }
  for (let i = 0; i < 10; i++) {
    forbiddenHorizontalSquares.push(i * 9 + 1);
  }
  for (let i = 0; i < 10; i++) {
    forbiddenHorizontalSquares.push(i * 9 + 2);
  }
  for (let i = 0; i < 10; i++) {
    forbiddenHorizontalSquares.push(i * 9 + 3);
  }

  // Coordinates where I should not drop a ship vertical
  const forbiddenVerticalSquares = [];
  for (let i = 81; i >= 42; i--) {
    forbiddenVerticalSquares.push(i);
  }

  // Part of the not allowed array depending on the ship size
  let newForbiddenHorizontalSquares = forbiddenHorizontalSquares.splice(
    0,
    9 * lastShipIndex
  );
  let newForrbidenVerticalSquares = forbiddenVerticalSquares.splice(
    0,
    9 * lastShipIndex
  );

  //Check and return if not allowed
  if (shipsHorizontal && newForbiddenHorizontalSquares.includes(lastId)) {
    return;
  }
  if (!shipsHorizontal && newForrbidenVerticalSquares.includes(lastId)) {
    return;
  }

  if (shipsHorizontal) {
    for (let i = 0; i < currentShipLength; i++) {
      // we rest selectShipIndex to account for the position from where the ship was dragged
      // with +i we are taking each square due the length of the ship
      userArray[
        parseInt(this.dataset.id) - selectedShipIndex + i
      ].classList.add("taken", shipClass);
    }
  } else if (!shipsHorizontal) {
    // we multiply the matrixSize to count for vertical spacing
    for (let i = 0; i < currentShipLength; i++) {
      userArray[
        parseInt(this.dataset.id) - selectedShipIndex + matrixSize * i
      ].classList.add("taken", shipClass);
    }
  }

  //remove ship from display
  shipsDisplay.removeChild(currentShip);
}

function dragEnd() {
  console.log("drag end");
}

//////////////////// CREATE RANDOM SHIP FOR COMPUTER GAMEBOARD /////////////////////////////
function generateRandomShip(ship) {
  const randomDirection = Math.floor(Math.random() * 2);
  // Select randomly a direction for the ship
  const currentDirection = randomDirection ? ship.vertical : ship.horizontal;

  // Directions and limiting max position for square
  const direction = randomDirection ? 9 : 1;

  //random point to start the ships location
  const randomShipStart = Math.abs(
    Math.floor(
      Math.random() * computerArray.length - ship.horizontal.length * direction
    )
  );

  //check if square in grid is already taken
  const squareInUse = currentDirection.some((i) =>
    computerArray[randomShipStart + i].classList.contains("taken")
  );
  // check that ship is not on the right edge
  const squareInRightEdge = currentDirection.some(
    (i) => (randomShipStart + i) % matrixSize === matrixSize - 1
  );
  // check that ship is not on the left edge
  const squareInLeftEdge = currentDirection.some(
    (i) => (randomShipStart + i) % matrixSize === 0
  );
  // If space available, create ship, else bring a new ship
  if (!squareInUse && !squareInRightEdge && !squareInLeftEdge) {
    currentDirection.forEach((i) =>
      computerArray[randomShipStart + i].classList.add("taken", ship.name)
    );
  } else {
    generateRandomShip(ship);
  }
}
// generate Ships
generateRandomShip(smallShipObj);
generateRandomShip(smallShipObj);
generateRandomShip(mediumShipObj);
generateRandomShip(mediumShipObj);
generateRandomShip(bigShipObj);

/////////// GAME //////////////

function play() {
  console.log(currentPlayer);
  if (gameOver) {
    return;
  }
  if (currentPlayer == "user") {
    turn.textContent = "It's your turn";
    computerArray.forEach((square) =>
      square.addEventListener("click", function (event) {
        showSquare(square);
      })
    );
  }
  if (currentPlayer == "computer") {
    turn.textContent = "Computer's turn";
    setTimeout(() => {
      computerPlays();
    }, 800);
  }
}

startButton.addEventListener("click", () => play());

let smallShipCount = 0;
let mediumShipCount = 0;
let mediumShip2Count = 0;
let bigShipCount = 0;
let bigShip2Count = 0;

function showSquare(square) {
  if (!square.classList.contains("hit")) {
    if (square.classList.contains("small-ship-0")) {
      console.log("SI!");
      smallShipCount++;
    }
    if (square.classList.contains("medium-ship-0")) {
      mediumShipCount++;
    }
    if (square.classList.contains("medium-ship-1")) {
      mediumShip2Count++;
    }
    if (square.classList.contains("big-ship-0")) {
      bigShipCount++;
    }
    if (square.classList.contains("big-ship-1")) {
      bigShip2Count++;
    }
  }
  if (square.classList.contains("taken")) {
    square.classList.add("hit");
    console.log("click");
  } else {
    square.classList.add("miss");
  }
  checkWinner();
  currentPlayer = "computer";
  play();
}

let pcSmallShipCount = 0;
let pcMediumShipCount = 0;
let pcMediumShip2Count = 0;
let pcBigShipCount = 0;
let pcBigShip2Count = 0;

const computerPlays = () => {
  console.log("computer playing");
  const randomSquare = Math.floor(Math.random() * userArray.length);
  if (!userArray[randomSquare].classList.contains("hit")) {
    userArray[randomSquare].classList.add("hit");
    console.log(randomSquare);
    if (userArray[randomSquare].classList.contains("small-ship-0")) {
      pcSmallShipCount++;
    }
    if (userArray[randomSquare].classList.contains("medium-ship-0")) {
      pcMediumShipCount++;
    }
    if (userArray[randomSquare].classList.contains("medium-ship-1")) {
      pcMediumShip2Count++;
    }
    if (userArray[randomSquare].classList.contains("big-ship-0")) {
      pcBigShipCount++;
    }
    if (userArray[randomSquare].classList.contains("big-ship-1")) {
      pcBigShip2Count++;
    }
  } else {
    computerPlays();
  }
  checkWinner();
  currentPlayer = "user";
  turn.textContent = "Your turn";
};

const checkWinner = () => {
  console.log(`pc Small Ship ${pcSmallShipCount}`);
  console.log(`pc Medium Ship ${pcMediumShipCount}`);
  console.log(`pc Medium Ship 2 ${pcMediumShip2Count}`);
  console.log(`pc Big Ship ${pcBigShipCount}`);
  console.log(`pc Big Ship 2 ${pcBigShip2Count}`);

  console.log(`user Small Ship ${smallShipCount}`);
  console.log(`user Medium Ship ${mediumShipCount}`);
  console.log(`user Medium Ship 2 ${mediumShip2Count}`);
  console.log(`user Big Ship ${bigShipCount}`);
  console.log(`user Big Ship 2 ${bigShip2Count}`);

  if (smallShipCount === 2) {
    generalInfo.textContent = "You sunk a computers small ship!";
    smallShipCount = 10;
  }
  if (mediumShipCount === 3) {
    generalInfo.textContent = "You sunk a computers medium sized ship!";
    mediumShipCount = 10;
  }
  if (mediumShip2Count === 3) {
    generalInfo.textContent = "You sunk a computers medium sized ship!";
    mediumShip2Count = 10;
  }
  if (bigShipCount === 4) {
    generalInfo = "You sunk a computers big ship!";
    bigShipCount = 10;
  }
  if (bigShip2Count === 4) {
    generalInfo = "You sunk a computers big ship!";
    bigShip2Count = 10;
  }
  if (pcSmallShipCount === 2) {
    generalInfo.textContent = "The computer sunk a small ship!";
    pcSmallShipCount = 10;
  }
  if (pcMediumShipCount === 3) {
    generalInfo.textContent = "The computer sunk a medium sized ship!";
    pcrMediumShipCount = 10;
  }
  if (pcMediumShip2Count === 3) {
    generalInfo.textContent = "The computer sunk medium sized ship!";
    pcMediumShip2Count = 10;
  }
  if (pcBigShipCount === 4) {
    generalInfo = "The computer sunk a computers big ship!";
    pcBigShipCount = 10;
  }
  if (pcBigShip2Count === 4) {
    generalInfo = "The computer a computers big ship!";
    pcBigShip2Count = 10;
  }
  if (
    smallShipCount +
      mediumShipCount +
      mediumShip2Count +
      bigShipCount +
      bigShip2Count ===
    50
  ) {
    generalInfo.innerHTML = "YOU ARE THE WINNER !";
    gameIsOver();
  }
  if (
    pcSmallShipCount +
      pcMediumShipCount +
      pcMediumShip2Count +
      pcBigShipCount +
      pcBigShip2Count ===
    50
  ) {
    generalInfo.innerHTML = "THE COMPUTER HAS WON.";
    gameIsOver();
  }
};

function gameIsOver() {
  gameOver = true;
  startButton.removeEventListener("click", play);
}
