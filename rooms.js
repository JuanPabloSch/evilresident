const ROOMS = {
  mainHall: {
    name: "Main Hall 1F",
    bounds: { minX: 18, maxX: 302, minY: 24, maxY: 172 },
    doors: [
      // Puerta Oeste -> Va al Dining Room
      { id: "west", x: 12, y: 75, w: 12, h: 40, targetRoom: "diningRoom", spawnX: 280, spawnY: 90 },
      // Puertas Este (Pared derecha)
      { id: "eastTop", x: 296, y: 55, w: 12, h: 30, targetRoom: "dressingRoom", spawnX: 45, spawnY: 130 },
      { id: "eastBottom", x: 296, y: 120, w: 12, h: 30, targetRoom: "mainHall", spawnX: 230, spawnY: 140 }
    ],
    interactables: [
      { type: "stairsHorizontal", x: 120, y: 25, w: 80, h: 90},
      { type: "balconyLeft", x: 18, y: 24, w: 102, h: 30, solid: true },
    { type: "balconyRight", x: 200, y: 24, w: 102, h: 30, solid: true },
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
      { id: "eastDoor", x: 290, y: 110, w: 10, h: 30, targetRoom: "elevatorStairway", spawnX: 225, spawnY: 132 },
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
    walls: [
      { x: 60, y: 70, w: 200, h: 100 }
    ],
    corridorPoly: [
      { x: 20, y: 20, w: 40, h: 150 },   // Pasillo vertical izquierdo
      { x: 20, y: 20, w: 260, h: 50 },   // Pasillo horizontal superior
      { x: 260, y: 20, w: 30, h: 100 }   // Extremo derecho estirado hacia abajo
    ],
    doors: [
      // Puerta inferior -> Tea Room
      { id: "southPassage", x: 20, y: 152, w: 40, h: 14, targetRoom: "teaRoom", spawnX: 185, spawnY: 110 },
      // Puerta superior izquierda
      // Dentro de centralCorridor -> doors:
      { id: "northWest", x: 16, y: 40, w: 8, h: 25, targetRoom: "westStairway1F", spawnX: 240, spawnY: 45 },
      
      // NUEVA: Puerta a mitad de altura en la pared izquierda (mirando hacia afuera)
      { id: "midWest", x: 16, y: 90, w: 8, h: 25, targetRoom: "keepersBedroom", spawnX: 250, spawnY: 50 },
      
      // Puerta intermedia (pared derecha del pasillo vertical)
     // Dentro de centralCorridor -> doors:
  { id: "middleNiche", x: 56, y: 80, w: 8, h: 25, targetRoom: "tigerStatueRoom", spawnX: 135, spawnY: 105 },
      // Puerta derecha
      // Dentro de centralCorridor -> doors:
  { id: "eastArm", x: 256, y: 80, w: 8, h: 25, targetRoom: "greenhouse", spawnX: 230, spawnY: 50 },
    ],
    interactables: [
      { type: "zombie", x: 30, y: 120, w: 12, h: 14 },
      { type: "zombie", x: 140, y: 24, w: 12, h: 14 }
    ]
  },
  elevatorStairway: {
    name: "Elevator Stairway 1F",
    bounds: { minX: 40, maxX: 260, minY: 30, maxY: 160 },
    walls: [
      { x: 40, y: 70, w: 170, h: 90 } // Pared interna de la "L"
    ],
    corridorPoly: [
      { x: 40, y: 30, w: 220, h: 40 },  // Tramo horizontal (con escalera)
      { x: 210, y: 30, w: 50, h: 130 }  // Bajada vertical
    ],
    doors: [
      // Puerta inferior (pared izquierda) -> Vuelve a la Tea Room
      { id: "westDoorToTea", x: 206, y: 120, w: 8, h: 25, targetRoom: "teaRoom", spawnX: 250, spawnY: 125 },
      // Puerta arriba a la izquierda (al final de las escaleras) -> Sube a Kitchen 2F
      { id: "stairsToKitchen", x: 36, y: 38, w: 8, h: 24, targetRoom: "elevatorStairway", spawnX: 50, spawnY: 48 }
    ],
    interactables: [
      // Objeto interactivo visual para dibujar las escaleras en el canvas
      { type: "stairsVertical", x: 40, y: 30, w: 170, h: 40 }
    ]
  },
  keepersBedroom: {
    name: "Keeper's Bedroom",
    floorType: "wood",
    bounds: { minX: 30, maxX: 270, minY: 30, maxY: 180 },
    // Muros para formar el corte del nicho del closet abajo a la izquierda
    walls: [
      { x: 30, y: 30, w: 50, h: 100 } // Bloque superior izquierdo fuera del cuarto
    ],
    corridorPoly: [
      { x: 80, y: 30, w: 190, h: 150 },  // Habitación principal
      { x: 30, y: 130, w: 50, h: 50 }    // Closet / Armario (esquina inferior izquierda)
    ],
    doors: [
      // Puerta 'p' arriba a la derecha -> Vuelve al Central Corridor (puerta midWest)
      { id: "doorToCentral", x: 262, y: 40, w: 8, h: 25, targetRoom: "centralCorridor", spawnX: 35, spawnY: 100 }
    ],
    interactables: [
      // Cama 'b' (arriba a la izquierda)
      { type: "bed", x: 100, y: 45, w: 50, h: 25, solid: true },
      // Cargador de pistola (arriba de la cama)
      { type: "handgunAmmo", x: 118, y: 36, w: 12, h: 6 },
      
      // Escritorio 'm' (abajo a la derecha)
      { type: "desk", x: 210, y: 105, w: 35, h: 50, solid: true },
      // Keeper's Diary 'kd' (sobre el escritorio)
      { type: "keepersDiary", x: 220, y: 110, w: 14, h: 10 },

      // Espejo 'e' (en la pared izquierda)
      { type: "mirror", x: 76, y: 90, w: 4, h: 20 },

      // Puerta de closet 'pc'
      { type: "closetDoor", x: 76, y: 130, w: 4, h: 25, solid: true },

      // DENTRO DEL CLOSET:
      // Shotgun Shells 'sh'
      { type: "shotgunShells", x: 55, y: 148, w: 10, h: 8 },
      // Zombie 'z'
      { type: "zombie", x: 35, y: 145, w: 12, h: 14 }
    ]
  },
tigerStatueRoom: {
    name: "Tiger Statue Room",
    floorType: "wood",
    // Límites estrictos para el jugador
    bounds: { minX: 115, maxX: 165, minY: 65, maxY: 125 },
    // Dibuja el cuarto pequeño en pantalla en lugar de ocupar todo el canvas
    corridorPoly: [
      { x: 110, y: 60, w: 60, h: 70 }
    ],
    doors: [
      // Puerta abajo para volver -> spawnX: 40 ubica al jugador dentro del pasillo vertical
      { id: "doorToCentral", x: 125, y: 122, w: 30, h: 8, targetRoom: "centralCorridor", spawnX: 40, spawnY: 92 }
    ],
    interactables: [
      { type: "tigerStatue", x: 125, y: 65, w: 30, h: 22, solid: true }
    ]
  },
  greenhouse: {
    name: "Greenhouse / Botanical Room",
    floorType: "wood",
    bounds: { minX: 30, maxX: 260, minY: 30, maxY: 170 },
    corridorPoly: [
      { x: 30, y: 30, w: 180, h: 140 },  // Área principal izquierda
      { x: 210, y: 30, w: 50, h: 140 }   // Nicho derecho (entrada arriba, motor y macetas abajo)
    ],
    doors: [
      // Puerta 'p' arriba a la derecha -> Vuelve a centralCorridor (eastArm)
      { id: "doorToCentral", x: 220, y: 30, w: 25, h: 8, targetRoom: "centralCorridor", spawnX: 240, spawnY: 90 }
    ],
    interactables: [
      // Ventana 'v' en la pared izquierda
      { type: "window", x: 30, y: 70, w: 4, h: 30 },

      // Planta Monstruo 'mp' (bloquea la zona izquierda)
      { type: "monsterPlant", x: 60, y: 50, w: 35, h: 80, solid: true },

      // Llave de la Armadura cerca de la ventana (detrás de la planta)
      { type: "armorKey", x: 42, y: 80, w: 8, h: 6 },

      // Fuente/Motor de la bomba 'f'
      { type: "waterPump", x: 215, y: 75, w: 40, h: 25, solid: true },

      // Hierba Azul 'b'
      { type: "blueHerb", x: 170, y: 152, w: 10, h: 10 },

      // Hierbas Verdes 'g' (dos macetas)
      { type: "greenHerb", x: 190, y: 152, w: 10, h: 10 },
      { type: "greenHerb", x: 210, y: 152, w: 10, h: 10 }
    ]
  },
  westStairway1F: {
    name: "West Stairway 1F",
    floorType: "wood",
    bounds: { minX: 30, maxX: 270, minY: 30, maxY: 170 },
    // BLOQUE DE PARED INTERNA (Pared sólida que impide caminar por la zona negra central)
    walls: [
      { x: 80, y: 70, w: 180, h: 60 }
    ],
    corridorPoly: [
      { x: 30, y: 30, w: 230, h: 40 },   // Pasillo norte
      { x: 30, y: 70, w: 50, h: 60 },    // Pasillo oeste
      { x: 30, y: 130, w: 230, h: 40 }   // Pasillo sur
    ],
    doors: [
      { id: "doorToCentral", x: 252, y: 35, w: 8, h: 25, targetRoom: "centralCorridor", spawnX: 35, spawnY: 45 },
      { id: "doorToVacant", x: 190, y: 62, w: 25, h: 8, targetRoom: "vacantRoom", spawnX: 150, spawnY: 75 },
      { id: "doorToSaveRoom", x: 130, y: 130, w: 25, h: 8, targetRoom: "mansionSaveRoom", spawnX: 150, spawnY: 100 }
    ],
    interactables: [
      { type: "column", x: 50, y: 85, w: 14, h: 14, solid: true },
      { type: "window", x: 30, y: 50, w: 4, h: 20 },
      { type: "window", x: 30, y: 100, w: 4, h: 20 },
      { type: "stairsVertical", x: 180, y: 130, w: 75, h: 40 },
      { type: "zombie", x: 140, y: 42, w: 12, h: 14 },
      { type: "zombie", x: 45, y: 142, w: 12, h: 14 }
    ]
  },
  vacantRoom: {
    name: "Vacant Room",
    floorType: "wood",
    // Habitación pequeña y alargada
    bounds: { minX: 100, maxX: 200, minY: 50, maxY: 140 },
    corridorPoly: [
      { x: 100, y: 50, w: 100, h: 90 }
    ],
    doors: [
      // Puerta arriba para volver a West Stairway 1F
      { id: "doorToStairway", x: 135, y: 50, w: 30, h: 8, targetRoom: "westStairway1F", spawnX: 200, spawnY: 15 }
    ],
    interactables: [
      // Estantería en la pared superior derecha
      { type: "shelf", x: 170, y: 58, w: 25, h: 15, solid: true },

      // Escopeta rota / que no funciona (sobre la mesa/estante)
      { type: "brokenShotgun", x: 110, y: 70, w: 20, h: 8 },

      // Clip (munición de pistola)
      { type: "handgunAmmo", x: 175, y: 110, w: 10, h: 6 },

      // Shells (cartuchos de escopeta)
      { type: "shotgunShells", x: 120, y: 115, w: 10, h: 8 }
    ]
  },
// 1. DENTRO DE mansionSaveRoom:
  mansionSaveRoom: {
    name: "Mansion Save Room",
    floorType: "wood",
    bounds: { minX: 90, maxX: 210, minY: 50, maxY: 150 },
    corridorPoly: [
      { x: 90, y: 50, w: 120, h: 100 }
    ],
    doors: [
      // Puerta ABAJO para salir hacia West Stairway 1F
      { id: "doorToStairway", x: 140, y: 142, w: 25, h: 8, targetRoom: "westStairway1F", spawnX: 140, spawnY: 140 }
    ],
    interactables: [
      // Cama 'b' (vertical a la izquierda)
      { type: "bedVertical", x: 98, y: 60, w: 25, h: 50, solid: true },

      // Baúl de ítems / Cajón 'c' (arriba al centro)
      { type: "itemChest", x: 132, y: 60, w: 30, h: 18, solid: true },

      // Estantería 's' (vertical a la derecha)
      { type: "shelfVertical", x: 180, y: 85, w: 20, h: 50, solid: true },

      // Suero 'se'
      { type: "serum", x: 185, y: 90, w: 8, h: 10 },

      // Ink Ribbon 'i'
      { type: "inkRibbon", x: 185, y: 120, w: 8, h: 8 }
    ]
  },
dressingRoom: {
    name: "Dressing Room",
    floorType: "wood",
    bounds: { minX: 30, maxX: 260, minY: 30, maxY: 170 },
    corridorPoly: [
      { x: 30, y: 30, w: 230, h: 45 },   // Área superior (pasillo norte arriba de la biblioteca)
      { x: 30, y: 75, w: 180, h: 95 },   // Área inferior principal
      { x: 210, y: 30, w: 50, h: 45 }    // Nicho este de la puerta derecha
    ],
    doors: [
      // Puerta 'p' abajo a la izquierda -> Conecta con la puerta superior derecha de Main Hall
      { id: "doorToMainHall", x: 30, y: 120, w: 8, h: 25, targetRoom: "mainHall", spawnX: 230, spawnY: 50 },

      // Puerta 'p' a la derecha -> Para conectar a futuro con el pasillo este / Art Gallery
      { id: "doorToEastHall", x: 252, y: 35, w: 8, h: 25, targetRoom: "dressingRoom", spawnX: 240, spawnY: 45 }
    ],
    interactables: [
      // Biblioteca / Book shelf divisoria (impide el paso directo entre la puerta y la pared superior)
      { type: "bookshelfHorizontal", x: 30, y: 70, w: 110, h: 12, solid: true },

      // Espejo 'e' arriba a la izquierda (en el pasillo) + Clip 'c' al lado
      { type: "mirror", x: 40, y: 32, w: 20, h: 6, solid: true },
      { type: "handgunAmmo", x: 65, y: 40, w: 8, h: 6 },

      // Escritorio 'e' abajo a la derecha + Shells 's' arriba del escritorio
      { type: "desk", x: 160, y: 110, w: 30, h: 45, solid: true },
      { type: "shotgunShells", x: 170, y: 120, w: 10, h: 8 },

      // Zombis 'z'
      { type: "zombie", x: 180, y: 40, w: 12, h: 14 },  // Zombi pasillo norte
      { type: "zombie", x: 130, y: 140, w: 12, h: 14 }  // Zombi área inferior
    ]
  }
};