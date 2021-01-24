// Array for user
const userArray = [];
//Array for computer
const computerArray = [];
// matrix size
const matrixSize = 9;

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
// Ships to pick actual position
let shipsHorizontal = true;

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
