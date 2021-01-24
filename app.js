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
// game has startrd
let gameStarted = false;
// current player
let currentPlayer = "user";

// amout of drags
let draggs = 0;
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

const mediumShipObj2 = {
  name: "Medium-Ship2",
  horizontal: [0, 1, 2],
  vertical: [0, matrixSize, matrixSize * 2],
};

const bigShipObj = {
  name: "Big-Ship",
  horizontal: [0, 1, 2, 3],
  vertical: [0, matrixSize, matrixSize * 2, matrixSize * 3],
};

const bigShipObj2 = {
  name: "Big-Ship2",
  horizontal: [0, 1, 2, 3],
  vertical: [0, matrixSize, matrixSize * 2, matrixSize * 3],
};

////////////////// CREATE GAMEBOARDS ///////////////////////////
function createGameBoard(matrixSize, gameboard, array) {
  for (let i = 0; i < matrixSize * matrixSize; i++) {
    const square = document.createElement("div");
    //each square will have a unique number for their corresponding position
    square.dataset.id = i;
    gameboard.appendChild(square);
    //save all the DOM data of the gameboard in an array (userArray and computerArray)
    array.push(square);
  }
}

createGameBoard(matrixSize, userGameboard, userArray);
createGameBoard(matrixSize, computerGameboard, computerArray);

//// EVENT LISTENERS ////////
rotateButton.addEventListener("click", rotateShips);
fireButton.addEventListener("click", fireTorpedo);
showShipsButton.addEventListener("click", showShips);
restartButton.addEventListener("click", restartGame);
startButton.addEventListener("click", play);

ships.forEach((ship) => ship.addEventListener("dragstart", dragStart));
userArray.forEach((array) => array.addEventListener("dragstart", dragStart));
userArray.forEach((array) => array.addEventListener("dragover", dragOver));
userArray.forEach((array) => array.addEventListener("dragenter", dragEnter));
userArray.forEach((array) => array.addEventListener("dragleave", dragLeave));
userArray.forEach((array) => array.addEventListener("drop", dragDrop));
userArray.forEach((array) => array.addEventListener("dragend", dragEnd));

//////////////////////////// ROTATE SHIPS /////////////////////////

// Rotate Ships to drag
function rotateShips() {
  if (shipsHorizontal) {
    document.querySelector(".ships-display").style.display = "flex";
  }
  if (!shipsHorizontal) {
    document.querySelector(".ships-display").style.display = "block";
  }
  smallShip.classList.toggle("small-ship-container-v");
  mediumShip1.classList.toggle("medium-ship-container-0-v");
  mediumShip2.classList.toggle("medium-ship-container-1-v");
  bigShip1.classList.toggle("big-ship-container-0-v");
  bigShip2.classList.toggle("big-ship-container-1-v");
  shipsHorizontal = !shipsHorizontal;
}

///////////////////////////// DRAG AND DROP SHIPS ////////////////////////////////

// Name and Index of ship when mousedown ex: "big-ship-1-2"
let currentShipIndex;
//Ship that is beeing dragged
let currentShip;
//Length of the ship thans to children.length of the element
let currentShipLength;

ships.forEach((ship) =>
  ship.addEventListener("mousedown", (event) => {
    currentShipIndex = event.target.id;
  })
);

function dragStart() {
  currentShip = this;
  currentShipLength = currentShip.children.length;
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
}

function dragLeave() {
  return;
}

function dragDrop() {
  //id of last element in the node list to slice the size ex: big-ship-1-3
  let shipWithLastId = currentShip.lastElementChild.id;
  // saving a unique name for the class that is going to be added ex: big-ship-1
  let shipClass = currentShip.lastElementChild.id.slice(0, -2);
  //ship size ex: 3
  let lastShipIndex = parseInt(shipWithLastId.substr(-1));

  //Adding ship size (from substrig) with datasetId (position in gameboard)
  let lastId = lastShipIndex + parseInt(this.dataset.id);

  // From what div was the element taken ex:2
  let selectedShipIndex = parseInt(currentShipIndex.substr(-1));

  console.log(`currentShipIndex: ${currentShipIndex}`);
  console.log(`shipWithLastId: ${shipWithLastId}`);
  console.log(`shipClass : ${shipClass}`);
  console.log(`lastShipIndex: ${lastShipIndex}`);
  console.log(`lastId: ${lastId}`);
  console.log(`selectedShipIndex: ${selectedShipIndex}`);

  //last data set id (number) in wish the element is position in the gameboard ex:66
  lastId = lastId - selectedShipIndex;

  // console.log(`lastId: ${lastId}`);
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

  // Part used of the not allowed array depending on the ship size
  let newForbiddenHorizontalSquares = forbiddenHorizontalSquares.splice(
    0,
    9 * lastShipIndex
  );

  //Check and return if not allowed
  if (shipsHorizontal && newForbiddenHorizontalSquares.includes(lastId)) {
    return;
  }

  // if any square that would be used by the ship is bigger then 80, dont allow drop, for vertical
  if (!shipsHorizontal && lastId - lastShipIndex + lastShipIndex * 9 > 80) {
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
  // add drags to check if it has been done before starting the game
  draggs++;
}

function dragEnd() {
  return;
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
    Math.floor(Math.random() * computerArray.length) -
      ship.horizontal.length * direction
  );

  //check if square in grid is already taken
  const squareInUse = currentDirection.some((i) =>
    computerArray[randomShipStart + i].classList.contains("pc-taken")
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
      computerArray[randomShipStart + i].classList.add("pc-taken", ship.name)
    );
  } else {
    generateRandomShip(ship);
  }
}
// generate Ships
generateRandomShip(smallShipObj);
generateRandomShip(mediumShipObj);
generateRandomShip(mediumShipObj2);
generateRandomShip(bigShipObj);
generateRandomShip(bigShipObj2);

/////////// GAME //////////////

//Manually fire a a torpedo by giving the coordinates in the board
function fireTorpedo() {
  if (!gameStarted) {
    alert("Game has not started yet");
    return;
  }
  const coordinatesPromt = prompt("X, Y Where X is the Row and Y the Column");
  const newCoordintes = coordinatesPromt.replace(",", "");

  const operation = (
    9 * parseInt(newCoordintes[0] - 1) +
    parseInt(newCoordintes[1] - 1)
  ).toString();

  for (square of computerArray) {
    if (square.dataset.id === operation) {
      showSquare(square);
    }
  }
}

// show ships if wanted
function showShips() {
  computerArray.forEach((square) => {
    if (square.classList.contains("pc-taken")) {
      square.style.backgroundColor = "steelblue";
    }
    if (square.classList.contains("hit")) {
      square.style.backgroundColor = "red";
    }
  });
}

// after game over, this button to refresh the page is shown
function restartGame() {
  location.reload();
}

/// GAME START - GAME LOGIC

function play() {
  if (draggs < 5) {
    alert("You have to drag your ships first!");
    return;
  }
  if (gameOver) {
    return;
  }
  gameStarted = true;
  startButton.style.display = "none";

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
    }, 500);
  }
}

// Keeping count of the users points
let smallShipCount = 0;
let mediumShipCount = 0;
let mediumShip2Count = 0;
let bigShipCount = 0;
let bigShip2Count = 0;

function showSquare(square) {
  if (!square.classList.contains("hit")) {
    if (square.classList.contains("Small-Ship")) {
      smallShipCount++;
      square.style.backgroundColor = "red";
    }
    if (square.classList.contains("Medium-Ship")) {
      mediumShipCount++;
      square.style.backgroundColor = "red";
    }
    if (square.classList.contains("Medium-Ship2")) {
      mediumShip2Count++;
      square.style.backgroundColor = "red";
    }
    if (square.classList.contains("Big-Ship")) {
      bigShipCount++;
      square.style.backgroundColor = "red";
    }
    if (square.classList.contains("Big-Ship2")) {
      bigShip2Count++;
      square.style.backgroundColor = "red";
    }
  }
  if (square.classList.contains("pc-taken")) {
    square.classList.add("hit");
  } else {
    square.classList.add("miss");
  }
  checkWinner();
  currentPlayer = "computer";
  play();
}

// count of the computer points
let pcSmallShipCount = 0;
let pcMediumShipCount = 0;
let pcMediumShip2Count = 0;
let pcBigShipCount = 0;
let pcBigShip2Count = 0;

const computerPlays = () => {
  const randomSquare = Math.floor(Math.random() * userArray.length);
  if (
    !userArray[randomSquare].classList.contains("hit") &&
    !userArray[randomSquare].classList.contains("miss")
  ) {
    userArray[randomSquare].classList.add("miss");

    if (userArray[randomSquare].classList.contains("small-ship-0")) {
      pcSmallShipCount++;
      userArray[randomSquare].classList.remove("miss");
      userArray[randomSquare].classList.add("hit");
    }
    if (userArray[randomSquare].classList.contains("medium-ship-0")) {
      pcMediumShipCount++;
      userArray[randomSquare].classList.remove("miss");
      userArray[randomSquare].classList.add("hit");
    }
    if (userArray[randomSquare].classList.contains("medium-ship-1")) {
      pcMediumShip2Count++;
      userArray[randomSquare].classList.remove("miss");
      userArray[randomSquare].classList.add("hit");
    }
    if (userArray[randomSquare].classList.contains("big-ship-0")) {
      pcBigShipCount++;
      userArray[randomSquare].classList.remove("miss");
      userArray[randomSquare].classList.add("hit");
    }
    if (userArray[randomSquare].classList.contains("big-ship-1")) {
      userArray[randomSquare].classList.remove("miss");
      userArray[randomSquare].classList.add("hit");
      pcBigShip2Count++;
    }
  } else {
    computerPlays();
  }
  checkWinner();
  currentPlayer = "user";
  turn.textContent = "Your turn";
};

//Check if there is a winner
//for each boat sunk, give 10 points to the player
const checkWinner = () => {
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
    generalInfo.textContent = "You sunk a computers big ship!";
    bigShipCount = 10;
  }
  if (bigShip2Count === 4) {
    generalInfo.textContent = "You sunk a computers big ship!";
    bigShip2Count = 10;
  }
  if (pcSmallShipCount === 2) {
    generalInfo.textContent = "The computer sunk a small ship!";
    pcSmallShipCount = 10;
  }
  if (pcMediumShipCount === 3) {
    generalInfo.textContent = "The computer sunk a medium sizeds ship!";
    pcMediumShipCount = 10;
  }
  if (pcMediumShip2Count === 3) {
    generalInfo.textContent = "The computer sunk medium sized ship!";
    pcMediumShip2Count = 10;
  }
  if (pcBigShipCount === 4) {
    generalInfo.textContent = "The computer sunk a big ship!";
    pcBigShipCount = 10;
  }
  if (pcBigShip2Count === 4) {
    generalInfo.textContent = "The computer sunk a big ship!";
    pcBigShip2Count = 10;
  }

  // If a player has reached 50 points (all boats sunk) then he is the winner
  if (
    smallShipCount +
      mediumShipCount +
      mediumShip2Count +
      bigShipCount +
      bigShip2Count ===
    50
  ) {
    generalInfo.textContent = "YOU ARE THE WINNER !";
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
    generalInfo.textContent = "THE COMPUTER HAS WON.";
    gameIsOver();
  }
};

// game over function
function gameIsOver() {
  gameOver = true;
  restartButton.style.display = "block";
}
