const ROOMS = {
  mainHall: {
    name: "Main Hall 1F",
    bounds: { minX: 18, maxX: 302, minY: 24, maxY: 172 },
    doors: [
      // Puerta Oeste -> Va al Dining Room
      { id: "west", x: 12, y: 75, w: 12, h: 40, targetRoom: "diningRoom", spawnX: 280, spawnY: 90 },
      // Puertas Este (Pared derecha)
      { id: "eastTop", x: 296, y: 45, w: 12, h: 30, targetRoom: "mainHall", spawnX: 230, spawnY: 140 },
      { id: "eastBottom", x: 296, y: 120, w: 12, h: 30, targetRoom: "mainHall", spawnX: 230, spawnY: 140 }
    ],
    interactables: [
      { type: "stairs", x: 120, y: 24, w: 80, h: 40 },
      { type: "balconyLeft", x: 18, y: 24, w: 102, h: 24 },
      { type: "balconyRight", x: 200, y: 24, w: 102, h: 24 },
      { type: "typewriter", x: 80, y: 54, w: 26, h: 20, solid: true }
    ]
  },

diningRoom: {
    name: "Dining Room 1F",
    bounds: { minX: 18, maxX: 302, minY: 24, maxY: 172 },
    doors: [
      { id: "east", x: 296, y: 75, w: 12, h: 40, targetRoom: "mainHall", spawnX: 30, spawnY: 90 },
      // Puerta Norte extendida hacia abajo para hacer contacto fácil:
      { id: "north", x: 60, y: 18, w: 40, h: 14, targetRoom: "teaRoom", spawnX: 130, spawnY: 115 }
    ],
    interactables: [
      { type: "table", x: 85, y: 75, w: 150, h: 40, solid: true },
      { type: "fireplace", x: 12, y: 60, w: 6, h: 60 },
      { type: "clock", x: 180, y: 18, w: 16, h: 8 }
    ]
  },

  // Agregá esto dentro del objeto ROOMS (asegurate de poner una coma antes de agregarlo):
  teaRoom: {
    name: "Tea Room Corridor 1F",
    bounds: { minX: 20, maxX: 300, minY: 20, maxY: 160 },
    walls: [
      { x: 80, y: 20, w: 220, h: 80 }, // Bloque superior derecho vacío (forma L)
      { x: 20, y: 0, w: 280, h: 20 },
      { x: 0, y: 0, w: 20, h: 160 },
      { x: 20, y: 140, w: 280, h: 20 }
    ],
    corridorPoly: [
      { x: 20, y: 20, w: 60, h: 120 }, // Tramo vertical (K y Z)
      { x: 20, y: 100, w: 280, h: 40 } // Tramo horizontal
    ],
    doors: [
      { id: "southDining", x: 130, y: 134, w: 30, h: 12, targetRoom: "diningRoom", spawnX: 75, spawnY: 35 },
      { id: "northDoor1", x: 175, y: 94, w: 30, h: 12, targetRoom: "centralCorridor", spawnX: 35, spawnY: 135 },
      { id: "northDoor2", x: 250, y: 94, w: 24, h: 12, targetRoom: "bar", spawnX: 245, spawnY: 130 },
      { id: "eastDoor", x: 292, y: 105, w: 12, h: 30, targetRoom: "teaRoom", spawnX: 270, spawnY: 115 }
    ],
    interactables: [
      { type: "kenneth", x: 35, y: 30, w: 16, h: 12, solid: true },
      { type: "zombie", x: 35, y: 55, w: 12, h: 14, solid: true },
      { type: "window", x: 30, y: 18, w: 26, h: 4 }
    ]
  },

bar: {
    name: "Bar 1F",
    // Reducimos el salón del bar haciendo que la pared superior empiece en Y: 45
    bounds: { minX: 20, maxX: 300, minY: 45, maxY: 156 },
    // Muros para dar forma al nicho secreto superior
    walls: [
      { x: 20, y: 0, w: 100, h: 45 },   // Bloque superior izquierdo
      { x: 160, y: 0, w: 140, h: 45 }   // Bloque superior derecho
    ],
    // Polígonos transitables (Salón principal + Pequeño pasillo secreto)
    corridorPoly: [
      { x: 20, y: 45, w: 280, h: 110 }, // Salón Principal del Bar
      { x: 120, y: 15, w: 40, h: 30 }   // Pasillo Secreto (Emblema + Ventana)
    ],
    doors: [
      // Puerta Sur bajada a la parte inferior
      { id: "southPassage", x: 220, y: 150, w: 30, h: 12, targetRoom: "teaRoom", spawnX: 250, spawnY: 115 }
    ],
    interactables: [
      { type: "barCounter", x: 30, y: 55, w: 35, h: 80, solid: true },
      { type: "piano", x: 220, y: 75, w: 40, h: 36, solid: true },
      { type: "shelf", x: 205, y: 47, w: 85, h: 16, solid: true },
      { type: "hiddenDoor", x: 120, y: 43, w: 40, h: 6, solid: true },
      // Elementos del pasillo secreto
      { type: "emblem", x: 122, y: 20, w: 4, h: 10 },
      { type: "window", x: 154, y: 20, w: 4, h: 16 }
    ]
  },
  centralCorridor: {
    name: "Central Corridor 1F",
    floorType: "wood",
    bounds: { minX: 20, maxX: 300, minY: 20, maxY: 170 },
    // Muro invisible en el hueco interno de la L
    walls: [
      { x: 60, y: 70, w: 200, h: 100 }
    ],
    // Corredor en L con la punta derecha extendida hacia abajo
    corridorPoly: [
      { x: 20, y: 20, w: 40, h: 150 },   // Pasillo vertical izquierdo
      { x: 20, y: 20, w: 260, h: 50 },   // Pasillo horizontal superior
      { x: 260, y: 20, w: 30, h: 100 }   // Extremo derecho estirado hacia abajo
    ],
    doors: [
      // Puerta inferior -> Tea Room
      { id: "southPassage", x: 20, y: 152, w: 40, h: 14, targetRoom: "teaRoom", spawnX: 185, spawnY: 110 },
      // Puerta superior izquierda
      { id: "northWest", x: 16, y: 20, w: 10, h: 25, targetRoom: "centralCorridor", spawnX: 35, spawnY: 35 },
      // Puerta intermedia (orientada a la derecha en la pared vertical)
      { id: "middleNiche", x: 56, y: 80, w: 8, h: 25, targetRoom: "centralCorridor", spawnX: 40, spawnY: 90 },
      // Puerta derecha (movida al nicho extendido y mirando a la izquierda)
      { id: "eastArm", x: 256, y: 80, w: 8, h: 25, targetRoom: "centralCorridor", spawnX: 270, spawnY: 90 }
    ],
    interactables: [
      { type: "zombie", x: 30, y: 120, w: 12, h: 14 },
      { type: "zombie", x: 140, y: 24, w: 12, h: 14 }
    ]
  }
};