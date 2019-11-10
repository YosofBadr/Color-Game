function randomRGB() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgb(' + o(r()*s) + ', ' + o(r()*s) + ', ' + o(r()*s) + ')';
}

// Updates all squares to be of the same color
function changeColors(color) {
  for (var i = 0; i < squares.length; i++)
    squares[i].style.backgroundColor = color;

  resetButton.textContent = "Play Again";
}

// Returns array of random colors
function randomColors(numberOfColors) {
  var colorsArray = [];
  for (var i = 0; i < numberOfColors; i++) {
    colorsArray.push(randomRGB());
  }
  return colorsArray;
}

// Random number between 0 and (n - 1) inclusive
// Used to choose random color from our array to be used as the target
function randomTargetColor(numberOfColors) {
  var goalIndex = Math.floor(Math.random() * Math.floor(numberOfColors - 1));

  return goalIndex;
}

function checkMatch() {
    if (numberOfLives <= 0)
      messageDisplay.textContent = "You have failed";
    else
    {
      if (this.style.backgroundColor === goalColor) {
        changeColors(this.style.backgroundColor);
        messageDisplay.textContent = "Correct!";
        header.style.backgroundColor = goalColor;
        headerColor = goalColor;
      }
      else {
        numberOfLives--;       
        this.style.backgroundColor = "#232323";
    
        messageDisplay.textContent = numberOfLives + " Tries left"; 
      }
    }
}

function setGame(numberOfColors) {
  colors = randomColors(numberOfColors);
  goalColor = colors[randomTargetColor(numberOfColors)];

  for (var i = 0; i < numberOfColors; i++) {
    squares[i].style.backgroundColor = colors[i];
  
    squares[i].addEventListener("click", checkMatch)
  }

}

function resetGame(numberOfColors) {

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].removeEventListener("click", checkMatch);
    
  }
  
  colors = randomColors(numberOfColors);
  goalColor = colors[randomTargetColor(numberOfColors)];

  header.textContent = "Guess " + goalColor;

  resetButton.textContent = "New Colors";

  messageDisplay.textContent = "";

  headerColor = "#232323";
  header.style.backgroundColor = headerColor;

  numberOfLives = 3;

  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].getAttribute("class") != "selected") {
      buttons[i].style.backgroundColor = "white";
      buttons[i].style.color = "black";
    }
  }
  

  setGame(numberOfColors);

}

var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#messageDisplay");
var header = document.querySelector("h1");

var numberOfLives = 3;

var buttons = document.querySelectorAll("button");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");

var numberOfColors = squares.length;
var colors = randomColors(numberOfColors);
var goalColor = colors[randomTargetColor(numberOfColors)];

var headerColor = "#232323";
header.style.backgroundColor = headerColor;

resetButton.addEventListener("click", function() {
  resetGame(numberOfColors);
});

easyButton.addEventListener("click", function() {
  easyButton.classList.add("selected");
  hardButton.classList.remove("selected");

  squares[3].style.display = "none";
  squares[4].style.display = "none";
  squares[5].style.display = "none";

  numberOfColors = 3;
  resetGame(numberOfColors);
});

hardButton.addEventListener("click", function() {
  hardButton.classList.add("selected");
  easyButton.classList.remove("selected");

  squares[3].style.display = "block";
  squares[4].style.display = "block";
  squares[5].style.display = "block";
  
  numberOfColors = 6;
  resetGame(numberOfColors);
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("mouseover", function() {
    this.style.backgroundColor = headerColor;
    this.style.color = "white";
  });

  buttons[i].addEventListener("mouseout", function() {
    if (this.getAttribute("class") != "selected") {
      this.style.backgroundColor = "white";
      this.style.color = "black";
    }
  });
}

setGame(numberOfColors);

header.textContent = "Guess " + goalColor;