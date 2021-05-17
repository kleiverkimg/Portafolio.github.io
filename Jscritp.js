function World(width, height) {
  this.width = width || 300;
  this.height = height || 300;
  this.balls = [];
  
  function Ball(x, y, rad) {
    this.x = x || 0;
    this.y = y || 0;
    this.rad = rad || 25;
    this.velX = Math.random() * 3 - Math.random() * 3;
    this.velY = Math.random() * 2.6 - Math.random() * 2.6;
    this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  
  while (this.balls.length < 8) {
    this.balls.push(new Ball(
      Math.random() * this.width,
      Math.random() * this.height,
      Math.random() * 12
    ));
  }
  this.update = function() {
    for (let b in this.balls) {
      let ball = this.balls[b];
      if (ball.x < 0 || ball.x > width) {        
        ball.velX = -ball.velX;
      }
      if (ball.y < 0 || ball.y > height) {
        ball.velY = -ball.velY;
      }
      ball.x += ball.velX;
      ball.y += ball.velY;
    }
  };
}
  
let world = new World(window.innerWidth, window.innerHeight),
  canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');
canvas.width = world.width;
canvas.height = world.height;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    
  for (let b in world.balls) {
    let ball = world.balls[b];
    ctx.fillStyle = ball.color;
      
    ctx.beginPath();
    ctx.arc(
      ball.x, 
      ball.y, 
      ball.rad, 
      0,
      2 * Math.PI 
    );
    ctx.fill();
  }
}
  
function animate() {
  world.update();
  draw();
  requestAnimationFrame(animate);
}
  
animate();

window.addEventListener("scroll", function(){
  let serv = document.getElementById("animar");
  let position = serv.getBoundingClientRect().top;
  console.log(position);
  if (position < 800) {    
    serv.style.animation= "aparecer 1.5s ease-out";
    serv.style.transform= "translate(0%)";
  }
  if (position > 800) {    
    serv.style.animation= "desaparecer 1s ease-out";  
    serv.style.transform= "translate(150%)";      
  }
})