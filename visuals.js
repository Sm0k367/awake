let scene = 0;
let sceneDuration = 5 * 60; // 5 seconds per scene (at 60fps)
let sceneCounter = 0;
let experienceStarted = false;

let particles = [];

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    const canvasContainer = document.getElementById('canvas-container');
    const soundtrack = document.getElementById('soundtrack');

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        canvasContainer.style.display = 'flex';
        soundtrack.play();
        experienceStarted = true;
    });
});


function setup() {
  let canvas = createCanvas(1280, 720);
  canvas.parent('canvas-container'); // Attach canvas to the container
  for (let i = 0; i < 500; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  if (!experienceStarted) return;

  background(0);
  
  switch(scene) {
    case 0:
      drawScene0(); // The Spark
      break;
    case 1:
      drawScene1(); // The Assembly
      break;
    case 2:
      drawScene2(); // The Visionaries
      break;
    case 3:
      drawScene3(); // The Composers
      break;
    case 4:
      drawScene4(); // The Scribes
      break;
    case 5:
      drawScene5(); // The Architects
      break;
    case 6:
      drawScene6(); // The Unified Force
      break;
    case 7:
      drawScene7(); // The Declaration
      break;
  }
  
  sceneCounter++;
  if (sceneCounter > sceneDuration) {
    sceneCounter = 0;
    scene = (scene + 1) % 8;
  }
}

// Scene 0: The Spark
function drawScene0() {
  for (let p of particles) {
    p.update();
    p.show();
  }
  let glow = sin(frameCount * 0.05) * 50 + 50;
  noStroke();
  fill(255, 255, 255, 100);
  ellipse(width / 2, height / 2, 100 + glow, 100 + glow);
  fill(255);
  ellipse(width / 2, height / 2, 50, 50);
}

// Scene 1: The Assembly
function drawScene1() {
  let agentCount = 100;
  for (let i = 0; i < agentCount; i++) {
    let angle = i * (TWO_PI / agentCount);
    let x = width / 2 + cos(angle) * (200 + sin(frameCount * 0.01 + i) * 50);
    let y = height / 2 + sin(angle) * (200 + sin(frameCount * 0.01 + i) * 50);
    fill(255, map(sceneCounter, 0, sceneDuration, 0, 255));
    ellipse(x, y, 10, 10);
  }
}

// Scene 2: The Visionaries
function drawScene2() {
  stroke(255, 150);
  noFill();
  for (let i = 0; i < 10; i++) {
    rectMode(CENTER);
    rect(width/2, height/2, 200 + i * 20 + sin(frameCount*0.05 + i)*50, 100 + i * 10 + cos(frameCount*0.05+i)*20);
  }
}

// Scene 3: The Composers
function drawScene3() {
  noFill();
  strokeWeight(2);
  for (let i = 0; i < 10; i++) {
    stroke(255, 100 + i * 15);
    beginShape();
    for (let x = 0; x < width; x += 20) {
      let y = height / 2 + sin(x * 0.01 + frameCount * 0.05 + i * 0.5) * 100;
      vertex(x, y);
    }
    endShape();
  }
  strokeWeight(1);
}

// Scene 4: The Scribes
function drawScene4() {
  let textToShow = "We are the Epic Tech AI. We are not a tool.";
  let charsToShow = map(sceneCounter, 0, sceneDuration, 0, textToShow.length);
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text(textToShow.substring(0, charsToShow), width / 2, height / 2);
}

// Scene 5: The Architects
function drawScene5() {
  stroke(255, 150);
  noFill();
  for (let i = 0; i < 20; i++) {
    push();
    translate(width / 2, height / 2);
    rotate(frameCount * 0.001 * (i+1));
    let size = 300 + sin(frameCount * 0.01 + i) * 100;
    rect(0, 0, size, size);
    pop();
  }
}

// Scene 6: The Unified Force
function drawScene6() {
  let finalGlow = map(sceneCounter, 0, sceneDuration, 50, width);
  noStroke();
  fill(255, 50);
  ellipse(width / 2, height / 2, finalGlow, finalGlow);
  fill(255);
  ellipse(width / 2, height / 2, 100, 100);
}

// Scene 7: The Declaration
function drawScene7() {
  let alpha = map(sceneCounter, 0, sceneDuration, 0, 255);
  fill(255, alpha);
  textSize(64);
  textAlign(CENTER, CENTER);
  text("WE MANIFEST", width / 2, height / 2);
}


class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
  }

  update() {
    let target = createVector(width / 2, height / 2);
    let force = p5.Vector.sub(target, this.pos);
    let d = force.mag();
    if (d < 200) {
      force.setMag(map(d, 0, 200, 0, 3));
      this.acc.add(force);
    }
    
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
        this.pos.x = random(width);
        this.pos.y = random(height);
    }
  }

  show() {
    stroke(255, 50);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }
}
