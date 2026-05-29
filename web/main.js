const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d", { alpha: false });
const uiLayer = document.getElementById("ui-layer");
const titleScreen = document.getElementById("title-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const preloader = document.getElementById("preloader");
const statTotal = document.getElementById("stat-total");
const statHit = document.getElementById("stat-hit");
const statMissed = document.getElementById("stat-missed");

// Handle resize
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const KEYS = {
  ArrowLeft: false,
  ArrowUp: false,
  ArrowRight: false,
  ArrowDown: false,
  Space: false,
};

window.addEventListener("keydown", (e) => {
  if (KEYS.hasOwnProperty(e.code)) KEYS[e.code] = true;
  if (e.code === "Enter") handleEnter();
  if (e.code === "Escape") handleEsc();
  if (
    e.code === "Space" &&
    gameState === "playing" &&
    !player.blast &&
    !e.repeat
  ) {
    player.shoot();
  }
});

window.addEventListener("keyup", (e) => {
  if (KEYS.hasOwnProperty(e.code)) KEYS[e.code] = false;
});

// Assets Management
const images = {
  player: [],
  enemy: [],
  bullet: null,
  explode: [],
  big_explode: [],
  bg: null,
};

let assetsLoaded = 0;
const totalAssets = 5 + 2 + 1 + 16 + 16 + 1; // 41 assets

function onAssetLoaded() {
  assetsLoaded++;
  if (assetsLoaded === totalAssets) {
    preloader.style.display = "none";
    initGame();
  }
}

function loadImg(src) {
  const img = new Image();
  img.src = src;
  img.onload = onAssetLoaded;
  return img;
}

// Start loading
for (let i = 0; i < 5; i++)
  images.player.push(loadImg(`/assets/player_${i}.png`));
for (let i = 0; i < 2; i++)
  images.enemy.push(loadImg(`/assets/enemy_${i}.png`));
images.bullet = loadImg("/assets/bullet.png");
for (let i = 0; i < 16; i++)
  images.explode.push(loadImg(`/assets/explode_${i}.png`));
for (let i = 0; i < 16; i++)
  images.big_explode.push(loadImg(`/assets/big_explode_${i}.png`));
images.bg = loadImg("/assets/Mountain.jpg");

// Game State
let gameState = "title"; // title, playing, gameover
let gameLoopId;
let bgX = 0;

const player = {
  x: 0,
  y: 0,
  width: 130,
  height: 55,
  frame: 0,
  dontShow: false,
  dontMove: false,
  blast: false,
  blastFrame: 0,
  bulletFrame: 0,
  shoot: function () {
    if (bullets.length < 20) {
      bullets.push({
        x: this.x + 100,
        y: this.y + 45,
        width: 50,
        height: 20,
      });
    }
  },
};

let enemies = [];
let bullets = [];
let explosions = [];
let enemySpawnTimer = 0;
let stats = { total: 0, hit: 0 };

function initGame() {
  gameState = "title";
  titleScreen.classList.remove("hidden");
  gameOverScreen.classList.add("hidden");
  gameLoopId = requestAnimationFrame(gameLoop);
}

function startGame() {
  gameState = "playing";
  titleScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");

  player.x = 50;
  player.y = canvas.height / 2;
  player.dontShow = false;
  player.dontMove = false;
  player.blast = false;
  player.blastFrame = 0;
  player.bulletFrame = 0;
  player.frame = 1;

  enemies = [];
  bullets = [];
  explosions = [];
  stats = { total: 0, hit: 0 };
}

function handleEnter() {
  if (gameState === "title" || gameState === "gameover") {
    startGame();
  }
}

function handleEsc() {
  if (gameState === "gameover") {
    gameState = "title";
    gameOverScreen.classList.add("hidden");
    titleScreen.classList.remove("hidden");
  }
}

function gameLoop() {
  //keep shooting if space is pressed
  if (KEYS.Space === true && player.bulletFrame >= 5) {
    player.bulletFrame = 0;
    player.shoot();
  } else {
    player.bulletFrame += 1;
  }
  update();
  render();
  gameLoopId = requestAnimationFrame(gameLoop);
}

function spawnEnemy() {
  if (enemies.length < 10) {
    stats.total++;
    enemies.push({
      x: canvas.width,
      y: Math.random() * (canvas.height - 100) + 50,
      width: 75,
      height: 34,
      frame: 0,
    });
  }
}

function update() {
  if (gameState !== "playing") return;

  // Parallax background
  bgX -= 2;
  if (bgX <= -images.bg.width) bgX = 0;

  // Player movement
  if (!player.dontMove) {
    if (KEYS.ArrowLeft) player.x -= 7;
    if (KEYS.ArrowUp) player.y -= 7;
    if (KEYS.ArrowRight) player.x += 7;
    if (KEYS.ArrowDown) player.y += 7;

    // clamp to screen
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

    // Animation
    player.frame += 0.2;
    if (player.frame >= 4) player.frame = 1; // frames 1-4 used in VB6 usually, 0 is idle/static. We have 5 images.
  }

  // Bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    let b = bullets[i];
    b.x += 50; // fast bullet
    if (b.x > canvas.width) {
      bullets.splice(i, 1);
    }
  }

  // Enemy Spawn (Timer based - approx every ~60 frames)
  enemySpawnTimer++;
  if (enemySpawnTimer > 10) {
    enemySpawnTimer = 0;
    spawnEnemy();
  }

  // Enemies
  for (let i = enemies.length - 1; i >= 0; i--) {
    let e = enemies[i];
    e.x -= 10;
    e.frame += 0.15;
    if (e.frame >= 2) e.frame = 0;

    if (e.x + e.width < 0) {
      enemies.splice(i, 1);
      continue;
    }

    // Collision with Player
    if (!player.dontMove && !player.blast) {
      if (
        e.x < player.x + 110 &&
        e.x > player.x &&
        e.y > player.y - 10 &&
        e.y < player.y + 55
      ) {
        player.blast = true;
        player.dontMove = true;
        enemies.splice(i, 1);
        continue;
      }
    }

    // Collision with Bullet
    let hit = false;
    for (let j = bullets.length - 1; j >= 0; j--) {
      let b = bullets[j];
      if (
        b.x > e.x &&
        b.x < e.x + e.width &&
        b.y < e.y + e.height &&
        b.y > e.y
      ) {
        // Boom
        stats.hit++;
        explosions.push({ x: e.x, y: e.y - 25, frame: 0, type: "small" });
        bullets.splice(j, 1);
        enemies.splice(i, 1);
        hit = true;
        break;
      }
    }
  }

  // Explosions
  for (let i = explosions.length - 1; i >= 0; i--) {
    let ex = explosions[i];
    ex.frame += 0.5;
    if (ex.frame >= 16) {
      explosions.splice(i, 1);
    }
  }

  // Player Blast
  if (player.blast) {
    player.blastFrame += 0.5;
    if (player.blastFrame >= 12) {
      player.dontShow = true;
    }
    if (player.blastFrame >= 16 && gameState === "playing") {
      // Game Over transition
      player.blast = false;
      player.x = -200;
      gameState = "gameover";
      statTotal.textContent = `Total : ${stats.total}`;
      statHit.textContent = `Hit : ${stats.hit}`;
      statMissed.textContent = `Missed : ${stats.total - stats.hit}`;
      gameOverScreen.classList.remove("hidden");
    }
  }
}

function render() {
  // Clear
  ctx.fillStyle = "#fff"; // Original was white bg or Mountain.jpg
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (images.bg) {
    // Tile bg
    for (let x = bgX; x < canvas.width; x += images.bg.width) {
      ctx.drawImage(images.bg, x, 0, images.bg.width, canvas.height);
    }
  }

  if (gameState !== "playing") return;

  // Render bullets
  for (let b of bullets) {
    if (images.bullet)
      ctx.drawImage(images.bullet, b.x, b.y, b.width, b.height);
  }

  // Render player
  if (!player.dontShow) {
    let f = Math.floor(player.frame);
    if (images.player[f])
      ctx.drawImage(
        images.player[f],
        player.x,
        player.y,
        player.width,
        player.height,
      );
  }

  // Render enemies
  for (let e of enemies) {
    let f = Math.floor(e.frame);
    if (images.enemy[f])
      ctx.drawImage(images.enemy[f], e.x, e.y, e.width, e.height);
  }

  // Render explosions
  for (let ex of explosions) {
    let f = Math.floor(ex.frame);
    if (images.explode[f]) {
      ctx.drawImage(images.explode[f], ex.x, ex.y);
    }
  }

  // Render Big Blast
  if (player.blast) {
    let f = Math.floor(player.blastFrame);
    if (images.big_explode[f]) {
      // center it roughly on player
      let bx = player.x + 100 - images.big_explode[f].width / 2;
      let by = player.y + 35 - images.big_explode[f].height / 2;
      ctx.drawImage(images.big_explode[f], bx, by);
    }
  }
}
