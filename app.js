// Array for user
const userArray = [];

//Array for computer
const computerArray = [];

// matrix size
const width = 9;

//Ships
const smallShipObj = {
  name: "Small-Ship",
  horizontal: [0, 1],
  vertical: [0, width],
};

const mediumShipObj = {
  name: "Medium-Ship",
  horizontal: [0, 1, 2],
  vertical: [0, width, width * 2],
};

const bigShipObj = {
  name: "Big-Ship",
  horizontal: [0, 1, 2, 3],
  vertical: [0, width, width * 2, width * 3],
};

// Function to create Grids
function createGameBoard(width, gameboard, array) {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.dataset.id = i;
    gameboard.appendChild(square);
    array.push(square);
  }
}

createGameBoard(width, userGameboard, userArray);
createGameBoard(width, computerGameboard, computerArray);

// Create Random Ships in Grid

function generateRandomShip(ship) {
  let randomDirection = Math.floor(Math.random() * 2);
  // Select randomly a direction for the ship
  let currentDirection = randomDirection ? ship.vertical : ship.horizontal;

  // Directions and limiting max position for square
  let direction;
  if (randomDirection === 0) {
    direction = 1;
  }
  if (randomDirection === 1) {
    direction = 9;
  }

  console.log(direction);
  //random point to start the ships location
  let randomShipStart = Math.abs(
    Math.floor(
      Math.random() * computerArray.length - ship.horizontal.length * direction
    )
  );
  console.log(`ship start position: ${randomShipStart}`);
  console.log(`ship horizontal length: ${ship.horizontal.length}`);
  console.log(`computer array length: ${computerArray.length}`);

  // check max square for vertical size ship
  // if (!randomDirection && randomShipStart > 53) {
  //   generateRandomShip(ship);
  //   return;
  // }

  //check if square in grid is already taken
  const squareInUse = currentDirection.some((i) =>
    computerArray[randomShipStart + i].classList.contains("taken")
  );

  console.log(`squareInUse ${squareInUse}`);
  // check that ship is not on the right edge
  const squareInRightEdge = currentDirection.some(
    (i) => (randomShipStart + i) % width === width - 1
  );

  console.log(`square Right Edge ${squareInRightEdge}`);
  // check that ship is not on the left edge
  const squareInLeftEdge = currentDirection.some(
    (i) => (randomShipStart + i) % width === 0
  );

  console.log(`square in Left Edge ${squareInLeftEdge}`);
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
