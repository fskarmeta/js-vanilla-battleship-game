const upper = document.getElementsByClassName("upper");
const right_side = document.getElementsByClassName("right");
const battleship = document.getElementById("user-gameboard");

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < upper.length; j++) {
    const display_square = document.createElement("div");
    display_square.classList.add("square");
    display_square.textContent = i;
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
