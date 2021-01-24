//Numbered display for the outside grid css
const upper = document.getElementsByClassName("upper");
const right_side = document.getElementsByClassName("right");

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < upper.length; j++) {
    const display_square = document.createElement("div");
    display_square.classList.add("square");
    if (i === 0) {
      display_square.textContent = "";
    } else {
      display_square.textContent = i;
    }
    display_square.style.backgroundColor = "lightblue";
    upper[j].append(display_square);
  }
}

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < upper.length; j++) {
    const display_square = document.createElement("div");
    display_square.classList.add("square");
    display_square.textContent = i + 1;
    display_square.style.backgroundColor = "lightblue";
    right_side[j].append(display_square);
  }
}
//////////////

// Grids
const userGameboard = document.querySelector(".user-gameboard");
const computerGameboard = document.querySelector(".computer-gameboard");

// Ship Display
const shipsDisplay = document.querySelector(".ships-display");

// Each Ship
const ships = document.querySelectorAll(".ship");

const smallShip = document.querySelector(".small-ship-container");
const mediumShip1 = document.querySelector(".medium-ship-container-0");
const mediumShip2 = document.querySelector(".medium-ship-container-1");
const bigShip1 = document.querySelector(".big-ship-container-0");
const bigShip2 = document.querySelector(".big-ship-container-1");

// Buttons
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
const rotateButton = document.getElementById("rotate");
const fireButton = document.getElementById("fire");
const showShipsButton = document.getElementById("show-ships");

// turn display
const turn = document.getElementById("turn");

// general info
const generalInfo = document.getElementById("info");
