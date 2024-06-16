const date = new Date();
const year = date.getFullYear();
const newyear = year + 1;
const titleElement = document.getElementById('Title');
const text = 'Happy New Year ' + newyear + '🎉';
const id_description = document.getElementById('description')
const text_description = 'Tahun '+year+' adalah tahun yang penuh plot twist, penuh pelajaran, penuh rasa sakit, ada tawa dan air mata. Lalu semua harus diakhiri dengan cara berdamai dengan keadaan. Hiduplah sebaik mungkin seberat apapun badainya, karena setelah badai akan datang sebuah pelangi yang indah.'

function typeWriter(element, text) {
    let index = 0;

    function typing() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typing, 100);
        }
    }

    typing();
}

const audio = document.getElementById('myAudio');

window.addEventListener('beforeunload', () => {
  localStorage.setItem('audioTime', audio.currentTime);
});

window.addEventListener('load', () => {
  const savedTime = localStorage.getItem('audioTime');
  if (savedTime) {
    audio.currentTime = savedTime;
    audio.play();
  } else {
    audio.play();
  }
});

typeWriter(titleElement, text);
function delayTypeWriter(id_description, text_description, delay) {
    setTimeout(() => {
      typeWriter(id_description, text_description);
    }, delay);
  }
  delayTypeWriter(id_description, text_description, 3000);

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let fireworks = [];
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


//fireworks from frontendcharm
window.addEventListener("resize", resizeCanvas, false);

class Firework {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.sx = Math.random() * 3 - 1.5;
    this.sy = Math.random() * -3 - 3;
    this.size = Math.random() * 2 + 1;
    this.shouldExplode = false;

    const colorVal = Math.round(0xffffff * Math.random());
    [this.r, this.g, this.b] = [colorVal >> 16, (colorVal >> 8) & 255, colorVal & 255];
  }

  update() {
    this.shouldExplode = this.sy >= -2 || this.y <= 100 || this.x <= 0 || this.x >= canvas.width;
    this.sy += this.shouldExplode ? 0 : 0.01;
    this.x += this.sx;
    this.y += this.sy;
  }

  draw() {
    ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Particle {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.sx = Math.random() * 3 - 1.5;
    this.sy = Math.random() * 3 - 1.5;
    this.size = Math.random() * 2 + 1;
    this.life = 100;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  update() {
    this.x += this.sx;
    this.y += this.sy;
    this.life -= 1;
  }

  draw() {
    ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.life / 100})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createFirework() {
  if (Math.random() < 0.05) {
    fireworks.push(new Firework());
  }
}

function updateFireworks() {
  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();

    if (firework.shouldExplode) {
      for (let j = 0; j < 50; j++) {
        particles.push(new Particle(firework.x, firework.y, firework.r, firework.g, firework.b));
      }
      fireworks.splice(index, 1);
    }
  });
}

function updateParticles() {
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();

    if (particle.life <= 0) {
      particles.splice(index, 1);
    }
  });
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  createFirework();
  updateFireworks();
  updateParticles();
  
  requestAnimationFrame(animate);
}

function init() {
  for (let i = 0; i < 5; i++) {
    fireworks.push(new Firework());
  }
  animate();
}

init();