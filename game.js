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


// --- ESTADO DEL JUEGO ---
let currentRoom = "mainHall";

let player = {
  x: 230,
  y: 140,
  dx: 0,
  dy: 0,
  isMoving: false,
  animFrame: 0,
  animTimer: 0
};

const keys = new Set();
window.addEventListener("keydown", (e) => keys.add(e.key.length === 1 ? e.key.toLowerCase() : e.key));
window.addEventListener("keyup", (e) => keys.delete(e.key.length === 1 ? e.key.toLowerCase() : e.key));

function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  );
}

function update() {
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

  // Colisión con objetos
  room.interactables.forEach((obj) => {
    if (obj.solid) {
      if (checkCollision(playerRectX, obj)) canMoveX = false;
      if (checkCollision(playerRectY, obj)) canMoveY = false;
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

  // Transiciones de puertas
  const playerRect = { x: player.x, y: player.y, w: PLAYER_WIDTH, h: PLAYER_HEIGHT };
  room.doors.forEach((door) => {
    if (checkCollision(playerRect, door)) {
      currentRoom = door.targetRoom;
      player.x = door.spawnX;
      player.y = door.spawnY;
      const titleElem = document.getElementById("room-title");
      if (titleElem) titleElem.innerText = ROOMS[currentRoom].name;
    }
  });
}

function drawRoom() {
  const room = ROOMS[currentRoom];

  // 1. Decidir qué textura de piso usar para esta habitación
  let currentFloorPattern = floorPattern; // Por defecto (alfombra verde)

  if (room.floorType === "wood") {
    currentFloorPattern = woodFloorPattern;
  } else if (room.floorType === "concrete") {
    currentFloorPattern = concreteFloorPattern;
  }

  // Fondo negro base
  ctx.fillStyle = PALETTE.shadow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // 2. Dibujar la estructura (Pasillos custom o Cuartos rectangulares)
  if (room.corridorPoly) {
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
  ctx.fillStyle = PALETTE.door;
  room.doors.forEach((d) => ctx.fillRect(d.x, d.y, d.w, d.h));

// 3. Dibujar Muebles y Elementos Específicos
  room.interactables.forEach((obj) => {
    if (obj.type === "stairs" || obj.type === "stairsVertical") {
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

      room.interactables.forEach((obj) => {
  if (obj.type === "greenHerb") {
    // Hierba verde brillante con borde negro
    ctx.fillStyle = "#000000";
    ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
    ctx.fillStyle = "#00ff66";
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

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

  } else if (obj.type === "pottedPlant") {
    // Planta decorativa: Maceta terracota clara + hojas verde brillante
    ctx.fillStyle = "#d2691e"; // Maceta terracota clara
    ctx.fillRect(obj.x + 1, obj.y + 4, obj.w - 2, 6);
    ctx.fillStyle = "#00ff44"; // Hojas verde lima
    ctx.fillRect(obj.x, obj.y, obj.w, 5);

  } else if (obj.type === "zombieDog") {
    // Perro Zombi: Borde rojizo/oscuro + ojos rojos brillantes
    ctx.fillStyle = "#2a1508";
    ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
    ctx.fillStyle = "#8b4513"; // Marrón
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = "#ff0000"; // Ojos rojos
    ctx.fillRect(obj.x + 2, obj.y + 2, 3, 3);
  }
});
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

    } else if (obj.type === "greenHerb") {
      // Hierba Verde 'g' (Maceta con hoja verde)
      ctx.fillStyle = "#5c341d"; // Maceta
      ctx.fillRect(obj.x + 2, obj.y + 5, 6, 5);
      ctx.fillStyle = "#228b22"; // Planta verde
      ctx.fillRect(obj.x, obj.y, 10, 6);

    } else if (obj.type === "blueHerb") {
      // Hierba Azul 'b' (Maceta con hoja azul)
      ctx.fillStyle = "#5c341d"; // Maceta
      ctx.fillRect(obj.x + 2, obj.y + 5, 6, 5);
      ctx.fillStyle = "#4169e1"; // Planta azul
      ctx.fillRect(obj.x, obj.y, 10, 6);

    } else if (obj.type === "armorKey") {
      // Llave de la Armadura
      ctx.fillStyle = "#ffd700"; // Dorado brillante
      ctx.fillRect(obj.x, obj.y, 4, 4);       // Cabeza
      ctx.fillRect(obj.x + 3, obj.y + 1, 5, 2); // Cuerpo
      ctx.fillRect(obj.x + 7, obj.y + 3, 2, 2); // Dientes
     
      } else if (obj.type === "column") {
      // Columna de la mansión (Base, cuerpo con sombras y capitel)
      ctx.fillStyle = "#221108"; // Sombra base
      ctx.fillRect(obj.x - 1, obj.y - 1, obj.w + 2, obj.h + 2);
      ctx.fillStyle = "#5c341d"; // Madera/Piedra base
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = PALETTE.trim; // Detalle dorado/moldura
      ctx.fillRect(obj.x + 1, obj.y + 1, obj.w - 2, 2);
      ctx.fillRect(obj.x + 1, obj.y + obj.h - 3, obj.w - 2, 2);

} else if (obj.type === "brokenShotgun") {
      // Escopeta Rota (Cañón de metal con culata de madera tallada)
      ctx.fillStyle = "#5c341d"; // Culata de madera
      ctx.fillRect(obj.x, obj.y + 3, 6, 4);
      ctx.fillStyle = "#707070"; // Cañón doble/cuerpo gris de metal
      ctx.fillRect(obj.x + 6, obj.y + 2, 14, 3);
      ctx.fillStyle = "#221108"; // Grieta / Detalle de rotura en el cañón
      ctx.fillRect(obj.x + 12, obj.y + 2, 2, 3);

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

    } else if (obj.type === "mirror") {
      // Espejo en la pared (Marco de madera, cristal plateado/azul)
      ctx.fillStyle = PALETTE.trim;
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#a2c4c9";
      ctx.fillRect(obj.x + 1, obj.y + 2, obj.w - 2, obj.h - 4);

    } else if (obj.type === "closetDoor") {
      // Marco / Puerta del armario
      ctx.fillStyle = "#221108";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = PALETTE.trim;
      ctx.fillRect(obj.x + 1, obj.y + 4, obj.w - 2, obj.h - 8);

    } else if (obj.type === "shotgunShells") {
      // Cartuchos de escopeta (Caja roja brillante)
      ctx.fillStyle = "#b81d1d";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#d89a42"; // Detalle dorado/bronce
      ctx.fillRect(obj.x + 1, obj.y + 1, 3, obj.h - 2);
    
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
    } else if (obj.type === "fireplace") {
      ctx.fillStyle = PALETTE.fireplace;
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = PALETTE.fire;
      ctx.fillRect(obj.x + 2, obj.y + 22, 3, 16);
      ctx.fillStyle = PALETTE.emblem;
      ctx.fillRect(obj.x + 1, obj.y + 8, 4, 6);
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

      

    } else if (obj.type === "windowVertical") {
      // Ventana en pared derecha
      ctx.fillStyle = "#add8e6"; // Marco celeste
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.fillStyle = "#ffffff"; // Vidrio reflejante
      ctx.fillRect(obj.x + 1, obj.y + 2, obj.w - 2, obj.h - 4);

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
    
    } else if (obj.type === "window") {
      ctx.fillStyle = "#88cbe8";
      ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
    }
    
  });
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
}

function loop() {
  update();
  drawRoom();
  drawPlayer();
  requestAnimationFrame(loop);
}

loop();