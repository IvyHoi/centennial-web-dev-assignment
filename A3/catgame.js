
let canvas = document.getElementById("gamePlace");
let gameArea = canvas.getContext("2d");

let background = new Image();
background.src = "bg1.jpeg";  

let cat = new Image();
cat.src = "pic1.png";  
cat.onload = function() {
  gameArea.drawCatImage(cat, cat.x, cat.y, cat.width, cat.height);
}

let catMovement = {
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  width: 100,  
  height: 95  
};

let score = 0;
let interval = 1000;
let speed = interval;

function drawCat() {
  gameArea.clearRect(0, 0, canvas.width, canvas.height);
  gameArea.drawImage(background, 0, 0, canvas.width, canvas.height);
  gameArea.drawImage(cat, catMovement.x, catMovement.y, catMovement.width, catMovement.height);
}

function moveCat() {
  catMovement.x = Math.random() * (canvas.width - catMovement.width);
  catMovement.y = Math.random() * (canvas.height - catMovement.height);
  drawCat();
}

canvas.addEventListener('click', function(e) {
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  if (x > catMovement.x && x < catMovement.x + catMovement.width && y > catMovement.y && y < catMovement.y + catMovement.height) {
    score++;
    moveCat();
    document.getElementById("score").textContent = score;
    speed -= 50;
    clearInterval(game);
    game = setInterval(moveCat, speed);
  }
});

document.getElementById("resetSpeed").addEventListener('click', function() {
  speed = interval;
  clearInterval(game);
  game = setInterval(moveCat, speed);
});

document.getElementById("resetScore").addEventListener('click', function() {
  score = 0;
  document.getElementById("score").textContent = score;
});

let game = setInterval(moveCat, speed);
