const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const levelLabel = document.getElementById("levelLabel");
const throwLabel = document.getElementById("throwLabel");
const bestLabel = document.getElementById("bestLabel");
const pointLabel = document.getElementById("pointLabel");
const message = document.getElementById("message");
const resetButton = document.getElementById("resetButton");
const prevLevel = document.getElementById("prevLevel");
const nextLevel = document.getElementById("nextLevel");
const startPanel = document.getElementById("startPanel");
const startForm = document.getElementById("startForm");
const startName = document.getElementById("startName");
const scorePanel = document.getElementById("scorePanel");
const finalScore = document.getElementById("finalScore");
const leaderboardList = document.getElementById("leaderboardList");
const leaderboardNote = document.getElementById("leaderboardNote");
const newRoundButton = document.getElementById("newRoundButton");

const logoImg = new Image();
logoImg.src = "assets/chingones.png";

const SUPABASE_URL = "https://jnkktaqthdcgpxwuslkz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_8rEko1WBoIMWUyeIac2vaw_3Mti8ewT";
const ROUND_SCORE_TABLE = "round_scores";

const levels = [
  {
    start: { x: 92, y: 452 },
    basket: { x: 810, y: 150 },
    par: 2,
    obstacles: [
      { type: "tree", x: 370, y: 230, r: 48 },
      { type: "rock", x: 560, y: 380, r: 42 },
    ],
    wind: { x: 0, y: 0 }
  },
  {
    start: { x: 86, y: 130 },
    basket: { x: 838, y: 430 },
    par: 3,
    obstacles: [
      { type: "tree", x: 285, y: 265, r: 45 },
      { type: "tree", x: 465, y: 180, r: 42 },
      { type: "water", x: 565, y: 348, w: 190, h: 96 },
    ],
    wind: { x: 0.15, y: 0.05 }
  },
  {
    start: { x: 100, y: 458 },
    basket: { x: 805, y: 105 },
    par: 4,
    obstacles: [
      { type: "log", x: 230, y: 255, w: 260, h: 28, angle: -0.42 },
      { type: "tree", x: 510, y: 330, r: 58 },
      { type: "rock", x: 675, y: 205, r: 38 },
      { type: "water", x: 330, y: 405, w: 210, h: 72 },
    ],
    wind: { x: -0.1, y: -0.15 }
  },
  {
    start: { x: 86, y: 290 },
    basket: { x: 846, y: 286 },
    par: 3,
    obstacles: [
      { type: "tree", x: 292, y: 178, r: 42 },
      { type: "tree", x: 292, y: 390, r: 42 },
      { type: "rock", x: 535, y: 286, r: 46 },
      { type: "water", x: 655, y: 122, w: 96, h: 318 },
    ],
    wind: { x: 0, y: 0.25 }
  },
  {
    start: { x: 112, y: 104 },
    basket: { x: 820, y: 452 },
    par: 4,
    obstacles: [
      { type: "water", x: 258, y: 190, w: 210, h: 105 },
      { type: "tree", x: 520, y: 400, r: 50 },
      { type: "log", x: 678, y: 244, w: 220, h: 28, angle: 0.42 },
    ],
    wind: { x: -0.25, y: 0.08 }
  },
  {
    start: { x: 106, y: 460 },
    basket: { x: 842, y: 416 },
    par: 3,
    obstacles: [
      { type: "tree", x: 260, y: 338, r: 44 },
      { type: "rock", x: 420, y: 216, r: 46 },
      { type: "tree", x: 580, y: 338, r: 52 },
      { type: "rock", x: 708, y: 470, r: 35 },
    ],
    wind: { x: 0.18, y: -0.15 }
  },
  {
    start: { x: 120, y: 132 },
    basket: { x: 802, y: 128 },
    par: 4,
    obstacles: [
      { type: "water", x: 230, y: 250, w: 190, h: 150 },
      { type: "water", x: 515, y: 105, w: 108, h: 280 },
      { type: "tree", x: 698, y: 310, r: 48 },
    ],
    wind: { x: -0.35, y: 0 }
  },
  {
    start: { x: 86, y: 286 },
    basket: { x: 850, y: 90 },
    par: 5,
    obstacles: [
      { type: "log", x: 260, y: 210, w: 220, h: 30, angle: -0.2 },
      { type: "tree", x: 415, y: 370, r: 54 },
      { type: "rock", x: 620, y: 205, r: 44 },
      { type: "water", x: 690, y: 330, w: 175, h: 90 },
    ],
    wind: { x: 0.25, y: 0.25 }
  },
  {
    start: { x: 118, y: 454 },
    basket: { x: 480, y: 90 },
    par: 4,
    obstacles: [
      { type: "tree", x: 248, y: 300, r: 46 },
      { type: "water", x: 388, y: 200, w: 210, h: 95 },
      { type: "tree", x: 690, y: 292, r: 55 },
      { type: "rock", x: 766, y: 140, r: 36 },
    ],
    wind: { x: 0, y: -0.4 }
  },
  {
    start: { x: 88, y: 92 },
    basket: { x: 850, y: 462 },
    par: 5,
    obstacles: [
      { type: "tree", x: 230, y: 206, r: 42 },
      { type: "log", x: 400, y: 328, w: 260, h: 30, angle: 0.25 },
      { type: "water", x: 600, y: 84, w: 120, h: 275 },
      { type: "rock", x: 742, y: 392, r: 40 },
    ],
    wind: { x: -0.25, y: 0.25 }
  },
  {
    start: { x: 100, y: 280 },
    basket: { x: 820, y: 280 },
    par: 3,
    obstacles: [
      { type: "sand", x: 740, y: 280, rx: 75, ry: 50 },
      { type: "tree", x: 420, y: 170, r: 45 },
      { type: "tree", x: 420, y: 390, r: 45 },
    ],
    wind: { x: 0.35, y: -0.15 }
  },
  {
    start: { x: 90, y: 450 },
    basket: { x: 840, y: 120 },
    par: 4,
    obstacles: [
      { type: "water", x: 260, y: 180, w: 420, h: 200 },
      { type: "bush", x: 200, y: 310, r: 42 },
      { type: "bush", x: 720, y: 250, r: 42 },
      { type: "sand", x: 800, y: 190, rx: 55, ry: 40 }
    ],
    wind: { x: -0.45, y: -0.25 }
  },
  {
    start: { x: 100, y: 120 },
    basket: { x: 850, y: 450 },
    par: 4,
    obstacles: [
      { type: "log", x: 350, y: 220, w: 220, h: 28, angle: 0.3 },
      { type: "log", x: 600, y: 320, w: 220, h: 28, angle: -0.3 },
      { type: "sand", x: 480, y: 400, rx: 65, ry: 45 },
      { type: "sand", x: 720, y: 160, rx: 55, ry: 40 },
    ],
    wind: { x: 0.55, y: 0.45 }
  },
  {
    start: { x: 100, y: 460 },
    basket: { x: 840, y: 130 },
    par: 4,
    obstacles: [
      { type: "bush", x: 300, y: 360, r: 52 },
      { type: "bush", x: 500, y: 210, r: 52 },
      { type: "rock", x: 300, y: 180, r: 40 },
      { type: "rock", x: 680, y: 350, r: 42 },
      { type: "tree", x: 520, y: 410, r: 44 }
    ],
    wind: { x: -0.35, y: 0.55 }
  },
  {
    start: { x: 80, y: 100 },
    basket: { x: 880, y: 480 },
    par: 5,
    obstacles: [
      { type: "water", x: 320, y: 80, w: 120, h: 280 },
      { type: "log", x: 220, y: 360, w: 180, h: 30, angle: 0.1 },
      { type: "tree", x: 520, y: 160, r: 50 },
      { type: "tree", x: 520, y: 380, r: 50 },
      { type: "sand", x: 780, y: 450, rx: 80, ry: 50 },
      { type: "bush", x: 720, y: 350, r: 35 },
      { type: "bush", x: 860, y: 380, r: 35 },
      { type: "rock", x: 680, y: 180, r: 38 }
    ],
    wind: { x: -0.65, y: 0.35 }
  }
];

const state = {
  level: 0,
  throws: 0,
  totalThrows: 0,
  points: 0,
  holesCompleted: 0,
  holeScores: [],
  practiceMode: false,
  best: JSON.parse(localStorage.getItem("mono-discgolf-best") || "{}"),
  disc: { x: 0, y: 0, vx: 0, vy: 0, r: 10, z: 0, vz: 0, airborne: false, moving: false },
  player: { x: 0, y: 0 },
  wind: { x: 0, y: 0 },
  aim: null,
  won: false,
  gameOver: false,
  scoreSaved: false,
  started: false,
  playerName: "",
  particles: [],
};

function currentLevel() {
  return levels[state.level];
}

function resetLevel(keepMessage = false) {
  const level = currentLevel();
  state.throws = 0;
  state.disc.x = level.start.x;
  state.disc.y = level.start.y;
  state.disc.vx = 0;
  state.disc.vy = 0;
  state.disc.z = 0;
  state.disc.vz = 0;
  state.disc.airborne = false;
  state.disc.moving = false;
  state.player.x = level.start.x;
  state.player.y = level.start.y;
  state.aim = null;
  state.won = false;
  state.gameOver = false;
  state.scoreSaved = false;
  state.particles = [];
  scorePanel.hidden = true;

  if (level.wind) {
    state.wind.x = level.wind.x;
    state.wind.y = level.wind.y;
  } else {
    state.wind.x = 0;
    state.wind.y = 0;
  }

  if (!keepMessage) {
    message.textContent = `Par ${level.par}: drag from the player and release.`;
  }
  updateHud();
}

function resetRound() {
  state.level = 0;
  state.totalThrows = 0;
  state.points = 0;
  state.holesCompleted = 0;
  state.holeScores = [];
  state.practiceMode = false;
  resetLevel(true);
  message.textContent = "Drag from the player and release to throw.";
}

function updateHud() {
  const key = String(state.level);
  levelLabel.textContent = state.level + 1;
  throwLabel.textContent = state.throws;
  bestLabel.textContent = state.best[key] ? state.best[key] : "-";
  pointLabel.textContent = state.holesCompleted;
}

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * canvas.width,
    y: ((event.clientY - rect.top) / rect.height) * canvas.height,
  };
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function launchDisc(from, to) {
  const dx = from.x - to.x;
  const dy = from.y - to.y;
  const power = clamp(Math.hypot(dx, dy), 0, 180);
  if (power < 12) return;
  const speed = power * 0.11;
  const angle = Math.atan2(dy, dx);
  state.disc.vx = Math.cos(angle) * speed;
  state.disc.vy = Math.sin(angle) * speed;
  state.disc.z = 12;
  state.disc.vz = power * 0.015;
  state.disc.airborne = true;
  state.disc.moving = true;
  state.throws += 1;
  state.aim = null;
  message.textContent = "Nice throw!";
  updateHud();
}

function hitCircle(obstacle) {
  const disc = state.disc;
  const dx = disc.x - obstacle.x;
  const dy = disc.y - obstacle.y;
  const minDist = disc.r + obstacle.r;
  const dist = Math.hypot(dx, dy);
  if (dist >= minDist || dist === 0) return;

  if (obstacle.type === "tree") {
    const nx = dx / dist;
    const ny = dy / dist;
    disc.x = obstacle.x + nx * minDist;
    disc.y = obstacle.y + ny * minDist;
    const dot = disc.vx * nx + disc.vy * ny;
    
    disc.vx = (disc.vx - 2 * dot * nx) * 0.06;
    disc.vy = (disc.vy - 2 * dot * ny) * 0.06;
    disc.z = 0;
    disc.vz = 0;
    disc.airborne = false;
    message.textContent = "Hit a tree! Dropped to the ground.";

    for (let i = 0; i < 10; i++) {
      state.particles.push({
        x: disc.x + (Math.random() - 0.5) * 16,
        y: disc.y - disc.z + (Math.random() - 0.5) * 16,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3 + 0.6,
        life: 20 + Math.random() * 15,
        color: "#276749",
        applyGravity: true
      });
    }
  } else if (obstacle.type === "rock") {
    if (disc.z > 18) return;

    const nx = dx / dist;
    const ny = dy / dist;
    disc.x = obstacle.x + nx * minDist;
    disc.y = obstacle.y + ny * minDist;
    const dot = disc.vx * nx + disc.vy * ny;
    disc.vx = (disc.vx - 2 * dot * nx) * 0.45;
    disc.vy = (disc.vy - 2 * dot * ny) * 0.45;
    disc.z = Math.max(0, disc.z * 0.2);
    disc.vz = 0;
    message.textContent = "Bounced off a rock.";
  }
}

function hitWater(obstacle) {
  const disc = state.disc;
  if (disc.z > 0) return;

  if (
    disc.x > obstacle.x &&
    disc.x < obstacle.x + obstacle.w &&
    disc.y > obstacle.y &&
    disc.y < obstacle.y + obstacle.h
  ) {
    const level = currentLevel();

    for (let i = 0; i < 16; i++) {
      state.particles.push({
        x: disc.x + (Math.random() - 0.5) * 12,
        y: disc.y,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 3 - 1.5,
        life: 18 + Math.random() * 14,
        color: "#4ea8de",
        applyGravity: true
      });
    }

    disc.x = level.start.x;
    disc.y = level.start.y;
    disc.vx = 0;
    disc.vy = 0;
    disc.z = 0;
    disc.vz = 0;
    disc.moving = false;
    disc.airborne = false;
    message.textContent = "Splash! Out of bounds. Back to the tee.";
  }
}

function hitLog(obstacle) {
  const disc = state.disc;
  if (disc.z > 12) return;

  const cos = Math.cos(-obstacle.angle);
  const sin = Math.sin(-obstacle.angle);
  const rx = disc.x - obstacle.x;
  const ry = disc.y - obstacle.y;
  const localX = rx * cos - ry * sin;
  const localY = rx * sin + ry * cos;
  const halfW = obstacle.w / 2;
  const halfH = obstacle.h / 2;

  if (Math.abs(localX) > halfW + disc.r || Math.abs(localY) > halfH + disc.r) return;

  const nx = Math.abs(localX / halfW) > Math.abs(localY / halfH) ? Math.sign(localX) : 0;
  const ny = nx === 0 ? Math.sign(localY) : 0;
  const worldNx = nx * Math.cos(obstacle.angle) - ny * Math.sin(obstacle.angle);
  const worldNy = nx * Math.sin(obstacle.angle) + ny * Math.cos(obstacle.angle);
  const dot = disc.vx * worldNx + disc.vy * worldNy;
  disc.vx = (disc.vx - 2 * dot * worldNx) * 0.42;
  disc.vy = (disc.vy - 2 * dot * worldNy) * 0.42;
  disc.x += worldNx * 7;
  disc.y += worldNy * 7;
  disc.z = Math.max(0, disc.z * 0.2);
  disc.vz = 0;
  message.textContent = "Deflected off a log.";
}

function isFinalHole() {
  return state.level === levels.length - 1;
}

function isRoundComplete() {
  return !state.practiceMode && state.holesCompleted >= levels.length && isFinalHole();
}

function supabaseReady() {
  return SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;
}

function localScores() {
  try {
    return JSON.parse(localStorage.getItem("chingones-round-score-fallback") || "[]").map((score) => ({
      ...score,
      created_at: score.created_at || "9999-12-31T23:59:59.000Z",
    }));
  } catch (error) {
    return [];
  }
}

function saveLocalScore(score) {
  const scores = localScores()
    .concat(score)
    .sort((a, b) => a.throws - b.throws || a.created_at.localeCompare(b.created_at))
    .slice(0, 25);
  localStorage.setItem("chingones-round-score-fallback", JSON.stringify(scores));
  return scores;
}

function playerRank(scores, playerScore) {
  const sortedScores = scores
    .slice()
    .sort((a, b) => a.throws - b.throws || a.created_at.localeCompare(b.created_at));
  return sortedScores.findIndex((score) => score.created_at === playerScore.created_at && score.name === playerScore.name) + 1;
}

function renderLeaderboard(scores, note = "", playerScore = null) {
  leaderboardList.innerHTML = "";
  if (leaderboardNote) {
    if (note) {
      leaderboardNote.textContent = note;
      leaderboardNote.hidden = false;
    } else {
      leaderboardNote.textContent = "";
      leaderboardNote.hidden = true;
    }
  }
  if (!scores.length) {
    const item = document.createElement("li");
    item.textContent = supabaseReady() ? "No scores yet." : "Connect Supabase to show global scores.";
    leaderboardList.appendChild(item);
    return;
  }
  const sortedScores = scores
    .slice()
    .sort((a, b) => a.throws - b.throws || a.created_at.localeCompare(b.created_at))
    .slice(0, 10);

  sortedScores.forEach((score, index) => {
    const item = document.createElement("li");
    const marker = playerScore && score.created_at === playerScore.created_at && score.name === playerScore.name ? " (you)" : "";
    item.textContent = `#${index + 1} ${score.name} - ${score.throws} throws${marker}`;
    leaderboardList.appendChild(item);
  });
}

async function loadLeaderboard(playerScore = null) {
  if (!supabaseReady()) {
    renderLeaderboard(localScores(), "Local scores only for now.", playerScore);
    return;
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/${ROUND_SCORE_TABLE}?select=name,throws,created_at&order=throws.asc,created_at.asc&limit=100`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );
    if (!response.ok) throw new Error("Leaderboard request failed");
    renderLeaderboard(await response.json(), "", playerScore);
  } catch (error) {
    renderLeaderboard(localScores(), "Global leaderboard is unavailable.", playerScore);
  }
}

async function saveRoundScore() {
  const score = {
    name: state.playerName,
    throws: state.totalThrows,
    holes: levels.length,
    created_at: new Date().toISOString(),
  };

  if (!supabaseReady()) {
    const scores = saveLocalScore(score);
    return { score, rank: playerRank(scores, score), savedOnline: false };
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${ROUND_SCORE_TABLE}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(score),
  });

  if (!response.ok) throw new Error("Score save failed");
  const scoresResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/${ROUND_SCORE_TABLE}?select=name,throws,created_at&order=throws.asc,created_at.asc&limit=100`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    },
  );
  if (!scoresResponse.ok) throw new Error("Leaderboard request failed");
  const scores = await scoresResponse.json();
  renderLeaderboard(scores, "", score);
  return { score, rank: playerRank(scores, score), savedOnline: true };
}

async function showFinalScore() {
  state.gameOver = true;
  scorePanel.hidden = false;
  finalScore.textContent = `${state.playerName}, you finished in ${state.totalThrows} throws. Saving score...`;
  try {
    const result = await saveRoundScore();
    finalScore.textContent = `${state.playerName}, you finished in ${state.totalThrows} throws. You are in place #${result.rank}.`;
    if (!result.savedOnline) renderLeaderboard(localScores(), "Local scores only for now.", result.score);
  } catch (error) {
    const score = {
      name: state.playerName,
      throws: state.totalThrows,
      holes: levels.length,
      created_at: new Date().toISOString(),
    };
    const scores = saveLocalScore(score);
    finalScore.textContent = `${state.playerName}, you finished in ${state.totalThrows} throws. Online save failed, local place #${playerRank(scores, score)}.`;
    renderLeaderboard(scores, "Could not save online. Check Supabase settings.", score);
  }
}

function completeLevel() {
  const basket = currentLevel().basket;
  state.disc.vx = 0;
  state.disc.vy = 0;
  state.disc.z = 0;
  state.disc.vz = 0;
  state.disc.moving = false;
  state.disc.airborne = false;
  state.won = true;
  state.points += 1;
  state.totalThrows += state.throws;
  state.holesCompleted += 1;
  state.holeScores[state.level] = state.throws;
  const key = String(state.level);
  if (!state.best[key] || state.throws < state.best[key]) {
    state.best[key] = state.throws;
    localStorage.setItem("mono-discgolf-best", JSON.stringify(state.best));
  }
  if (state.practiceMode) {
    message.textContent = `Practice basket! Hole ${state.level + 1} finished in ${state.throws}. Tap to try the next hole.`;
  } else {
    message.textContent = `Basket! +1 point. Hole ${state.level + 1} finished in ${state.throws}.`;
  }
  updateHud();
  burst(basket.x, basket.y);
  if (isRoundComplete()) showFinalScore();
}

function checkBasket() {
  if (state.won) return;
  const basket = currentLevel().basket;
  const dx = state.disc.x - basket.x;
  const dy = state.disc.y - basket.y;
  const dist = Math.hypot(dx, dy);

  const hitChains = dist <= 22 && state.disc.z >= 12 && state.disc.z <= 38;
  if (hitChains) {
    completeLevel();
    return;
  }

  const hitTopBand = dist <= 24 && state.disc.z > 38 && state.disc.z <= 48;
  const hitTray = dist <= 28 && state.disc.z > 2 && state.disc.z < 12;
  const hitPole = dist <= state.disc.r + 3 && state.disc.z <= 12;

  if (hitTopBand || hitTray || hitPole) {
    state.disc.vx *= -0.58;
    state.disc.vy *= -0.58;
    state.disc.x += Math.sign(dx || state.disc.vx || 1) * 5;
    state.disc.y += Math.sign(dy || state.disc.vy || 1) * 5;
    state.disc.z = Math.max(0, state.disc.z * 0.3);
    state.disc.vz = 0;
    message.textContent = "Clank! Hit the basket structure.";
  }
}

function burst(x, y) {
  state.particles = Array.from({ length: 45 }, () => ({
    x,
    y: y - 10,
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 0.5) * 8 - 2.5,
    life: 45 + Math.random() * 20,
    color: ["#ffd166", "#ef476f", "#06d6a0", "#118ab2", "#f4b942"][Math.floor(Math.random() * 5)],
    applyGravity: true
  }));
}

function update() {
  const disc = state.disc;
  if (disc.moving) {
    if (disc.airborne) {
      disc.vx += state.wind.x * 0.55;
      disc.vy += state.wind.y * 0.55;
      disc.vx *= 0.992;
      disc.vy *= 0.992;
      disc.z += disc.vz;
      disc.vz -= 0.15;

      if (Math.random() < 0.15) {
        state.particles.push({
          x: disc.x,
          y: disc.y - disc.z,
          vx: disc.vx * 0.2 + (Math.random() - 0.5) * 0.8,
          vy: disc.vy * 0.2 + (Math.random() - 0.5) * 0.8,
          life: 15 + Math.random() * 10,
          color: "rgba(255, 255, 255, 0.38)",
          applyGravity: false
        });
      }

      if (disc.z <= 0) {
        disc.z = 0;
        if (disc.vz < -1.5) {
          disc.vz = -disc.vz * 0.18;
        } else {
          disc.vz = 0;
          disc.airborne = false;
        }
      }
    } else {
      let onSand = false;
      const level = currentLevel();
      level.obstacles.forEach((obstacle) => {
        if (obstacle.type === "sand") {
          if (obstacle.shape === "rect") {
            if (disc.x > obstacle.x && disc.x < obstacle.x + obstacle.w &&
                disc.y > obstacle.y && disc.y < obstacle.y + obstacle.h) {
              onSand = true;
            }
          } else {
            const dx = disc.x - obstacle.x;
            const dy = disc.y - obstacle.y;
            if (obstacle.ry) {
              if (Math.pow(dx / obstacle.rx, 2) + Math.pow(dy / obstacle.ry, 2) <= 1) {
                onSand = true;
              }
            } else {
              if (Math.hypot(dx, dy) <= obstacle.r) {
                onSand = true;
              }
            }
          }
        }
      });

      if (onSand) {
        disc.vx *= 0.48;
        disc.vy *= 0.48;
        if (Math.random() < 0.1 && Math.hypot(disc.vx, disc.vy) > 0.5) {
          state.particles.push({
            x: disc.x + (Math.random() - 0.5) * 10,
            y: disc.y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 1.5,
            life: 12 + Math.random() * 8,
            color: "#e2cfa7",
            applyGravity: true
          });
        }
      } else {
        disc.vx *= 0.84;
        disc.vy *= 0.84;
      }
    }

    currentLevel().obstacles.forEach((obstacle) => {
      if (obstacle.type === "bush") {
        const dx = disc.x - obstacle.x;
        const dy = disc.y - obstacle.y;
        if (Math.hypot(dx, dy) <= obstacle.r) {
          if (disc.z < 25) {
            disc.vx *= 0.91;
            disc.vy *= 0.91;
            if (Math.random() < 0.15) {
              state.particles.push({
                x: disc.x + (Math.random() - 0.5) * 8,
                y: disc.y - disc.z + (Math.random() - 0.5) * 8,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                life: 15 + Math.random() * 10,
                color: "#1e4d2b",
                applyGravity: true
              });
            }
          }
        }
      }
    });

    disc.x += disc.vx;
    disc.y += disc.vy;

    if (disc.x < disc.r || disc.x > canvas.width - disc.r) {
      disc.vx *= -0.58;
      disc.x = clamp(disc.x, disc.r, canvas.width - disc.r);
    }
    if (disc.y < disc.r || disc.y > canvas.height - disc.r) {
      disc.vy *= -0.58;
      disc.y = clamp(disc.y, disc.r, canvas.height - disc.r);
    }

    currentLevel().obstacles.forEach((obstacle) => {
      if (obstacle.type === "tree" || obstacle.type === "rock") hitCircle(obstacle);
      if (obstacle.type === "water") hitWater(obstacle);
      if (obstacle.type === "log") hitLog(obstacle);
    });

    checkBasket();
    if (state.won) return;
 
    if (Math.hypot(disc.vx, disc.vy) < 0.13 && !disc.airborne) {
      disc.vx = 0;
      disc.vy = 0;
      disc.moving = false;
      checkBasket();
      if (!state.won) {
        message.textContent = "Drag again for the next throw.";
        state.player.x = disc.x;
        state.player.y = disc.y;
      }
    }
  }

  state.particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    if (particle.applyGravity) {
      particle.vy += 0.12;
    }
    particle.life -= 1;
  });
  state.particles = state.particles.filter((particle) => particle.life > 0);
}

function drawField() {
  ctx.fillStyle = "#166534";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#15803d";
  const stripeWidth = 64;
  for (let x = 0; x < canvas.width; x += stripeWidth * 2) {
    ctx.fillRect(x, 0, stripeWidth, canvas.height);
  }

  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(120 + i * 200, 280 + (i % 2 === 0 ? 50 : -50), 80, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
  ctx.beginPath();
  ctx.ellipse(currentLevel().basket.x, currentLevel().basket.y + 54, 48, 14, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawPlayer(x, y) {
  const level = currentLevel();
  let targetX = level.basket.x;
  let targetY = level.basket.y;
  
  if (state.disc.moving) {
    targetX = state.disc.x;
    targetY = state.disc.y;
  }
  
  let angle = Math.atan2(targetY - y, targetX - x);
  let isAiming = false;
  let pullDistance = 0;
  
  if (state.aim) {
    isAiming = true;
    const dx = state.disc.x - state.aim.x;
    const dy = state.disc.y - state.aim.y;
    angle = Math.atan2(dy, dx);
    pullDistance = clamp(Math.hypot(dx, dy), 0, 180);
  }
  
  let drawX = x;
  let drawY = y;
  
  if (!state.disc.moving && !state.won) {
    drawX = state.disc.x - Math.cos(angle) * 20;
    drawY = state.disc.y - Math.sin(angle) * 20;
  } else {
    drawX = x - Math.cos(angle) * 20;
    drawY = y - Math.sin(angle) * 20;
  }
  
  ctx.save();
  ctx.translate(drawX, drawY);
  ctx.rotate(angle);
  
  // 1. Draw shadow on ground (thinner)
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // 2. Torso / Shoulders (Thinner & athletic top-down view)
  const bodyGrad = ctx.createRadialGradient(-2, 0, 3, 0, 0, 16);
  bodyGrad.addColorStop(0, "#1d4ed8");
  bodyGrad.addColorStop(1, "#1e3a8a");
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, 9, 16, 0, 0, Math.PI * 2); // Thinner width (9 vs 13)
  ctx.fill();
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.8;
  ctx.stroke();
  
  // 3. Left arm (non-throwing)
  ctx.strokeStyle = "#f0b58f";
  ctx.lineWidth = 4.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-4, -12);
  ctx.quadraticCurveTo(4, -14, 8, -9);
  ctx.stroke();
  
  // 4. Right arm (throwing arm)
  ctx.beginPath();
  if (isAiming) {
    const pullFactor = pullDistance / 180;
    const elbowX = -10 * pullFactor;
    const elbowY = 15 * (1 - pullFactor * 0.25);
    const handX = -20 * pullFactor;
    const handY = 10 * (1 - pullFactor * 0.4);
    
    ctx.moveTo(0, 12);
    ctx.lineTo(elbowX, elbowY);
    ctx.lineTo(handX, handY);
    ctx.stroke();
    
    // Draw disc in hand (pull back)
    ctx.fillStyle = "#ff2a6d";
    ctx.beginPath();
    ctx.arc(handX, handY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffd166";
    ctx.lineWidth = 1;
    ctx.stroke();
  } else {
    // Idle holding disc
    ctx.moveTo(0, 12);
    ctx.quadraticCurveTo(10, 13, 12, 8);
    ctx.stroke();
    
    // Only draw disc in hand if it's NOT at the tee (i.e. has been thrown or we are at start)
    const showDiscInHand = !(state.throws === 0 && !state.disc.moving);
    if (showDiscInHand) {
      // Draw disc in hand (ready)
      ctx.fillStyle = "#ff2a6d";
      ctx.beginPath();
      ctx.arc(12, 8, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffd166";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  
  // 5. Head (Slightly smaller to match thin torso)
  ctx.fillStyle = "#f0b58f";
  ctx.beginPath();
  ctx.arc(0, 0, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.8;
  ctx.stroke();
  
  // 6. Cap Dome
  ctx.fillStyle = "#16a34a";
  ctx.beginPath();
  ctx.arc(-1.5, 0, 7.2, 0, Math.PI * 2);
  ctx.fill();
  
  // Cap Visor pointing forward (+x)
  ctx.fillStyle = "#facc15";
  ctx.beginPath();
  ctx.moveTo(2.5, -6);
  ctx.quadraticCurveTo(11, 0, 2.5, 6);
  ctx.lineTo(2.5, -6);
  ctx.fill();

  // Draw two eyes looking forward
  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.arc(2.8, -2.5, 1.2, 0, Math.PI * 2);
  ctx.arc(2.8, 2.5, 1.2, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
}

function drawBasket(basket) {
  ctx.save();
  ctx.translate(basket.x, basket.y);

  // 1. Ground Shadow (slightly offset)
  ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
  ctx.beginPath();
  ctx.ellipse(0, 2, 26, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Base (Heavy cast steel)
  const baseGrad = ctx.createLinearGradient(-15, 0, 15, 0);
  baseGrad.addColorStop(0, "#334155");
  baseGrad.addColorStop(0.5, "#64748b");
  baseGrad.addColorStop(1, "#334155");
  ctx.fillStyle = baseGrad;
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 15, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 3. Central Pole
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 5.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -68); // Extend pole upwards to hold flag
  ctx.stroke();
  
  // Pole Highlight
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-1.2, 0);
  ctx.lineTo(-1.2, -68);
  ctx.stroke();

  // 4. Chains (concentric outer/inner heavy steel chains with link pattern)
  ctx.strokeStyle = "rgba(148, 163, 184, 0.9)";
  ctx.lineWidth = 2.2;
  ctx.setLineDash([4, 3]); // Creates realistic chain link dashes!
  
  // Outer chain loop
  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const topX = cos * 14;
    const topY = -42 + sin * 4.5;
    const botX = cos * 5.5;
    const botY = -14 + sin * 1.8;
    
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.quadraticCurveTo(topX * 0.45, -28, botX, botY);
    ctx.stroke();
  }

  // Inner chain loop (adds depth and realism!)
  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const topX = cos * 8;
    const topY = -42 + sin * 2.5;
    const botX = cos * 3;
    const botY = -14 + sin * 1.0;
    
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.quadraticCurveTo(topX * 0.45, -28, botX, botY);
    ctx.stroke();
  }
  ctx.setLineDash([]); // Reset line dash

  // 5. Professional Red Basket Tray Cage (Chingones Style Red/Yellow contrast)
  // Back rim of tray (rendered behind central elements)
  ctx.strokeStyle = "#b91c1c"; // deep red cage
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, -14, 23, 7.5, 0, Math.PI, 0);
  ctx.stroke();

  // Vertical wire rods
  ctx.strokeStyle = "rgba(185, 28, 28, 0.72)";
  ctx.lineWidth = 1.5;
  for (let x = -20; x <= 20; x += 5) {
    ctx.beginPath();
    ctx.moveTo(x, -14 + (Math.sqrt(23*23 - x*x) / 23) * 2.5);
    ctx.lineTo(x, -4);
    ctx.stroke();
  }

  // Front rim of tray (with metallic red gradient)
  const trayGrad = ctx.createLinearGradient(-23, 0, 23, 0);
  trayGrad.addColorStop(0, "#991b1b");
  trayGrad.addColorStop(0.3, "#dc2626");
  trayGrad.addColorStop(0.5, "#fca5a5"); // white-ish red shine highlight
  trayGrad.addColorStop(0.7, "#dc2626");
  trayGrad.addColorStop(1, "#991b1b");
  
  ctx.strokeStyle = trayGrad;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.ellipse(0, -14, 23, 7.5, 0, 0, Math.PI);
  ctx.stroke();
  
  // Tray solid bottom plate
  ctx.fillStyle = "rgba(51, 65, 85, 0.55)";
  ctx.beginPath();
  ctx.ellipse(0, -4, 19, 5.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 6. Premium Yellow/Gold Top Band (with shiny metallic gradient & reflective highlight)
  const topGrad = ctx.createLinearGradient(-15, 0, 15, 0);
  topGrad.addColorStop(0, "#ca8a04");
  topGrad.addColorStop(0.3, "#eab308");
  topGrad.addColorStop(0.5, "#fef9c3"); // bright yellow reflection shine
  topGrad.addColorStop(0.7, "#eab308");
  topGrad.addColorStop(1, "#ca8a04");
  ctx.fillStyle = topGrad;
  
  ctx.beginPath();
  ctx.ellipse(0, -42, 15, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#ca8a04";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 7. Waving Flag at the top pointing in the direction of the wind
  const windX = state.wind.x;
  const flagDir = windX === 0 ? -1 : Math.sign(windX); // points with wind, default left
  const flagLength = 22;
  const flagHeight = 12;
  const time = performance.now() * 0.009;
  
  ctx.save();
  ctx.fillStyle = "#ef476f"; // vibrant pinkish red
  ctx.strokeStyle = "#9d174d";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, -68);
  
  // Draw waving flag body using sine wave
  for (let i = 0; i <= flagLength; i += 2) {
    const wave = Math.sin(time + i * 0.2) * 2;
    ctx.lineTo(i * flagDir, -68 + wave);
  }
  for (let i = flagLength; i >= 0; i -= 2) {
    const wave = Math.sin(time + i * 0.2) * 2;
    ctx.lineTo(i * flagDir, -68 + flagHeight + wave);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

function drawObstacle(obstacle) {
  if (obstacle.type === "water") {
    ctx.fillStyle = "#0284c7";
    ctx.beginPath();
    ctx.roundRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h, 24);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2;
    for (let y = obstacle.y + 22; y < obstacle.y + obstacle.h; y += 24) {
      ctx.beginPath();
      ctx.moveTo(obstacle.x + 18, y);
      ctx.quadraticCurveTo(obstacle.x + obstacle.w / 2, y + 12, obstacle.x + obstacle.w - 18, y);
      ctx.stroke();
    }
    return;
  }

  if (obstacle.type === "sand") {
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    if (obstacle.ry) {
      ctx.beginPath();
      ctx.ellipse(obstacle.x + 4, obstacle.y + 4, obstacle.rx, obstacle.ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#e2cfa7";
      ctx.beginPath();
      ctx.ellipse(obstacle.x, obstacle.y, obstacle.rx, obstacle.ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#c2af87";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(obstacle.x + 4, obstacle.y + 4, obstacle.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#e2cfa7";
      ctx.beginPath();
      ctx.arc(obstacle.x, obstacle.y, obstacle.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#c2af87";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (obstacle.type === "bush") {
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
    ctx.beginPath();
    ctx.ellipse(obstacle.x, obstacle.y + obstacle.r * 0.45, obstacle.r * 0.9, obstacle.r * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#166534";
    ctx.beginPath();
    ctx.arc(obstacle.x, obstacle.y, obstacle.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#15803d";
    ctx.beginPath();
    ctx.arc(obstacle.x - obstacle.r * 0.2, obstacle.y - obstacle.r * 0.15, obstacle.r * 0.75, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(obstacle.x + obstacle.r * 0.15, obstacle.y - obstacle.r * 0.3, obstacle.r * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  if (obstacle.type === "log") {
    ctx.save();
    ctx.translate(obstacle.x, obstacle.y);
    ctx.rotate(obstacle.angle);
    ctx.fillStyle = "#854d0e";
    ctx.beginPath();
    ctx.roundRect(-obstacle.w / 2, -obstacle.h / 2, obstacle.w, obstacle.h, 12);
    ctx.fill();
    ctx.strokeStyle = "#451a03";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
    return;
  }

  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.ellipse(obstacle.x, obstacle.y + obstacle.r * 0.65, obstacle.r * 0.9, obstacle.r * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();

  if (obstacle.type === "rock") {
    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.moveTo(obstacle.x - obstacle.r, obstacle.y + obstacle.r * 0.35);
    ctx.lineTo(obstacle.x - obstacle.r * 0.6, obstacle.y - obstacle.r * 0.5);
    ctx.lineTo(obstacle.x + obstacle.r * 0.25, obstacle.y - obstacle.r * 0.8);
    ctx.lineTo(obstacle.x + obstacle.r, obstacle.y + obstacle.r * 0.15);
    ctx.lineTo(obstacle.x + obstacle.r * 0.42, obstacle.y + obstacle.r * 0.65);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#94a3b8";
    ctx.beginPath();
    ctx.moveTo(obstacle.x - obstacle.r * 0.6, obstacle.y - obstacle.r * 0.5);
    ctx.lineTo(obstacle.x + obstacle.r * 0.25, obstacle.y - obstacle.r * 0.8);
    ctx.lineTo(obstacle.x + obstacle.r * 0.5, obstacle.y - obstacle.r * 0.15);
    ctx.lineTo(obstacle.x - obstacle.r * 0.1, obstacle.y - obstacle.r * 0.15);
    ctx.closePath();
    ctx.fill();
    return;
  }

  const trunkGrad = ctx.createLinearGradient(obstacle.x - 12, 0, obstacle.x + 12, 0);
  trunkGrad.addColorStop(0, "#451a03");
  trunkGrad.addColorStop(0.5, "#78350f");
  trunkGrad.addColorStop(1, "#451a03");
  ctx.fillStyle = trunkGrad;
  ctx.fillRect(obstacle.x - 12, obstacle.y + 8, 24, obstacle.r * 0.9);

  ctx.fillStyle = "#064e3b";
  ctx.beginPath();
  ctx.arc(obstacle.x, obstacle.y - 12, obstacle.r, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#047857";
  ctx.beginPath();
  ctx.arc(obstacle.x - obstacle.r * 0.15, obstacle.y - 20, obstacle.r * 0.82, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#10b981";
  ctx.beginPath();
  ctx.arc(obstacle.x + obstacle.r * 0.15, obstacle.y - 28, obstacle.r * 0.55, 0, Math.PI * 2);
  ctx.fill();
}

function drawDisc() {
  const disc = state.disc;

  ctx.save();

  // 1. Draw Disc Shadow on the ground (perfect circle shadow, offset to simulate light source)
  ctx.fillStyle = `rgba(0, 0, 0, ${clamp(0.45 - (disc.z * 0.008), 0.1, 0.45)})`;
  ctx.beginPath();
  const shadowRadius = 9 + (disc.z * 0.1);
  ctx.arc(disc.x + disc.z * 0.2, disc.y + 6 + disc.z * 0.3, shadowRadius, 0, Math.PI * 2);
  ctx.fill();

  // 2. Draw actual flying/spinning disc (shifted up by Z, perfect circle)
  ctx.translate(disc.x, disc.y - disc.z);
  
  // Rotate the disc constantly over time
  ctx.rotate(performance.now() * 0.008);
  
  // Glow effect
  ctx.shadowColor = "#ff2a6d";
  ctx.shadowBlur = 10 + disc.z * 0.25;

  // Outer disc edge (Vibrant hot pink plastic)
  ctx.fillStyle = "#ff2a6d";
  ctx.beginPath();
  const discRadius = 10 + (disc.z * 0.08);
  ctx.arc(0, 0, discRadius, 0, Math.PI * 2);
  ctx.fill();

  // Disc inner flight plate rim
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#9d174d";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, discRadius * 0.82, 0, Math.PI * 2);
  ctx.stroke();

  // Draw a visible metallic gold/yellow cross stamp so rotation is extremely obvious!
  ctx.strokeStyle = "#ffd166";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-discRadius * 0.75, 0);
  ctx.lineTo(discRadius * 0.75, 0);
  ctx.moveTo(0, -discRadius * 0.75);
  ctx.lineTo(0, discRadius * 0.75);
  ctx.stroke();
  
  // Center stamp with loaded Chingones logo
  if (logoImg.complete) {
    ctx.save();
    // Clip to the inner stamp diameter
    ctx.beginPath();
    ctx.arc(0, 0, discRadius * 0.62, 0, Math.PI * 2);
    ctx.clip();
    
    // Draw the Chingones logo
    const imgSize = discRadius * 1.25;
    ctx.drawImage(logoImg, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
    ctx.restore();
  } else {
    // Fallback shiny gold metallic stamp in the center if image not loaded yet
    const stampGrad = ctx.createLinearGradient(-3, -3, 3, 3);
    stampGrad.addColorStop(0, "#fef08a");
    stampGrad.addColorStop(0.5, "#facc15");
    stampGrad.addColorStop(1, "#ca8a04");
    ctx.fillStyle = stampGrad;
    ctx.beginPath();
    ctx.arc(0, 0, discRadius * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawAim() {
  if (!state.aim) return;
  const disc = state.disc;
  const dx = disc.x - state.aim.x;
  const dy = disc.y - state.aim.y;
  const power = clamp(Math.hypot(dx, dy), 0, 180);
  const angle = Math.atan2(dy, dx);
  const end = {
    x: disc.x + Math.cos(angle) * power,
    y: disc.y + Math.sin(angle) * power,
  };

  ctx.save();
  ctx.strokeStyle = "rgba(255, 209, 102, 0.72)";
  ctx.lineWidth = 4;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(disc.x, disc.y - disc.z);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#ffd166";
  ctx.beginPath();
  ctx.arc(end.x, end.y, 6 + Math.sin(performance.now() * 0.01) * 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawWind() {
  if (state.wind.x === 0 && state.wind.y === 0) return;

  ctx.save();
  ctx.translate(canvas.width - 64, 64);

  ctx.fillStyle = "rgba(18, 30, 22, 0.75)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 36, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#70927e";
  ctx.font = "bold 9px 'Outfit', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("WIND", 0, -22);

  const windAngle = Math.atan2(state.wind.y, state.wind.x);
  const windIntensity = Math.hypot(state.wind.x, state.wind.y);
  const arrowLength = 14 + windIntensity * 16;

  ctx.rotate(windAngle);
  ctx.strokeStyle = "#ffd166";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(-arrowLength/2, 0);
  ctx.lineTo(arrowLength/2, 0);
  ctx.stroke();

  ctx.fillStyle = "#ffd166";
  ctx.beginPath();
  ctx.moveTo(arrowLength/2, 0);
  ctx.lineTo(arrowLength/2 - 6, -4);
  ctx.lineTo(arrowLength/2 - 6, 4);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawParticles() {
  state.particles.forEach((particle) => {
    ctx.save();
    ctx.globalAlpha = clamp(particle.life / 45, 0, 1);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  ctx.globalAlpha = 1;
}

function draw() {
  const level = currentLevel();
  drawField();
  level.obstacles.forEach(drawObstacle);
  drawBasket(level.basket);
  drawPlayer(state.player.x, state.player.y);
  drawAim();
  drawDisc();
  drawParticles();
  drawWind();
}

function tick() {
  update();
  draw();
  requestAnimationFrame(tick);
}

canvas.addEventListener("pointerdown", (event) => {
  if (!state.started) return;
  if (state.gameOver) return;
  if (state.disc.moving) return;
  if (state.won) {
    state.level = (state.level + 1) % levels.length;
    resetLevel();
    return;
  }
  const point = canvasPoint(event);
  if (distance(point, state.disc) < 64) {
    state.aim = point;
    canvas.setPointerCapture(event.pointerId);
  }
});

canvas.addEventListener("pointermove", (event) => {
  if (!state.aim || state.disc.moving) return;
  state.aim = canvasPoint(event);
});

canvas.addEventListener("pointerup", (event) => {
  if (!state.aim || state.disc.moving) return;
  launchDisc(state.disc, canvasPoint(event));
});

resetButton.addEventListener("click", () => {
  if (!state.started) return;
  if (state.won) {
    message.textContent = state.practiceMode
      ? "Tap the course to try the next practice hole."
      : "Tap the course to continue the round.";
    return;
  }
  resetLevel();
});

prevLevel.addEventListener("click", () => {
  if (!state.started) return;
  if (state.gameOver) return;
  state.level = (state.level - 1 + levels.length) % levels.length;
  state.totalThrows = 0;
  state.points = 0;
  state.holesCompleted = 0;
  state.practiceMode = true;
  resetLevel(true);
  message.textContent = `Practice mode: hole ${state.level + 1}. Scores only save from a full round starting at hole 1.`;
});

nextLevel.addEventListener("click", () => {
  if (!state.started) return;
  if (state.gameOver) return;
  state.level = (state.level + 1) % levels.length;
  state.totalThrows = 0;
  state.points = 0;
  state.holesCompleted = 0;
  state.practiceMode = true;
  resetLevel(true);
  message.textContent = `Practice mode: hole ${state.level + 1}. Scores only save from a full round starting at hole 1.`;
});

startForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.playerName = startName.value.trim().slice(0, 18) || "Player";
  state.started = true;
  startPanel.hidden = true;
  resetRound();
});

newRoundButton.addEventListener("click", () => {
  startForm.reset();
  state.started = false;
  state.playerName = "";
  scorePanel.hidden = true;
  startPanel.hidden = false;
  startName.focus();
  resetRound();
});

if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function roundRect(x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    this.moveTo(x + radius, y);
    this.arcTo(x + w, y, x + w, y + h, radius);
    this.arcTo(x + w, y + h, x, y + h, radius);
    this.arcTo(x, y + h, x, y, radius);
    this.arcTo(x, y, x + w, y, radius);
    return this;
  };
}

resetLevel(true);
message.textContent = "Enter your name to start the round.";
startName.focus();
tick();
