const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const PLAYER_WIDTH = 12;
const PLAYER_HEIGHT = 16;
const WALK_SPEED = 1.3;

const PALETTE = {
  wall: "#6b3f26",
  floor: "#1a3721",
  trim: "#d89a42",
  shadow: "#070707",
  door: "#221108",
  stairs: "#9b724c",
  wood: "#5c341d",
  fireplace: "#3b1e10",
  fire: "#d84e1b",
  emblem: "#d89a42",
  clock: "#3e2213"
};

// ==========================================
// 1. CREACIÓN DE PATRONES DE PISO (Fuera del bucle principal)
// ==========================================

// --- PATRÓN DE PISO ALFOMBRA/VERDE ---
const tileCanvas = document.createElement("canvas");
tileCanvas.width = 16;
tileCanvas.height = 16;
const tileCtx = tileCanvas.getContext("2d");
tileCtx.fillStyle = PALETTE.floor;
tileCtx.fillRect(0, 0, 16, 16);
tileCtx.strokeStyle = "#132818";
tileCtx.lineWidth = 1;
tileCtx.strokeRect(0, 0, 16, 16);
tileCtx.fillStyle = "#25482b";
tileCtx.fillRect(7, 7, 2, 2);
const floorPattern = ctx.createPattern(tileCanvas, "repeat");

// --- PATRÓN DE PISO DE MADERA ---
const woodTileCanvas = document.createElement("canvas");
woodTileCanvas.width = 16;
woodTileCanvas.height = 16;
const woodCtx = woodTileCanvas.getContext("2d");
woodCtx.fillStyle = "#4a2912";
woodCtx.fillRect(0, 0, 16, 16);
woodCtx.strokeStyle = "#2c170a";
woodCtx.lineWidth = 1;
woodCtx.strokeRect(0, 0, 16, 16);
woodCtx.fillStyle = "#3a1f0d";
woodCtx.fillRect(0, 7, 16, 2);
const woodFloorPattern = ctx.createPattern(woodTileCanvas, "repeat");

// --- PATRÓN DE PISO DE CEMENTO (Outside Boiler) ---
const concreteTileCanvas = document.createElement("canvas");
concreteTileCanvas.width = 16;
concreteTileCanvas.height = 16;
const concreteCtx = concreteTileCanvas.getContext("2d");
concreteCtx.fillStyle = "#696969";
concreteCtx.fillRect(0, 0, 16, 16);
concreteCtx.strokeStyle = "#4d4d4d";
concreteCtx.lineWidth = 1;
concreteCtx.strokeRect(0, 0, 16, 16);
concreteCtx.fillStyle = "#555555";
concreteCtx.fillRect(7, 7, 2, 2);
const concreteFloorPattern = ctx.createPattern(concreteTileCanvas, "repeat");

const whiteTileCanvas = document.createElement("canvas");
whiteTileCanvas.width = 16;
whiteTileCanvas.height = 16;
const whiteTileCtx = whiteTileCanvas.getContext("2d");
whiteTileCtx.fillStyle = "#d8d9d5";
whiteTileCtx.fillRect(0, 0, 16, 16);
whiteTileCtx.strokeStyle = "#999d9b";
whiteTileCtx.lineWidth = 1;
whiteTileCtx.strokeRect(0, 0, 16, 16);
whiteTileCtx.fillStyle = "rgba(255, 255, 255, 0.22)";
whiteTileCtx.fillRect(2, 2, 5, 5);
const whiteTileFloorPattern = ctx.createPattern(whiteTileCanvas, "repeat");

const waterTileCanvas = document.createElement("canvas");
waterTileCanvas.width = 16;
waterTileCanvas.height = 16;
const waterCtx = waterTileCanvas.getContext("2d");
waterCtx.fillStyle = "#079fc9";
waterCtx.fillRect(0, 0, 16, 16);
waterCtx.fillStyle = "#20b5d9";
waterCtx.fillRect(2, 4, 7, 1);
waterCtx.fillRect(10, 11, 5, 1);
waterCtx.fillStyle = "#067fa8";
waterCtx.fillRect(0, 15, 16, 1);
const waterFloorPattern = ctx.createPattern(waterTileCanvas, "repeat");

const caveTileCanvas = document.createElement("canvas");
caveTileCanvas.width = 16;
caveTileCanvas.height = 16;
const caveCtx = caveTileCanvas.getContext("2d");
caveCtx.fillStyle = "#484332";
caveCtx.fillRect(0, 0, 16, 16);
caveCtx.fillStyle = "#343b2b";
caveCtx.fillRect(1, 2, 6, 4);
caveCtx.fillRect(9, 10, 6, 5);
caveCtx.fillStyle = "#66503a";
caveCtx.fillRect(9, 1, 5, 4);
caveCtx.fillRect(2, 11, 4, 3);
caveCtx.fillStyle = "#252c24";
caveCtx.fillRect(7, 6, 2, 2);
const caveFloorPattern = ctx.createPattern(caveTileCanvas, "repeat");

const webbedCaveCanvas = document.createElement("canvas");
webbedCaveCanvas.width = 64;
webbedCaveCanvas.height = 64;
const webCtx = webbedCaveCanvas.getContext("2d");
webCtx.fillStyle = "#484332";
webCtx.fillRect(0, 0, 64, 64);
webCtx.fillStyle = "#343b2b";
webCtx.fillRect(3, 6, 25, 17);
webCtx.fillRect(36, 41, 23, 18);
webCtx.fillStyle = "#66503a";
webCtx.fillRect(37, 4, 21, 17);
webCtx.fillRect(6, 43, 18, 15);
webCtx.strokeStyle = "rgba(204, 202, 181, 0.58)";
webCtx.lineWidth = 1;
webCtx.beginPath();
webCtx.moveTo(0, 0);
webCtx.lineTo(32, 32);
webCtx.lineTo(64, 0);
webCtx.moveTo(0, 64);
webCtx.lineTo(32, 32);
webCtx.lineTo(64, 64);
webCtx.moveTo(32, 0);
webCtx.lineTo(32, 64);
webCtx.moveTo(0, 32);
webCtx.lineTo(64, 32);
webCtx.stroke();
for (const radius of [9, 18, 27]) {
  webCtx.beginPath();
  webCtx.moveTo(32 - radius, 32 - radius * 0.72);
  webCtx.quadraticCurveTo(32, 32 - radius * 0.3, 32 + radius, 32 - radius * 0.72);
  webCtx.moveTo(32 - radius, 32 + radius * 0.72);
  webCtx.quadraticCurveTo(32, 32 + radius * 0.3, 32 + radius, 32 + radius * 0.72);
  webCtx.stroke();
}
const webbedCavePattern = ctx.createPattern(webbedCaveCanvas, "repeat");

const chessTileCanvas = document.createElement("canvas");
chessTileCanvas.width = 32;
chessTileCanvas.height = 32;
const chessCtx = chessTileCanvas.getContext("2d");
chessCtx.fillStyle = "#d8d3c2";
chessCtx.fillRect(0, 0, 32, 32);
chessCtx.fillStyle = "#292927";
chessCtx.fillRect(0, 0, 16, 16);
chessCtx.fillRect(16, 16, 16, 16);
chessCtx.strokeStyle = "#77746a";
chessCtx.lineWidth = 1;
chessCtx.strokeRect(0, 0, 32, 32);
const chessFloorPattern = ctx.createPattern(chessTileCanvas, "repeat");

const redCarpetCanvas = document.createElement("canvas");
redCarpetCanvas.width = 16;
redCarpetCanvas.height = 16;
const redCarpetCtx = redCarpetCanvas.getContext("2d");
redCarpetCtx.fillStyle = "#651b20";
redCarpetCtx.fillRect(0, 0, 16, 16);
redCarpetCtx.strokeStyle = "#451116";
redCarpetCtx.lineWidth = 1;
redCarpetCtx.strokeRect(0, 0, 16, 16);
redCarpetCtx.fillStyle = "#7a292b";
redCarpetCtx.fillRect(3, 3, 2, 2);
redCarpetCtx.fillRect(11, 11, 2, 2);
const redCarpetPattern = ctx.createPattern(redCarpetCanvas, "repeat");

const upperFloorCanvas = document.createElement("canvas");
upperFloorCanvas.width = 16;
upperFloorCanvas.height = 16;
const upperFloorCtx = upperFloorCanvas.getContext("2d");
upperFloorCtx.fillStyle = "#b49a32";
upperFloorCtx.fillRect(0, 0, 16, 16);
upperFloorCtx.strokeStyle = "#78651f";
upperFloorCtx.lineWidth = 1;
upperFloorCtx.strokeRect(0, 0, 16, 16);
upperFloorCtx.fillStyle = "#cbb84d";
upperFloorCtx.fillRect(3, 3, 2, 2);
upperFloorCtx.fillRect(11, 11, 2, 2);
const upperFloorPattern = ctx.createPattern(upperFloorCanvas, "repeat");


// --- ESTADO DEL JUEGO ---
let currentRoom = "mainHall";
let trophyLightsOn = true;
let waterDrained = false;
let armsStorageUnlocked = false;

let player = {
  x: 230,
  y: 140,
  dx: 0,
  dy: 0,
  isMoving: false,
  animFrame: 0,
  animTimer: 0,
  aimAngle: -Math.PI / 2
};

const weapon = { loaded: 12, capacity: 12, shotFlash: 0, hitPoints: new WeakMap() };
let equippedWeapon = "handgun";
let selectedLauncherAmmo = "flameRounds";
let weaponCooldown = 0;
const WEAPON_ITEMS = {
  handgun: "handgun",
  knife: "combatKnife",
  shotgun: "shotgunWall",
  colt: "colt",
  grenadeLauncher: "grenadeLauncher",
  bazooka: "bazooka",
  rocketLauncher: "rocketLauncher"
};
const WEAPON_NAMES = {
  handgun: "Berreta",
  knife: "Cuchillo de supervivencia",
  shotgun: "Escopeta",
  colt: "Colt",
  grenadeLauncher: "Lanzagranadas",
  bazooka: "Bazooka",
  rocketLauncher: "Rocket Launcher"
};
const AMMO_INFO = {
  shotgun: { type: "shotgunShells", label: "CARTUCHOS" },
  colt: { type: "magnumRounds", label: "MAGNUM" },
  flameRounds: { type: "flameRounds", label: "FLAME" },
  acidRounds: { type: "acidRounds", label: "ACID" },
  explosiveRounds: { type: "explosiveRounds", label: "EXPLOSIVE" }
};
let aimPoint = { x: 0, y: 0 };
let gameFrame = 0;
let playerDamageCooldown = 0;
const unlockedLocks = new Set();
const interactionPrompt = document.getElementById("interaction-prompt");
const doorCodeDialog = document.getElementById("door-code-dialog");
const doorCodeForm = document.getElementById("door-code-form");
const doorCodeDisplay = document.getElementById("door-code-display");
const doorCodeMessage = document.getElementById("door-code-message");
let pendingCodeDoor = null;
let enteredDoorCode = "";

function renderDoorCode() {
  doorCodeDisplay.textContent = enteredDoorCode.padEnd(3, "_");
}

function addDoorCodeDigit(digit) {
  if (enteredDoorCode.length >= 3) return;
  enteredDoorCode += digit;
  doorCodeMessage.textContent = "Ingresá el código numérico.";
  renderDoorCode();
}

function submitDoorCode() {
  if (!pendingCodeDoor) return;
  if (enteredDoorCode !== pendingCodeDoor.codeRequired) {
    enteredDoorCode = "";
    doorCodeMessage.textContent = "Código incorrecto. Probá otra vez.";
    renderDoorCode();
    return;
  }

  const door = pendingCodeDoor;
  unlockedLocks.add(door.lockId);
  pendingCodeDoor = null;
  doorCodeDialog.close();
  transitionThroughDoor(door);
  STATUS.setPickupHint("Código correcto. Puerta desbloqueada.");
  updateInteractionPrompt();
}

doorCodeDialog.querySelectorAll("[data-code-digit]").forEach((button) => {
  button.addEventListener("click", () => addDoorCodeDigit(button.dataset.codeDigit));
});
doorCodeDialog.querySelectorAll("[data-code-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.codeAction;
    if (action === "cancel") {
      doorCodeDialog.close();
    } else if (action === "clear") {
      enteredDoorCode = "";
      doorCodeMessage.textContent = "Ingresá el código numérico.";
      renderDoorCode();
    } else if (action === "backspace") {
      enteredDoorCode = enteredDoorCode.slice(0, -1);
      renderDoorCode();
    }
  });
});
doorCodeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitDoorCode();
});
doorCodeDialog.addEventListener("close", () => {
  pendingCodeDoor = null;
  enteredDoorCode = "";
  renderDoorCode();
  updateInteractionPrompt();
});

const ENEMY_TYPES = {
  zombie: { sight: 105, speed: 0.38, attackRange: 18, damage: 8, attackDelay: 52 },
  zombieDog: { sight: 145, speed: 0.82, attackRange: 21, damage: 12, attackDelay: 42 },
  spider: { sight: 120, speed: 0.46, attackRange: 19, damage: 9, attackDelay: 48 },
  neptune: { sight: 170, speed: 0.62, attackRange: 24, damage: 14, attackDelay: 48 },
  wasp: { sight: 150, speed: 0.92, attackRange: 16, damage: 5, attackDelay: 32 },
  crow: { sight: 135, speed: 0.68, attackRange: 18, damage: 6, attackDelay: 46 },
  adder: { sight: 95, speed: 0.58, attackRange: 14, damage: 6, attackDelay: 52 },
  hunter: { sight: 175, speed: 0.72, attackRange: 22, damage: 18, attackDelay: 38 },
  blackTiger: { sight: 200, speed: 0.42, attackRange: 35, damage: 24, attackDelay: 32 },
  yawn: { sight: 180, speed: 0.32, attackRange: 35, damage: 12, attackDelay: 78 },
  chimera: { sight: 140, speed: 0.52, attackRange: 20, damage: 12, attackDelay: 44 }
};

function updateAmmoDisplay() {
  let loaded;
  let reserve;
  let ammoLabel;
  if (equippedWeapon === "handgun") {
    loaded = weapon.loaded;
    reserve = STATUS.getHandgunReserve();
    ammoLabel = "9MM";
  } else if (equippedWeapon === "knife") {
    loaded = "∞";
    reserve = "";
    ammoLabel = "MELEE";
  } else if (equippedWeapon === "rocketLauncher") {
    loaded = STATUS.getRocketReserve();
    reserve = "";
    ammoLabel = "ROCKET";
  } else {
    const ammo = equippedWeapon === "shotgun" ? AMMO_INFO.shotgun
      : equippedWeapon === "colt" ? AMMO_INFO.colt
        : AMMO_INFO[selectedLauncherAmmo];
    loaded = STATUS.getItemCount(ammo.type);
    reserve = "";
    ammoLabel = ammo.label;
  }
  document.getElementById("ammo-loaded").textContent = loaded;
  document.getElementById("ammo-reserve").textContent = reserve;
  document.querySelector(".ammo-display i").hidden = reserve === "";
  document.getElementById("ammo-type").textContent = ammoLabel;
  STATUS.setWeaponDisplay(WEAPON_NAMES[equippedWeapon], loaded, reserve, ammoLabel);
}

function equipWeapon(name) {
  const match = Object.entries(WEAPON_NAMES).find(([, label]) => label === name);
  if (!match) return;
  const [weaponId] = match;
  if (!STATUS.hasItem(WEAPON_ITEMS[weaponId])) return;
  equippedWeapon = weaponId;
  updateAmmoDisplay();
  STATUS.setPickupHint(`${name} equipada.`);
}

function chooseLauncherAmmo(name) {
  const match = ["flameRounds", "acidRounds", "explosiveRounds"]
    .map((id) => [id, AMMO_INFO[id]])
    .find(([, ammo]) => STATUS.getItemName(ammo.type) === name);
  if (!match) return;
  const [ammoId, ammo] = match;
  if (STATUS.getItemCount(ammo.type) <= 0) {
    STATUS.setPickupHint(`No tenés ${name}.`);
    return;
  }
  selectedLauncherAmmo = ammoId;
  updateAmmoDisplay();
  STATUS.setPickupHint(`${name} seleccionadas para ${equippedWeapon === "bazooka" ? "la bazooka" : "el lanzagranadas"}.`);
}

STATUS.setWeaponHandlers({ equip: equipWeapon, selectAmmo: chooseLauncherAmmo });

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height)
  };
}

function reloadWeapon() {
  if (equippedWeapon !== "handgun") return;
  const needed = weapon.capacity - weapon.loaded;
  if (needed <= 0 || STATUS.getHandgunReserve() <= 0) return;
  weapon.loaded += STATUS.takeHandgunAmmo(needed);
  updateAmmoDisplay();
}

function fireWeapon() {
  if (STATUS.isOpen() || doorCodeDialog.open || weaponCooldown > 0) return;
  if (WEAPON_ITEMS[equippedWeapon] && !STATUS.hasItem(WEAPON_ITEMS[equippedWeapon])) {
    equippedWeapon = "handgun";
    updateAmmoDisplay();
  }
  const ammo = equippedWeapon === "shotgun" ? AMMO_INFO.shotgun
    : equippedWeapon === "colt" ? AMMO_INFO.colt
      : AMMO_INFO[selectedLauncherAmmo];
  if (equippedWeapon === "handgun" && weapon.loaded <= 0) {
    STATUS.setPickupHint("La Berreta está descargada. Recargá con clic derecho.");
    return;
  }
  if (equippedWeapon === "shotgun" && STATUS.getItemCount(ammo.type) <= 0) {
    STATUS.setPickupHint("No te quedan cartuchos de escopeta.");
    return;
  }
  if (equippedWeapon === "colt" && STATUS.getItemCount(ammo.type) <= 0) {
    STATUS.setPickupHint("No te quedan balas Magnum.");
    return;
  }
  if (["grenadeLauncher", "bazooka"].includes(equippedWeapon) && STATUS.getItemCount(ammo.type) <= 0) {
    STATUS.setPickupHint(`No te quedan ${STATUS.getItemName(ammo.type)} para ${equippedWeapon === "bazooka" ? "la bazooka" : "el lanzagranadas"}.`);
    return;
  }
  if (equippedWeapon === "rocketLauncher" && STATUS.getRocketReserve() <= 0) {
    STATUS.setPickupHint("El Rocket Launcher está descargado.");
    return;
  }

  if (equippedWeapon === "handgun") weapon.loaded--;
  else if (["shotgun", "colt", "grenadeLauncher", "bazooka"].includes(equippedWeapon)) STATUS.consumeItem(ammo.type);
  else if (equippedWeapon === "rocketLauncher") STATUS.consumeRocket();
  weaponCooldown = equippedWeapon === "knife" ? 14 : 8;
  weapon.shotFlash = 4;
  const originX = player.x + PLAYER_WIDTH / 2;
  const originY = player.y + PLAYER_HEIGHT / 2;
  const range = equippedWeapon === "knife" ? 28 : ["rocketLauncher", "bazooka"].includes(equippedWeapon) ? 220 : 150;
  let target = null;
  let targetDistance = range;
  const room = ROOMS[currentRoom];

  room.interactables.forEach((obj) => {
    if (!["zombie", "zombieDog", "spider", "neptune", "wasp", "crow", "adder", "hunter", "blackTiger", "yawn", "chimera"].includes(obj.type)) return;
    const dx = obj.x + obj.w / 2 - originX;
    const dy = obj.y + obj.h / 2 - originY;
    const along = dx * Math.cos(player.aimAngle) + dy * Math.sin(player.aimAngle);
    const across = Math.abs(dx * Math.sin(player.aimAngle) - dy * Math.cos(player.aimAngle));
    if (along > 0 && along < targetDistance && across < Math.max(5, Math.min(obj.w, obj.h) * 0.65)) {
      target = obj;
      targetDistance = along;
    }
  });

  if (target) {
    const smallEnemy = ["crow", "adder", "wasp"].includes(target.type);
    const boss = ["blackTiger", "yawn", "tyrant"].includes(target.type);
    const defaultHitPoints = smallEnemy ? 10 : target.type === "zombieDog" ? 10 : boss ? 300 : 100;
    const hunterSized = ["hunter", "chimera"].includes(target.type);
    const damage = equippedWeapon === "knife" ? 10
      : equippedWeapon === "handgun" ? 20
        : equippedWeapon === "shotgun" ? hunterSized ? 34 : 50
          : equippedWeapon === "colt" ? hunterSized ? 50 : 100
            : equippedWeapon === "rocketLauncher" ? 250 : 50;
    const remaining = (weapon.hitPoints.get(target) ?? defaultHitPoints) - damage;
    if (remaining <= 0) room.interactables.splice(room.interactables.indexOf(target), 1);
    else weapon.hitPoints.set(target, remaining);
  }
  updateAmmoDisplay();
}

canvas.addEventListener("mousemove", (event) => {
  aimPoint = canvasPoint(event);
  player.aimAngle = Math.atan2(aimPoint.y - (player.y + PLAYER_HEIGHT / 2), aimPoint.x - (player.x + PLAYER_WIDTH / 2));
});
canvas.addEventListener("mousedown", (event) => {
  event.preventDefault();
  if (event.button === 0) fireWeapon();
  if (event.button === 2) reloadWeapon();
});
canvas.addEventListener("contextmenu", (event) => event.preventDefault());
updateAmmoDisplay();

const keys = new Set();
window.addEventListener("keydown", (e) => {
  if (doorCodeDialog.open) {
    e.preventDefault();
    if (/^\d$/.test(e.key)) addDoorCodeDigit(e.key);
    else if (e.key === "Enter") submitDoorCode();
    else if (e.key === "Backspace") {
      enteredDoorCode = enteredDoorCode.slice(0, -1);
      renderDoorCode();
    } else if (e.key === "Escape") doorCodeDialog.close();
    return;
  }
  if (e.target.closest?.("#debug-room-control")) return;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  keys.add(key);
  if (key === "m" && !e.repeat) MANSION_MAP.toggle();
  if (key === "i" && !e.repeat) STATUS.toggle();
  if (key === "e" && !e.repeat && !STATUS.isOpen()) interactNearby();
});
window.addEventListener("keyup", (e) => keys.delete(e.key.length === 1 ? e.key.toLowerCase() : e.key));

function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  );
}

function rectangleInsidePolygon(rect, polygon) {
  const containsPoint = (x, y) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const a = polygon[i];
      const b = polygon[j];
      if ((a.y > y) !== (b.y > y) && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
    }
    return inside;
  };
  return [
    [rect.x, rect.y],
    [rect.x + rect.w, rect.y],
    [rect.x, rect.y + rect.h],
    [rect.x + rect.w, rect.y + rect.h]
  ].every(([x, y]) => containsPoint(x, y));
}

function rectangleInsideCorridorPoly(rect, corridors) {
  const corners = [
    [rect.x, rect.y],
    [rect.x + rect.w, rect.y],
    [rect.x, rect.y + rect.h],
    [rect.x + rect.w, rect.y + rect.h]
  ];
  return corridors.some((area) => corners.every(([x, y]) =>
    x >= area.x && x <= area.x + area.w && y >= area.y && y <= area.y + area.h
  ));
}

function hasLineOfSight(x1, y1, x2, y2, room, observer) {
  const distance = Math.hypot(x2 - x1, y2 - y1);
  const steps = Math.ceil(distance / 4);
  for (let step = 1; step < steps; step++) {
    const x = x1 + (x2 - x1) * step / steps;
    const y = y1 + (y2 - y1) * step / steps;
    if (room.walls?.some((wall) => x >= wall.x && x <= wall.x + wall.w && y >= wall.y && y <= wall.y + wall.h)) return false;
    if (room.interactables.some((obj) => obj !== observer && obj.solid && x >= obj.x && x <= obj.x + obj.w && y >= obj.y && y <= obj.y + obj.h)) return false;
  }
  return true;
}

function updateEnemies(room) {
  const hive = room.interactables.find((obj) => obj.type === "giantBeehive");
  if (hive) {
    const activeWasps = room.interactables.some((obj) => obj.type === "wasp");
    if (!activeWasps) {
      hive.nextWaspAt ??= gameFrame + 360;
      if (gameFrame >= hive.nextWaspAt) {
        const offsets = [[-21, 25], [-15, 60], [-4, 68], [40, 22], [43, 62]];
        offsets.forEach(([offsetX, offsetY]) => {
          room.interactables.push({
            type: "wasp",
            x: hive.x + offsetX,
            y: hive.y + offsetY,
            w: 12,
            h: 10
          });
        });
        hive.nextWaspAt = undefined;
      }
    } else {
      hive.nextWaspAt = undefined;
    }
  }

  const playerX = player.x + PLAYER_WIDTH / 2;
  const playerY = player.y + PLAYER_HEIGHT / 2;
  const obstacles = room.interactables.filter((obj) => obj.solid && !ENEMY_TYPES[obj.type]);

  room.interactables.forEach((enemy) => {
    const behavior = ENEMY_TYPES[enemy.type];
    if (!behavior) return;
    if (enemy.revealed === false) return;
    if (enemy.type === "neptune" && waterDrained) {
      enemy.alerted = false;
      enemy.attackAt = undefined;
      return;
    }
    const enemyX = enemy.x + enemy.w / 2;
    const enemyY = enemy.y + enemy.h / 2;
    const distance = Math.hypot(playerX - enemyX, playerY - enemyY);
    if (!enemy.alerted && distance <= behavior.sight && hasLineOfSight(enemyX, enemyY, playerX, playerY, room, enemy)) enemy.alerted = true;
    if (!enemy.alerted) return;
    if (enemy.type === "chimera") enemy.descended = true;

    if (distance <= behavior.attackRange) {
      enemy.attackAt ??= 0;
      if (gameFrame >= enemy.attackAt && playerDamageCooldown === 0) {
        STATUS.setHealth(STATUS.getHealth() - behavior.damage);
        if (["adder", "spider", "blackTiger", "yawn"].includes(enemy.type)) STATUS.setPoison(true);
        playerDamageCooldown = 24;
        enemy.attackAt = gameFrame + behavior.attackDelay;
      }
      return;
    }

    const stepX = (playerX - enemyX) / distance * behavior.speed;
    const stepY = (playerY - enemyY) / distance * behavior.speed;
    const canOccupy = (x, y) => {
      const bounds = room.bounds;
      const box = { x, y, w: enemy.w, h: enemy.h };
      return x >= bounds.minX && y >= bounds.minY && x + enemy.w <= bounds.maxX && y + enemy.h <= bounds.maxY &&
        (!room.constrainToWalkablePolygon || rectangleInsidePolygon(box, room.walkablePolygon)) &&
        (!room.constrainToCorridorPoly || rectangleInsideCorridorPoly(box, room.corridorPoly)) &&
        !room.walls?.some((wall) => checkCollision(box, wall)) &&
        !obstacles.some((obstacle) => checkCollision(box, obstacle));
    };
    if (canOccupy(enemy.x + stepX, enemy.y)) enemy.x += stepX;
    if (canOccupy(enemy.x, enemy.y + stepY)) enemy.y += stepY;
    enemy.animFrame = Math.floor(gameFrame / 12) % 2;
  });
}

function updateBoulderEncounter(room) {
  const boulder = room.interactables.find((obj) => obj.type === "rollingBoulder");
  if (!boulder || boulder.passed) return;
  const playerX = player.x + PLAYER_WIDTH / 2;
  const playerY = player.y + PLAYER_HEIGHT / 2;
  const distance = Math.hypot(playerX - (boulder.x + boulder.w / 2), playerY - (boulder.y + boulder.h / 2));

  if (!boulder.rolling && distance < (boulder.triggerRadius ?? 105)) boulder.rolling = true;
  if (!boulder.rolling) return;

  const direction = boulder.direction ?? -1;
  boulder.x += direction * boulder.rollSpeed;
  if (checkCollision({ x: player.x, y: player.y, w: PLAYER_WIDTH, h: PLAYER_HEIGHT }, boulder)) {
    player.x = boulder.refugeX ?? 38;
    player.y = boulder.refugeY ?? 86;
    STATUS.setHealth(0);
    playerDamageCooldown = 45;
  }

  const stopX = boulder.stopX ?? 20;
  const reachedEnd = direction > 0 ? boulder.x >= stopX : boulder.x <= stopX;
  if (reachedEnd) {
    boulder.x = stopX;
    boulder.rolling = false;
    boulder.passed = true;
    boulder.solid = false;
    const exit = room.doors.find((door) => door.id === (boulder.unlockDoorId ?? "door2ToBlackTigerRoom"));
    if (exit) exit.disabled = false;
    const hunter = room.interactables.find((obj) => obj.type === (boulder.revealEnemyType ?? "hunter") && obj.revealed === false);
    if (hunter) hunter.revealed = true;
    STATUS.setPickupHint("La piedra pasó. El pasaje quedó abierto.");
  }
}

function collectNearbyItem() {
  const room = ROOMS[currentRoom];
  const playerReach = { x: player.x - 8, y: player.y - 8, w: PLAYER_WIDTH + 16, h: PLAYER_HEIGHT + 16 };
  const itemIndex = room.interactables.findIndex((obj) =>
    STATUS.getItemName(obj.type) && obj.revealed !== false && (!obj.requiresDark || !trophyLightsOn) && checkCollision(playerReach, obj)
  );
  if (itemIndex === -1) {
    STATUS.setPickupHint("No hay objetos al alcance.");
    return;
  }
  const item = room.interactables[itemIndex];
  if (STATUS.addItem(item.type)) {
    room.interactables.splice(itemIndex, 1);
    if (item.giftFrom) STATUS.setPickupHint(`${item.giftFrom} te dio el ${STATUS.getItemName(item.type)}.`);
    updateAmmoDisplay();
  }
}

function nearbyDoor() {
  const room = ROOMS[currentRoom];
  const reach = { x: player.x - 18, y: player.y - 18, w: PLAYER_WIDTH + 36, h: PLAYER_HEIGHT + 36 };
  return room.doors
    .filter((door) => checkCollision(reach, door))
    .sort((a, b) => Math.hypot(a.x + a.w / 2 - player.x, a.y + a.h / 2 - player.y) - Math.hypot(b.x + b.w / 2 - player.x, b.y + b.h / 2 - player.y))[0];
}

function isStepLadderInPlace(room, target) {
  const ladder = room.interactables.find((obj) => obj.type === "stepLadder");
  if (!ladder) return false;
  const atTarget = Math.hypot(ladder.x - target.x, ladder.y - target.y) <= target.tolerance;
  return atTarget || Boolean(target.wallZone && checkCollision(ladder, target.wallZone));
}

function pushStepLadder(room, ladder, dx, dy) {
  const next = { ...ladder, x: ladder.x + dx * 2, y: ladder.y + dy * 2 };
  if (next.x < room.bounds.minX || next.y < room.bounds.minY || next.x + next.w > room.bounds.maxX || next.y + next.h > room.bounds.maxY) return false;
  if (room.walkablePolygon && !rectangleInsidePolygon(next, room.walkablePolygon)) return false;
  if (room.walls?.some((wall) => checkCollision(next, wall))) return false;
  if (room.interactables.some((obj) => obj !== ladder && obj.solid && !ENEMY_TYPES[obj.type] && checkCollision(next, obj))) return false;
  ladder.x = next.x;
  ladder.y = next.y;
  return true;
}

function updateInteractionPrompt() {
  const room = ROOMS[currentRoom];
  const movableLadder = room.interactables.find((obj) => obj.type === "stepLadder" && obj.resettable);
  const ladderReach = { x: player.x - 14, y: player.y - 14, w: PLAYER_WIDTH + 28, h: PLAYER_HEIGHT + 28 };
  const ladderDoor = room.doors.find((door) => door.stepLadderTarget);
  if (movableLadder && ladderDoor && !isStepLadderInPlace(room, ladderDoor.stepLadderTarget) && checkCollision(ladderReach, movableLadder)) {
    interactionPrompt.textContent = "E · Reubicar escalerita";
    interactionPrompt.hidden = false;
    return;
  }
  const door = nearbyDoor();
  if (door) {
    const locked = door.keyRequired && !unlockedLocks.has(door.lockId);
    const fileLocked = door.fileRequired && !unlockedLocks.has(door.lockId);
    const missingCrests = door.crestsRequired?.filter((crest) => !STATUS.hasItem(crest)) || [];
    const crestsLocked = missingCrests.length > 0 && !unlockedLocks.has(door.lockId);
    const sideLocked = door.unlockFromSide && !unlockedLocks.has(door.lockId);
    const switchLocked = door.switchRequired === "armsStorageUnlocked" && !armsStorageUnlocked;
    const ladderBlocked = door.stepLadderTarget && !isStepLadderInPlace(ROOMS[currentRoom], door.stepLadderTarget);
    interactionPrompt.textContent = door.disabled || !ROOMS[door.targetRoom]
      ? `E · ${door.blockedMessage || "Destino todavía no disponible."}`
      : door.codeRequired && !unlockedLocks.has(door.lockId)
        ? "E · Ingresar código"
      : locked
        ? `E · Cerrada: ${STATUS.getItemName(door.keyRequired)}`
      : fileLocked
        ? `E · Falta archivo: ${STATUS.getItemName(door.fileRequired)}`
      : crestsLocked
        ? `E · Faltan: ${missingCrests.map((crest) => STATUS.getItemName(crest)).join(", ")}`
      : sideLocked
        ? door.unlockFromSide === currentRoom ? "E · Destrabar desde acá" : "E · Cerrada del otro lado"
      : switchLocked
        ? "E · Cerrada: activá el switch en Control Room B1"
      : ladderBlocked
        ? "E · Mové la escalerita bajo el conducto"
        : `E · Abrir: ${ROOMS[door.targetRoom].name}`;
    interactionPrompt.hidden = false;
    return;
  }
  const reach = { x: player.x - 14, y: player.y - 14, w: PLAYER_WIDTH + 28, h: PLAYER_HEIGHT + 28 };
  const chest = room.interactables.find((obj) => obj.type === "itemChest" && checkCollision(reach, obj));
  if (chest) {
    interactionPrompt.textContent = "E · Abrir baúl de objetos";
    interactionPrompt.hidden = false;
    return;
  }
  const clockPuzzle = room.interactables.find((obj) =>
    obj.type === "clockPuzzle" && !obj.solved && checkCollision(reach, obj)
  );
  if (clockPuzzle) {
    interactionPrompt.textContent = clockPuzzle.clueRead ? "E · Mover la aguja" : "E · Examinar el reloj";
    interactionPrompt.hidden = false;
    return;
  }
  const switchReach = { x: player.x - 14, y: player.y - 14, w: PLAYER_WIDTH + 28, h: PLAYER_HEIGHT + 28 };
  const trophySwitch = room.interactables.find((obj) => obj.type === "trophySwitch" && checkCollision(switchReach, obj));
  if (trophySwitch) {
    interactionPrompt.textContent = `E · ${trophyLightsOn ? "Apagar" : "Encender"} la luz`;
    interactionPrompt.hidden = false;
    return;
  }
  const controlSwitch = room.interactables.find((obj) =>
    ["waterDrainSwitch", "armsStorageSwitch"].includes(obj.type) && checkCollision(switchReach, obj)
  );
  if (controlSwitch) {
    interactionPrompt.textContent = controlSwitch.type === "waterDrainSwitch"
      ? waterDrained ? "E · Drenaje activado" : "E · Drenar las habitaciones"
      : armsStorageUnlocked ? "E · Puerta de Arms Storage abierta" : "E · Abrir Arms Storage";
    interactionPrompt.hidden = false;
    return;
  }
  const itemReach = { x: player.x - 8, y: player.y - 8, w: PLAYER_WIDTH + 16, h: PLAYER_HEIGHT + 16 };
  const item = room.interactables.find((obj) => STATUS.getItemName(obj.type) && obj.revealed !== false && (!obj.requiresDark || !trophyLightsOn) && checkCollision(itemReach, obj));
  interactionPrompt.textContent = item ? `E · Recoger: ${STATUS.getItemName(item.type)}` : "";
  interactionPrompt.hidden = !item;
}

function transitionThroughDoor(door) {
  currentRoom = door.targetRoom;
  player.x = door.spawnX;
  player.y = door.spawnY;
  const titleElem = document.getElementById("room-title");
  if (titleElem) titleElem.innerText = ROOMS[currentRoom].name;
  MANSION_MAP.setCurrentRoom(currentRoom);
}

function findRoomTestSpawn(room) {
  const bounds = room.bounds;
  const candidates = [];
  for (let y = bounds.minY + 3; y <= bounds.maxY - PLAYER_HEIGHT - 3; y += 8) {
    for (let x = bounds.minX + 3; x <= bounds.maxX - PLAYER_WIDTH - 3; x += 8) {
      const playerRect = { x, y, w: PLAYER_WIDTH, h: PLAYER_HEIGHT };
      const corners = [
        [x, y], [x + PLAYER_WIDTH, y],
        [x, y + PLAYER_HEIGHT], [x + PLAYER_WIDTH, y + PLAYER_HEIGHT]
      ];
      if (room.walkablePolygon && !rectangleInsidePolygon(playerRect, room.walkablePolygon)) continue;
      if (room.corridorPoly && !room.corridorPoly.some((area) =>
        corners.every(([px, py]) => px >= area.x && px <= area.x + area.w && py >= area.y && py <= area.y + area.h)
      )) continue;
      if (room.walls?.some((wall) => checkCollision(playerRect, wall))) continue;
      if (room.interactables.some((obj) =>
        (obj.solid || ENEMY_TYPES[obj.type]) && checkCollision(playerRect, obj)
      )) continue;
      if (room.doors?.some((door) => checkCollision(playerRect, door))) continue;
      const centerX = (bounds.minX + bounds.maxX - PLAYER_WIDTH) / 2;
      const centerY = (bounds.minY + bounds.maxY - PLAYER_HEIGHT) / 2;
      candidates.push({ x, y, distance: Math.hypot(x - centerX, y - centerY) });
    }
  }
  candidates.sort((a, b) => a.distance - b.distance);
  return candidates[0] || {
    x: bounds.minX + (bounds.maxX - bounds.minX - PLAYER_WIDTH) / 2,
    y: bounds.minY + (bounds.maxY - bounds.minY - PLAYER_HEIGHT) / 2
  };
}

const debugRoomSelect = document.getElementById("debug-room-select");
const debugRoomGo = document.getElementById("debug-room-go");
Object.entries(ROOMS)
  .sort(([, roomA], [, roomB]) => roomA.name.localeCompare(roomB.name, "es"))
  .forEach(([roomId, room]) => {
    const option = document.createElement("option");
    option.value = roomId;
    option.textContent = room.name;
    debugRoomSelect.appendChild(option);
  });
debugRoomSelect.addEventListener("change", () => {
  debugRoomGo.disabled = !debugRoomSelect.value;
});
debugRoomGo.addEventListener("click", () => {
  const roomId = debugRoomSelect.value;
  const room = ROOMS[roomId];
  if (!room) return;
  const spawn = findRoomTestSpawn(room);
  currentRoom = roomId;
  player.x = spawn.x;
  player.y = spawn.y;
  document.getElementById("room-title").innerText = room.name;
  MANSION_MAP.setCurrentRoom(roomId);
  updateInteractionPrompt();
  debugRoomGo.blur();
});

function interactNearby() {
  const room = ROOMS[currentRoom];
  const movableLadder = room.interactables.find((obj) => obj.type === "stepLadder" && obj.resettable);
  const ladderReach = { x: player.x - 14, y: player.y - 14, w: PLAYER_WIDTH + 28, h: PLAYER_HEIGHT + 28 };
  const ladderDoor = room.doors.find((door) => door.stepLadderTarget);
  if (movableLadder && ladderDoor && !isStepLadderInPlace(room, ladderDoor.stepLadderTarget) && checkCollision(ladderReach, movableLadder)) {
    movableLadder.x = movableLadder.startX;
    movableLadder.y = movableLadder.startY;
    STATUS.setPickupHint("La escalerita volvió a su posición inicial.");
    updateInteractionPrompt();
    return;
  }
  const door = nearbyDoor();
  if (door) {
    if (door.disabled || !ROOMS[door.targetRoom]) {
      STATUS.setPickupHint(door.blockedMessage || "Destino todavía no disponible.");
      return;
    }
    if (door.stepLadderTarget && !isStepLadderInPlace(ROOMS[currentRoom], door.stepLadderTarget)) {
      STATUS.setPickupHint("Primero tenés que mover la escalerita bajo el conducto de ventilación.");
      return;
    }
    if (door.switchRequired === "armsStorageUnlocked" && !armsStorageUnlocked) {
      STATUS.setPickupHint("La puerta de Arms Storage sigue cerrada. Activá el switch en Control Room B1.");
      return;
    }
    if (door.codeRequired && !unlockedLocks.has(door.lockId)) {
      pendingCodeDoor = door;
      enteredDoorCode = "";
      doorCodeMessage.textContent = "Ingresá el código numérico.";
      renderDoorCode();
      doorCodeDialog.showModal();
      return;
    }
    if (door.fileRequired && !unlockedLocks.has(door.lockId)) {
      if (!STATUS.hasFile(door.fileRequired)) {
        STATUS.setPickupHint(`La puerta está cerrada. Necesitás el archivo: ${STATUS.getItemName(door.fileRequired)}.`);
        return;
      }
      unlockedLocks.add(door.lockId);
      STATUS.setPickupHint(`Usaste el archivo ${STATUS.getItemName(door.fileRequired)}. La puerta quedó abierta.`);
    }
    if (door.unlockFromSide && !unlockedLocks.has(door.lockId)) {
      if (currentRoom !== door.unlockFromSide) {
        STATUS.setPickupHint("La puerta se destraba desde el otro lado.");
        return;
      }
      unlockedLocks.add(door.lockId);
      STATUS.setPickupHint("Destrabaste la puerta desde este lado.");
    }
    const missingCrests = door.crestsRequired?.filter((crest) => !STATUS.hasItem(crest)) || [];
    if (missingCrests.length && !unlockedLocks.has(door.lockId)) {
      STATUS.setPickupHint(`La puerta requiere: ${missingCrests.map((crest) => STATUS.getItemName(crest)).join(", ")}.`);
      return;
    }
    if (door.crestsRequired?.length && !unlockedLocks.has(door.lockId)) {
      unlockedLocks.add(door.lockId);
      STATUS.setPickupHint("Colocaste los cuatro crests. La puerta quedó abierta.");
    }
    if (door.keyRequired && !unlockedLocks.has(door.lockId)) {
      if (!STATUS.hasItem(door.keyRequired)) {
        const keyName = STATUS.getItemName(door.keyRequired);
        STATUS.setPickupHint(`La puerta está cerrada. Necesitás: ${keyName}.`);
        return;
      }
      unlockedLocks.add(door.lockId);
      STATUS.setPickupHint(`Usaste la ${STATUS.getItemName(door.keyRequired)}. La puerta quedó abierta.`);
    }
    transitionThroughDoor(door);
    return;
  }
  const reach = { x: player.x - 14, y: player.y - 14, w: PLAYER_WIDTH + 28, h: PLAYER_HEIGHT + 28 };
  if (room.interactables.some((obj) => obj.type === "itemChest" && checkCollision(reach, obj))) {
    STATUS.openChest();
    return;
  }
  const clockPuzzle = room.interactables.find((obj) =>
    obj.type === "clockPuzzle" && !obj.solved && checkCollision(reach, obj)
  );
  if (clockPuzzle) {
    if (!clockPuzzle.clueRead) {
      clockPuzzle.clueRead = true;
      STATUS.setPickupHint("El grabado dice: «La cena se sirve a las seis».");
    } else {
      clockPuzzle.hour = clockPuzzle.hour % 12 + 1;
      if (clockPuzzle.hour === 6) {
        clockPuzzle.solved = true;
        const shieldKey = room.interactables.find((obj) => obj.type === "shieldKey");
        if (shieldKey) shieldKey.revealed = true;
        STATUS.setPickupHint("El reloj se abre y revela una Shield Key detrás.");
      } else {
        STATUS.setPickupHint(`La aguja marca las ${clockPuzzle.hour}.`);
      }
    }
    updateInteractionPrompt();
    return;
  }
  const trophySwitch = room.interactables.find((obj) => obj.type === "trophySwitch" && checkCollision(reach, obj));
  if (trophySwitch) {
    trophyLightsOn = !trophyLightsOn;
    return;
  }
  const controlSwitch = room.interactables.find((obj) =>
    ["waterDrainSwitch", "armsStorageSwitch"].includes(obj.type) && checkCollision(reach, obj)
  );
  if (controlSwitch) {
    if (controlSwitch.type === "waterDrainSwitch") {
      waterDrained = true;
      STATUS.setPickupHint("El agua fue drenada de las habitaciones del nivel B1.");
    } else {
      armsStorageUnlocked = true;
      STATUS.setPickupHint("La puerta de Arms Storage quedó abierta.");
    }
    updateInteractionPrompt();
    return;
  }
  collectNearbyItem();
}

function update() {
  if (STATUS.isOpen() || doorCodeDialog.open) return;
  gameFrame++;
  if (playerDamageCooldown > 0) playerDamageCooldown--;
  if (weaponCooldown > 0) weaponCooldown--;
  if (weapon.shotFlash > 0) weapon.shotFlash--;
  player.aimAngle = Math.atan2(aimPoint.y - (player.y + PLAYER_HEIGHT / 2), aimPoint.x - (player.x + PLAYER_WIDTH / 2));
  const room = ROOMS[currentRoom];
  player.dx = 0;
  player.dy = 0;

  if (keys.has("ArrowLeft") || keys.has("a")) player.dx -= WALK_SPEED;
  if (keys.has("ArrowRight") || keys.has("d")) player.dx += WALK_SPEED;
  if (keys.has("ArrowUp") || keys.has("w")) player.dy -= WALK_SPEED;
  if (keys.has("ArrowDown") || keys.has("s")) player.dy += WALK_SPEED;

  player.isMoving = player.dx !== 0 || player.dy !== 0;

  if (player.isMoving) {
    player.animTimer++;
    if (player.animTimer % 10 === 0) {
      player.animFrame = player.animFrame === 0 ? 1 : 0;
    }
  } else {
    player.animFrame = 0;
  }

  let nextX = Math.max(room.bounds.minX, Math.min(room.bounds.maxX - PLAYER_WIDTH, player.x + player.dx));
  let nextY = Math.max(room.bounds.minY, Math.min(room.bounds.maxY - PLAYER_HEIGHT, player.y + player.dy));

  let playerRectX = { x: nextX, y: player.y, w: PLAYER_WIDTH, h: PLAYER_HEIGHT };
  let playerRectY = { x: player.x, y: nextY, w: PLAYER_WIDTH, h: PLAYER_HEIGHT };

  let canMoveX = true;
  let canMoveY = true;

  if (room.constrainToWalkablePolygon) {
    canMoveX = rectangleInsidePolygon(playerRectX, room.walkablePolygon);
    canMoveY = rectangleInsidePolygon(playerRectY, room.walkablePolygon);
  }
  if (room.constrainToCorridorPoly) {
    canMoveX = canMoveX && rectangleInsideCorridorPoly(playerRectX, room.corridorPoly);
    canMoveY = canMoveY && rectangleInsideCorridorPoly(playerRectY, room.corridorPoly);
  }

  // Colisión con objetos
  room.interactables.forEach((obj) => {
    if (obj.solid) {
      if (checkCollision(playerRectX, obj) && !(obj.type === "stepLadder" && player.dx && pushStepLadder(room, obj, player.dx, 0))) canMoveX = false;
      if (checkCollision(playerRectY, obj) && !(obj.type === "stepLadder" && player.dy && pushStepLadder(room, obj, 0, player.dy))) canMoveY = false;
    }
  });

  // Colisión con muros especiales (si la habitación los tiene, como la Tea Room)
  if (room.walls) {
    room.walls.forEach((wall) => {
      if (checkCollision(playerRectX, wall)) canMoveX = false;
      if (checkCollision(playerRectY, wall)) canMoveY = false;
    });
  }

  if (canMoveX) player.x = nextX;
  if (canMoveY) player.y = nextY;

  updateEnemies(room);
  if (room.interactables.some((obj) => obj.type === "rollingBoulder")) updateBoulderEncounter(room);
  updateInteractionPrompt();
}

function drawRoom() {
  const room = ROOMS[currentRoom];

  // 1. Decidir qué textura de piso usar para esta habitación
  let currentFloorPattern = floorPattern; // Por defecto (alfombra verde)

  if (room.floorType === "wood") {
    currentFloorPattern = woodFloorPattern;
  } else if (room.floorType === "concrete") {
    currentFloorPattern = concreteFloorPattern;
  } else if (room.floorType === "whiteTile") {
    currentFloorPattern = whiteTileFloorPattern;
  } else if (room.floorType === "checkerboard" || room.floorType === "chess") {
    currentFloorPattern = chessFloorPattern;
  } else if (room.floorType === "water") {
    currentFloorPattern = waterDrained ? concreteFloorPattern : waterFloorPattern;
  } else if (room.floorType === "cave") {
    currentFloorPattern = caveFloorPattern;
  } else if (room.floorType === "webbedCave") {
    currentFloorPattern = webbedCavePattern;
  } else if (room.floorType === "secondFloor") {
    currentFloorPattern = upperFloorPattern;
  } else if (room.floorType === "chess") {
    currentFloorPattern = chessFloorPattern;
  } else if (room.floorType === "carpetRed") {
    currentFloorPattern = redCarpetPattern;
  }

  // Fondo negro base
  ctx.fillStyle = PALETTE.shadow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // 2. Dibujar la estructura (Pasillos custom o Cuartos rectangulares)
  if (room.walkablePolygon) {
    const drawRoomShape = () => {
      ctx.beginPath();
      ctx.moveTo(room.walkablePolygon[0].x, room.walkablePolygon[0].y);
      room.walkablePolygon.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.closePath();
    };

    drawRoomShape();
    ctx.fillStyle = PALETTE.wall;
    ctx.lineJoin = "miter";
    ctx.lineWidth = 12;
    ctx.stroke();
    drawRoomShape();
    ctx.fillStyle = currentFloorPattern;
    ctx.fill();
    ctx.strokeStyle = PALETTE.trim;
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (room.corridorPoly) {
    ctx.fillStyle = PALETTE.wall;
    room.corridorPoly.forEach((p) => ctx.fillRect(p.x - 4, p.y - 4, p.w + 8, p.h + 8));

    // Aca usamos el piso seleccionado (madera o baldosas)
    ctx.fillStyle = currentFloorPattern; 
    room.corridorPoly.forEach((p) => ctx.fillRect(p.x, p.y, p.w, p.h));

    ctx.strokeStyle = PALETTE.trim;
    ctx.lineWidth = 2;
    room.corridorPoly.forEach((p) => ctx.strokeRect(p.x, p.y, p.w, p.h));
  } else {
    ctx.fillStyle = PALETTE.wall;
    ctx.fillRect(12, 12, WIDTH - 24, HEIGHT - 24);

    // Y aca también
    ctx.fillStyle = currentFloorPattern; 
    ctx.fillRect(18, 24, WIDTH - 36, HEIGHT - 42);

    ctx.strokeStyle = PALETTE.trim;
    ctx.lineWidth = 2;
    ctx.strokeRect(18, 24, WIDTH - 36, HEIGHT - 42);
  }

  // (El resto de la función sigue igual hacia abajo con las puertas e interactables...)

  // 2. Dibujar Puertas
  room.doors.forEach((d) => {
    if (d.switchRequired === "armsStorageUnlocked" && armsStorageUnlocked) {
      ctx.fillStyle = "#111916";
      ctx.fillRect(d.x, d.y, d.w, d.h);
      ctx.strokeStyle = "#7c9383";
      ctx.lineWidth = 1;
      ctx.strokeRect(d.x + 1, d.y + 1, d.w - 2, d.h - 2);
    } else {
      ctx.fillStyle = PALETTE.door;
      ctx.fillRect(d.x, d.y, d.w, d.h);
    }
  });

// 3. Dibujar Muebles y Elementos Específicos
  room.interactables.forEach((obj) => {
    if (obj.revealed === false) return;
    if (obj.type === "staticCharacter") {
      drawStaticCharacter(obj);

    } else if (obj.type === "armorChest") {
      ctx.fillStyle = "#21170f";
      ctx.fillRect(obj.x - 2, obj.y + obj.h - 5, obj.w + 4, 7);
      ctx.fillStyle = "#4d2b16";
      ctx.fillRect(obj.x, obj.y + 10, obj.w, obj.h - 12);
      ctx.fillStyle = "#74451f";
      ctx.fillRect(obj.x + 2, obj.y + 12, obj.w - 4, obj.h - 15);
      ctx.fillStyle = "#8a642e";
      ctx.fillRect(obj.x, obj.y + 4, obj.w, 9);
      ctx.fillStyle = "#b08a45";
      ctx.fillRect(obj.x + 2, obj.y + 5, obj.w - 4, 3);
      ctx.fillStyle = "#d3ad53";
      ctx.fillRect(obj.x + obj.w / 2 - 2, obj.y + 10, 4, 8);
      ctx.fillStyle = "#30241a";
      ctx.fillRect(obj.x + obj.w / 2 - 1, obj.y + 12, 2, 3);

    } else if (obj.type === "knightStatue") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
      ctx.fillRect(obj.x + 1, obj.y + obj.h - 3, obj.w + 2, 4);
      ctx.fillStyle = "#53584f";
      ctx.fillRect(obj.x + 3, obj.y + 9, obj.w - 6, obj.h - 11);
      ctx.fillStyle = "#777c70";
      ctx.fillRect(obj.x + 2, obj.y + 6, obj.w - 4, 8);
      ctx.fillStyle = "#909487";
      ctx.fillRect(obj.x + 4, obj.y + 1, obj.w - 8, 8);
      ctx.fillStyle = "#30352f";
      ctx.fillRect(obj.x + 5, obj.y + 5, obj.w - 10, 2);
      ctx.fillRect(obj.x + 2, obj.y + 13, 3, 7);
      ctx.fillRect(obj.x + obj.w - 5, obj.y + 13, 3, 7);
      ctx.fillStyle = "#b69b56";
      ctx.fillRect(obj.x + obj.w / 2 - 1, obj.y + 10, 2, 6);
      ctx.fillStyle = "#666b60";
      ctx.fillRect(obj.x, obj.y + obj.h - 3, obj.w, 3);

    } else if (obj.type === "puzzleGrate") {
      ctx.fillStyle = "#171914";
      ctx.fillRect(obj.x - 2, obj.y - 2, obj.w + 4, obj.h + 4);
      ctx.fillStyle = "#41483e";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.strokeStyle = "#171d17";
      ctx.lineWidth = 2;
      for (let grateX = obj.x + 4; grateX < obj.x + obj.w; grateX += 5) {
        ctx.beginPath();
        ctx.moveTo(grateX, obj.y + 1);
        ctx.lineTo(grateX, obj.y + obj.h - 1);
        ctx.stroke();
      }
      ctx.strokeStyle = "#73786b";
      ctx.lineWidth = 1;
      ctx.strokeRect(obj.x + 1, obj.y + 1, obj.w - 2, obj.h - 2);

    } else if (obj.type === "yawn") {
      ctx.lineCap = "square";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#18251a";
      ctx.lineWidth = 11;
      ctx.beginPath();
      ctx.moveTo(obj.x + 5, obj.y + obj.h - 5);
      ctx.bezierCurveTo(obj.x + 4, obj.y + 6, obj.x + obj.w * 0.48, obj.y + 1, obj.x + obj.w * 0.52, obj.y + obj.h * 0.48);
      ctx.bezierCurveTo(obj.x + obj.w * 0.56, obj.y + obj.h - 1, obj.x + obj.w * 0.86, obj.y + obj.h - 3, obj.x + obj.w - 13, obj.y + 12);
      ctx.stroke();
      ctx.strokeStyle = "#526b35";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(obj.x + 5, obj.y + obj.h - 5);
      ctx.bezierCurveTo(obj.x + 4, obj.y + 6, obj.x + obj.w * 0.48, obj.y + 1, obj.x + obj.w * 0.52, obj.y + obj.h * 0.48);
      ctx.bezierCurveTo(obj.x + obj.w * 0.56, obj.y + obj.h - 1, obj.x + obj.w * 0.86, obj.y + obj.h - 3, obj.x + obj.w - 13, obj.y + 12);
      ctx.stroke();
      ctx.fillStyle = "#354426";
      ctx.fillRect(obj.x + obj.w - 21, obj.y + 6, 18, 15);
      ctx.fillStyle = "#a66a35";
      ctx.fillRect(obj.x + obj.w - 8, obj.y + 14, 5, 3);
      ctx.fillStyle = "#edcc4b";
      ctx.fillRect(obj.x + obj.w - 12, obj.y + 8, 3, 3);
      ctx.fillRect(obj.x + obj.w - 5, obj.y + 8, 3, 3);
      ctx.lineCap = "butt";

    } else if (obj.type === "pillar") {
      ctx.fillStyle = "#151713";
      ctx.fillRect(obj.x - 2, obj.y + obj.h - 4, obj.w + 4, 6);
      ctx.fillStyle = "#62665b";
      ctx.fillRect(obj.x + 2, obj.y + 3, obj.w - 4, obj.h - 5);
      ctx.fillStyle = "#898b79";
      ctx.fillRect(obj.x + 4, obj.y + 2, obj.w - 8, 4);
      ctx.fillStyle = "#41443d";
      ctx.fillRect(obj.x + 5, obj.y + 8, 3, obj.h - 13);
      ctx.fillRect(obj.x + obj.w - 8, obj.y + 8, 3, obj.h - 13);
      ctx.strokeStyle = "#252820";
      ctx.lineWidth = 1;
      ctx.strokeRect(obj.x + 2, obj.y + 3, obj.w - 4, obj.h - 5);
      if (obj.medalSocket) {
        ctx.fillStyle = "#171916";
        ctx.beginPath();
        ctx.arc(obj.x + obj.w / 2, obj.y + 15, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = PALETTE.trim;
        ctx.stroke();
      }

    } else if (obj.type === "statue") {
      ctx.fillStyle = "#33362f";
      ctx.fillRect(obj.x + 3, obj.y + obj.h - 8, obj.w - 6, 8);
      ctx.fillStyle = "#77796d";
      ctx.fillRect(obj.x + 7, obj.y + 18, obj.w - 14, obj.h - 27);
      ctx.fillStyle = "#a2a394";
      ctx.fillRect(obj.x + 10, obj.y + 3, obj.w - 20, 18);
      ctx.fillRect(obj.x + 8, obj.y + 20, obj.w - 16, 4);
      ctx.fillStyle = "#55594f";
      ctx.fillRect(obj.x + 12, obj.y + 8, 2, 2);
      ctx.fillRect(obj.x + obj.w - 14, obj.y + 8, 2, 2);

    } else if (obj.type === "richardBody") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
      ctx.fillRect(obj.x + 1, obj.y + obj.h - 3, obj.w - 2, 3);
      ctx.fillStyle = "#333b35";
      ctx.fillRect(obj.x + 2, obj.y + 5, obj.w - 9, 7);
      ctx.fillStyle = "#68705d";
      ctx.fillRect(obj.x + 5, obj.y + 4, obj.w - 12, 3);
      ctx.fillStyle = "#b89b7d";
      ctx.fillRect(obj.x + obj.w - 9, obj.y + 3, 7, 7);
      ctx.fillStyle = "#c9c9a2";
      ctx.fillRect(obj.x + obj.w - 5, obj.y + 5, 2, 2);
      ctx.fillStyle = "#573d37";
      ctx.fillRect(obj.x + 4, obj.y + 11, 8, 2);

    } else if (obj.type === "radio") {
      ctx.fillStyle = "#171a17";
      ctx.fillRect(obj.x, obj.y + 2, obj.w, obj.h - 2);
      ctx.fillStyle = "#59604c";
      ctx.fillRect(obj.x + 1, obj.y + 4, obj.w - 2, obj.h - 5);
      ctx.fillStyle = "#20241e";
      ctx.fillRect(obj.x + 2, obj.y + 5, 4, 3);
      ctx.fillStyle = "#caa34d";
      ctx.fillRect(obj.x + 7, obj.y + 5, 2, 2);
      ctx.fillStyle = "#a3a18b";
      ctx.fillRect(obj.x + 2, obj.y, 1, 4);

    } else if (obj.type === "terraceGarden") {
      ctx.fillStyle = "#176432";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.strokeStyle = "#102e19";
      ctx.lineWidth = 2;
      ctx.strokeRect(obj.x + 1, obj.y + 1, obj.w - 2, obj.h - 2);
      for (let plantX = obj.x + 9; plantX < obj.x + obj.w - 6; plantX += 18) {
        const plantY = obj.y + 10 + ((plantX * 7) % 48);
        ctx.fillStyle = "#24542b";
        ctx.fillRect(plantX, plantY + 5, 8, 7);
        ctx.fillStyle = "#3f8738";
        ctx.fillRect(plantX + 1, plantY, 3, 8);
        ctx.fillRect(plantX + 5, plantY + 2, 3, 7);
        ctx.fillStyle = "#7d9b42";
        ctx.fillRect(plantX + 3, plantY + 2, 2, 3);
      }

    } else if (obj.type === "terraceSeat") {
      ctx.fillStyle = "#24180f";
      ctx.fillRect(obj.x + 2, obj.y + 4, obj.w - 4, 6);
      ctx.fillRect(obj.x + 3, obj.y + 10, 2, 4);
      ctx.fillRect(obj.x + obj.w - 5, obj.y + 10, 2, 4);
      ctx.fillStyle = "#78502e";
      ctx.fillRect(obj.x + 1, obj.y + 2, obj.w - 2, 4);
      ctx.fillStyle = "#a97943";
      ctx.fillRect(obj.x + 3, obj.y + 3, obj.w - 6, 2);

    } else if (obj.type === "spencerBody") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(obj.x, obj.y + 9, obj.w, 3);
      ctx.fillStyle = "#363b3b";
      ctx.fillRect(obj.x + 1, obj.y + 7, 10, 4);
      ctx.fillStyle = "#6a4938";
      ctx.fillRect(obj.x + 9, obj.y + 4, 8, 6);
      ctx.fillStyle = "#b99272";
      ctx.fillRect(obj.x + 15, obj.y + 3, 5, 5);
      ctx.fillStyle = "#5b3028";
      ctx.fillRect(obj.x + 12, obj.y + 8, 4, 2);

    } else if (obj.type === "bazooka") {
      ctx.fillStyle = "#151915";
      ctx.fillRect(obj.x, obj.y + 1, obj.w, obj.h - 1);
      ctx.fillStyle = "#556249";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 6, 3);
      ctx.fillStyle = "#9a9b87";
      ctx.fillRect(obj.x + obj.w - 5, obj.y, 4, obj.h);
      ctx.fillStyle = "#302b20";
      ctx.fillRect(obj.x + 5, obj.y + 4, 3, 3);

    } else if (obj.type === "rollingBoulder") {
      ctx.fillStyle = "#151610";
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w / 2, obj.y + obj.h / 2 + 2, obj.w / 2 + 2, obj.h / 2 - 1, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#5a5547";
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w / 2, obj.y + obj.h / 2, obj.w / 2 - 2, obj.h / 2 - 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#77705b";
      ctx.fillRect(obj.x + 12, obj.y + 9, 17, 6);
      ctx.fillStyle = "#39382f";
      ctx.fillRect(obj.x + 8, obj.y + 38, 34, 8);

    } else if (obj.type === "caveRock") {
      ctx.fillStyle = "#252820";
      ctx.beginPath();
      ctx.moveTo(obj.x + 9, obj.y + 8);
      ctx.lineTo(obj.x + obj.w * 0.28, obj.y + 3);
      ctx.lineTo(obj.x + obj.w * 0.57, obj.y + 8);
      ctx.lineTo(obj.x + obj.w - 7, obj.y + 18);
      ctx.lineTo(obj.x + obj.w - 2, obj.y + obj.h * 0.55);
      ctx.lineTo(obj.x + obj.w - 15, obj.y + obj.h - 8);
      ctx.lineTo(obj.x + obj.w * 0.55, obj.y + obj.h - 2);
      ctx.lineTo(obj.x + 10, obj.y + obj.h - 9);
      ctx.lineTo(obj.x + 2, obj.y + obj.h * 0.52);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#514636";
      ctx.beginPath();
      ctx.moveTo(obj.x + 13, obj.y + 13);
      ctx.lineTo(obj.x + obj.w * 0.3, obj.y + 8);
      ctx.lineTo(obj.x + obj.w * 0.53, obj.y + 15);
      ctx.lineTo(obj.x + obj.w - 15, obj.y + 24);
      ctx.lineTo(obj.x + obj.w - 11, obj.y + obj.h * 0.54);
      ctx.lineTo(obj.x + obj.w - 24, obj.y + obj.h - 15);
      ctx.lineTo(obj.x + obj.w * 0.5, obj.y + obj.h - 10);
      ctx.lineTo(obj.x + 14, obj.y + obj.h - 17);
      ctx.lineTo(obj.x + 10, obj.y + obj.h * 0.52);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#69704a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(obj.x + 21, obj.y + 20);
      ctx.lineTo(obj.x + 39, obj.y + 15);
      ctx.moveTo(obj.x + obj.w - 42, obj.y + obj.h - 24);
      ctx.lineTo(obj.x + obj.w - 27, obj.y + obj.h - 31);
      ctx.stroke();

    } else if (obj.type === "waterPond") {
      ctx.fillStyle = "#252f30";
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w / 2, obj.y + obj.h / 2, obj.w / 2, obj.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#087da4";
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w / 2, obj.y + obj.h / 2, obj.w / 2 - 3, obj.h / 2 - 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#12a9cf";
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w / 2 - 5, obj.y + obj.h / 2 - 4, obj.w / 2 - 13, obj.h / 2 - 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(190, 242, 248, 0.8)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(obj.x + 15, obj.y + 21);
      ctx.lineTo(obj.x + 36, obj.y + 21);
      ctx.moveTo(obj.x + obj.w - 34, obj.y + obj.h - 19);
      ctx.lineTo(obj.x + obj.w - 14, obj.y + obj.h - 19);
      ctx.stroke();

    } else if (obj.type === "brokenGlassTank") {
      ctx.fillStyle = "#263d43";
      ctx.fillRect(obj.x - 3, obj.y - 3, obj.w + 6, obj.h + 6);
      ctx.fillStyle = "rgba(165, 226, 235, 0.38)";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.strokeStyle = "#c8f5f5";
      ctx.lineWidth = 2;
      ctx.strokeRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);

      ctx.strokeStyle = "#e6ffff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(obj.x + 61, obj.y + 3);
      ctx.lineTo(obj.x + 57, obj.y + 18);
      ctx.lineTo(obj.x + 66, obj.y + 27);
      ctx.lineTo(obj.x + 54, obj.y + 39);
      ctx.lineTo(obj.x + 62, obj.y + 50);
      ctx.lineTo(obj.x + 48, obj.y + 63);
      ctx.lineTo(obj.x + 52, obj.y + obj.h - 2);
      ctx.moveTo(obj.x + 57, obj.y + 18);
      ctx.lineTo(obj.x + 43, obj.y + 22);
      ctx.lineTo(obj.x + 37, obj.y + 34);
      ctx.moveTo(obj.x + 66, obj.y + 27);
      ctx.lineTo(obj.x + 80, obj.y + 23);
      ctx.lineTo(obj.x + 91, obj.y + 29);
      ctx.moveTo(obj.x + 54, obj.y + 39);
      ctx.lineTo(obj.x + 39, obj.y + 46);
      ctx.lineTo(obj.x + 33, obj.y + 57);
      ctx.stroke();

      ctx.fillStyle = "#d6f7f7";
      ctx.beginPath();
      ctx.moveTo(obj.x + obj.w - 2, obj.y + 3);
      ctx.lineTo(obj.x + obj.w - 18, obj.y + 3);
      ctx.lineTo(obj.x + obj.w - 2, obj.y + 19);
      ctx.closePath();
      ctx.fill();

    } else if (obj.type === "waterCrate") {
      ctx.fillStyle = "#29190f";
      ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
      ctx.fillStyle = "#8b5631";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#b47a45";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, 3);
      ctx.fillStyle = "#5b351f";
      ctx.fillRect(obj.x + 3, obj.y + 7, 3, obj.h - 14);
      ctx.fillRect(obj.x + obj.w - 6, obj.y + 7, 3, obj.h - 14);
      ctx.strokeStyle = "#c18a52";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(obj.x + 6, obj.y + 7);
      ctx.lineTo(obj.x + obj.w - 6, obj.y + obj.h - 7);
      ctx.moveTo(obj.x + obj.w - 6, obj.y + 7);
      ctx.lineTo(obj.x + 6, obj.y + obj.h - 7);
      ctx.stroke();

    } else if (obj.type === "waterArea") {
      ctx.fillStyle = "#075582";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#1099ce";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      ctx.fillStyle = "#54c8ec";
      ctx.fillRect(obj.x + 8, obj.y + 10, 19, 2);
      ctx.fillRect(obj.x + 39, obj.y + 25, 22, 2);
      ctx.fillRect(obj.x + 20, obj.y + 51, 16, 2);

    } else if (obj.type === "crankSocket") {
      ctx.fillStyle = "#23180f";
      ctx.fillRect(obj.x, obj.y + 3, obj.w, obj.h - 3);
      ctx.fillStyle = "#74604a";
      ctx.fillRect(obj.x + 2, obj.y + 4, obj.w - 4, obj.h - 6);
      ctx.fillStyle = "#211c16";
      ctx.fillRect(obj.x + 8, obj.y + 7, 7, 7);
      ctx.fillStyle = "#b5a27c";
      ctx.fillRect(obj.x + 10, obj.y + 4, 3, 12);
      ctx.fillRect(obj.x + 6, obj.y + 8, 11, 3);

    } else if (obj.type === "batterySocket") {
      ctx.fillStyle = "#171916";
      ctx.fillRect(obj.x, obj.y + 3, obj.w, obj.h - 3);
      ctx.fillStyle = "#62665b";
      ctx.fillRect(obj.x + 2, obj.y + 4, obj.w - 4, obj.h - 6);
      ctx.fillStyle = "#252820";
      ctx.fillRect(obj.x + 5, obj.y + 7, obj.w - 10, obj.h - 11);
      ctx.fillStyle = "#bb3930";
      ctx.fillRect(obj.x + 5, obj.y + 2, 5, 3);
      ctx.fillStyle = "#d0cbb7";
      ctx.fillRect(obj.x + obj.w - 10, obj.y + 2, 5, 3);

    } else if (obj.type === "projectionBeam") {
      const beam = ctx.createLinearGradient(obj.x, obj.y, obj.x + obj.w, obj.y + obj.h / 2);
      beam.addColorStop(0, "rgba(190, 232, 255, 0.2)");
      beam.addColorStop(1, "rgba(190, 232, 255, 0.04)");
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(obj.x, obj.y);
      ctx.lineTo(obj.x + obj.w, obj.y + obj.h / 2);
      ctx.lineTo(obj.x, obj.y + obj.h);
      ctx.closePath();
      ctx.fill();

    } else if (obj.type === "projectionScreen") {
      ctx.fillStyle = "#353a3a";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#c6d4d6";
      ctx.fillRect(obj.x + 3, obj.y + 3, obj.w - 6, obj.h - 6);
      ctx.fillStyle = "rgba(100, 165, 190, 0.55)";
      ctx.fillRect(obj.x + 5, obj.y + 12, obj.w - 10, obj.h - 24);
      ctx.fillStyle = "rgba(237, 240, 219, 0.7)";
      ctx.fillRect(obj.x + 6, obj.y + 23, 2, 13);
      ctx.fillRect(obj.x + 9, obj.y + 42, 2, 9);

    } else if (obj.type === "projector") {
      ctx.fillStyle = "#202521";
      ctx.fillRect(obj.x + 4, obj.y + 3, obj.w - 4, obj.h - 5);
      ctx.fillStyle = "#59625b";
      ctx.fillRect(obj.x + 7, obj.y + 1, obj.w - 8, obj.h - 9);
      ctx.fillStyle = "#111513";
      ctx.fillRect(obj.x, obj.y + 5, 7, 6);
      ctx.fillStyle = "#8ed6e8";
      ctx.fillRect(obj.x + 1, obj.y + 6, 3, 4);

    } else if (obj.type === "morgueStructure") {
      ctx.fillStyle = "#363b3a";
      ctx.fillRect(obj.x + 5, obj.y + 5, obj.w - 10, obj.h - 10);
      ctx.fillStyle = "#414746";
      ctx.fillRect(obj.x + 9, obj.y + 14, obj.w - 18, 2);
      ctx.fillRect(obj.x + 9, obj.y + 39, obj.w - 18, 2);
      ctx.fillRect(obj.x + 9, obj.y + 60, obj.w - 18, 2);
      ctx.fillStyle = "#262b2b";
      ctx.fillRect(obj.x, obj.y, obj.w, 5);
      ctx.fillRect(obj.x, obj.y, 5, obj.h);
      ctx.fillRect(obj.x + obj.w - 5, obj.y, 5, obj.h);
      ctx.fillRect(obj.x, obj.y + obj.h - 5, 97, 5);
      ctx.fillRect(obj.x + 125, obj.y + obj.h - 5, obj.w - 125, 5);
      ctx.fillStyle = "#707674";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, 2);
      ctx.fillRect(obj.x + 2, obj.y + 2, 2, obj.h - 4);
      ctx.fillRect(obj.x + obj.w - 4, obj.y + 2, 2, obj.h - 4);

    } else if (obj.type === "morgueStretcher") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
      ctx.fillRect(obj.x + 3, obj.y + obj.h - 2, obj.w - 6, 4);
      ctx.fillStyle = "#454b4b";
      ctx.fillRect(obj.x + 5, obj.y + obj.h - 5, 3, 5);
      ctx.fillRect(obj.x + obj.w - 8, obj.y + obj.h - 5, 3, 5);
      ctx.fillStyle = "#aeb4b0";
      ctx.fillRect(obj.x + 1, obj.y + 4, obj.w - 2, obj.h - 8);
      ctx.fillStyle = "#d2d3cc";
      ctx.fillRect(obj.x + 5, obj.y + 6, obj.w - 10, obj.h - 12);
      ctx.fillStyle = "#7e8582";
      ctx.fillRect(obj.x + 5, obj.y + 3, obj.w - 10, 2);
      ctx.fillRect(obj.x + 5, obj.y + obj.h - 5, obj.w - 10, 2);
      ctx.fillStyle = "#c5c8c2";
      ctx.fillRect(obj.x + 8, obj.y + 7, 11, 5);

    } else if (obj.type === "operatingTable") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
      ctx.fillRect(obj.x + 4, obj.y + obj.h - 3, obj.w - 8, 5);
      ctx.fillStyle = "#3f4948";
      ctx.fillRect(obj.x + 7, obj.y + obj.h - 6, 4, 6);
      ctx.fillRect(obj.x + obj.w - 11, obj.y + obj.h - 6, 4, 6);
      ctx.fillStyle = "#727e7c";
      ctx.fillRect(obj.x, obj.y + 4, obj.w, obj.h - 9);
      ctx.fillStyle = "#c2c8c3";
      ctx.fillRect(obj.x + 3, obj.y + 6, obj.w - 6, obj.h - 13);
      ctx.fillStyle = "#edf0e8";
      ctx.fillRect(obj.x + 7, obj.y + 10, obj.w - 14, obj.h - 21);
      ctx.fillStyle = "#8d9894";
      ctx.fillRect(obj.x + 12, obj.y + 8, 2, obj.h - 16);
      ctx.fillRect(obj.x + obj.w - 14, obj.y + 8, 2, obj.h - 16);

    } else if (obj.type === "surgicalLamp") {
      ctx.fillStyle = "#3b4240";
      ctx.fillRect(obj.x + obj.w / 2 - 2, obj.y, 4, 8);
      ctx.fillRect(obj.x + 6, obj.y + 7, obj.w - 12, 3);
      ctx.fillStyle = "#aab2ad";
      ctx.fillRect(obj.x + 4, obj.y + 8, obj.w - 8, 10);
      ctx.fillStyle = "#e8e4c9";
      for (let lightX = obj.x + 9; lightX < obj.x + obj.w - 5; lightX += 8) {
        ctx.fillRect(lightX, obj.y + 11, 4, 4);
      }

    } else if (obj.type === "airDuct") {
      ctx.fillStyle = "#272e2d";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#68716e";
      ctx.fillRect(obj.x + 3, obj.y + 3, obj.w - 6, obj.h - 6);
      ctx.fillStyle = "#202625";
      ctx.fillRect(obj.x + 6, obj.y + 5, obj.w - 12, obj.h - 10);
      ctx.strokeStyle = "#818a85";
      ctx.lineWidth = 1;
      for (let ventX = obj.x + 11; ventX < obj.x + obj.w - 5; ventX += 7) {
        ctx.beginPath();
        ctx.moveTo(ventX, obj.y + 5);
        ctx.lineTo(ventX, obj.y + obj.h - 5);
        ctx.stroke();
      }

    } else if (obj.type === "moDiskTerminal") {
      ctx.fillStyle = "#202624";
      ctx.fillRect(obj.x, obj.y + 5, obj.w, obj.h - 5);
      ctx.fillStyle = "#111714";
      ctx.fillRect(obj.x + 3, obj.y, obj.w - 6, 9);
      ctx.fillStyle = "#769887";
      ctx.fillRect(obj.x + 5, obj.y + 2, obj.w - 10, 5);
      ctx.fillStyle = "#b8c6ad";
      ctx.fillRect(obj.x + 7, obj.y + 3, 7, 1);
      ctx.fillStyle = "#0d1210";
      ctx.fillRect(obj.x + 7, obj.y + obj.h - 4, obj.w - 14, 2);

    } else if (obj.type === "xrayViewer") {
      ctx.fillStyle = "#252d30";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#8a9690";
      ctx.fillRect(obj.x + 3, obj.y + 3, obj.w - 6, obj.h - 6);
      ctx.fillStyle = "#d8e2d5";
      ctx.fillRect(obj.x + 6, obj.y + 7, obj.w - 12, obj.h - 14);
      ctx.fillStyle = "#849a91";
      ctx.fillRect(obj.x + 13, obj.y + 13, 3, 29);
      ctx.fillRect(obj.x + 9, obj.y + 22, 11, 3);
      ctx.fillRect(obj.x + 11, obj.y + 43, 8, 3);

    } else if (obj.type === "xrayMachine") {
      ctx.fillStyle = "#343d3d";
      ctx.fillRect(obj.x + 3, obj.y + 8, obj.w - 6, obj.h - 8);
      ctx.fillStyle = "#a5aaa2";
      ctx.fillRect(obj.x + 5, obj.y + 10, obj.w - 10, 14);
      ctx.fillStyle = "#344a4b";
      ctx.fillRect(obj.x + 8, obj.y + 12, obj.w - 16, 9);
      ctx.fillStyle = "#82b5a0";
      ctx.fillRect(obj.x + 11, obj.y + 15, 7, 2);
      ctx.fillStyle = "#747a73";
      ctx.fillRect(obj.x + 11, obj.y + 27, 4, 4);
      ctx.fillRect(obj.x + 19, obj.y + 27, 4, 4);
      ctx.fillStyle = "#202625";
      ctx.fillRect(obj.x, obj.y, obj.w, 9);
      ctx.fillRect(obj.x + 7, obj.y + obj.h - 4, 5, 4);
      ctx.fillRect(obj.x + obj.w - 12, obj.y + obj.h - 4, 5, 4);

    } else if (obj.type === "woodenCrate") {
      ctx.fillStyle = "#382515";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#79502e";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      ctx.strokeStyle = "#4b321f";
      ctx.lineWidth = 2;
      ctx.strokeRect(obj.x + 4, obj.y + 4, obj.w - 8, obj.h - 8);
      ctx.beginPath();
      ctx.moveTo(obj.x + 5, obj.y + 5);
      ctx.lineTo(obj.x + obj.w - 5, obj.y + obj.h - 5);
      ctx.moveTo(obj.x + obj.w - 5, obj.y + 5);
      ctx.lineTo(obj.x + 5, obj.y + obj.h - 5);
      ctx.stroke();

    } else if (obj.type === "labBench") {
      ctx.fillStyle = "#353a39";
      ctx.fillRect(obj.x, obj.y + 4, obj.w, obj.h - 4);
      ctx.fillStyle = "#a6a9a2";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, 5);
      ctx.fillStyle = "#454b4a";
      ctx.fillRect(obj.x + 6, obj.y + 9, obj.w - 12, 2);
      ctx.fillStyle = "#5e8d77";
      ctx.fillRect(obj.x + 12, obj.y + 14, 9, 10);
      ctx.fillStyle = "#c4d8c2";
      ctx.fillRect(obj.x + 14, obj.y + 16, 5, 5);
      ctx.fillStyle = "#b8a66c";
      ctx.fillRect(obj.x + 37, obj.y + 13, 8, 7);

    } else if (obj.type === "labComputer") {
      ctx.fillStyle = "#252a29";
      ctx.fillRect(obj.x + 4, obj.y + 2, obj.w - 8, 21);
      ctx.fillStyle = "#606b68";
      ctx.fillRect(obj.x + 6, obj.y + 4, obj.w - 12, 15);
      ctx.fillStyle = "#76a99a";
      ctx.fillRect(obj.x + 8, obj.y + 6, obj.w - 16, 11);
      ctx.fillStyle = "#c1d8c8";
      ctx.fillRect(obj.x + 11, obj.y + 9, 13, 1);
      ctx.fillRect(obj.x + 11, obj.y + 12, 18, 1);
      ctx.fillStyle = "#414644";
      ctx.fillRect(obj.x + 16, obj.y + 23, 10, 5);
      ctx.fillStyle = "#252a29";
      ctx.fillRect(obj.x + 5, obj.y + 29, obj.w - 10, 4);

    } else if (obj.type === "slides") {
      ctx.fillStyle = "#262a27";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#d1c78f";
      ctx.fillRect(obj.x + 2, obj.y + 1, obj.w - 4, obj.h - 2);
      ctx.fillStyle = "#687b72";
      ctx.fillRect(obj.x + 4, obj.y + 2, 4, obj.h - 4);
      ctx.fillRect(obj.x + 9, obj.y + 2, 2, obj.h - 4);

    } else if (obj.type === "helicopterShadow") {
      ctx.save();
      ctx.globalAlpha = 0.38;
      ctx.fillStyle = "#111411";
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w * 0.48, obj.y + obj.h * 0.56, obj.w * 0.27, obj.h * 0.24, -0.12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(obj.x + obj.w * 0.62, obj.y + obj.h * 0.46, obj.w * 0.27, obj.h * 0.12);
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w * 0.84, obj.y + obj.h * 0.52, obj.w * 0.12, obj.h * 0.1, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(obj.x + obj.w * 0.47, obj.y + obj.h * 0.08, obj.w * 0.035, obj.h * 0.35);
      ctx.fillRect(obj.x + obj.w * 0.25, obj.y + obj.h * 0.24, obj.w * 0.48, obj.h * 0.035);
      ctx.restore();

    } else if (obj.type === "tyrantTube" || obj.type === "specimenTube") {
      ctx.fillStyle = "#202b2d";
      ctx.fillRect(obj.x - 2, obj.y - 2, obj.w + 4, obj.h + 4);
      ctx.fillStyle = obj.type === "tyrantTube" ? "rgba(145, 199, 190, 0.22)" : "rgba(123, 192, 183, 0.28)";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#9aa9a0";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, 3);
      ctx.fillRect(obj.x + 2, obj.y + obj.h - 5, obj.w - 4, 3);
      ctx.fillStyle = "#637573";
      ctx.fillRect(obj.x + 4, obj.y + 6, 2, obj.h - 12);
      ctx.fillRect(obj.x + obj.w - 6, obj.y + 6, 2, obj.h - 12);
      if (obj.type === "tyrantTube") {
        ctx.fillStyle = "#454a43";
        ctx.fillRect(obj.x + 13, obj.y + 10, 12, 34);
        ctx.fillStyle = "#777a70";
        ctx.fillRect(obj.x + 14, obj.y + 7, 10, 11);
        ctx.fillStyle = "#6f2826";
        ctx.fillRect(obj.x + 13, obj.y + 22, 13, 10);
      } else {
        ctx.fillStyle = "rgba(205, 220, 191, 0.72)";
        ctx.fillRect(obj.x + obj.w / 2 - 4, obj.y + 12, 8, obj.h - 22);
        ctx.fillRect(obj.x + obj.w / 2 - 7, obj.y + 8, 14, 7);
      }
      ctx.strokeStyle = "rgba(218, 245, 241, 0.7)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(obj.x + 9, obj.y + 5);
      ctx.lineTo(obj.x + 9, obj.y + obj.h - 6);
      ctx.stroke();

    } else if (obj.type === "tyrant") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.38)";
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w / 2, obj.y + obj.h - 3, obj.w * 0.48, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#252724";
      ctx.fillRect(obj.x + 7, obj.y + 36, 8, 15);
      ctx.fillRect(obj.x + 19, obj.y + 35, 8, 16);
      ctx.fillStyle = "#111310";
      ctx.fillRect(obj.x + 5, obj.y + 49, 11, 4);
      ctx.fillRect(obj.x + 18, obj.y + 49, 12, 4);
      ctx.fillStyle = "#565951";
      ctx.fillRect(obj.x + 5, obj.y + 17, 25, 23);
      ctx.fillRect(obj.x + 2, obj.y + 19, 8, 11);
      ctx.fillRect(obj.x + 24, obj.y + 21, 7, 15);
      ctx.fillStyle = "#777a70";
      ctx.fillRect(obj.x + 12, obj.y + 7, 14, 13);
      ctx.fillRect(obj.x + 15, obj.y + 3, 9, 7);
      ctx.fillStyle = "#252724";
      ctx.fillRect(obj.x + 13, obj.y + 12, 3, 2);
      ctx.fillRect(obj.x + 23, obj.y + 12, 3, 2);
      ctx.fillStyle = "#762f2a";
      ctx.fillRect(obj.x + 15, obj.y + 23, 7, 10);
      ctx.fillStyle = "#9b9b8c";
      ctx.fillRect(obj.x + 28, obj.y + 33, 4, 4);
      ctx.fillRect(obj.x + 29, obj.y + 37, 2, 5);

    } else if (obj.type === "flare") {
      ctx.fillStyle = "#1b1712";
      ctx.fillRect(obj.x + 2, obj.y + 4, obj.w - 4, obj.h - 5);
      ctx.fillStyle = "#a92d21";
      ctx.fillRect(obj.x + 1, obj.y + 3, obj.w - 2, obj.h - 6);
      ctx.fillStyle = "#e05b2f";
      ctx.fillRect(obj.x + 2, obj.y + 1, obj.w - 4, 4);
      ctx.fillStyle = "#e5bd62";
      ctx.fillRect(obj.x + 3, obj.y, obj.w - 6, 2);

    } else if (obj.type === "rocketLauncher") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
      ctx.fillRect(obj.x + 2, obj.y + obj.h - 2, obj.w - 4, 3);
      ctx.fillStyle = "#454a3c";
      ctx.fillRect(obj.x + 4, obj.y + 3, obj.w - 9, 5);
      ctx.fillStyle = "#242820";
      ctx.fillRect(obj.x + 1, obj.y + 2, 6, 7);
      ctx.fillRect(obj.x + obj.w - 8, obj.y + 4, 7, 3);
      ctx.fillStyle = "#77796a";
      ctx.fillRect(obj.x + 11, obj.y + 1, 7, 2);
      ctx.fillStyle = "#252820";
      ctx.fillRect(obj.x + 14, obj.y + 8, 3, 4);
      ctx.fillRect(obj.x + 10, obj.y + 8, 8, 2);

    } else if (obj.type === "elevator") {
      ctx.fillStyle = "#11130f";
      ctx.fillRect(obj.x - 3, obj.y - 3, obj.w + 6, obj.h + 6);
      ctx.fillStyle = "#3d4036";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.strokeStyle = PALETTE.trim;
      ctx.lineWidth = 2;
      ctx.strokeRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      ctx.fillStyle = "#171916";
      ctx.fillRect(obj.x + 7, obj.y + 5, obj.w - 14, obj.h - 10);
      ctx.fillStyle = "#d89a42";
      ctx.fillRect(obj.x + obj.w - 7, obj.y + obj.h / 2 - 2, 3, 4);

    } else if (obj.type === "stairs" || obj.type === "stairsVertical") {
      // Escalera con peldaños VERTICALES (para Elevator Stairway)
      ctx.fillStyle = PALETTE.stairs;
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.strokeStyle = PALETTE.shadow;
      ctx.lineWidth = 2;
      for (let x = obj.x + 8; x < obj.x + obj.w; x += 10) {
        ctx.beginPath();
        ctx.moveTo(x, obj.y);
        ctx.lineTo(x, obj.y + obj.h);
        ctx.stroke();
      }
    } else if (obj.type === "lowerFloorView") {
      ctx.fillStyle = floorPattern;
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.strokeStyle = "#080b08";
      ctx.lineWidth = 3;
      ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
      if (obj.railings) {
        ctx.strokeStyle = "#26382a";
        ctx.lineWidth = 1;
        for (let railX = obj.x + 5; railX < obj.x + obj.w; railX += 9) {
          ctx.beginPath();
          ctx.moveTo(railX, obj.y);
          ctx.lineTo(railX, obj.y + obj.h);
          ctx.stroke();
        }
      }
    } else if (obj.type === "stairwell") {
      ctx.fillStyle = "#080b08";
      ctx.fillRect(obj.x - 3, obj.y - 3, obj.w + 6, obj.h + 6);
      ctx.fillStyle = "#354b2b";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.strokeStyle = "#172317";
      ctx.lineWidth = 2;
      for (let stepX = obj.x + 7; stepX < obj.x + obj.w; stepX += 13) {
        ctx.beginPath();
        ctx.moveTo(stepX, obj.y + 2);
        ctx.lineTo(stepX, obj.y + obj.h - 2);
        ctx.stroke();
      }
      ctx.strokeStyle = "#91a05e";
      ctx.lineWidth = 1;
      ctx.strokeRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
    } else if (obj.type === "lowerFloorTable") {
      ctx.fillStyle = "#2b160a";
      ctx.fillRect(obj.x, obj.y + 3, obj.w, obj.h - 6);
      ctx.fillRect(obj.x + 7, obj.y, obj.w - 14, obj.h);
      ctx.fillStyle = "#68401e";
      ctx.fillRect(obj.x + 4, obj.y + 5, obj.w - 8, obj.h - 10);
      ctx.fillStyle = "#8a5b2e";
      ctx.fillRect(obj.x + 12, obj.y + 8, obj.w - 24, obj.h - 16);
    } else if (obj.type === "floorHole") {
      ctx.fillStyle = "#21140b";
      ctx.fillRect(obj.x - 2, obj.y + 2, obj.w + 4, obj.h);
      ctx.fillStyle = "#080907";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      ctx.fillStyle = "#77502b";
      ctx.fillRect(obj.x, obj.y, obj.w, 3);
      ctx.fillRect(obj.x, obj.y + obj.h - 3, obj.w, 3);
      ctx.fillRect(obj.x, obj.y + 3, 3, obj.h - 6);
      ctx.fillRect(obj.x + obj.w - 3, obj.y + 3, 3, obj.h - 6);
      ctx.fillStyle = "#a3723e";
      ctx.fillRect(obj.x + 4, obj.y + 3, obj.w - 8, 1);

    } else if (obj.type === "pushableStatue") {
      ctx.fillStyle = "#171815";
      ctx.fillRect(obj.x + 2, obj.y + 21, obj.w - 4, 8);
      ctx.fillStyle = "#777b70";
      ctx.fillRect(obj.x + 4, obj.y + 19, obj.w - 8, 7);
      ctx.fillStyle = "#a5a99a";
      ctx.fillRect(obj.x + 7, obj.y + 7, obj.w - 14, 13);
      ctx.fillRect(obj.x + 9, obj.y + 3, obj.w - 18, 6);
      ctx.fillStyle = "#d5bc45";
      ctx.fillRect(obj.x + 12, obj.y + 11, 4, 5);
    } else if (obj.type === "stairsHorizontal") {
      // Escalera con peldaños HORIZONTALES (para Main Hall)
      ctx.fillStyle = PALETTE.stairs;
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.strokeStyle = PALETTE.shadow;
      ctx.lineWidth = 2;
      for (let y = obj.y + 4; y < obj.y + obj.h; y += 8) {
        ctx.beginPath();
        ctx.moveTo(obj.x, y);
        ctx.lineTo(obj.x + obj.w, y);
        ctx.stroke();
      }
    } else if (obj.type === "balconyLeft" || obj.type === "balconyRight") {
      // Piso del balcón superior
      ctx.fillStyle = "#4a2912";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

      // Pasamanos / Baranda horizontal
      const railingY = 48;
      ctx.strokeStyle = PALETTE.trim;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(obj.x, railingY);
      ctx.lineTo(obj.x + obj.w, railingY);
      ctx.stroke();

      // Barrotes/Barras VERTICALES del balcón
      ctx.lineWidth = 1;
      const startX = obj.type === "balconyLeft" ? 24 : 204;
      const endX = obj.type === "balconyLeft" ? 116 : 296;
      for (let rx = startX; rx <= endX; rx += 8) {
        ctx.beginPath();
        ctx.moveTo(rx, 24);
        ctx.lineTo(rx, railingY);
        ctx.stroke();
      }

      } else if (obj.type === "monsterPlant") {
      // Planta Monstruo (Planta 42 / Tentáculos)
      ctx.fillStyle = "#1e4d2b"; // Base tallo verde oscuro
      ctx.fillRect(obj.x + 10, obj.y, 15, obj.h);

      // Núcleo / Flor carnívora central
      ctx.fillStyle = "#800020";
      ctx.fillRect(obj.x + 5, obj.y + 25, 25, 30);
      ctx.fillStyle = "#d84e1b";
      ctx.fillRect(obj.x + 10, obj.y + 30, 15, 20);

      // Tentáculos que se extienden
      ctx.fillStyle = "#2d7a42";
      ctx.fillRect(obj.x, obj.y + 10, 10, 4);
      ctx.fillRect(obj.x + 25, obj.y + 5, 10, 4);
      ctx.fillRect(obj.x - 5, obj.y + 50, 12, 5);
      ctx.fillRect(obj.x + 28, obj.y + 60, 12, 5);

    } else if (obj.type === "waterPump") {
      // Motor / Sistema de Bombeo de Químico 'f'
      ctx.fillStyle = "#4a4e52";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#2b2e31";
      ctx.fillRect(obj.x + 3, obj.y + 3, obj.w - 6, obj.h - 6);
      
      // Tapa del depósito / Filtro químico (Verde radioactivo)
      ctx.fillStyle = "#32cd32";
      ctx.fillRect(obj.x + 6, obj.y + 6, 12, 8);
      ctx.fillStyle = "#d89a42"; // Válvula de bronce
      ctx.fillRect(obj.x + obj.w - 12, obj.y + 8, 8, 8);

    } else if (obj.type === "blueHerb") {
      // Hierba Azul 'b' (Maceta con hoja azul)
      ctx.fillStyle = "#5c341d"; // Maceta
      ctx.fillRect(obj.x + 2, obj.y + 5, 6, 5);
      ctx.fillStyle = "#4169e1"; // Planta azul
      ctx.fillRect(obj.x, obj.y, 10, 6);

    } else if (obj.type === "giantBeehive") {
      ctx.fillStyle = "#50341a";
      ctx.fillRect(obj.x + 3, obj.y + 1, obj.w - 6, obj.h - 2);
      ctx.fillStyle = "#8a6228";
      ctx.fillRect(obj.x + 6, obj.y + 3, obj.w - 12, obj.h - 6);
      ctx.fillStyle = "#b88a3b";
      ctx.fillRect(obj.x + 9, obj.y + 5, obj.w - 18, obj.h - 10);
      ctx.fillStyle = "#553718";
      ctx.fillRect(obj.x + 12, obj.y + 9, obj.w - 24, obj.h - 17);
      ctx.fillStyle = "#120f0b";
      ctx.fillRect(obj.x + 15, obj.y + 18, 8, 9);
      ctx.fillStyle = "#d4ad61";
      ctx.fillRect(obj.x + 2, obj.y + 8, 3, 14);
      ctx.fillRect(obj.x + obj.w - 5, obj.y + 8, 3, 14);

    } else if (obj.type === "keypadPanel") {
      ctx.fillStyle = "#101313";
      ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
      ctx.fillStyle = "#59625b";
      ctx.fillRect(obj.x + 1, obj.y + 1, obj.w - 2, obj.h - 2);
      ctx.fillStyle = "#262a26";
      if (obj.w > obj.h) {
        ctx.fillStyle = "#b5cf8d";
        ctx.fillRect(obj.x + 3, obj.y + 2, obj.w - 6, 3);
        for (let row = 0; row < 2; row++) {
          for (let col = 0; col < 3; col++) {
            ctx.fillRect(obj.x + 4 + col * 5, obj.y + 7 + row * 3, 3, 2);
          }
        }
      } else {
        ctx.fillStyle = "#b5cf8d";
        ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, 3);
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 2; col++) {
            ctx.fillStyle = "#262a26";
            ctx.fillRect(obj.x + 2 + col * 3, obj.y + 7 + row * 3, 2, 2);
          }
        }
      }

    } else if (obj.type === "room002Key") {
      ctx.fillStyle = "#d7b64b";
      ctx.fillRect(obj.x, obj.y, 5, 5);
      ctx.fillRect(obj.x + 4, obj.y + 2, 7, 2);
      ctx.fillRect(obj.x + 8, obj.y + 4, 2, 3);
      ctx.fillStyle = "#725326";
      ctx.fillRect(obj.x + 2, obj.y + 2, 2, 2);

    } else if (obj.type === "room003Key") {
      ctx.fillStyle = "#d5b34a";
      ctx.fillRect(obj.x, obj.y + 1, 5, 5);
      ctx.fillStyle = "#f2dc83";
      ctx.fillRect(obj.x + 1, obj.y + 2, 3, 3);
      ctx.fillStyle = "#95702f";
      ctx.fillRect(obj.x + 4, obj.y + 3, 7, 2);
      ctx.fillRect(obj.x + 9, obj.y + 5, 2, 2);

    } else if (obj.type === "powerMachine") {
      ctx.fillStyle = "#102b1a";
      ctx.fillRect(obj.x - 2, obj.y - 2, obj.w + 4, obj.h + 4);
      ctx.fillStyle = "#17452a";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#28663a";
      ctx.fillRect(obj.x + 3, obj.y + 3, obj.w - 6, Math.min(5, obj.h - 6));
      ctx.fillStyle = "#0b2417";
      for (let ventY = obj.y + 12; ventY < obj.y + obj.h - 5; ventY += 8) {
        ctx.fillRect(obj.x + 4, ventY, Math.max(2, obj.w - 8), 3);
      }
      ctx.fillStyle = "#7b9d56";
      ctx.fillRect(obj.x + obj.w - 6, obj.y + 4, 3, 2);
      ctx.fillStyle = "#43644a";
      ctx.fillRect(obj.x + 2, obj.y + obj.h - 4, obj.w - 4, 2);

    } else if (obj.type === "chimera") {
      const sway = obj.animFrame ? 1 : 0;
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(obj.x + 5, obj.y + obj.h - 3, obj.w - 10, 4);
      if (!obj.descended) {
        ctx.fillStyle = "#191c19";
        ctx.fillRect(obj.x + 6, obj.y, 2, 7);
        ctx.fillRect(obj.x + obj.w - 8, obj.y, 2, 7);
        ctx.fillStyle = "#242b25";
        ctx.fillRect(obj.x + 2, obj.y + 6, 6, 4);
        ctx.fillRect(obj.x + obj.w - 8, obj.y + 6, 6, 4);
        ctx.fillRect(obj.x + 6, obj.y + 7 + sway, obj.w - 12, 15);
        ctx.fillStyle = "#62645a";
        ctx.fillRect(obj.x + 8, obj.y + 11, obj.w - 16, 10);
        ctx.fillStyle = "#8b2924";
        ctx.fillRect(obj.x + 10, obj.y + 12, obj.w - 20, 7);
        ctx.fillRect(obj.x + 11, obj.y + 20, 3, 6);
        ctx.fillRect(obj.x + obj.w - 14, obj.y + 20, 3, 6);
        ctx.fillStyle = "#a7a397";
        ctx.fillRect(obj.x + 8, obj.y + 22, obj.w - 16, 7);
        ctx.fillStyle = "#a82820";
        ctx.fillRect(obj.x + 10, obj.y + 24, 2, 2);
        ctx.fillRect(obj.x + obj.w - 12, obj.y + 24, 2, 2);
        ctx.fillStyle = "#d1c6a3";
        ctx.fillRect(obj.x + 11, obj.y + 28, 3, 2);
      } else {
        ctx.fillStyle = "#222722";
        ctx.fillRect(obj.x + 3, obj.y + 12, obj.w - 6, 13);
        ctx.fillRect(obj.x, obj.y + 13, 7, 9);
        ctx.fillRect(obj.x + obj.w - 7, obj.y + 13, 7, 9);
        ctx.fillStyle = "#6b6a5d";
        ctx.fillRect(obj.x + 7, obj.y + 7, obj.w - 14, 10);
        ctx.fillStyle = "#a7a397";
        ctx.fillRect(obj.x + 9, obj.y + 8, obj.w - 18, 7);
        ctx.fillStyle = "#8b2924";
        ctx.fillRect(obj.x + 10, obj.y + 17, obj.w - 20, 8);
        ctx.fillStyle = "#b42c23";
        ctx.fillRect(obj.x + 11, obj.y + 18, 2, 3);
        ctx.fillRect(obj.x + obj.w - 13, obj.y + 18, 2, 3);
      }

    } else if (obj.type === "hunter") {
      const step = obj.animFrame ? 1 : 0;
      ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
      ctx.fillRect(obj.x + 2, obj.y + obj.h - 3, obj.w - 4, 4);
      ctx.fillStyle = "#16351e";
      ctx.fillRect(obj.x + 5, obj.y + 5, 16, 17);
      ctx.fillRect(obj.x + 2, obj.y + 7, 7, 12);
      ctx.fillRect(obj.x + 18, obj.y + 7, 7, 12);
      ctx.fillStyle = "#367a31";
      ctx.fillRect(obj.x + 7, obj.y + 3, 12, 12);
      ctx.fillRect(obj.x + 4, obj.y + 8, 5, 8);
      ctx.fillRect(obj.x + 19, obj.y + 8, 5, 8);
      ctx.fillRect(obj.x + 7, obj.y + 19, 6, 8 - step);
      ctx.fillRect(obj.x + 15, obj.y + 19, 6, 8 + step);
      ctx.fillStyle = "#7fb84b";
      ctx.fillRect(obj.x + 9, obj.y + 5, 8, 3);
      ctx.fillRect(obj.x + 8, obj.y + 12, 10, 3);
      ctx.fillStyle = "#b52a20";
      ctx.fillRect(obj.x + 9, obj.y + 8, 2, 2);
      ctx.fillRect(obj.x + 16, obj.y + 8, 2, 2);
      ctx.fillStyle = "#d5d1a0";
      ctx.fillRect(obj.x + 5, obj.y + 17, 3, 2);
      ctx.fillRect(obj.x + 20, obj.y + 17, 3, 2);

    } else if (obj.type === "wasp") {
      ctx.fillStyle = "rgba(195, 220, 216, 0.65)";
      ctx.fillRect(obj.x + 2, obj.y, 4, 3);
      ctx.fillRect(obj.x + 7, obj.y, 4, 3);
      ctx.fillStyle = "#17130d";
      ctx.fillRect(obj.x + 1, obj.y + 3, 10, 5);
      ctx.fillRect(obj.x + 8, obj.y + 4, 4, 4);
      ctx.fillStyle = "#d8ac27";
      ctx.fillRect(obj.x + 3, obj.y + 4, 6, 3);
      ctx.fillStyle = "#14100d";
      ctx.fillRect(obj.x + 5, obj.y + 4, 2, 3);
      ctx.fillRect(obj.x + 11, obj.y + 6, 2, 4);

    } else if (obj.type === "lockpick") {
      ctx.strokeStyle = "#c8c4ad";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(obj.x + 4, obj.y + 4, 3, 0, Math.PI * 2);
      ctx.moveTo(obj.x + 7, obj.y + 4);
      ctx.lineTo(obj.x + obj.w - 1, obj.y + 4);
      ctx.lineTo(obj.x + obj.w - 1, obj.y + 7);
      ctx.moveTo(obj.x + obj.w - 4, obj.y + 4);
      ctx.lineTo(obj.x + obj.w - 4, obj.y + 6);
      ctx.stroke();

    } else if (obj.type === "armorKey") {
      // Llave de la Armadura
      ctx.fillStyle = "#ffd700"; // Dorado brillante
      ctx.fillRect(obj.x, obj.y, 4, 4);       // Cabeza
      ctx.fillRect(obj.x + 3, obj.y + 1, 5, 2); // Cuerpo
      ctx.fillRect(obj.x + 7, obj.y + 3, 2, 2); // Dientes

    } else if (obj.type === "shieldKey") {
      ctx.fillStyle = "#d4d9dc";
      ctx.fillRect(obj.x, obj.y + 1, 5, 5);
      ctx.fillStyle = "#8ba7b2";
      ctx.fillRect(obj.x + 1, obj.y + 2, 3, 3);
      ctx.fillStyle = "#c1d2d4";
      ctx.fillRect(obj.x + 4, obj.y + 3, obj.w - 4, 2);
      ctx.fillRect(obj.x + obj.w - 3, obj.y + 5, 2, 2);

    } else if (obj.type === "helmetKey") {
      ctx.fillStyle = "#d9aa35";
      ctx.fillRect(obj.x, obj.y + 1, 5, 5);
      ctx.fillStyle = "#f2d36b";
      ctx.fillRect(obj.x + 1, obj.y + 2, 3, 3);
      ctx.fillStyle = "#b88225";
      ctx.fillRect(obj.x + 4, obj.y + 3, obj.w - 4, 2);
      ctx.fillRect(obj.x + obj.w - 3, obj.y + 5, 2, 2);

    } else if (obj.type === "controlRoomKey") {
      ctx.fillStyle = "#d9d5bf";
      ctx.fillRect(obj.x, obj.y, 5, 5);
      ctx.fillRect(obj.x + 4, obj.y + 2, 7, 2);
      ctx.fillRect(obj.x + 8, obj.y + 4, 2, 3);
      ctx.fillStyle = "#858678";
      ctx.fillRect(obj.x + 2, obj.y + 2, 2, 2);

    } else if (obj.type === "masterKey") {
      ctx.fillStyle = "#d5d7d1";
      ctx.fillRect(obj.x, obj.y + 1, 5, 5);
      ctx.fillStyle = "#e4c75d";
      ctx.fillRect(obj.x + 1, obj.y + 2, 3, 3);
      ctx.fillStyle = "#b9b9aa";
      ctx.fillRect(obj.x + 4, obj.y + 3, 8, 2);
      ctx.fillRect(obj.x + 9, obj.y + 5, 2, 3);

    } else if (obj.type === "powerRoomKey") {
      ctx.fillStyle = "#d6d1bc";
      ctx.fillRect(obj.x, obj.y + 1, 5, 5);
      ctx.fillStyle = "#f0d878";
      ctx.fillRect(obj.x + 1, obj.y + 2, 3, 3);
      ctx.fillRect(obj.x + 4, obj.y + 3, 7, 2);
      ctx.fillRect(obj.x + 9, obj.y + 5, 2, 2);
     
      } else if (obj.type === "column") {
      // Columna de la mansión (Base, cuerpo con sombras y capitel)
      ctx.fillStyle = "#221108"; // Sombra base
      ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
      ctx.fillStyle = "#5c341d"; // Madera/Piedra base
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = PALETTE.trim; // Detalle dorado/moldura
      ctx.fillRect(obj.x + 1, obj.y + 1, obj.w - 2, 2);
      ctx.fillRect(obj.x + 1, obj.y + obj.h - 3, obj.w - 2, 2);

} else if (obj.type === "plant42Roots") {
      const centerX = obj.x + obj.w / 2;
      const centerY = obj.y + obj.h / 2;
      ctx.fillStyle = "#153a25";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, obj.w * 0.43, obj.h * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineCap = "round";
      ctx.strokeStyle = "#3d7138";
      ctx.lineWidth = 3;
      const tendrils = [
        [-18, -5, -24, -16, -25, -18],
        [-13, -9, -10, -19, -7, -19],
        [0, -11, 6, -20, 11, -18],
        [15, -6, 24, -12, 23, -17],
        [18, 2, 27, 7, 25, 13],
        [10, 10, 15, 18, 20, 17],
        [-3, 11, -8, 20, -13, 17],
        [-17, 5, -26, 9, -25, 16]
      ];
      tendrils.forEach(([sx, sy, cx, cy, ex, ey], index) => {
        ctx.beginPath();
        ctx.moveTo(centerX + sx * 0.45, centerY + sy * 0.45);
        ctx.quadraticCurveTo(centerX + cx, centerY + cy, centerX + ex, centerY + ey);
        ctx.stroke();
        if (index % 2 === 0) {
          ctx.fillStyle = "#8b352b";
          ctx.fillRect(centerX + ex - 1, centerY + ey - 1, 3, 3);
        }
      });

      ctx.fillStyle = "#526b31";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, obj.w * 0.22, obj.h * 0.2, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#78372b";
      ctx.fillRect(centerX - 5, centerY - 3, 10, 6);

} else if (obj.type === "hangingPlant42") {
      const sway = Math.sin(performance.now() / 850);
      const centerX = obj.x + obj.w / 2;
      ctx.save();
      ctx.lineCap = "round";

      ctx.strokeStyle = "#294b2a";
      ctx.lineWidth = 8;
      for (let i = 0; i < 4; i++) {
        const startX = obj.x + 25 + i * 24;
        const endX = startX + sway * (5 + i * 1.5);
        ctx.beginPath();
        ctx.moveTo(startX, obj.y);
        ctx.bezierCurveTo(startX - 4, obj.y + 30, endX + 8, obj.y + 47, endX, obj.y + 62 + (i % 2) * 8);
        ctx.stroke();
      }

      ctx.fillStyle = "#24472a";
      ctx.beginPath();
      ctx.ellipse(centerX, obj.y + 65, 42, 29, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#477a3b";
      ctx.beginPath();
      ctx.ellipse(centerX - 7, obj.y + 62, 29, 22, -0.18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#8f3328";
      ctx.beginPath();
      ctx.ellipse(centerX + 2, obj.y + 70, 18, 16, 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#c24b32";
      ctx.beginPath();
      ctx.ellipse(centerX + 2, obj.y + 69, 10, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#365f32";
      ctx.lineWidth = 7;
      for (let i = 0; i < 4; i++) {
        const startX = centerX - 25 + i * 17;
        const phase = sway * (i % 2 === 0 ? 1 : -1);
        ctx.beginPath();
        ctx.moveTo(startX, obj.y + 84);
        ctx.bezierCurveTo(startX - 8, obj.y + 95, startX + phase * 5, obj.y + 107, startX + phase * 8, obj.y + 117);
        ctx.stroke();
      }
      ctx.restore();

} else if (obj.type === "brokenShotgun") {
      // Escopeta Rota (Cañón de metal con culata de madera tallada)
      ctx.fillStyle = "#5c341d"; // Culata de madera
      ctx.fillRect(obj.x, obj.y + 3, 6, 4);
      ctx.fillStyle = "#707070"; // Cañón doble/cuerpo gris de metal
      ctx.fillRect(obj.x + 6, obj.y + 2, 14, 3);
      ctx.fillStyle = "#221108"; // Grieta / Detalle de rotura en el cañón
      ctx.fillRect(obj.x + 12, obj.y + 2, 2, 3);

      } else if (obj.type === "pottedPlant") {
      // Maceta decorativa con hojas brillantes
      ctx.fillStyle = "#d2691e";
      ctx.fillRect(obj.x + 1, obj.y + 4, obj.w - 2, 6);
      ctx.fillStyle = "#00ff44";
      ctx.fillRect(obj.x, obj.y, obj.w, 5);

      } else if (obj.type === "grillBoiler") {
    // Parrilla con rejilla gris clara y brasas rojas
    ctx.fillStyle = "#888888";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#111111";
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
    ctx.fillStyle = "#ff3300"; // Brasas rojas
    ctx.fillRect(obj.x + 4, obj.y + 5, obj.w - 8, 4);

  } else if (obj.type === "chemicalItem") {
    // Bidón químico rojo con amarillo
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#ffff00";
    ctx.fillRect(obj.x + 1, obj.y + 2, obj.w - 2, 4);

    } else if (obj.type === "shower") {
    // Ducha compacta
    ctx.fillStyle = "#888888";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#e0e0e0";
    ctx.fillRect(obj.x + 1, obj.y + 1, obj.w - 2, obj.h - 2);
    ctx.fillStyle = "#4682b4"; // Flor de ducha
    ctx.fillRect(obj.x + 2, obj.y + 2, 4, 4);

  } else if (obj.type === "toilet") {
    // Inodoro chico
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(obj.x, obj.y, obj.w, 3); // Mochila
    ctx.fillRect(obj.x + 1, obj.y + 3, obj.w - 2, obj.h - 3); // Taza
    ctx.fillStyle = "#222222";
    ctx.fillRect(obj.x + 2, obj.y + 5, obj.w - 4, 3);

  } else if (obj.type === "chrisInCell") {
    ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
    ctx.fillRect(obj.x + 2, obj.y + obj.h - 2, obj.w - 2, 4);
    ctx.fillStyle = "#d8ad87";
    ctx.fillRect(obj.x + 2, obj.y + 2, 9, 9);
    ctx.fillStyle = "#4b3020";
    ctx.fillRect(obj.x + 1, obj.y + 1, 8, 3);
    ctx.fillRect(obj.x + 2, obj.y + 1, 3, 7);
    ctx.fillStyle = "#536a48";
    ctx.fillRect(obj.x + 11, obj.y + 3, 14, 8);
    ctx.fillStyle = "#374535";
    ctx.fillRect(obj.x + 22, obj.y + 4, 7, 6);
    ctx.fillStyle = "#b8a98e";
    ctx.fillRect(obj.x + 24, obj.y + 4, 5, 2);

  } else if (obj.type === "detentionCell") {
    ctx.fillStyle = "rgba(35, 42, 41, 0.22)";
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
    ctx.strokeStyle = "#1b2221";
    ctx.lineWidth = 3;
    ctx.strokeRect(obj.x + 1, obj.y + 1, obj.w - 2, obj.h - 2);
    ctx.strokeStyle = "#707c78";
    ctx.lineWidth = 1;
    for (let barX = obj.x + 8; barX < obj.x + obj.w - 4; barX += 8) {
      ctx.beginPath();
      ctx.moveTo(barX, obj.y + 2);
      ctx.lineTo(barX, obj.y + obj.h - 2);
      ctx.stroke();
    }
    ctx.fillStyle = "#333c39";
    ctx.fillRect(obj.x + obj.w - 6, obj.y + obj.h / 2 - 7, 5, 14);

    } else if (obj.type === "stainlessCounter") {
      ctx.fillStyle = "#202423";
      ctx.fillRect(obj.x - 1, obj.y + 3, obj.w + 2, obj.h - 1);
      ctx.fillStyle = "#717a78";
      ctx.fillRect(obj.x, obj.y + 2, obj.w, obj.h - 3);
      ctx.fillStyle = "#c1c7c3";
      ctx.fillRect(obj.x + 2, obj.y, obj.w - 4, 4);
      ctx.fillStyle = "#9ba39f";
      ctx.fillRect(obj.x + 3, obj.y + 6, obj.w - 6, 2);
      ctx.fillStyle = "#d7dbd5";
      ctx.fillRect(obj.x + 6, obj.y + 1, Math.max(2, obj.w - 18), 1);

    } else if (obj.type === "sinkTable") {
    // Vanitory compacto
    ctx.fillStyle = "#654321"; // Mueble
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#ffffff"; // Pileta
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
    ctx.fillStyle = "#aaaaaa"; // Canilla
    ctx.fillRect(obj.x + (obj.w / 2) - 1, obj.y, 2, 2);

      } else if (obj.type === "tigerStatue") {
      // Pedestal
      ctx.fillStyle = "#3d3a3a";
      ctx.fillRect(obj.x, obj.y + 11, obj.w, 11);
      ctx.fillStyle = "#595454";
      ctx.fillRect(obj.x + 2, obj.y + 12, obj.w - 4, 9);

      // Cuerpo del Tigre (Bronce/Dorado)
      ctx.fillStyle = "#b8860b";
      ctx.fillRect(obj.x + 4, obj.y + 3, 22, 9);   // Lomo
      ctx.fillRect(obj.x + 9, obj.y, 12, 6);       // Cabeza
      ctx.fillRect(obj.x + 8, obj.y - 2, 2, 2);    // Oreja izq
      ctx.fillRect(obj.x + 19, obj.y - 2, 2, 2);   // Oreja der

      // Rayas
      ctx.fillStyle = "#5c4002";
      ctx.fillRect(obj.x + 7, obj.y + 4, 2, 5);
      ctx.fillRect(obj.x + 14, obj.y + 5, 2, 5);
      ctx.fillRect(obj.x + 21, obj.y + 4, 2, 5);

      // Gemas en los ojos
      ctx.fillStyle = "#20b2aa"; // Gema Azul
      ctx.fillRect(obj.x + 11, obj.y + 2, 2, 2);
      ctx.fillStyle = "#dc143c"; // Gema Roja
      ctx.fillRect(obj.x + 17, obj.y + 2, 2, 2);
      } else if (obj.type === "bed") {
      // Cama (Estructura de madera, sábanas y almohada)
      ctx.fillStyle = "#3e2213";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#e0e0e0"; // Sábana blanca
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      ctx.fillStyle = "#ffffff"; // Almohada
      ctx.fillRect(obj.x + 4, obj.y + 4, 10, obj.h - 8);
      ctx.fillStyle = "#a82e2e"; // Manta/Cobija
      ctx.fillRect(obj.x + 16, obj.y + 2, obj.w - 18, obj.h - 4);

    } else if (obj.type === "handgunAmmo") {
      // Cargador / Caja de munición de pistola (Verde/Amarillo retro)
      ctx.fillStyle = "#2d5a27";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#d89a42";
      ctx.fillRect(obj.x + 2, obj.y + 1, obj.w - 4, 2);

      } else if (obj.type === "livingTable") {
    // Mesa de Living: Madera fina con centro pulido
    ctx.fillStyle = "#3a1f0d"; // Borde oscuro
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#5c3317"; // Tablero
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);

  } else if (obj.type === "bench") {
    // Banco / Sillón: Asiento acolchado marrón oscuro con apoya brazos
    ctx.fillStyle = "#2c170a";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#6e3b19"; // Tapizado
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);

  } else if (obj.type === "shotgunWall") {
    // Escopeta colgada en la pared: Soporte de madera + Cañón plateado/metálico
    ctx.fillStyle = "#8b4513"; // Soporte en pared
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#c0c0c0"; // Cañón metálico brillante
    ctx.fillRect(obj.x + 2, obj.y + 2, 2, obj.h - 4);
    ctx.fillStyle = "#000000"; // Culata/Cuerpo de la escopeta
    ctx.fillRect(obj.x + 2, obj.y + 12, 2, 6);

  } else if (obj.type === "colt") {
    ctx.fillStyle = "#171916";
    ctx.fillRect(obj.x + 1, obj.y + 4, obj.w - 2, 4);
    ctx.fillStyle = "#aeb6b1";
    ctx.fillRect(obj.x + 5, obj.y + 3, obj.w - 6, 3);
    ctx.fillRect(obj.x + 8, obj.y + 6, 4, 2);
    ctx.fillStyle = "#483326";
    ctx.fillRect(obj.x + 2, obj.y + 6, 5, 6);
    ctx.fillRect(obj.x + 14, obj.y + 2, 4, 2);

  } else if (obj.type === "grenadeLauncher") {
    ctx.fillStyle = "#262a23";
    ctx.fillRect(obj.x + 2, obj.y + 3, obj.w - 4, 5);
    ctx.fillStyle = "#596248";
    ctx.fillRect(obj.x + 5, obj.y + 2, obj.w - 7, 3);
    ctx.fillStyle = "#765638";
    ctx.fillRect(obj.x + 1, obj.y + 5, 6, 6);
    ctx.fillRect(obj.x + 9, obj.y + 8, 4, 5);
    ctx.fillStyle = "#aab0a2";
    ctx.fillRect(obj.x + obj.w - 5, obj.y + 3, 3, 2);

    } else if (obj.type === "desk") {
      // Escritorio de madera
      ctx.fillStyle = "#221108";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = PALETTE.wood;
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      ctx.strokeStyle = PALETTE.trim;
      ctx.strokeRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);

    } else if (obj.type === "keepersDiary") {
      // Libro / Diario del Cuidador (Rojo/Marrón)
      ctx.fillStyle = "#701c1c";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#f0f0f0"; // Hojas visibles al costado
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      ctx.fillStyle = "#701c1c"; // Tapa
      ctx.fillRect(obj.x + 4, obj.y + 2, obj.w - 6, obj.h - 4);

    } else if (obj.type === "closetDoor") {
      // Marco / Puerta del armario
      ctx.fillStyle = "#221108";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = PALETTE.trim;
      ctx.fillRect(obj.x + 1, obj.y + 4, obj.w - 2, obj.h - 8);

      } else if (obj.type === "stairsVisual") {
    // Estructura de la escalera: Fondo de madera + peldaños horizontales y pasamanos
    ctx.fillStyle = "#2c170a"; // Base oscura
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

    // Peldaños (Líneas horizontales)
    ctx.fillStyle = "#8b4513";
    for (let x = obj.x; x < obj.x + obj.w; x += 12) {
      ctx.fillRect(x, obj.y, 2, obj.h); // Escalones
    }

    // Pasamanos / Baranda
    ctx.fillStyle = "#d4af37"; // Tono dorado/madera clara
    ctx.fillRect(obj.x, obj.y + obj.h - 2, obj.w, 2);
    ctx.fillRect(obj.x, obj.y, obj.w, 2);

  } else if (obj.type === "acidRounds") {
    // Acid Rounds: Caja verde fluorescente/limón con letras o detalle oscuro
    ctx.fillStyle = "#000000";
    ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
    ctx.fillStyle = "#a6e22e"; // Verde ácido
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, 2);

  } else if (obj.type === "explosiveRounds") {
    ctx.fillStyle = "#080808";
    ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
    ctx.fillStyle = "#b33a24";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#d6c18c";
    ctx.fillRect(obj.x + 2, obj.y + 2, 2, obj.h - 4);
    ctx.fillRect(obj.x + 6, obj.y + 2, 2, obj.h - 4);

  } else if (obj.type === "fireRounds") {
    ctx.fillStyle = "#080808";
    ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
    ctx.fillStyle = "#e4a22d";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#f4dc8a";
    ctx.fillRect(obj.x + 2, obj.y + 2, 2, obj.h - 4);
    ctx.fillRect(obj.x + 7, obj.y + 2, 2, obj.h - 4);

  } else if (obj.type === "flameRounds") {
    ctx.fillStyle = "#080808";
    ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
    ctx.fillStyle = "#c66a24";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#f2cf68";
    ctx.fillRect(obj.x + 2, obj.y + 2, 2, obj.h - 4);
    ctx.fillRect(obj.x + 6, obj.y + 2, 2, obj.h - 4);

  } else if (obj.type === "combatKnife") {
    ctx.fillStyle = "#252321";
    ctx.fillRect(obj.x + 1, obj.y + 7, 5, 4);
    ctx.fillStyle = "#bbbcae";
    ctx.beginPath();
    ctx.moveTo(obj.x + 5, obj.y + 7);
    ctx.lineTo(obj.x + obj.w - 1, obj.y + 1);
    ctx.lineTo(obj.x + obj.w - 4, obj.y + 9);
    ctx.lineTo(obj.x + 5, obj.y + 10);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#e4e0ca";
    ctx.fillRect(obj.x + 7, obj.y + 7, 3, 1);

  } else if (obj.type === "carBattery") {
    ctx.fillStyle = "#101411";
    ctx.fillRect(obj.x, obj.y + 2, obj.w, obj.h - 2);
    ctx.fillStyle = "#59635a";
    ctx.fillRect(obj.x + 2, obj.y + 4, obj.w - 4, obj.h - 6);
    ctx.fillStyle = "#c8c5ae";
    ctx.fillRect(obj.x + 2, obj.y, 4, 3);
    ctx.fillRect(obj.x + obj.w - 6, obj.y, 4, 3);
    ctx.fillStyle = "#b42d27";
    ctx.fillRect(obj.x + 4, obj.y + 6, 3, 2);
    ctx.fillStyle = "#d3d1c6";
    ctx.fillRect(obj.x + 10, obj.y + 6, 3, 2);

  } else if (obj.type === "scrapbook") {
    ctx.fillStyle = "#17100b";
    ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
    ctx.fillStyle = "#75412d";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#e1d4ae";
    ctx.fillRect(obj.x + 3, obj.y + 2, obj.w - 5, obj.h - 4);
    ctx.fillStyle = "#7b2520";
    ctx.fillRect(obj.x + 5, obj.y + 3, 3, 3);
    ctx.fillStyle = "#60452d";
    ctx.fillRect(obj.x + 4, obj.y + 7, obj.w - 7, 1);

  } else if (obj.type === "sunCrest") {
    ctx.fillStyle = "#17130c";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#bb9a43";
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
    ctx.fillStyle = "#e3cf7c";
    ctx.fillRect(obj.x + 5, obj.y + 2, 2, 8);
    ctx.fillRect(obj.x + 2, obj.y + 5, 8, 2);
    ctx.fillRect(obj.x + 4, obj.y + 4, 4, 4);
    ctx.fillStyle = "#755b2b";
    ctx.fillRect(obj.x + 5, obj.y + 5, 2, 2);

  } else if (obj.type === "moonCrest") {
    ctx.fillStyle = "#17130c";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#d4c58d";
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
    ctx.fillStyle = "#8a7950";
    ctx.fillRect(obj.x + 4, obj.y + 4, obj.w - 8, obj.h - 7);
    ctx.fillStyle = "#e7dfbd";
    ctx.fillRect(obj.x + 5, obj.y + 3, 3, 6);
    ctx.fillRect(obj.x + 3, obj.y + 5, 7, 3);

  } else if (obj.type === "starCrest") {
    ctx.fillStyle = "#17130c";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#c6ae58";
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
    ctx.fillStyle = "#f1e0a0";
    ctx.fillRect(obj.x + 5, obj.y + 2, 2, 8);
    ctx.fillRect(obj.x + 2, obj.y + 5, 8, 2);
    ctx.fillRect(obj.x + 4, obj.y + 4, 4, 4);

  } else if (obj.type === "windCrest") {
    ctx.fillStyle = "#17130c";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#aaa58b";
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
    ctx.fillStyle = "#e0dcc6";
    ctx.fillRect(obj.x + 3, obj.y + 3, 6, 2);
    ctx.fillRect(obj.x + 5, obj.y + 5, 5, 2);
    ctx.fillRect(obj.x + 3, obj.y + 7, 6, 2);

  } else if (obj.type === "moDisk") {
    ctx.fillStyle = "#131713";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#aeb6a3";
    ctx.fillRect(obj.x + 1, obj.y + 1, obj.w - 2, obj.h - 2);
    ctx.fillStyle = "#65715f";
    ctx.fillRect(obj.x + 3, obj.y + 3, 4, 2);

  } else if (obj.type === "shotgunShells") {
    // Cartuchos de escopeta: Caja roja con borde negro
    ctx.fillStyle = "#000000";
    ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
    ctx.fillStyle = "#ff2222"; // Rojo cartucho
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#d4af37"; // Base dorada
    ctx.fillRect(obj.x, obj.y + obj.h - 2, obj.w, 2);

  } else if (obj.type === "firstAidSpray") {
    // Spray de primeros auxilios: Lata blanca con cruz o detalle verde
    ctx.fillStyle = "#000000";
    ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
    ctx.fillStyle = "#ffffff"; // Cuerpo blanco del spray
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#00ff66"; // Franja/cruz verde curativa
    ctx.fillRect(obj.x + 1, obj.y + 3, obj.w - 2, 3);
    ctx.fillStyle = "#888888"; // Tapa gris
    ctx.fillRect(obj.x + 2, obj.y, obj.w - 4, 2);

    } else if (obj.type === "window") {
    // Ventana con marco de madera y vidrio azulado/iluminado
    ctx.fillStyle = "#3a1f0d"; // Marco
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#87ceeb"; // Cristal translúcido/azul
    ctx.fillRect(obj.x + 2, obj.y + 1, obj.w - 4, obj.h - 2);

  } else if (obj.type === "magnumRounds") {
    // Caja de balas Magnum (Caja azul brillante/oscura con detalles en plateado)
    ctx.fillStyle = "#000000";
    ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
    ctx.fillStyle = "#1e3d59"; // Azul metálico
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#c0c0c0"; // Detalle plateado/calibre
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, 2);

  } else if (obj.type === "coatRack") {
    // Perchero de pie/pared de madera con ganchos
    ctx.fillStyle = "#5c3317";
    ctx.fillRect(obj.x + 3, obj.y, 4, obj.h); // Poste central
    ctx.fillStyle = "#d4af37"; // Ganchos dorados
    ctx.fillRect(obj.x, obj.y + 2, obj.w, 2);
    ctx.fillRect(obj.x + 1, obj.y + 6, obj.w - 2, 2);

    } else if (obj.type === "taxidermyDeer") {
      ctx.fillStyle = "#24150e";
      ctx.fillRect(obj.x + 4, obj.y + 20, obj.w - 8, 6);
      ctx.fillStyle = "#8b5a32";
      ctx.fillRect(obj.x + 9, obj.y + 8, 18, 17);
      ctx.fillStyle = "#b7804b";
      ctx.fillRect(obj.x + 7, obj.y + 3, 20, 12);
      ctx.fillRect(obj.x + 10, obj.y, 3, 8);
      ctx.fillRect(obj.x + 23, obj.y, 3, 8);
      ctx.fillStyle = "#24150e";
      ctx.fillRect(obj.x + 11, obj.y + 7, 3, 2);
      if (!trophyLightsOn && ROOMS[currentRoom].interactables.some((item) => item.type === "redJewel")) {
        ctx.fillStyle = "#ff1717";
        ctx.fillRect(obj.x + 22, obj.y + 7, 3, 3);
        ctx.fillStyle = "rgba(255, 0, 0, 0.25)";
        ctx.fillRect(obj.x + 19, obj.y + 4, 9, 9);
      }

    } else if (obj.type === "trophySwitch") {
      ctx.fillStyle = "#21150d";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = trophyLightsOn ? "#d6bd68" : "#726b55";
      ctx.fillRect(obj.x + 2, obj.y + (trophyLightsOn ? 2 : 6), 4, 4);

    } else if (obj.type === "waterDrainSwitch" || obj.type === "armsStorageSwitch") {
      const isActive = obj.type === "waterDrainSwitch" ? waterDrained : armsStorageUnlocked;
      ctx.fillStyle = "#1b211f";
      ctx.fillRect(obj.x - 2, obj.y - 2, obj.w + 4, obj.h + 4);
      ctx.fillStyle = "#69736c";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = isActive ? "#4bd16a" : "#bd342b";
      ctx.fillRect(obj.x + 3, obj.y + 3, obj.w - 6, 4);
      ctx.fillStyle = "#272e2b";
      ctx.fillRect(obj.x + obj.w / 2 - 2, obj.y + 9, 4, 6);
      ctx.fillStyle = isActive ? "#c1f3bd" : "#e2c2a0";
      ctx.fillRect(obj.x + obj.w / 2 - 1, obj.y + (isActive ? 8 : 11), 2, 4);

    } else if (obj.type === "researcherWill" || obj.type === "researcherLetter" || obj.type === "fax") {
      ctx.fillStyle = "#302215";
      ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
      ctx.fillStyle = "#e5d9b7";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#75412d";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, 1);
      ctx.fillRect(obj.x + 2, obj.y + 5, obj.w - 5, 1);
      ctx.fillRect(obj.x + 2, obj.y + 8, obj.w - 7, 1);

    } else if (obj.type === "plant42Report") {
      ctx.fillStyle = "#302215";
      ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
      ctx.fillStyle = "#eee3c2";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#8b2525";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, 2);
      ctx.fillStyle = "#75654a";
      ctx.fillRect(obj.x + 2, obj.y + 6, obj.w - 5, 1);
      ctx.fillRect(obj.x + 2, obj.y + 8, obj.w - 7, 1);

    } else if (obj.type === "vJoltReport") {
      ctx.fillStyle = "#302215";
      ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
      ctx.fillStyle = "#eee3c2";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#42613b";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, 2);
      ctx.fillStyle = "#75654a";
      ctx.fillRect(obj.x + 2, obj.y + 6, obj.w - 5, 1);
      ctx.fillRect(obj.x + 2, obj.y + 8, obj.w - 7, 1);

    } else if (obj.type === "orders") {
      ctx.fillStyle = "#eee2bd";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#6b3f26";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, 1);
      ctx.fillRect(obj.x + 2, obj.y + 5, obj.w - 5, 1);

    } else if (obj.type === "passNumber") {
      ctx.fillStyle = "#302215";
      ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
      ctx.fillStyle = "#eee3c2";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#8b2525";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, 2);
      ctx.fillStyle = "#75654a";
      ctx.fillRect(obj.x + 2, obj.y + 6, obj.w - 5, 1);

    } else if (obj.type === "studyDesk") {
    // Escritorio ejecutivo de madera oscura
    ctx.fillStyle = "#2c170a";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#4a2511";
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);

  } else if (obj.type === "lighter") {
    ctx.fillStyle = "#171512";
    ctx.fillRect(obj.x, obj.y + 1, obj.w, obj.h - 1);
    ctx.fillStyle = "#a33b28";
    ctx.fillRect(obj.x + 1, obj.y + 2, obj.w - 3, obj.h - 3);
    ctx.fillStyle = "#b7b6a5";
    ctx.fillRect(obj.x + obj.w - 3, obj.y + 1, 2, 3);
    ctx.fillStyle = "#e0bd55";
    ctx.fillRect(obj.x + 3, obj.y + 1, 3, 1);

  } else if (obj.type === "blankBook") {
    ctx.fillStyle = "#170b0b";
    ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
    ctx.fillStyle = "#8b161d";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#b83a32";
    ctx.fillRect(obj.x + 2, obj.y + 1, obj.w - 4, 2);
    ctx.fillStyle = "#d1ae69";
    ctx.fillRect(obj.x + 2, obj.y + 2, 1, obj.h - 4);

  } else if (obj.type === "botanyBook") {
    ctx.fillStyle = "#21140c";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#31502b";
    ctx.fillRect(obj.x + 2, obj.y + 1, obj.w - 4, obj.h - 2);
    ctx.fillStyle = "#9a8044";
    ctx.fillRect(obj.x + 3, obj.y + 3, 2, obj.h - 6);
    ctx.fillStyle = "#c2b06a";
    ctx.fillRect(obj.x + 7, obj.y + 3, 4, 1);
    ctx.fillRect(obj.x + 7, obj.y + 6, 3, 1);

  } else if (obj.type === "doomBook1") {
    // Doom Book 1: Libro antiguo de cuero oscuro con relieve/símbolo dorado
    ctx.fillStyle = "#1a0f07"; // Encuadernación
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#d4af37"; // Símbolo o lomo dorado
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
    ctx.fillStyle = "#8b0000"; // Detalle central en rojo oscuro
    ctx.fillRect(obj.x + 4, obj.y + 4, obj.w - 8, obj.h - 8);

  } else if (obj.type === "doomBook2") {
    ctx.fillStyle = "#17150e";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#81672f";
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
    ctx.fillStyle = "#273c35";
    ctx.fillRect(obj.x + 4, obj.y + 4, obj.w - 8, obj.h - 8);
    ctx.fillStyle = "#c3a758";
    ctx.fillRect(obj.x + 5, obj.y + 6, obj.w - 10, 2);

  } else if (obj.type === "securitySystem") {
    ctx.fillStyle = "#dedbd0";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#b6b4a8";
    ctx.fillRect(obj.x + 1, obj.y + 1, obj.w - 2, 1);
    ctx.fillStyle = "#424c53";
    ctx.fillRect(obj.x + 2, obj.y + 3, obj.w - 4, 1);
    ctx.fillRect(obj.x + 2, obj.y + 6, obj.w - 5, 1);
    ctx.fillRect(obj.x + 2, obj.y + 8, obj.w - 7, 1);

    } else if (obj.type === "painting") {
    // Cuadro con marco dorado y lienzo interior de color
    ctx.fillStyle = "#d4af37"; // Marco dorado
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#3b2219"; // Lienzo interior
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
    ctx.fillStyle = "#8b0000"; // Pincelada / Arte ilustrado
    ctx.fillRect(obj.x + 4, obj.y + 4, obj.w - 8, obj.h - 8);

  } else if (obj.type === "crow") {
    // Cuervo zombi silueta oscura con ojos rojos
    ctx.fillStyle = "#111111"; // Cuerpo plumaje negro
    ctx.fillRect(obj.x, obj.y + 2, obj.w, obj.h - 2);
    ctx.fillRect(obj.x + 2, obj.y, 4, 3); // Cabeza/Pico
    ctx.fillStyle = "#ff0000"; // Ojo rojo asesino
    ctx.fillRect(obj.x + 4, obj.y + 1, 1, 1);

    } else if (obj.type === "crestRelief") {
    // Relieve en piedra con 4 ranuras circulares/cuadradas para los emblemas
    ctx.fillStyle = "#4a4a4a"; // Placa de piedra gris oscura
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#d4af37"; // Borde dorado
    ctx.fillRect(obj.x + 1, obj.y + 1, obj.w - 2, obj.h - 2);
    ctx.fillStyle = "#222222"; // 4 Huecos/Ranuras para las crestas
    ctx.fillRect(obj.x + 3, obj.y + 3, 3, 3);
    ctx.fillRect(obj.x + 8, obj.y + 3, 3, 3);
    ctx.fillRect(obj.x + 13, obj.y + 3, 3, 3);
    ctx.fillRect(obj.x + 18, obj.y + 3, 3, 3);

    } else if (obj.type === "ladder") {
    // Escalera de madera o metal apoyada
    ctx.fillStyle = "#5c3317";
    ctx.fillRect(obj.x, obj.y, 2, obj.h);
    ctx.fillRect(obj.x + obj.w - 2, obj.y, 2, obj.h);
    ctx.fillStyle = "#a0522d";
    for (let y = obj.y + 3; y < obj.y + obj.h; y += 5) {
      ctx.fillRect(obj.x, y, obj.w, 2);
    }

  } else if (obj.type === "shelfWithCrank") {
    // Estante de madera de pared
    ctx.fillStyle = "#3b1e0b";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#6e3b19";
    ctx.fillRect(obj.x + 1, obj.y + 1, obj.w - 2, obj.h - 2);

    } else if (obj.type === "crankItem") {
    // Square Crank: Manivela metálica dorada/bronce con empuñadura
    ctx.fillStyle = "#d4af37"; // Bronce / Dorado
    ctx.fillRect(obj.x, obj.y + 2, obj.w - 2, 3); // Barra
    ctx.fillRect(obj.x + obj.w - 4, obj.y, 3, 7); // Punta cuadrada / eje
    ctx.fillStyle = "#111111"; // Mango negro
    ctx.fillRect(obj.x, obj.y + 1, 3, 5);

  } else if (obj.type === "hexCrank") {
    ctx.fillStyle = "#49371f";
    ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
    ctx.fillStyle = "#c3a45b";
    ctx.beginPath();
    ctx.moveTo(obj.x + 4, obj.y + 1);
    ctx.lineTo(obj.x + obj.w - 4, obj.y + 1);
    ctx.lineTo(obj.x + obj.w - 1, obj.y + obj.h / 2);
    ctx.lineTo(obj.x + obj.w - 4, obj.y + obj.h - 1);
    ctx.lineTo(obj.x + 4, obj.y + obj.h - 1);
    ctx.lineTo(obj.x + 1, obj.y + obj.h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#49371f";
    ctx.fillRect(obj.x + 6, obj.y + 4, obj.w - 12, obj.h - 8);

  } else if (obj.type === "barrel") {
    // Barril de madera con aros metálicos
    ctx.fillStyle = "#5c3317"; // Madera
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#708090"; // Flejes de hierro
    ctx.fillRect(obj.x, obj.y + 2, obj.w, 2);
    ctx.fillRect(obj.x, obj.y + obj.h - 4, obj.w, 2);
    
    } else if (obj.type === "typewriter") {
      ctx.fillStyle = "#3e2213";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = PALETTE.wood;
      ctx.fillRect(obj.x + 1, obj.y + 1, obj.w - 2, obj.h - 2);
      ctx.strokeStyle = PALETTE.trim;
      ctx.lineWidth = 1;
      ctx.strokeRect(obj.x + 1, obj.y + 1, obj.w - 2, obj.h - 2);

      ctx.fillStyle = "#2b2b2b";
      ctx.fillRect(obj.x + 6, obj.y + 6, 14, 10);
      ctx.fillStyle = "#555555";
      ctx.fillRect(obj.x + 8, obj.y + 11, 10, 4);
      ctx.fillStyle = "#aaaaaa";
      ctx.fillRect(obj.x + 9, obj.y + 12, 2, 1);
      ctx.fillRect(obj.x + 12, obj.y + 12, 2, 1);
      ctx.fillRect(obj.x + 15, obj.y + 12, 2, 1);
      ctx.fillStyle = "#111111";
      ctx.fillRect(obj.x + 5, obj.y + 7, 16, 3);
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(obj.x + 9, obj.y + 4, 8, 4);
    } else if (obj.type === "table") {
      const mx = obj.x, my = obj.y, mw = obj.w, mh = obj.h;
      ctx.fillStyle = PALETTE.clock;
      ctx.fillRect(100, my - 6, 16, 5);
      ctx.fillRect(152, my - 6, 16, 5);
      ctx.fillRect(204, my - 6, 16, 5);
      ctx.fillRect(100, my + mh + 1, 16, 5);
      ctx.fillRect(152, my + mh + 1, 16, 5);
      ctx.fillRect(204, my + mh + 1, 16, 5);

      ctx.fillStyle = "#3e2213";
      ctx.fillRect(mx + 2, my + 2, mw, mh);
      ctx.fillStyle = PALETTE.wood;
      ctx.fillRect(mx, my, mw, mh);
      ctx.strokeStyle = PALETTE.trim;
      ctx.lineWidth = 1;
      ctx.strokeRect(mx, my, mw, mh);
    } else if (obj.type === "mansionMapPicture") {
      ctx.fillStyle = "#302016";
      ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
      ctx.fillStyle = "#b38b45";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#d6c48e";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      ctx.fillStyle = "#73815b";
      ctx.fillRect(obj.x + 5, obj.y + 5, 4, 8);
      ctx.fillRect(obj.x + 9, obj.y + 5, 5, 3);
      ctx.fillRect(obj.x + 14, obj.y + 7, 5, 6);
      ctx.fillStyle = "#7c3525";
      ctx.fillRect(obj.x + 11, obj.y + 9, 2, 2);
      ctx.fillStyle = "#5c4425";
      ctx.fillRect(obj.x + 4, obj.y + 14, obj.w - 8, 1);

    } else if (obj.type === "fireplace") {
      ctx.fillStyle = PALETTE.fireplace;
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = PALETTE.fire;
      ctx.fillRect(obj.x + 2, obj.y + 22, 3, 16);
      ctx.fillStyle = PALETTE.emblem;
      ctx.fillRect(obj.x + 1, obj.y + 8, 4, 6);
    } else if (obj.type === "clockPuzzle") {
      ctx.fillStyle = "#241309";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#5c341d";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      ctx.fillStyle = "#17100b";
      ctx.fillRect(obj.x + 5, obj.y + 4, obj.w - 10, obj.h - 8);
      ctx.fillStyle = "#d7c99a";
      ctx.fillRect(obj.x + 7, obj.y + 5, obj.w - 14, 19);
      ctx.fillStyle = "#493a25";
      ctx.fillRect(obj.x + 9, obj.y + 7, obj.w - 18, 15);
      const centerX = obj.x + obj.w / 2;
      const centerY = obj.y + 14;
      const hourAngle = ((obj.hour % 12) / 12) * Math.PI * 2 - Math.PI / 2;
      ctx.strokeStyle = "#e5d9b4";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(hourAngle) * 6, centerY + Math.sin(hourAngle) * 6);
      ctx.stroke();
      ctx.strokeStyle = "#242017";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX, centerY - 8);
      ctx.stroke();
      ctx.fillStyle = "#d7ad4d";
      ctx.fillRect(obj.x + 13, obj.y + 29, 4, 8);
      ctx.fillRect(obj.x + 7, obj.y + obj.h - 5, obj.w - 14, 3);

    } else if (obj.type === "clock") {
      // 1. Estructura base de madera caoba
      ctx.fillStyle = "#3a1e0b"; // Madera oscura
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

      // Copete / Remate superior del reloj
      ctx.fillStyle = "#5c341d";
      ctx.fillRect(obj.x + 1, obj.y + 1, obj.w - 2, 3);
      ctx.fillStyle = "#ffd700"; // Detalle dorado superior
      ctx.fillRect(obj.x + (obj.w / 2) - 2, obj.y, 4, 2);

      // 2. Esfera del Reloj (Blanca redonda/cuadrada arriba)
      ctx.fillStyle = "#f5f5dc"; // Blanco marfil
      ctx.fillRect(obj.x + 3, obj.y + 4, obj.w - 6, 8);
      
      // Agujas del reloj
      ctx.fillStyle = "#000000";
      ctx.fillRect(obj.x + (obj.w / 2) - 1, obj.y + 7, 2, 2); // Centro
      ctx.fillRect(obj.x + (obj.w / 2), obj.y + 5, 1, 3);     // Minutero
      ctx.fillRect(obj.x + (obj.w / 2) - 2, obj.y + 7, 2, 1); // Horario

      // 3. Gabinete de Cristal central (Péndulo)
      ctx.fillStyle = "#1a0e05"; // Fondo oscuro tras el cristal
      ctx.fillRect(obj.x + 3, obj.y + 14, obj.w - 6, obj.h - 18);
      ctx.strokeStyle = "#8b5a2b"; // Marco de madera
      ctx.strokeRect(obj.x + 3, obj.y + 14, obj.w - 6, obj.h - 18);

      // Péndulo de Bronce / Dorado
      ctx.strokeStyle = "#ffd700"; // Varilla
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(obj.x + (obj.w / 2), obj.y + 14);
      ctx.lineTo(obj.x + (obj.w / 2) + 2, obj.y + obj.h - 8);
      ctx.stroke();

      ctx.fillStyle = "#ffd700"; // Disco / Lenteja del péndulo
      ctx.fillRect(obj.x + (obj.w / 2), obj.y + obj.h - 9, 4, 4);

      // 4. Base del Reloj
      ctx.fillStyle = "#261307";
      ctx.fillRect(obj.x, obj.y + obj.h - 3, obj.w, 3);

      } else if (obj.type === "bedVertical") {
      // Cama Orientación Vertical (Madera, sábanas y almohada superior)
      ctx.fillStyle = "#3e2213";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#e0e0e0"; // Sábana base
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      ctx.fillStyle = "#ffffff"; // Almohada arriba
      ctx.fillRect(obj.x + 4, obj.y + 4, obj.w - 8, 8);
      ctx.fillStyle = "#a82e2e"; // Manta roja abajo
      ctx.fillRect(obj.x + 2, obj.y + 16, obj.w - 4, obj.h - 18);

    } else if (obj.type === "itemChest") {
      // Baúl de Ítems / Cajón clásico de RE (Madera reforzada con herrajes de metal)
      ctx.fillStyle = "#221108";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#5c341d";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      // Cierre / Candelado de bronce
      ctx.fillStyle = "#ffd700";
      ctx.fillRect(obj.x + (obj.w / 2) - 3, obj.y + (obj.h / 2) - 2, 6, 4);
      ctx.fillStyle = "#8c8585"; // Esquinas de metal
      ctx.fillRect(obj.x + 2, obj.y + 2, 3, 3);
      ctx.fillRect(obj.x + obj.w - 5, obj.y + 2, 3, 3);

    } else if (obj.type === "shelfVertical") {
      // Estantería orientada en vertical
      ctx.fillStyle = "#221108";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = PALETTE.wood;
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      // Estantes horizontales
      ctx.fillStyle = PALETTE.trim;
      ctx.fillRect(obj.x + 2, obj.y + 16, obj.w - 4, 2);
      ctx.fillRect(obj.x + 2, obj.y + 32, obj.w - 4, 2);

    } else if (obj.type === "butterflyShelf") {
      ctx.fillStyle = "#21150d";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#59371f";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      ctx.fillStyle = "#9b7040";
      ctx.fillRect(obj.x + 2, obj.y + 18, obj.w - 4, 2);
      ctx.fillRect(obj.x + 2, obj.y + 38, obj.w - 4, 2);
      ctx.fillRect(obj.x + 2, obj.y + 58, obj.w - 4, 2);
      ctx.fillStyle = "#d9bd73";
      ctx.fillRect(obj.x + 6, obj.y + 7, 5, 4);
      ctx.fillRect(obj.x + 16, obj.y + 11, 5, 4);
      ctx.fillStyle = "#7a8c63";
      ctx.fillRect(obj.x + 8, obj.y + 8, 1, 5);
      ctx.fillRect(obj.x + 18, obj.y + 12, 1, 5);
      ctx.fillStyle = "#b56b52";
      ctx.fillRect(obj.x + 5, obj.y + 28, 5, 4);
      ctx.fillRect(obj.x + 15, obj.y + 31, 5, 4);
      ctx.fillStyle = "#e0cfa3";
      ctx.fillRect(obj.x + 7, obj.y + 29, 1, 5);
      ctx.fillRect(obj.x + 17, obj.y + 32, 1, 5);
      ctx.fillStyle = "#8f9870";
      ctx.fillRect(obj.x + 7, obj.y + 48, 5, 4);
      ctx.fillRect(obj.x + 16, obj.y + 51, 5, 4);
      ctx.fillStyle = "#e4d5a7";
      ctx.fillRect(obj.x + 9, obj.y + 49, 1, 5);
      ctx.fillRect(obj.x + 18, obj.y + 52, 1, 5);

    } else if (obj.type === "serum") {
      // Frasco de Suero (Medicina en frasco de vidrio cristalino/azul)
      ctx.fillStyle = "#4682b4";
      ctx.fillRect(obj.x, obj.y + 2, obj.w, obj.h - 2);
      ctx.fillStyle = "#e0e0e0"; // Tapa/Goteo
      ctx.fillRect(obj.x + 2, obj.y, 4, 2);

    } else if (obj.type === "inkRibbon") {
      // Cinta de Tinta / Ink Ribbon (Cinta negra con carretes rojos/dorados)
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#b81d1d"; // Carretes
      ctx.fillRect(obj.x + 1, obj.y + 2, 2, 4);
      ctx.fillRect(obj.x + 5, obj.y + 2, 2, 4);

      } else if (obj.type === "mirror") {
      // Espejo de Pared (Marco de madera tallada con cristal reflejante azulado)
      ctx.fillStyle = "#5c341d";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#add8e6"; // Cristal con reflejo
      ctx.fillRect(obj.x + 2, obj.y + 1, obj.w - 4, obj.h - 2);
      ctx.fillStyle = "#ffffff"; // Brillo diagonal
      ctx.fillRect(obj.x + 5, obj.y + 2, 3, 2);

    } else if (obj.type === "armsShelf") {
      ctx.fillStyle = "#192321";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#68736c";
      ctx.fillRect(obj.x + 2, obj.y + 3, obj.w - 4, 3);
      ctx.fillRect(obj.x + 2, obj.y + obj.h - 5, obj.w - 4, 3);
      ctx.fillStyle = "#343d39";
      ctx.fillRect(obj.x + 5, obj.y + 7, 3, obj.h - 14);
      ctx.fillRect(obj.x + obj.w - 8, obj.y + 7, 3, obj.h - 14);

    } else if (obj.type === "bookshelfHorizontal") {
      // Biblioteca / Mueble largo dividiendo el ambiente
      ctx.fillStyle = "#221108";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = PALETTE.wood;
      ctx.fillRect(obj.x + 1, obj.y + 1, obj.w - 2, obj.h - 2);
      
      // Libros variados de colores alineados en el estante
      const bookColors = ["#8b0000", "#1e90ff", "#228b22", "#ffd700", "#4b0082"];
      for (let i = 0; i < obj.w - 8; i += 5) {
        ctx.fillStyle = bookColors[(i / 5) % bookColors.length];
        ctx.fillRect(obj.x + 4 + i, obj.y + 3, 4, obj.h - 6);
      }

      } else if (obj.type === "smallTable") {
      // Mesita de madera con detalle
      ctx.fillStyle = "#3a1e0b";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = PALETTE.wood;
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);

    } else if (obj.type === "clothesRack") {
      // Perchero / Cambios de ropa colgados en la pared
      ctx.fillStyle = "#221108"; // Barra / Estructura
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      
      // Prendas colgadas de varios colores (Rojo, Azul, Verde, Blanco)
      const clothes = ["#8b0000", "#1e3d59", "#2e5a1c", "#d9d9d9"];
      for (let i = 0; i < obj.h - 10; i += 14) {
        ctx.fillStyle = clothes[(i / 14) % clothes.length];
        ctx.fillRect(obj.x + 3, obj.y + 5 + i, obj.w - 6, 10);
      }

      } else if (obj.type === "mapStatue") {
      // Estatua de mármol/piedra con jarrón arriba
      ctx.fillStyle = "#a8a8a8"; // Pedestal
      ctx.fillRect(obj.x, obj.y + 8, obj.w, obj.h - 8);
      ctx.fillStyle = "#d0d0d0";
      ctx.fillRect(obj.x + 2, obj.y + 10, obj.w - 4, obj.h - 12);
      
      // Jarrón de cerámica con mapa
      ctx.fillStyle = "#8b4513";
      ctx.fillRect(obj.x + 5, obj.y, 12, 10);
      ctx.fillStyle = "#d2b48c"; // Rollo de mapa asomando
      ctx.fillRect(obj.x + 9, obj.y - 3, 4, 5);

    } else if (obj.type === "stepLadder") {
      // Escalerita metálica/madera movible
      ctx.fillStyle = "#705030"; // Parantes laterales
      ctx.fillRect(obj.x, obj.y, 3, obj.h);
      ctx.fillRect(obj.x + obj.w - 3, obj.y, 3, obj.h);
      
      // Peldaños horizontales
      ctx.fillStyle = "#a07040";
      ctx.fillRect(obj.x, obj.y + 3, obj.w, 2);
      ctx.fillRect(obj.x, obj.y + 8, obj.w, 2);
      ctx.fillRect(obj.x, obj.y + 13, obj.w, 2);

    } else if (obj.type === "kenneth") {
      // --- KENNETH BURNS (Tirado boca abajo, herido) ---
      // Sombra
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(obj.x - 1, obj.y + 1, obj.w + 2, obj.h + 1);

      // Cuerpo / Chaleco táctico (Gris/Azul)
      ctx.fillStyle = "#2c3b4d";
      ctx.fillRect(obj.x + 2, obj.y + 2, 12, 8);

      // Brazos extendidos en el piso
      ctx.fillStyle = "#d4a373"; // Piel
      ctx.fillRect(obj.x, obj.y + 1, 3, 3);
      ctx.fillRect(obj.x + 13, obj.y + 1, 3, 3);

      // Cabeza
      ctx.fillStyle = "#d4a373";
      ctx.fillRect(obj.x + 5, obj.y, 6, 4);
      // Pelo castaño
      ctx.fillStyle = "#4a2e18";
      ctx.fillRect(obj.x + 5, obj.y, 6, 2);

      // Piernas (Pantalón verde oscuro)
      ctx.fillStyle = "#1b2a1a";
      ctx.fillRect(obj.x + 3, obj.y + 9, 4, 4);
      ctx.fillRect(obj.x + 9, obj.y + 9, 4, 4);

      // Botas negras
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(obj.x + 3, obj.y + 12, 4, 2);
      ctx.fillRect(obj.x + 9, obj.y + 12, 4, 2);

      // Charco de sangre al lado de la cabeza
      ctx.fillStyle = "#800c0c";
      ctx.fillRect(obj.x - 2, obj.y - 1, 4, 3);
      ctx.fillRect(obj.x - 1, obj.y + 1, 3, 2);

     } else if (obj.type === "zombieDog") {
      // PERRO ZOMBI / CERBERUS (Estilo Atari 2600 detallado)
      const isHorizontal = obj.w > obj.h;

      // 1. Cuerpo principal (Marrón rojizo podrido)
      ctx.fillStyle = "#4a190f";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

      // 2. Detalle de lomo abierto / sangre (Línea roja central)
      ctx.fillStyle = "#8b0000";
      if (isHorizontal) {
        ctx.fillRect(obj.x + 3, obj.y + 2, obj.w - 6, 2);
      } else {
        ctx.fillRect(obj.x + 2, obj.y + 3, 2, obj.h - 6);
      }

      // 3. Cabeza y hocico según la orientación
      if (isHorizontal) {
        // Mirando hacia la izquierda
        ctx.fillStyle = "#2d0f09"; // Cabeza
        ctx.fillRect(obj.x - 2, obj.y + 1, 5, 6);
        
        ctx.fillStyle = "#ff0000"; // Ojo rojo sediento de sangre
        ctx.fillRect(obj.x, obj.y + 2, 2, 2);
        
        ctx.fillStyle = "#ffffff"; // Colmillos / Dientes expuestos
        ctx.fillRect(obj.x - 2, obj.y + 5, 3, 2);

        // Patas delanteras y traseras
        ctx.fillStyle = "#2d0f09";
        ctx.fillRect(obj.x + 2, obj.y + obj.h, 3, 3);
        ctx.fillRect(obj.x + obj.w - 5, obj.y + obj.h, 3, 3);
      } else {
        // Mirando hacia arriba
        ctx.fillStyle = "#2d0f09"; // Cabeza
        ctx.fillRect(obj.x + 1, obj.y - 2, 8, 5);
        
        ctx.fillStyle = "#ff0000"; // Ojitos rojos
        ctx.fillRect(obj.x + 2, obj.y, 2, 2);
        ctx.fillRect(obj.x + 6, obj.y, 2, 2);
        
        ctx.fillStyle = "#ffffff"; // Dientes
        ctx.fillRect(obj.x + 3, obj.y - 2, 4, 2);

        // Patas a los lados
        ctx.fillStyle = "#2d0f09";
        ctx.fillRect(obj.x - 2, obj.y + 3, 2, 4);
        ctx.fillRect(obj.x + obj.w, obj.y + 3, 2, 4);
      }

    } else if (obj.type === "neptune") {
      const renderY = obj.y - (waterDrained ? Math.abs(Math.sin(gameFrame / 5 + obj.x)) * 2 : 0);
      const midY = renderY + obj.h / 2;
      ctx.fillStyle = "#34464a";
      ctx.beginPath();
      ctx.moveTo(obj.x + 4, midY);
      ctx.lineTo(obj.x - 2, renderY + 1);
      ctx.lineTo(obj.x + 2, midY);
      ctx.lineTo(obj.x - 2, renderY + obj.h - 1);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = obj.w > 20 ? "#6f8482" : "#7d9290";
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w * 0.56, midY, obj.w * 0.42, obj.h * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#c1cebf";
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w * 0.62, midY + 1, obj.w * 0.27, obj.h * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#536662";
      ctx.beginPath();
      ctx.moveTo(obj.x + obj.w * 0.38, midY - 1);
      ctx.lineTo(obj.x + obj.w * 0.53, renderY - 2);
      ctx.lineTo(obj.x + obj.w * 0.67, midY - 1);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#a52e2a";
      ctx.fillRect(obj.x + obj.w - 4, midY + 1, 3, 1);
      ctx.fillStyle = "#f4df97";
      ctx.fillRect(obj.x + obj.w - 4, midY - 3, 2, 2);

    } else if (obj.type === "greenHerb") {
      // Planta verde de curación en maceta roja
      ctx.fillStyle = "#8b0000"; // Maceta
      ctx.fillRect(obj.x + 2, obj.y + 6, obj.w - 4, 4);

      ctx.fillStyle = "#00ff00"; // Hojas verdes brillantes
      ctx.fillRect(obj.x + 1, obj.y + 2, 3, 4);
      ctx.fillRect(obj.x + 6, obj.y + 1, 3, 5);
      ctx.fillRect(obj.x + 3, obj.y, 4, 3);
      
      ctx.fillStyle = "#00aa00"; // Sombra de hojas
      ctx.fillRect(obj.x + 4, obj.y + 3, 2, 3);

    } else if (obj.type === "redHerb") {
      ctx.fillStyle = "#8b0000";
      ctx.fillRect(obj.x + 2, obj.y + 6, obj.w - 4, 4);
      ctx.fillStyle = "#c62828";
      ctx.fillRect(obj.x + 1, obj.y + 2, 3, 4);
      ctx.fillRect(obj.x + 6, obj.y + 1, 3, 5);
      ctx.fillRect(obj.x + 3, obj.y, 4, 3);
      ctx.fillStyle = "#f06a55";
      ctx.fillRect(obj.x + 4, obj.y + 3, 2, 3);

    } else if (obj.type === "flowerBed") {
      ctx.fillStyle = "#63391f";
      ctx.fillRect(obj.x, obj.y + 5, obj.w, obj.h - 5);
      ctx.fillStyle = "#8a5429";
      ctx.fillRect(obj.x + 1, obj.y + 5, obj.w - 2, 2);
      for (let flowerX = obj.x + 5; flowerX < obj.x + obj.w - 3; flowerX += 8) {
        ctx.fillStyle = "#347844";
        ctx.fillRect(flowerX + 1, obj.y + 2, 2, 5);
        ctx.fillStyle = flowerX % 3 === 0 ? "#d94c54" : "#e2c45f";
        ctx.fillRect(flowerX, obj.y, 4, 3);
      }

    } else if (obj.type === "windowVertical") {
      // Ventana en pared derecha
      ctx.fillStyle = "#add8e6"; // Marco celeste
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#ffffff"; // Vidrio reflejante
      ctx.fillRect(obj.x + 1, obj.y + 2, obj.w - 2, obj.h - 4);

    } else if (obj.type === "adder") {
      const sway = obj.animFrame ? 2 : 0;
      ctx.strokeStyle = "#711c18";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(obj.x + 1, obj.y + 7);
      ctx.lineTo(obj.x + 4, obj.y + 4 + sway);
      ctx.lineTo(obj.x + 7, obj.y + 7 - sway);
      ctx.lineTo(obj.x + 10, obj.y + 4 + sway);
      ctx.lineTo(obj.x + 13, obj.y + 5);
      ctx.stroke();
      ctx.fillStyle = "#bb382a";
      ctx.fillRect(obj.x + 10, obj.y + 2, 4, 4);
      ctx.fillStyle = "#e5bc76";
      ctx.fillRect(obj.x + 13, obj.y + 3, 1, 1);

    } else if (obj.type === "blackTiger") {
      const stride = obj.animFrame ? 5 : 0;
      ctx.fillStyle = "rgba(0, 0, 0, 0.48)";
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w / 2, obj.y + obj.h * 0.73, obj.w * 0.46, obj.h * 0.19, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#17120f";
      ctx.lineWidth = 5;
      for (const side of [-1, 1]) {
        for (let leg = 0; leg < 4; leg++) {
          const startX = obj.x + obj.w / 2 + side * 19;
          const startY = obj.y + 30 + leg * 5;
          const kneeX = obj.x + obj.w / 2 + side * (35 + leg * 3);
          const kneeY = obj.y + 13 + leg * 15 + (leg % 2 ? stride : -stride);
          const footX = obj.x + obj.w / 2 + side * (46 + leg * 4);
          const footY = obj.y + 3 + leg * 22 + (leg % 2 ? -stride : stride);
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(kneeX, kneeY);
          ctx.lineTo(footX, footY);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "#17120f";
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w / 2, obj.y + 43, 34, 27, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#55251f";
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w / 2, obj.y + 44, 26, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#211714";
      ctx.beginPath();
      ctx.ellipse(obj.x + obj.w / 2, obj.y + 26, 21, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#9a3829";
      ctx.fillRect(obj.x + 18, obj.y + 17, 56, 5);
      ctx.fillStyle = "#e24a31";
      ctx.fillRect(obj.x + 27, obj.y + 23, 5, 4);
      ctx.fillRect(obj.x + 60, obj.y + 23, 5, 4);
      ctx.fillStyle = "#ead6a0";
      ctx.fillRect(obj.x + 31, obj.y + 34, 4, 5);
      ctx.fillRect(obj.x + 57, obj.y + 34, 4, 5);

    } else if (obj.type === "spider") {
      ctx.strokeStyle = "#17110d";
      ctx.lineWidth = 2;
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(obj.x + 11, obj.y + 9);
        ctx.lineTo(obj.x + (side < 0 ? 2 : 22), obj.y + 2);
        ctx.lineTo(obj.x + (side < 0 ? 0 : 24), obj.y + 7);
        ctx.moveTo(obj.x + 11, obj.y + 12);
        ctx.lineTo(obj.x + (side < 0 ? 2 : 22), obj.y + 11);
        ctx.lineTo(obj.x + (side < 0 ? 0 : 24), obj.y + 15);
        ctx.moveTo(obj.x + 11, obj.y + 15);
        ctx.lineTo(obj.x + (side < 0 ? 4 : 20), obj.y + 19);
        ctx.lineTo(obj.x + (side < 0 ? 1 : 23), obj.y + 21);
        ctx.stroke();
      }
      ctx.fillStyle = "#20120f";
      ctx.fillRect(obj.x + 5, obj.y + 4, 14, 12);
      ctx.fillRect(obj.x + 9, obj.y + 14, 7, 6);
      ctx.fillStyle = "#661b18";
      ctx.fillRect(obj.x + 7, obj.y + 6, 10, 7);
      ctx.fillStyle = "#e34b35";
      ctx.fillRect(obj.x + 9, obj.y + 8, 2, 2);
      ctx.fillRect(obj.x + 14, obj.y + 8, 2, 2);

    } else if (obj.type === "enrico") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(obj.x + 1, obj.y + obj.h - 3, obj.w + 2, 4);
      ctx.fillStyle = "#303845";
      ctx.fillRect(obj.x + 3, obj.y + 11, 14, 10);
      ctx.fillRect(obj.x + 1, obj.y + 17, 8, 5);
      ctx.fillRect(obj.x + 10, obj.y + 18, 8, 4);
      ctx.fillStyle = "#d6b49a";
      ctx.fillRect(obj.x + 6, obj.y + 2, 10, 10);
      ctx.fillStyle = "#f0eee0";
      ctx.fillRect(obj.x + 5, obj.y + 1, 12, 4);
      ctx.fillRect(obj.x + 4, obj.y + 3, 3, 5);
      ctx.fillStyle = "#51433d";
      ctx.fillRect(obj.x + 4, obj.y + 7, 3, 5);
      ctx.fillRect(obj.x + 15, obj.y + 7, 3, 5);
      ctx.fillStyle = "#25221f";
      ctx.fillRect(obj.x + 7, obj.y + 5, 2, 1);
      ctx.fillRect(obj.x + 13, obj.y + 5, 2, 1);

    } else if (obj.type === "zombie") {
      // --- ZOMBIE PRIMER ENCUENTRO (De espaldas comiendo / arrodillado) ---
      // Sombra
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(obj.x - 1, obj.y + 1, obj.w + 2, obj.h + 1);

      // Espalda / Traje desgarbado (Gris verdoso podrido)
      ctx.fillStyle = "#3a4235";
      ctx.fillRect(obj.x + 2, obj.y + 3, 8, 8);

      // Cabeza pálida/grisácea calva (de espaldas)
      ctx.fillStyle = "#8ca382";
      ctx.fillRect(obj.x + 3, obj.y, 6, 5);
      // Manchas de pudrición/sangre en la nuca
      ctx.fillStyle = "#4a1212";
      ctx.fillRect(obj.x + 5, obj.y + 3, 2, 2);

      // Hombros/Brazos hacia adelante (encorvado)
      ctx.fillStyle = "#8ca382";
      ctx.fillRect(obj.x, obj.y + 4, 2, 5);
      ctx.fillRect(obj.x + 10, obj.y + 4, 2, 5);

      // Piernas dobladas/arrodilladas
      ctx.fillStyle = "#222820";
      ctx.fillRect(obj.x + 2, obj.y + 10, 3, 4);
      ctx.fillRect(obj.x + 7, obj.y + 10, 3, 4);

      // Detalles de sangre en las manos
      ctx.fillStyle = "#990000";
      ctx.fillRect(obj.x, obj.y + 8, 2, 2);
      ctx.fillRect(obj.x + 10, obj.y + 8, 2, 2);
    } else if (obj.type === "poolTable") {
      ctx.fillStyle = "#20120b";
      ctx.fillRect(obj.x - 2, obj.y - 2, obj.w + 4, obj.h + 4);
      ctx.fillStyle = "#70431f";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#175139";
      ctx.fillRect(obj.x + 7, obj.y + 7, obj.w - 14, obj.h - 14);
      ctx.fillStyle = "#090b09";
      for (const px of [obj.x + 4, obj.x + obj.w / 2 - 3, obj.x + obj.w - 10]) {
        ctx.fillRect(px, obj.y + 3, 6, 5);
        ctx.fillRect(px, obj.y + obj.h - 8, 6, 5);
      }
      ctx.fillRect(obj.x + 3, obj.y + obj.h / 2 - 3, 5, 6);
      ctx.fillRect(obj.x + obj.w - 8, obj.y + obj.h / 2 - 3, 5, 6);
      ctx.fillStyle = "#e4d7b1";
      ctx.fillRect(obj.x + 32, obj.y + 26, 4, 4);
      ctx.fillStyle = "#c9362b";
      ctx.fillRect(obj.x + 72, obj.y + 34, 4, 4);

    } else if (obj.type === "barCounter") {
      // Barra de bebidas con sillas/banquetas
      ctx.fillStyle = "#3e2213";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = PALETTE.wood;
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);
      ctx.strokeStyle = PALETTE.trim;
      ctx.strokeRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);

      // Botellas de colores
      ctx.fillStyle = "#111111";
      ctx.fillRect(obj.x + 5, obj.y + 8, 8, obj.h - 16);
      ctx.fillStyle = "#d84e1b"; ctx.fillRect(obj.x + 7, obj.y + 12, 4, 6);
      ctx.fillStyle = "#88cbe8"; ctx.fillRect(obj.x + 7, obj.y + 28, 4, 6);
      ctx.fillStyle = "#d89a42"; ctx.fillRect(obj.x + 7, obj.y + 44, 4, 6);

      // Banquetas/Sillas de barra a la derecha
      ctx.fillStyle = "#221108";
      ctx.fillRect(obj.x + obj.w + 4, obj.y + 10, 8, 8);
      ctx.fillRect(obj.x + obj.w + 4, obj.y + 36, 8, 8);
      ctx.fillRect(obj.x + obj.w + 4, obj.y + 62, 8, 8);

    } else if (obj.type === "piano") {
      // Tapete/Alfombra
      ctx.fillStyle = "#5c1b1b";
      ctx.fillRect(obj.x - 3, obj.y - 3, obj.w + 6, obj.h + 6);

      // Cuerpo del Piano
      ctx.fillStyle = "#111111";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#2a2a2a";
      ctx.fillRect(obj.x + 2, obj.y + 2, obj.w - 4, obj.h - 4);

      // Teclado
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(obj.x + 4, obj.y + obj.h - 6, obj.w - 8, 4);
      ctx.fillStyle = "#000000";
      for (let tx = obj.x + 6; tx < obj.x + obj.w - 8; tx += 4) {
        ctx.fillRect(tx, obj.y + obj.h - 6, 2, 2);
      }

    } else if (obj.type === "emptyBottle") {
      ctx.fillStyle = "#172b2b";
      ctx.fillRect(obj.x + 2, obj.y + 3, obj.w - 4, obj.h - 4);
      ctx.fillRect(obj.x + 3, obj.y + 1, obj.w - 6, 3);
      ctx.fillStyle = "#7eaaa0";
      ctx.fillRect(obj.x + 3, obj.y + 5, 1, obj.h - 8);
      ctx.fillStyle = "#c4d9d1";
      ctx.fillRect(obj.x + 3, obj.y, obj.w - 6, 2);

    } else if (obj.type === "vaseShelf") {
      ctx.fillStyle = "#25150e";
      ctx.fillRect(obj.x, obj.y + 5, obj.w, obj.h - 5);
      ctx.fillStyle = "#724722";
      ctx.fillRect(obj.x + 2, obj.y + 5, obj.w - 4, obj.h - 9);
      ctx.fillStyle = "#9a6b37";
      ctx.fillRect(obj.x, obj.y + obj.h - 4, obj.w, 4);
      ctx.fillStyle = "#382315";
      for (let x = obj.x + 5; x < obj.x + obj.w; x += 18) {
        ctx.fillRect(x, obj.y + 14, 2, obj.h - 18);
      }

    } else if (obj.type === "vase") {
      ctx.fillStyle = "#69442e";
      ctx.fillRect(obj.x + 3, obj.y + 2, obj.w - 6, obj.h - 5);
      ctx.fillRect(obj.x + 1, obj.y + obj.h - 4, obj.w - 2, 3);
      ctx.fillStyle = "#a97846";
      ctx.fillRect(obj.x + 4, obj.y + 4, 2, obj.h - 9);
      ctx.fillStyle = "#c49b5c";
      ctx.fillRect(obj.x + 3, obj.y, obj.w - 6, 3);

    } else if (obj.type === "shelf") {
      // Estantería
      ctx.fillStyle = "#3e2213";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = PALETTE.wood;
      ctx.fillRect(obj.x + 1, obj.y + 1, obj.w - 2, obj.h - 2);
      // Libros y Partitura
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(obj.x + 50, obj.y + 3, 12, 10);
      ctx.fillStyle = "#111111";
      ctx.fillRect(obj.x + 53, obj.y + 5, 6, 1);
      ctx.fillRect(obj.x + 53, obj.y + 8, 6, 1);

    } else if (obj.type === "hiddenDoor") {
      // Panel/Puerta secreta de madera en la pared superior
      ctx.fillStyle = "#221108";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.strokeStyle = PALETTE.trim;
      ctx.lineWidth = 1;
      ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);

    } else if (obj.type === "emblem") {
      // Emblema en la pared izquierda del pasillo secreto
      ctx.fillStyle = PALETTE.emblem;
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

    } else if (obj.type === "window") {
      // Ventana en la pared derecha del pasillo secreto
      ctx.fillStyle = "#88cbe8";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
    
    }
    
  });
}

function drawStaticCharacter(obj) {
  const x = Math.round(obj.x);
  const y = Math.round(obj.y);

  ctx.fillStyle = "rgba(0, 0, 0, 0.38)";
  ctx.fillRect(x + 1, y + 19, obj.w + 3, 4);

  if (obj.character === "greenSoldier") {
    ctx.fillStyle = "#25251f";
    ctx.fillRect(x + 4, y + 1, 9, 6);
    ctx.fillStyle = "#e1b08b";
    ctx.fillRect(x + 5, y + 4, 7, 6);
    ctx.fillStyle = "#526b3d";
    ctx.fillRect(x + 3, y + 9, 11, 8);
    ctx.fillRect(x + 1, y + 10, 3, 7);
    ctx.fillRect(x + 13, y + 10, 3, 6);
    ctx.fillStyle = "#75805b";
    ctx.fillRect(x + 5, y + 10, 2, 6);
    ctx.fillRect(x + 10, y + 10, 2, 6);
    ctx.fillStyle = "#45483b";
    ctx.fillRect(x + 4, y + 17, 4, 5);
    ctx.fillRect(x + 10, y + 17, 4, 5);
    ctx.fillStyle = "#252722";
    ctx.fillRect(x + 13, y + 12, 10, 2);
    ctx.fillRect(x + 20, y + 11, 3, 1);
  } else if (obj.character === "redVest") {
    ctx.fillStyle = "#4a3024";
    ctx.fillRect(x + 4, y + 1, 10, 6);
    ctx.fillStyle = "#d5a27b";
    ctx.fillRect(x + 4, y + 5, 11, 7);
    ctx.fillStyle = "#72513c";
    ctx.fillRect(x + 5, y + 9, 9, 3);
    ctx.fillStyle = "#aaa69a";
    ctx.fillRect(x + 1, y + 10, 4, 7);
    ctx.fillRect(x + 14, y + 10, 4, 7);
    ctx.fillStyle = "#9a2822";
    ctx.fillRect(x + 3, y + 11, 14, 7);
    ctx.fillStyle = "#6c7771";
    ctx.fillRect(x + 4, y + 18, 5, 4);
    ctx.fillRect(x + 12, y + 18, 5, 4);
    ctx.fillStyle = "#272b29";
    ctx.fillRect(x + 8, y + 12, 2, 4);
  } else if (obj.character === "medic") {
    ctx.fillStyle = "#4a2c1d";
    ctx.fillRect(x + 3, y + 1, 11, 7);
    ctx.fillStyle = "#edc3a0";
    ctx.fillRect(x + 5, y + 4, 8, 7);
    ctx.fillStyle = "#e8e4d7";
    ctx.fillRect(x + 3, y + 10, 12, 9);
    ctx.fillRect(x + 1, y + 11, 3, 7);
    ctx.fillRect(x + 14, y + 11, 3, 7);
    ctx.fillStyle = "#b32a26";
    ctx.fillRect(x + 9, y + 11, 2, 5);
    ctx.fillRect(x + 8, y + 12, 4, 2);
    ctx.fillStyle = "#54614d";
    ctx.fillRect(x + 4, y + 19, 4, 3);
    ctx.fillRect(x + 11, y + 19, 4, 3);
    ctx.fillStyle = "#edc3a0";
    ctx.fillRect(x, y + 15, 3, 3);
  } else if (obj.character === "sunglasses") {
    ctx.fillStyle = "#d0b583";
    ctx.fillRect(x + 4, y + 2, 9, 3);
    ctx.fillStyle = "#e2b993";
    ctx.fillRect(x + 5, y + 5, 8, 6);
    ctx.fillStyle = "#17191a";
    ctx.fillRect(x + 4, y + 7, 10, 3);
    ctx.fillStyle = "#111416";
    ctx.fillRect(x + 3, y + 10, 12, 9);
    ctx.fillRect(x + 1, y + 11, 3, 7);
    ctx.fillRect(x + 14, y + 11, 3, 7);
    ctx.fillStyle = "#292b2c";
    ctx.fillRect(x + 4, y + 19, 4, 3);
    ctx.fillRect(x + 11, y + 19, 4, 3);
    ctx.fillStyle = "#c5c5bc";
    ctx.fillRect(x + 8, y + 11, 2, 7);
  }
}

function drawPlayer() {
  const x = Math.round(player.x);
  const y = Math.round(player.y);

  ctx.fillStyle = "#2b4374";
  ctx.fillRect(x + 2, y, 8, 3);
  ctx.fillStyle = "#e9c39a";
  ctx.fillRect(x + 3, y + 3, 6, 3);
  ctx.fillStyle = "#3b5998";
  ctx.fillRect(x + 1, y + 6, 10, 5);
  ctx.fillStyle = "#e9c39a";
  ctx.fillRect(x, y + 7, 2, 4);
  ctx.fillRect(x + 10, y + 7, 2, 4);

  ctx.fillStyle = "#111111";
  if (player.animFrame === 0) {
    ctx.fillRect(x + 2, y + 11, 3, 5);
    ctx.fillRect(x + 7, y + 11, 3, 5);
  } else {
    ctx.fillRect(x + 1, y + 11, 4, 5);
    ctx.fillRect(x + 7, y + 11, 4, 5);
  }

  ctx.save();
  ctx.translate(x + 6, y + 8);
  ctx.rotate(player.aimAngle);
  ctx.fillStyle = "#e9c39a";
  ctx.fillRect(2, -1, 5, 3);
  ctx.fillStyle = "#292b2a";
  ctx.fillRect(6, -2, 9, 3);
  ctx.fillStyle = "#77766c";
  ctx.fillRect(11, -3, 5, 2);
  ctx.restore();

  if (weapon.shotFlash > 0) {
    ctx.fillStyle = "#f5d66b";
    ctx.fillRect(x + 6 + Math.cos(player.aimAngle) * 16 - 1, y + 8 + Math.sin(player.aimAngle) * 16 - 1, 3, 3);
    ctx.strokeStyle = "#f5d66b";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 6, y + 8);
    ctx.lineTo(aimPoint.x, aimPoint.y);
    ctx.stroke();
  }

  if (aimPoint.x >= 0 && aimPoint.x <= WIDTH && aimPoint.y >= 0 && aimPoint.y <= HEIGHT) {
    ctx.strokeStyle = "rgba(240, 225, 170, 0.8)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(aimPoint.x - 4, aimPoint.y);
    ctx.lineTo(aimPoint.x + 4, aimPoint.y);
    ctx.moveTo(aimPoint.x, aimPoint.y - 4);
    ctx.lineTo(aimPoint.x, aimPoint.y + 4);
    ctx.stroke();
  }
}

function drawTrophyDarkness() {
  if (currentRoom !== "trophyRoom" || trophyLightsOn) return;
  ctx.fillStyle = "rgba(0, 0, 0, 0.82)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  if (ROOMS.trophyRoom.interactables.some((obj) => obj.type === "redJewel")) {
    ctx.fillStyle = "rgba(145, 0, 0, 0.35)";
    ctx.fillRect(158, 41, 15, 15);
    ctx.fillStyle = "#ff2020";
    ctx.fillRect(164, 45, 3, 3);
  }
}

function loop() {
  STATUS.tick();
  update();
  drawRoom();
  drawPlayer();
  drawTrophyDarkness();
  requestAnimationFrame(loop);
}

loop();
