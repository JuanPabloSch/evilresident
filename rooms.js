const ROOMS = {
  mainHall: {
    name: "Main Hall 1F",
    bounds: { minX: 18, maxX: 302, minY: 24, maxY: 172 },
    doors: [
      { id: "stairsToMainHall2F", x: 120, y: 25, w: 80, h: 40, targetRoom: "mainHall2F", spawnX: 155, spawnY: 45 },
      // Puerta Oeste -> Va al Dining Room
      { id: "west", x: 12, y: 75, w: 12, h: 40, targetRoom: "diningRoom", spawnX: 280, spawnY: 90 },
      // Puertas Este (Pared derecha)
      { id: "eastTop", x: 296, y: 55, w: 12, h: 30, targetRoom: "dressingRoom", spawnX: 45, spawnY: 130, keyRequired: "armorKey", lockId: "armor-door" },
      { id: "eastBottom", x: 296, y: 120, w: 12, h: 30, targetRoom: "artRoom", spawnX: 45, spawnY: 100 }
    ],
    interactables: [
      { type: "stairsHorizontal", x: 120, y: 25, w: 80, h: 90},
      { type: "balconyLeft", x: 18, y: 24, w: 102, h: 30, solid: true },
    { type: "balconyRight", x: 200, y: 24, w: 102, h: 30, solid: true },
      { type: "typewriter", x: 80, y: 54, w: 26, h: 20, solid: true },
      { type: "inkRibbon", x: 68, y: 58, w: 8, h: 8 },
      { type: "inkRibbon", x: 110, y: 58, w: 8, h: 8 },
      { type: "staticCharacter", character: "redVest", x: 82, y: 142, w: 18, h: 22 },
      { type: "staticCharacter", character: "medic", x: 218, y: 116, w: 16, h: 22 },
      { type: "staticCharacter", character: "sunglasses", x: 258, y: 142, w: 16, h: 22 },
      { type: "lockpick", x: 104, y: 148, w: 12, h: 8, giftFrom: "Barry" }
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
      { type: "mansionEmblem", x: 19, y: 82, w: 10, h: 12 },
      { type: "fireplaceSocket", x: 19, y: 82, w: 10, h: 12, revealed: false, occupied: false },
      { type: "bloodStain", x: 20, y: 119, w: 18, h: 9 },
      { type: "clockPuzzle", x: 254, y: 28, w: 30, h: 44, hour: 3, solved: false, opened: false },
      { type: "shieldKey", x: 262, y: 76, w: 10, h: 8, revealed: false }
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
      { id: "northDoor1", x: 175, y: 94, w: 30, h: 12, targetRoom: "centralCorridor", spawnX: 35, spawnY: 135, lockId: "central-tea-door", unlockFromSide: "centralCorridor" },
      { id: "northDoor2", x: 250, y: 94, w: 24, h: 12, targetRoom: "bar", spawnX: 245, spawnY: 130, keyRequired: "lockpick", lockId: "bar-lock" },
      { id: "eastDoor", x: 290, y: 110, w: 10, h: 30, targetRoom: "elevatorStairway", spawnX: 225, spawnY: 132, lockId: "elevator-tea-door", unlockFromSide: "elevatorStairway" },
    ],
    interactables: [
      { type: "kenneth", x: 35, y: 30, w: 16, h: 12, solid: true },
      { type: "handgunAmmo", x: 55, y: 29, w: 10, h: 6 },
      { type: "handgunAmmo", x: 55, y: 40, w: 10, h: 6 },
      { type: "zombie", x: 35, y: 55, w: 12, h: 14, solid: true },
      { type: "window", x: 30, y: 18, w: 26, h: 4 }
    ]
  },

bar: {
    name: "Bar 1F",
    // Reducimos el salón del bar haciendo que la pared superior empiece en Y: 45
    bounds: { minX: 20, maxX: 300, minY: 15, maxY: 156 },
    // Muros para dar forma al nicho secreto superior
    walls: [
      { x: 20, y: 0, w: 100, h: 45 },   // Bloque superior izquierdo
      { x: 160, y: 0, w: 140, h: 45 }   // Bloque superior derecho
    ],
    // Polígonos transitables (Salón principal + Pequeño pasillo secreto)
    corridorPoly: [
      { x: 20, y: 45, w: 280, h: 110 }, // Salón Principal del Bar
      { x: 120, y: 15, w: 40, h: 46 }   // Pasillo superior conectado al salón
    ],
    doors: [
      // Puerta Sur bajada a la parte inferior
      { id: "southPassage", x: 220, y: 150, w: 30, h: 12, targetRoom: "teaRoom", spawnX: 250, spawnY: 115, keyRequired: "lockpick", lockId: "bar-lock" }
    ],
    interactables: [
      { type: "barCounter", x: 30, y: 55, w: 35, h: 80, solid: true },
      { type: "piano", x: 220, y: 75, w: 40, h: 36, solid: true },
      { type: "shelf", x: 205, y: 47, w: 85, h: 16, solid: true },
      { type: "hiddenDoor", x: 120, y: 43, w: 40, h: 6, solid: true },
      // Elementos del pasillo secreto
      { type: "emblemRecess", x: 140, y: 19, w: 10, h: 13, active: false },
      { type: "window", x: 154, y: 20, w: 4, h: 16 },
      { type: "musicNotes", x: 270, y: 49, w: 12, h: 10 },
      { type: "goldEmblem", x: 124, y: 19, w: 12, h: 12, revealed: false }
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
      { id: "southPassage", x: 20, y: 152, w: 40, h: 14, targetRoom: "teaRoom", spawnX: 185, spawnY: 110, lockId: "central-tea-door", unlockFromSide: "centralCorridor" },
      // Puerta superior izquierda
      // Dentro de centralCorridor -> doors:
      { id: "northWest", x: 16, y: 40, w: 8, h: 25, targetRoom: "westStairway1F", spawnX: 240, spawnY: 45 },
      
      // NUEVA: Puerta a mitad de altura en la pared izquierda (mirando hacia afuera)
      { id: "midWest", x: 16, y: 90, w: 8, h: 25, targetRoom: "keepersBedroom", spawnX: 250, spawnY: 50, keyRequired: "lockpick", lockId: "keepers-bedroom-lock" },
      
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
      { id: "westDoorToTea", x: 206, y: 120, w: 8, h: 25, targetRoom: "teaRoom", spawnX: 250, spawnY: 125, lockId: "elevator-tea-door", unlockFromSide: "elevatorStairway" },
      // Salida en la punta de la escalera hacia el tramo del subsuelo
      { id: "stairsToBasement", x: 210, y: 38, w: 8, h: 24, targetRoom: "elevatorStairwayB1", spawnX: 245, spawnY: 80 }
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
      { id: "doorToCentral", x: 262, y: 40, w: 8, h: 25, targetRoom: "centralCorridor", spawnX: 35, spawnY: 100, keyRequired: "lockpick", lockId: "keepers-bedroom-lock" }
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
      { type: "tigerStatue", x: 125, y: 65, w: 30, h: 22, solid: false }
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
      { id: "doorToCentral", x: 220, y: 30, w: 25, h: 8, targetRoom: "centralCorridor", spawnX: 266, spawnY: 84 }
    ],
    interactables: [
      // Ventana 'v' en la pared izquierda
      { type: "window", x: 30, y: 70, w: 4, h: 30 },

      // Planta Monstruo 'mp' (bloquea la zona izquierda)
      { type: "monsterPlant", x: 60, y: 50, w: 35, h: 80, solid: true },

      // La planta mantiene la llave fuera de alcance hasta que se marchita.
      { type: "armorKey", x: 42, y: 80, w: 8, h: 6, revealed: false },

      // Fuente/Motor de la bomba 'f'
      { type: "waterPump", x: 215, y: 75, w: 40, h: 25, solid: true },

      // Cuatro hierbas verdes y dos rojas
      { type: "greenHerb", x: 145, y: 152, w: 10, h: 10 },
      { type: "greenHerb", x: 170, y: 152, w: 10, h: 10 },
      { type: "greenHerb", x: 190, y: 152, w: 10, h: 10 },
      { type: "greenHerb", x: 230, y: 152, w: 10, h: 10 },
      { type: "redHerb", x: 115, y: 152, w: 10, h: 10 },
      { type: "redHerb", x: 250, y: 125, w: 10, h: 10 }
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
      { id: "doorToVacant", x: 190, y: 62, w: 25, h: 8, targetRoom: "vacantRoom", spawnX: 150, spawnY: 75, keyRequired: "armorKey", lockId: "vacant-room-lock" },
      { id: "doorToSaveRoom", x: 130, y: 130, w: 25, h: 8, targetRoom: "mansionSaveRoom", spawnX: 150, spawnY: 100 },
      { id: "stairsToWestStairway2F", x: 180, y: 130, w: 75, h: 40, targetRoom: "westStairway2F", spawnX: 90, spawnY: 78 }
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
      { id: "doorToStairway", x: 135, y: 50, w: 30, h: 8, targetRoom: "westStairway1F", spawnX: 200, spawnY: 15, keyRequired: "armorKey", lockId: "vacant-room-lock" }
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
      { id: "doorToMainHall", x: 30, y: 120, w: 8, h: 25, targetRoom: "mainHall", spawnX: 250, spawnY: 60, keyRequired: "armorKey", lockId: "armor-door" },

      // Puerta 'p' a la derecha -> Para conectar a futuro con el pasillo este / Art Gallery
      { id: "doorToEastHall", x: 252, y: 35, w: 8, h: 25, targetRoom: "wardrobe", spawnX: 60, spawnY: 60 },
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
  },
  wardrobe: {
    name: "Wardrobe",
    floorType: "wood",
    bounds: { minX: 40, maxX: 260, minY: 40, maxY: 160 },
    corridorPoly: [
      { x: 40, y: 40, w: 220, h: 120 }
    ],
    doors: [
      // Puerta 'p' arriba a la izquierda -> Conecta con Dressing Room
      { id: "doorToDressing", x: 45, y: 40, w: 25, h: 8, targetRoom: "dressingRoom", spawnX: 240, spawnY: 45 },

      // Puerta 'p' abajo a la izquierda -> Conecta con Wardrobe Closet (próximamente)
      { id: "doorToCloset", x: 70, y: 152, w: 25, h: 8, targetRoom:"wardrobeCloset", spawnX: 75, spawnY: 60 },
    ],
    interactables: [
      // Espejo 'e' en la pared norte
      { type: "mirror", x: 130, y: 42, w: 24, h: 6, solid: true },

      // Mueble de madera / Armario de ropa ('shel'/'clo') en la pared derecha
      { type: "shelfVertical", x: 235, y: 55, w: 20, h: 50, solid: true },

      // Ink Ribbon 'ink' en el piso/pared sur
      { type: "inkRibbon", x: 170, y: 145, w: 8, h: 8 },

      // Zombi 'z' cerca de la pared derecha / sur
      { type: "zombie", x: 220, y: 125, w: 12, h: 14 }
    ]
  },
  wardrobeCloset: {
    name: "Wardrobe Closet",
    floorType: "wood",
    // Habitación estrecha estilo pasillo/vestidor
    bounds: { minX: 60, maxX: 160, minY: 40, maxY: 160 },
    corridorPoly: [
      { x: 60, y: 40, w: 100, h: 120 }
    ],
    doors: [
      // Puerta arriba a la izquierda para volver a Wardrobe
      { id: "doorToWardrobe", x: 65, y: 40, w: 25, h: 8, targetRoom: "wardrobe", spawnX: 75, spawnY: 135 }
    ],
    interactables: [
      // Mesita auxiliar en el piso / pared sur
      { type: "smallTable", x: 70, y: 130, w: 22, h: 18, solid: true },

      // Cambios de ropa / Perchero de pared a la derecha
      { type: "clothesRack", x: 140, y: 55, w: 15, h: 70, solid: true }
    ]
  },
artRoom: {
    name: "Art Room",
    floorType: "carpetGreen",
    bounds: { minX: 30, maxX: 270, minY: 30, maxY: 170 },

    // MURO DIVISORIO (Sale de la izquierda a la derecha, dejando el paso solo por el extremo derecho)
    walls: [
      { x: 150, y: 70, w: 85, h: 8 } // Bloquea la entrada izquierda del recoveco
    ],

    // Piso y recorrido continuo
    corridorPoly: [
      { x: 30, y: 70, w: 240, h: 90 },   // Salón principal
      { x: 150, y: 30, w: 120, h: 48 }   // Recoveco norte (acceso por la derecha pegar la vuelta)
    ],

    doors: [
      // Puerta a la izquierda -> Main Hall
      { id: "doorToMainHall", x: 30, y: 95, w: 8, h: 25, targetRoom: "mainHall", spawnX: 230, spawnY: 130 },

      // Puerta a la derecha -> L-Passage
      { id: "doorToLPassage", x: 262, y: 115, w: 8, h: 25, targetRoom: "lPassage", spawnX: 45, spawnY: 140, keyRequired: "lockpick", lockId: "l-passage-lock" },
    ],

    interactables: [
      { type: "mapStatue", x: 105, y: 95, w: 22, h: 22, solid: true },
      { type: "stepLadder", x: 160, y: 135, w: 18, h: 18, solid: true },
      
      // Ítems y zombis en el recoveco superior
      { type: "inkRibbon", x: 165, y: 40, w: 8, h: 8 },
      { type: "zombie", x: 200, y: 42, w: 12, h: 14 },
      { type: "zombie", x: 230, y: 42, w: 12, h: 14 }
    ]
  },
  lPassage: {
    name: "L-Passage",
    floorType: "wood",
    bounds: { minX: 30, maxX: 230, minY: 30, maxY: 170 },
    // Forma exacta en 'L': Tramo horizontal abajo y tramo vertical a la derecha
    corridorPoly: [
      { x: 30, y: 120, w: 200, h: 50 },  // Pasillo horizontal inferior
      { x: 180, y: 30, w: 50, h: 140 }   // Pasillo vertical derecho
    ],
    doors: [
      // Puerta 'p' a la izquierda -> Conecta con Art Room
      { id: "doorToArtRoom", x: 30, y: 130, w: 8, h: 25, targetRoom: "artRoom", spawnX: 250, spawnY: 115, keyRequired: "lockpick", lockId: "l-passage-lock" },

      // Puerta 'p' arriba a la derecha -> Conecta con Winding Passage (próximamente)
      { id: "doorToWinding", x: 195, y: 30, w: 25, h: 8, targetRoom: "windingPassage", spawnX: 230, spawnY: 140 },
    ],
    interactables: [
      // Mesita auxiliar en el pasillo inferior
      { type: "smallTable", x: 80, y: 122, w: 30, h: 12, solid: true },

      // Mesita auxiliar en el pasillo vertical derecho
      { type: "smallTable", x: 182, y: 70, w: 12, h: 30, solid: true },

      // Ventanas 'v' (una abajo en el piso sur y otra a la derecha en la pared este)
      { type: "window", x: 130, y: 166, w: 25, h: 4, dogEntryId: "southWindowDog", triggerRadius: 34 },
      { type: "windowVertical", x: 226, y: 110, w: 4, h: 25, dogEntryId: "eastWindowDog", triggerRadius: 36 },

      // Los perros esperan fuera y saltan por las ventanas cuando el jugador se acerca.
      { type: "zombieDog", x: 135, y: 145, w: 16, h: 10, revealed: false, entryId: "southWindowDog", enterFromX: 135, enterFromY: 174, entryTargetX: 135, entryTargetY: 145 },
      { type: "zombieDog", x: 200, y: 82, w: 10, h: 16, revealed: false, entryId: "eastWindowDog", enterFromX: 236, enterFromY: 114, entryTargetX: 207, entryTargetY: 114 },
      { type: "handgunAmmo", x: 90, y: 127, w: 10, h: 6 }
    ]
  },
windingPassage: {
    name: "Winding Passage",
    floorType: "wood",
    bounds: { minX: 30, maxX: 260, minY: 30, maxY: 170 },

    // PAREDES INTERNAS/BORDES QUE BLOQUEAN EL PASO
    walls: [
      // Pared vertical izquierda del hueco central
      { x: 88, y: 70, w: 6, h: 90 },
      // Pared horizontal superior del hueco central
      { x: 88, y: 66, w: 45, h: 6 },
      // Pared vertical derecha del hueco central
      { x: 128, y: 70, w: 6, h: 90 },
      // Esquina superior derecha (donde indicaste las flechas)
      { x: 206, y: 30, w: 6, h: 42 }
    ],

    // Área caminable de la habitación
    corridorPoly: [
      { x: 30, y: 30, w: 180, h: 40 },    // Pasillo superior horizontal
      { x: 30, y: 70, w: 60, h: 90 },     // Pasillo izquierdo (pbp y ptr)
      { x: 130, y: 70, w: 130, h: 100 }   // Salón derecho (pbr, pob, plp y planta)
    ],

    doors: [
      // plp: Puerta abajo a la derecha -> L-Passage
      { id: "doorToLPassage", x: 200, y: 162, w: 25, h: 8, targetRoom: "lPassage", spawnX: 195, spawnY: 45 },

      // pob: Puerta en el extremo derecho -> Outside Boiler
      { id: "doorToOutsideBoiler", x: 252, y: 100, w: 8, h: 25, targetRoom: "outsideBoiler", spawnX: 215, spawnY: 145, keyRequired: "armorKey", lockId: "outside-boiler-lock" },

      // pbr: Puerta arriba a la derecha -> Bathroom
      { id: "doorToBathroom", x: 220, y: 70, w: 25, h: 8, targetRoom: "bathroom", spawnX: 200, spawnY: 85 },

      // ptr: Puerta divisoria en el pasillo izquierdo -> Trap Room
      { id: "doorToTrapRoom", x: 82, y: 90, w: 8, h: 25, targetRoom: "trapRoom", spawnX: 115, spawnY: 75 },

      // pbp: Puerta abajo a la izquierda -> Back Passage
      { id: "doorToBackPassage", x: 30, y: 110, w: 8, h: 25, targetRoom: "backPassage", spawnX: 230, spawnY: 140 }
    ],

    interactables: [
      { type: "greenHerb", x: 150, y: 110, w: 10, h: 10 }
    ]
  },
outsideBoiler: {
    name: "Outside Boiler",
    floorType: "concrete",
    bounds: { minX: 30, maxX: 260, minY: 30, maxY: 170 },

    corridorPoly: [
      { x: 30, y: 30, w: 220, h: 45 },   // Pasillo superior (Y: 30 a 75)
      { x: 200, y: 75, w: 50, h: 95 }    // Pasillo vertical (X: 200 a 250)
    ],

    walls: [
      { x: 30, y: 75, w: 170, h: 10 },
      { x: 190, y: 75, w: 10, h: 95 }
    ],

    doors: [
      { id: "doorToWinding", x: 200, y: 122, w: 8, h: 25, targetRoom: "windingPassage", spawnX: 221, spawnY: 100, keyRequired: "armorKey", lockId: "outside-boiler-lock" }
    ],

    interactables: [
      // --- PASILLO SUPERIOR ---
      { type: "zombieDog", x: 70, y: 36, w: 16, h: 10 },

      // 'par' PARRILLA: Pegada abajo pero dentro de la zona visible (x: 95, y: 52)
      { type: "grillBoiler", x: 95, y: 48, w: 22, h: 14, solid: true },

      // 'che' CHEMICAL: En medio del pasillo (x: 130, y: 40)
      { type: "chemicalItem", x: 130, y: 42, w: 8, h: 10 },

      // 'p' Planta decorativa en pared norte
      { type: "pottedPlant", x: 155, y: 34, w: 10, h: 10, solid: true },

      // Planta verde recolectable
      { type: "greenHerb", x: 175, y: 42, w: 10, h: 10 },

      // --- PASILLO VERTICAL DERECHO ---
      { type: "pottedPlant", x: 234, y: 34, w: 10, h: 10, solid: true },
      { type: "zombieDog", x: 220, y: 115, w: 10, h: 16 },
      { type: "greenHerb", x: 210, y: 150, w: 10, h: 10 }
    ]
  },
 bathroom: {
    name: "Bathroom",
    bounds: { minX: 100, maxX: 180, minY: 50, maxY: 110 },

    // Forzamos la geometría chica del cuarto (Ancho: 80px, Alto: 60px)
    corridorPoly: [
      { x: 100, y: 50, w: 80, h: 60 }
    ],

    doors: [
      // Puerta abajo (Sur) -> Vuelve a Winding Passage
      { id: "doorToWinding", x: 130, y: 102, w: 20, h: 8, targetRoom: "windingPassage", spawnX: 220, spawnY: 105 }
    ],

    interactables: [
      // Ducha (Esquina superior izquierda)
      { type: "shower", x: 104, y: 54, w: 14, h: 14, solid: true },

      // Inodoro (Pared superior centro)
      { type: "toilet", x: 126, y: 54, w: 8, h: 10, solid: true },

      // Mesita con pileta (Pared superior derecha)
      { type: "sinkTable", x: 142, y: 54, w: 14, h: 10, solid: true },

      // Espejo (Sobre la pared norte)
      { type: "mirror", x: 144, y: 48, w: 10, h: 5 },

      // Ítem
      { type: "greenHerb", x: 162, y: 88, w: 8, h: 8 }
    ]
  },
  trapRoom: {
    name: "Trap Room",
    floorType: "wood",
    bounds: { minX: 100, maxX: 180, minY: 50, maxY: 110 },

    // Geometría compacta (80x60 px) para que no se extienda por toda la pantalla
    corridorPoly: [
      { x: 100, y: 50, w: 80, h: 60 }
    ],

    doors: [
      // 'p' Izquierda: Vuelve a Winding Passage
      { id: "doorToWinding", x: 100, y: 70, w: 8, h: 20, targetRoom: "windingPassage", spawnX: 70, spawnY: 90 },

      // 'p' Abajo (esquina inferior derecha): Conecta con Living Room
      { id: "doorToLiving", x: 150, y: 102, w: 20, h: 8, targetRoom: "livingRoom", spawnX: 150, spawnY: 45 }
    ],

    interactables: [
      { type: "ceilingTrap", x: 106, y: 48, w: 68, h: 18, revealed: false }
    ]
  },
  livingRoom: {
    name: "Living Room",
    floorType: "wood",
    bounds: { minX: 80, maxX: 220, minY: 40, maxY: 140 },

    // Geometría rectangular espaciosa (140x100 px)
    corridorPoly: [
      { x: 80, y: 40, w: 140, h: 100 }
    ],

    doors: [
      // 'p' Arriba a la izquierda: Vuelve a Trap Room
      { id: "doorToTrapRoom", x: 95, y: 40, w: 20, h: 8, targetRoom: "trapRoom", spawnX: 150, spawnY: 70 }
    ],

    interactables: [
      // 'm' Mesa grande central (sólida)
      { type: "livingTable", x: 125, y: 75, w: 50, h: 30, solid: true },

      // 'b' Banco/Sillón en la esquina inferior izquierda (sólido)
      { type: "bench", x: 85, y: 115, w: 22, h: 18, solid: true },

      // 's' Escopeta colgada en la pared derecha (recolectable)
      { type: "shotgunMount", x: 212, y: 80, w: 6, h: 20, hasShotgun: true }
    ],
    shotgunTaken: false,
    brokenShotgunPlaced: false
  },
  backPassage: {
    name: "Back Passage",
    floorType: "wood",
    bounds: { minX: 30, maxX: 250, minY: 30, maxY: 170 },

    // Geometría en L: Pasillo vertical a la izquierda y tramo horizontal abajo
    corridorPoly: [
      { x: 30, y: 30, w: 50, h: 140 },   // Tramo vertical (X: 30 a 80, Y: 30 a 170)
      { x: 80, y: 120, w: 170, h: 50 }   // Tramo horizontal (X: 80 a 250, Y: 120 a 170)
    ],

    // Pared de colisión interna para la esquina vacía (no atravesar el hueco negro)
    walls: [
      { x: 80, y: 30, w: 10, h: 90 }  // Pared vertical derecha del tramo superior
    ],

    doors: [
      // 'pwp' Puerta extrema derecha (pared este) -> Winding Passage
      { id: "doorToWinding", x: 242, y: 135, w: 8, h: 22, targetRoom: "windingPassage", spawnX: 45, spawnY: 110 },

      // 'pes1f' Puerta en pared norte (pegada a la derecha) -> East Stairway 1F
      { id: "doorToEastStairway", x: 200, y: 120, w: 22, h: 8, targetRoom: "eastStairway1F", spawnX: 60, spawnY: 130, lockId: "back-east-stairway", unlockFromSide: "backPassage" },

      // 'pcs' Puerta en pared norte (centro del pasillo horizontal) -> Courtyard Study
      { id: "doorToCourtyardStudy", x: 130, y: 120, w: 22, h: 8, targetRoom: "courtyardStudy", spawnX: 100, spawnY: 140, keyRequired: "helmetKey", lockId: "courtyard-study-lock" },

      // 'plg' Puerta abajo a la izquierda (pared sur) -> Large Gallery
      { id: "doorToLargeGallery", x: 45, y: 162, w: 22, h: 8, targetRoom: "largeGallery", spawnX: 100, spawnY: 45 },

      // 'prp' Puerta en la parte superior izquierda (pared oeste) -> Roofed Passage
      { id: "doorToRoofedPassage", x: 30, y: 50, w: 8, h: 22, targetRoom: "roofedPassage", spawnX: 50, spawnY: 130 }
    ],

    interactables: [
      // Podés sumar detalles como una plantita o luz en la esquina más adelante
    ]
  },
  eastStairway1F: {
    name: "East Stairway 1F",
    floorType: "wood",
    bounds: { minX: 30, maxX: 230, minY: 30, maxY: 170 },

    // Forma del mapa: Tramo vertical a la izquierda + tramo horizontal arriba a la derecha
    corridorPoly: [
      { x: 30, y: 30, w: 60, h: 140 },    // Bajada hacia Back Passage
      { x: 90, y: 30, w: 140, h: 60 }     // Tramo horizontal (Escalera, Mansion Storeroom y Planta)
    ],

    // Pared de colisión interna para la esquina vacía (no atravesar el hueco negro)
    walls: [
      { x: 90, y: 90, w: 140, h: 10 }
    ],

    doors: [
      // 'p' Abajo: Vuelve a Back Passage (pbp)
      { id: "doorToBackPassage", x: 50, y: 162, w: 20, h: 8, targetRoom: "backPassage", spawnX: 200, spawnY: 135, lockId: "back-east-stairway", unlockFromSide: "backPassage" },

      // 'p' Pared este/sur del pasillo derecho: Conecta con Mansion Storeroom
      { id: "doorToStoreroom", x: 190, y: 82, w: 20, h: 8, targetRoom: "mansionStoreroom", spawnX: 120, spawnY: 65 },

      // Escalera al segundo piso (al tocarla transporta a East Stairway 2F)
      { id: "stairsTo2F", x: 140, y: 30, w: 80, h: 20, targetRoom: "eastStairway2F", spawnX: 125, spawnY: 42 }
    ],

    interactables: [
      // 'z' Zombi en la esquina superior izquierda
      { type: "zombie", x: 45, y: 45, w: 12, h: 12 },

      // 'z' Zombi en el pasillo cerca de la escalera/cuarto
      { type: "zombie", x: 120, y: 65, w: 12, h: 12 },

      // 'pla' Hierba verde en la esquina superior derecha junto a la puerta
      { type: "greenHerb", x: 215, y: 65, w: 10, h: 10 },

      // Visual de la escalera (escalones)
      { type: "stairsVisual", x: 140, y: 30, w: 80, h: 22, solid: true }
    ]
  },
  mansionStoreroom: {
    name: "Mansion Storeroom",
    floorType: "wood",
    bounds: { minX: 70, maxX: 250, minY: 30, maxY: 170 },

    // Espacio ampliado para dejar accesibles los objetos y el mobiliario.
    corridorPoly: [
      { x: 70, y: 30, w: 180, h: 140 }
    ],

    doors: [
      { id: "doorToEastStairway", x: 105, y: 30, w: 22, h: 7, targetRoom: "eastStairway1F", spawnX: 190, spawnY: 55 }
    ],

    interactables: [
      { type: "typewriter", x: 82, y: 43, w: 28, h: 22, solid: true },
      { type: "itemChest", x: 207, y: 43, w: 24, h: 20, solid: true },
      { type: "chemical", x: 145, y: 52, w: 10, h: 12 },
      { type: "shotgunShells", x: 90, y: 122, w: 10, h: 8 },
      { type: "firstAidSpray", x: 151, y: 126, w: 8, h: 12 },
      { type: "acidRounds", x: 211, y: 119, w: 10, h: 8 },
      { type: "shelfVertical", x: 224, y: 77, w: 14, h: 48, solid: true }
    ]
  },
  courtyardStudy: {
    name: "Courtyard Study",
    floorType: "wood",
    bounds: { minX: 80, maxX: 180, minY: 40, maxY: 140 },

    // Geometría rectangular de la oficina (100x100 px)
    corridorPoly: [
      { x: 80, y: 40, w: 100, h: 100 }
    ],

    doors: [
      // 'p' Abajo: Vuelve a Back Passage (pcs)
      { id: "doorToBackPassage", x: 120, y: 132, w: 20, h: 8, targetRoom: "backPassage", spawnX: 140, spawnY: 135, keyRequired: "helmetKey", lockId: "courtyard-study-lock" }
    ],

    interactables: [
      // 'v' Ventana al patio en la pared superior
      { type: "window", x: 120, y: 40, w: 20, h: 6 },

      // 'mr' Magnum Rounds en la esquina superior derecha
      { type: "magnumRounds", x: 165, y: 48, w: 8, h: 8 },

      // 'pe' Perchero en la pared izquierda (sólido)
      { type: "coatRack", x: 85, y: 75, w: 10, h: 14, solid: true },

      // 'e' Escritorio a la derecha (sólido)
      { type: "studyDesk", x: 145, y: 70, w: 25, h: 55, solid: true },

      // 'db' Doom Book 1 ubicado sobre el escritorio (recolectable)
      { type: "doomBook1", x: 153, y: 78, w: 10, h: 12 }
    ]
  },
  largeGallery: {
    name: "Large Gallery",
    floorType: "wood",
    bounds: { minX: 40, maxX: 220, minY: 40, maxY: 160 },

    // Geometría rectangular amplia (180x120 px)
    corridorPoly: [
      { x: 40, y: 40, w: 180, h: 120 }
    ],

    // Pared central horizontal que divide la galería
    walls: [
      { x: 40, y: 95, w: 165, h: 8 }
    ],

    doors: [
      // 'p' Arriba a la izquierda: Vuelve a Back Passage (plg)
      { id: "doorToBackPassage", x: 55, y: 40, w: 20, h: 8, targetRoom: "backPassage", spawnX: 55, spawnY: 110 }
    ],

    interactables: [
      // 'cue' Cuervos zombi distribuidos en la habitación
      { type: "crow", x: 170, y: 55, w: 10, h: 10 },
      { type: "crow", x: 110, y: 145, w: 10, h: 10 },
      { type: "crow", x: 180, y: 145, w: 10, h: 10 },

      { type: "painting", id: "p4", x: 45, y: 78, w: 14, h: 18, title: "A Young Man" },
      { type: "painting", id: "p1", x: 68, y: 78, w: 14, h: 18, title: "A Newborn Baby" },
      { type: "painting", id: "p6", x: 91, y: 78, w: 14, h: 18, title: "An Old Man" },
      { type: "painting", id: "p3", x: 114, y: 78, w: 14, h: 18, title: "A Lively Boy" },
      { type: "painting", id: "p7", x: 137, y: 78, w: 14, h: 18, title: "The End of Life" },
      { type: "painting", id: "p2", x: 160, y: 78, w: 14, h: 18, title: "An Infant" },
      { type: "painting", id: "p5", x: 183, y: 78, w: 14, h: 18, title: "A Middle-aged Man" },
      { type: "paintingSwitch", paintingId: "p4", x: 48, y: 105, w: 8, h: 6, order: 3 },
      { type: "paintingSwitch", paintingId: "p1", x: 71, y: 105, w: 8, h: 6, order: 0 },
      { type: "paintingSwitch", paintingId: "p6", x: 94, y: 105, w: 8, h: 6, order: 5 },
      { type: "paintingSwitch", paintingId: "p3", x: 117, y: 105, w: 8, h: 6, order: 2 },
      { type: "paintingSwitch", paintingId: "p7", x: 140, y: 105, w: 8, h: 6, order: 6 },
      { type: "paintingSwitch", paintingId: "p2", x: 163, y: 105, w: 8, h: 6, order: 1 },
      { type: "paintingSwitch", paintingId: "p5", x: 186, y: 105, w: 8, h: 6, order: 4 },
      { type: "starCrest", x: 139, y: 116, w: 12, h: 12, revealed: false }
    ]
  },
  roofedPassage: {
    name: "Roofed Passage",
    floorType: "stone", // Piso de piedra exterior techado
    bounds: { minX: 30, maxX: 180, minY: 30, maxY: 170 },

    // Geometría en L con esquina diagonal
    corridorPoly: [
      { x: 30, y: 70, w: 40, h: 100 },   // Tramo vertical inferior
      { x: 30, y: 30, w: 70, h: 50 },    // Codo/esquina superior izquierda
      { x: 90, y: 30, w: 90, h: 40 }     // Tramo horizontal superior hacia el Storeroom
    ],

    // Paredes de colisión para la esquina interna
    walls: [
      { x: 70, y: 70, w: 20, h: 60 }
    ],

    doors: [
      // 'p' Abajo: Vuelve a Back Passage (prp)
      { id: "doorToBackPassage", x: 40, y: 162, w: 20, h: 8, targetRoom: "backPassage", spawnX: 45, spawnY: 60 },

      // 'p' Arriba a la derecha: Conecta con Storeroom / Cobertizo Exterior
      { id: "doorToStoreroom", x: 172, y: 38, w: 8, h: 22, targetRoom: "storeroom", spawnX: 45, spawnY: 80, crestsRequired: ["sunCrest", "moonCrest", "starCrest", "windCrest"], lockId: "garden-storeroom-crests" }
    ],

    interactables: [
      // 'c' Relieve en la pared para insertar las 4 crestas (Crests Wall Relief)
      { type: "crestRelief", x: 130, y: 30, w: 22, h: 8, solid: true },
      { type: "zombieDog", x: 44, y: 112, w: 12, h: 12 },
      { type: "zombieDog", x: 130, y: 43, w: 12, h: 12 }
    ]
  },
  storeroom: {
    name: "Garden Shed",
    floorType: "wood",
    bounds: { minX: 30, maxX: 190, minY: 40, maxY: 140 },

    // Geometría del cobertizo de herramientas (160x100 px)
    corridorPoly: [
      { x: 30, y: 40, w: 160, h: 100 }
    ],

    doors: [
      // 'p' Izquierda: Vuelve a Roofed Passage
      { id: "doorToRoofedPassage", x: 30, y: 70, w: 8, h: 22, targetRoom: "roofedPassage", spawnX: 160, spawnY: 45, crestsRequired: ["sunCrest", "moonCrest", "starCrest", "windCrest"], lockId: "garden-storeroom-crests" },
      { id: "doorToCourtyardGarden", x: 182, y: 70, w: 8, h: 22, targetRoom: "courtyardGarden", spawnX: 170, spawnY: 120, crestsRequired: ["sunCrest", "moonCrest", "starCrest", "windCrest"], lockId: "garden-storeroom-crests" }
    ],

    interactables: [
      // Escalerita movible para alcanzar el estante
      { type: "stepLadder", x: 66, y: 80, w: 18, h: 20, solid: true },

      // Estante con la Manivela (Square Crank)
      { type: "shelfWithCrank", x: 110, y: 42, w: 25, h: 12, solid: true },

      // 'crank' Objeto recolectable: Square Crank (sobre el estante)
      { type: "crankItem", x: 118, y: 44, w: 10, h: 8, requiresLadder: { x: 90, y: 58, tolerance: 10 } },

      // Barriles de madera en la esquina inferior izquierda
      { type: "barrel", x: 45, y: 115, w: 12, h: 12, solid: true },
      { type: "barrel", x: 60, y: 118, w: 12, h: 12, solid: true },

      // Barriles adicionales cerca de la pared derecha
      { type: "barrel", x: 160, y: 115, w: 12, h: 12, solid: true }
    ]
  },
  courtyardGarden: {
    name: "Courtyard Garden",
    floorType: "concrete",
    bounds: { minX: 30, maxX: 290, minY: 10, maxY: 185 },
    walkablePolygon: [
      { x: 30, y: 95 },
      { x: 190, y: 95 },
      { x: 195, y: 12 },
      { x: 290, y: 12 },
      { x: 290, y: 185 },
      { x: 250, y: 185 },
      { x: 250, y: 145 },
      { x: 30, y: 145 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToGardenShed", x: 258, y: 177, w: 24, h: 8, targetRoom: "storeroom", spawnX: 145, spawnY: 85, crestsRequired: ["sunCrest", "moonCrest", "starCrest", "windCrest"], lockId: "garden-storeroom-crests" },
      { id: "door2ToWaterGate", x: 218, y: 10, w: 26, h: 8, targetRoom: "waterGate", spawnX: 131, spawnY: 129 },
      { id: "elevatorToFalls", x: 33, y: 108, w: 28, h: 8, targetRoom: "falls", spawnX: 145, spawnY: 145, disabled: true, blockedMessage: "El ascensor necesita una batería." }
    ],
    interactables: [
      { type: "elevator", x: 34, y: 112, w: 26, h: 28, solid: true },
      { type: "batterySocket", x: 62, y: 115, w: 18, h: 20, solid: false, elevatorDoorId: "elevatorToFalls", pairedRoomId: "falls", pairedDoorId: "door2ToCourtyardGarden", batteryInstalled: false },
      { type: "greenHerb", x: 220, y: 26, w: 10, h: 10 },
      { type: "greenHerb", x: 270, y: 26, w: 10, h: 10 },
      { type: "blueHerb", x: 160, y: 126, w: 10, h: 10 },
      { type: "blueHerb", x: 112, y: 128, w: 10, h: 10 },
      { type: "redHerb", x: 205, y: 100, w: 10, h: 10 },
      { type: "redHerb", x: 210, y: 125, w: 10, h: 10 },
      { type: "flowerBed", x: 226, y: 38, w: 42, h: 14, solid: true },
      { type: "zombieDog", x: 120, y: 112, w: 12, h: 12 },
      { type: "zombieDog", x: 240, y: 92, w: 12, h: 12 }
    ]
  },
  waterGate: {
    name: "Water Gate",
    floorType: "concrete",
    bounds: { minX: 28, maxX: 245, minY: 10, maxY: 182 },
    walkablePolygon: [
      { x: 30, y: 10 },
      { x: 242, y: 10 },
      { x: 238, y: 180 },
      { x: 204, y: 180 },
      { x: 204, y: 149 },
      { x: 72, y: 149 },
      { x: 72, y: 106 },
      { x: 98, y: 106 },
      { x: 101, y: 128 },
      { x: 128, y: 128 },
      { x: 128, y: 52 },
      { x: 60, y: 50 },
      { x: 59, y: 78 },
      { x: 30, y: 77 },
      { x: 29, y: 50 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToCourtyardGarden", x: 170, y: 174, w: 24, h: 8, targetRoom: "courtyardGarden", spawnX: 153, spawnY: 97 },
      { id: "elevator2ToFalls", x: 28, y: 55, w: 8, h: 24, targetRoom: "falls", spawnX: 150, spawnY: 70 }
    ],
    interactables: [
      { type: "elevator", x: 31, y: 53, w: 27, h: 27, solid: true },
      { type: "waterArea", x: 128, y: 54, w: 110, h: 72, solid: true },
      { type: "waterBridge", x: 174, y: 54, w: 18, h: 72, active: false },
      { type: "crankSocket", x: 76, y: 111, w: 23, h: 19, solid: true, crankType: "crankItem", crankInserted: false }
    ],
    bridgeActive: false
  },
  falls: {
    name: "Falls",
    floorType: "concrete",
    bounds: { minX: 30, maxX: 290, minY: 10, maxY: 185 },
    walkablePolygon: [
      { x: 30, y: 10 },
      { x: 290, y: 10 },
      { x: 288, y: 100 },
      { x: 205, y: 103 },
      { x: 205, y: 183 },
      { x: 100, y: 183 },
      { x: 100, y: 100 },
      { x: 30, y: 94 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "elevator1ToWaterGate", x: 244, y: 10, w: 34, h: 8, targetRoom: "waterGate", spawnX: 131, spawnY: 129 },
      { id: "door2ToCourtyardGarden", x: 201, y: 143, w: 8, h: 28, targetRoom: "courtyardGarden", spawnX: 153, spawnY: 97, disabled: true, blockedMessage: "El ascensor del Courtyard Garden todavía no tiene energía." },
      { id: "door3ToUndergroundEntry", x: 137, y: 39, w: 30, h: 24, targetRoom: "undergroundEntry", spawnX: 254, spawnY: 138, blockedMessage: "La catarata bloquea el acceso. Replegá el puente en Water Gate." },
      { id: "door4ToGuardhouseGate", x: 28, y: 48, w: 8, h: 28, targetRoom: "guardhouseGate", spawnX: 260, spawnY: 150 }
    ],
    interactables: [
      { type: "elevator", x: 247, y: 13, w: 32, h: 24, solid: true },
      { type: "waterPond", x: 96, y: 18, w: 112, h: 58 },
      { type: "stairsVertical", x: 136, y: 34, w: 32, h: 34 },
      { type: "waterfallBarrier", x: 134, y: 34, w: 36, h: 34, revealed: false, solid: false },
      { type: "zombieDog", x: 68, y: 45, w: 12, h: 12 },
      { type: "zombieDog", x: 153, y: 130, w: 12, h: 12 }
    ]
  },
  undergroundEntry: {
    name: "Underground Entry",
    floorType: "cave",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "stairsToFalls", x: 252, y: 137, w: 34, h: 28, targetRoom: "falls", spawnX: 145, spawnY: 70 },
      { id: "door1ToBranchedPassage", x: 292, y: 112, w: 8, h: 28, targetRoom: "branchedPassage", spawnX: 35, spawnY: 80 },
      { id: "door2ToBoulderPassage", x: 20, y: 145, w: 8, h: 28, targetRoom: "boulderPassage", spawnX: 145, spawnY: 31 }
    ],
    interactables: [
      { type: "smallTable", x: 43, y: 31, w: 34, h: 25, solid: true },
      { type: "typewriter", x: 50, y: 35, w: 21, h: 16 },
      { type: "caveRock", x: 105, y: 70, w: 136, h: 96, solid: true },
      { type: "stairsVertical", x: 253, y: 137, w: 32, h: 28 }
    ]
  },
  branchedPassage: {
    name: "Branched Passage",
    floorType: "cave",
    bounds: { minX: 12, maxX: 300, minY: 10, maxY: 166 },
    walkablePolygon: [
      { x: 132, y: 10 },
      { x: 300, y: 10 },
      { x: 300, y: 61 },
      { x: 207, y: 69 },
      { x: 207, y: 123 },
      { x: 294, y: 124 },
      { x: 294, y: 159 },
      { x: 130, y: 158 },
      { x: 132, y: 127 },
      { x: 15, y: 121 },
      { x: 12, y: 61 },
      { x: 130, y: 61 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToUndergroundEntry", x: 12, y: 76, w: 8, h: 28, targetRoom: "undergroundEntry", spawnX: 267, spawnY: 122 },
      { id: "door2ToGeneratorRoom", x: 292, y: 25, w: 8, h: 28, targetRoom: "generatorRoom", spawnX: 250, spawnY: 25 },
      { id: "door3ToGeneratorRoom", x: 292, y: 127, w: 8, h: 28, targetRoom: "generatorRoom", spawnX: 60, spawnY: 160 }
    ],
    interactables: [
      { type: "hunter", x: 148, y: 78, w: 26, h: 30 }
    ]
  },
  generatorRoom: {
    name: "Generator Room",
    floorType: "cave",
    bounds: { minX: 24, maxX: 300, minY: 7, maxY: 191 },
    walkablePolygon: [
      { x: 24, y: 7 },
      { x: 300, y: 7 },
      { x: 300, y: 78 },
      { x: 202, y: 78 },
      { x: 202, y: 191 },
      { x: 32, y: 191 },
      { x: 32, y: 127 },
      { x: 116, y: 127 },
      { x: 116, y: 64 },
      { x: 26, y: 64 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToBranchedPassage", x: 72, y: 7, w: 28, h: 8, targetRoom: "branchedPassage", spawnX: 250, spawnY: 25 },
      { id: "door2ToBranchedPassage", x: 32, y: 151, w: 8, h: 28, targetRoom: "branchedPassage", spawnX: 250, spawnY: 132 },
      { id: "door3ToEnricoRoom", x: 154, y: 183, w: 28, h: 8, targetRoom: "enricoRoom", spawnX: 48, spawnY: 24 }
    ],
    interactables: [
      { type: "hunter", x: 151, y: 92, w: 26, h: 30 },
      { type: "hunter", x: 155, y: 142, w: 26, h: 30 },
      { type: "firstAidSpray", x: 277, y: 24, w: 8, h: 12 },
      { type: "explosiveRounds", x: 276, y: 54, w: 10, h: 8 }
    ]
  },
  enricoRoom: {
    name: "Enrico Room",
    floorType: "cave",
    bounds: { minX: 24, maxX: 300, minY: 10, maxY: 185 },
    walkablePolygon: [
      { x: 30, y: 10 },
      { x: 86, y: 10 },
      { x: 86, y: 125 },
      { x: 165, y: 125 },
      { x: 165, y: 78 },
      { x: 294, y: 78 },
      { x: 294, y: 180 },
      { x: 30, y: 180 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToGeneratorRoom", x: 44, y: 10, w: 28, h: 8, targetRoom: "generatorRoom", spawnX: 60, spawnY: 160 }
    ],
    interactables: [
      { type: "enrico", x: 264, y: 126, w: 19, h: 25 },
      { type: "handgunAmmo", x: 270, y: 103, w: 10, h: 6 },
      { type: "hexCrank", x: 269, y: 82, w: 14, h: 12 }
    ]
  },
  boulderPassage: {
    name: "Boulder Passage",
    floorType: "cave",
    bounds: { minX: 16, maxX: 304, minY: 8, maxY: 192 },
    walkablePolygon: [
      { x: 20, y: 10 },
      { x: 300, y: 10 },
      { x: 300, y: 190 },
      { x: 235, y: 190 },
      { x: 235, y: 75 },
      { x: 80, y: 75 },
      { x: 80, y: 112 },
      { x: 20, y: 112 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToUndergroundEntry", x: 136, y: 10, w: 28, h: 8, targetRoom: "undergroundEntry", spawnX: 267, spawnY: 122 },
      { id: "door2ToBlackTigerRoom", x: 267, y: 182, w: 28, h: 8, targetRoom: "blackTigerRoom", spawnX: 145, spawnY: 24, disabled: true, blockedMessage: "La piedra todavía bloquea el pasaje." }
    ],
    interactables: [
      { type: "fireRounds", x: 34, y: 91, w: 12, h: 9 },
      { type: "rollingBoulder", x: 241, y: 12, w: 58, h: 60, solid: true, rollSpeed: 1.6 },
      { type: "hunter", x: 255, y: 126, w: 26, h: 30, revealed: false }
    ]
  },
  blackTigerRoom: {
    name: "Black Tiger Room",
    floorType: "webbedCave",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "door1ToBoulderPassage", x: 136, y: 10, w: 28, h: 8, targetRoom: "boulderPassage", spawnX: 273, spawnY: 140 },
      { id: "door2ToStraightPassage", x: 136, y: 182, w: 28, h: 8, targetRoom: "straightPassage", spawnX: 150, spawnY: 84, webRequired: "black-tiger-straight-web" }
    ],
    interactables: [
      { type: "blackTiger", x: 112, y: 57, w: 92, h: 76 },
      { type: "barrel", x: 57, y: 132, w: 24, h: 30, solid: true },
      { type: "barrel", x: 225, y: 132, w: 24, h: 30, solid: true },
      { type: "handgunAmmo", x: 64, y: 120, w: 10, h: 6 },
      { type: "combatKnife", x: 231, y: 119, w: 12, h: 12 },
      { type: "doorWeb", x: 136, y: 174, w: 28, h: 14, hits: 0, lockId: "black-tiger-straight-web" }
    ]
  },
  straightPassage: {
    name: "Straight Passage",
    floorType: "cave",
    bounds: { minX: 20, maxX: 300, minY: 70, maxY: 130 },
    corridorPoly: [{ x: 20, y: 70, w: 280, h: 60 }],
    doors: [
      { id: "door1ToBlackTigerRoom", x: 136, y: 70, w: 28, h: 8, targetRoom: "blackTigerRoom", spawnX: 150, spawnY: 160, webRequired: "black-tiger-straight-web" },
      { id: "door2ToBoulderPassage2", x: 20, y: 86, w: 8, h: 28, targetRoom: "boulderPassage2", spawnX: 105, spawnY: 95 },
      { id: "door3ToUndergroundSaveRoom", x: 260, y: 70, w: 28, h: 8, targetRoom: "undergroundSaveRoom", spawnX: 150, spawnY: 100 }
    ],
    interactables: [
      { type: "adder", x: 70, y: 91, w: 14, h: 9 },
      { type: "adder", x: 181, y: 105, w: 14, h: 9 },
      { type: "adder", x: 235, y: 91, w: 14, h: 9 }
    ]
  },
  boulderPassage2: {
    name: "Boulder Passage 2",
    floorType: "cave",
    bounds: { minX: 16, maxX: 304, minY: 8, maxY: 192 },
    walkablePolygon: [
      { x: 20, y: 10 },
      { x: 300, y: 10 },
      { x: 300, y: 70 },
      { x: 270, y: 70 },
      { x: 270, y: 190 },
      { x: 220, y: 190 },
      { x: 220, y: 100 },
      { x: 165, y: 100 },
      { x: 165, y: 160 },
      { x: 90, y: 160 },
      { x: 90, y: 80 },
      { x: 20, y: 80 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToStraightPassage", x: 278, y: 105, w: 8, h: 28, targetRoom: "straightPassage", spawnX: 35, spawnY: 95 },
      { id: "door2ToItemChamber", x: 108, y: 152, w: 28, h: 8, targetRoom: "itemChamber", spawnX: 116, spawnY: 62 },
      { id: "elevatorToFountain", x: 278, y: 148, w: 8, h: 28, targetRoom: "fountain", spawnX: 35, spawnY: 148 }
    ],
    interactables: [
      { type: "crankSocket", x: 147, y: 13, w: 23, h: 19, solid: true, crankType: "hexCrank" },
      { type: "elevator", x: 240, y: 148, w: 30, h: 28, solid: false },
      { type: "rollingBoulder", x: 22, y: 12, w: 58, h: 56, solid: true, rollSpeed: 1.6, direction: 1, stopX: 242, triggerRadius: 60, refugeX: 105, refugeY: 120 }
    ],
  },
  itemChamber: {
    name: "Item Chamber",
    floorType: "cave",
    bounds: { minX: 80, maxX: 240, minY: 45, maxY: 155 },
    corridorPoly: [{ x: 80, y: 45, w: 160, h: 110 }],
    doors: [
      { id: "doorToBoulderPassage2", x: 108, y: 45, w: 28, h: 8, targetRoom: "boulderPassage2", spawnX: 116, spawnY: 130 }
    ],
    interactables: [
      { type: "crankSocket", x: 88, y: 88, w: 23, h: 19, solid: true, crankType: "hexCrank" },
      { type: "statue", x: 151, y: 63, w: 34, h: 48, solid: true },
      { type: "doomBook2", x: 202, y: 119, w: 12, h: 14 }
    ]
  },
  fountain: {
    name: "Fountain",
    floorType: "concrete",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "elevatorToBoulderPassage2", x: 20, y: 144, w: 8, h: 28, targetRoom: "boulderPassage2", spawnX: 245, spawnY: 160 },
      { id: "stairsToLaboratoryEntry", x: 141, y: 96, w: 38, h: 32, targetRoom: "laboratoryEntry", spawnX: 150, spawnY: 64, disabled: true, revealed: false, blockedMessage: "La fuente bloquea la escalera. Colocá la Eagle Medal y la Wolf Medal en los pilares." }
    ],
    interactables: [
      { type: "elevator", x: 29, y: 144, w: 26, h: 28, solid: false },
      { type: "pottedPlant", x: 48, y: 38, w: 14, h: 14, solid: true },
      { type: "pottedPlant", x: 48, y: 146, w: 14, h: 14, solid: true },
      { type: "greenHerb", x: 252, y: 31, w: 10, h: 10 },
      { type: "greenHerb", x: 272, y: 31, w: 10, h: 10 },
      { type: "blueHerb", x: 252, y: 153, w: 10, h: 10 },
      { type: "blueHerb", x: 272, y: 153, w: 10, h: 10 },
      { type: "pillar", id: "eagleMedalPillar", medalSocket: "eagleMedal", medalInserted: false, x: 89, y: 82, w: 22, h: 36, solid: true },
      { type: "pillar", id: "wolfMedalPillar", medalSocket: "wolfMedal", medalInserted: false, x: 209, y: 82, w: 22, h: 36, solid: true },
      { type: "waterPond", x: 115, y: 64, w: 90, h: 70, solid: true },
      { type: "stairsVertical", x: 144, y: 91, w: 32, h: 34, revealed: false }
    ],
    fountainOpened: false
  },
  laboratoryEntry: {
    name: "Laboratory Entry",
    floorType: "concrete",
    level: "B1",
    bounds: { minX: 90, maxX: 230, minY: 30, maxY: 170 },
    corridorPoly: [{ x: 90, y: 30, w: 140, h: 140 }],
    doors: [
      { id: "stairsToFountain", x: 145, y: 30, w: 30, h: 32, targetRoom: "fountain", spawnX: 150, spawnY: 138 },
      { id: "doorToEmergencyTunnel", x: 90, y: 88, w: 8, h: 28, targetRoom: "emergencyTunnel", spawnX: 105, spawnY: 95 },
      { id: "stairsToLadderRoom", x: 145, y: 137, w: 30, h: 28, targetRoom: "ladderRoom", spawnX: 150, spawnY: 70 }
    ],
    interactables: [
      { type: "stairsVertical", x: 145, y: 32, w: 30, h: 30 },
      { type: "stairsVertical", x: 145, y: 137, w: 30, h: 28 }
    ]
  },
  emergencyTunnel: {
    name: "Emergency Tunnel",
    floorType: "cave",
    level: "B1",
    bounds: { minX: 16, maxX: 304, minY: 8, maxY: 192 },
    walkablePolygon: [
      { x: 20, y: 10 },
      { x: 120, y: 10 },
      { x: 120, y: 52 },
      { x: 204, y: 74 },
      { x: 204, y: 134 },
      { x: 300, y: 134 },
      { x: 300, y: 178 },
      { x: 174, y: 178 },
      { x: 174, y: 122 },
      { x: 82, y: 118 },
      { x: 82, y: 62 },
      { x: 20, y: 60 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "elevatorToHeliport", x: 20, y: 22, w: 8, h: 28, targetRoom: "heliport", spawnX: 260, spawnY: 34 },
      { id: "door1ToLaboratoryEntry", x: 292, y: 143, w: 8, h: 28, targetRoom: "laboratoryEntry", spawnX: 105, spawnY: 95 }
    ],
    interactables: [
      { type: "elevator", x: 29, y: 22, w: 26, h: 28, solid: false },
      { type: "batterySocket", x: 62, y: 20, w: 24, h: 21, solid: false },
      { type: "carBattery", x: 246, y: 151, w: 16, h: 12 }
    ]
  },
  ladderRoom: {
    name: "Ladder Room",
    floorType: "concrete",
    level: "B2",
    bounds: { minX: 100, maxX: 220, minY: 40, maxY: 160 },
    corridorPoly: [{ x: 100, y: 40, w: 120, h: 120 }],
    doors: [
      { id: "stairsToLaboratoryEntry", x: 145, y: 40, w: 30, h: 28, targetRoom: "laboratoryEntry", spawnX: 150, spawnY: 120 },
      { id: "doorToStairway", x: 145, y: 152, w: 30, h: 8, targetRoom: "stairway", spawnX: 150, spawnY: 50 }
    ],
    interactables: [
      { type: "stairsVertical", x: 145, y: 40, w: 30, h: 28 },
      { type: "itemChest", x: 111, y: 87, w: 34, h: 24, solid: true },
      { type: "stairsVertical", x: 145, y: 129, w: 30, h: 27 }
    ]
  },
  stairway: {
    name: "Stairway B2",
    floorType: "concrete",
    level: "B2",
    bounds: { minX: 16, maxX: 304, minY: 8, maxY: 192 },
    walkablePolygon: [
      { x: 20, y: 10 },
      { x: 300, y: 10 },
      { x: 300, y: 72 },
      { x: 253, y: 72 },
      { x: 258, y: 138 },
      { x: 300, y: 138 },
      { x: 300, y: 187 },
      { x: 119, y: 190 },
      { x: 117, y: 78 },
      { x: 20, y: 78 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToLadderRoom", x: 292, y: 143, w: 8, h: 28, targetRoom: "ladderRoom", spawnX: 185, spawnY: 128 },
      { id: "door2ToVisualDataRoom", x: 20, y: 56, w: 8, h: 28, targetRoom: "visualDataRoom", spawnX: 150, spawnY: 24 },
      { id: "stairsToORoom", x: 258, y: 18, w: 30, h: 48, targetRoom: "oRoom", spawnX: 50, spawnY: 32 }
    ],
    interactables: [
      { type: "desk", x: 48, y: 29, w: 44, h: 24, solid: true },
      { type: "moDisk", x: 63, y: 36, w: 10, h: 8 },
      { type: "greenHerb", x: 128, y: 49, w: 10, h: 10 },
      { type: "greenHerb", x: 227, y: 157, w: 10, h: 10 },
      { type: "zombie", x: 173, y: 43, w: 12, h: 14 },
      { type: "zombie", x: 203, y: 155, w: 12, h: 14 },
      { type: "stairsVertical", x: 258, y: 18, w: 30, h: 48 }
    ]
  },
  visualDataRoom: {
    name: "Visual Data Room",
    floorType: "whiteTile",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "door1ToStairwayB2", x: 145, y: 10, w: 30, h: 8, targetRoom: "stairway", spawnX: 40, spawnY: 35 }
    ],
    interactables: [
      { type: "projectionBeam", x: 43, y: 55, w: 82, h: 88 },
      { type: "projectionScreen", x: 28, y: 35, w: 15, h: 125, solid: true },
      { type: "smallTable", x: 110, y: 68, w: 98, h: 64, solid: true },
      { type: "bench", x: 218, y: 74, w: 20, h: 14, solid: true },
      { type: "bench", x: 218, y: 112, w: 20, h: 14, solid: true },
      { type: "bench", x: 146, y: 139, w: 20, h: 14, solid: true },
      { type: "projector", x: 119, y: 91, w: 18, h: 14 },
      { type: "powerRoomKey", x: 192, y: 101, w: 12, h: 10 },
      { type: "securitySystem", x: 192, y: 116, w: 12, h: 10 }
    ]
  },
  smallLab: {
    name: "Small Lab",
    floorType: "checkerboard",
    level: "B3",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "doorToORoom", x: 145, y: 182, w: 30, h: 8, targetRoom: "oRoom", spawnX: 272, spawnY: 44 }
    ],
    interactables: [
      { type: "labBench", x: 44, y: 42, w: 72, h: 32, solid: true },
      { type: "labComputer", x: 202, y: 38, w: 42, h: 34, solid: true },
      { type: "smallTable", x: 196, y: 112, w: 46, h: 28, solid: false },
      { type: "slides", x: 212, y: 120, w: 13, h: 8 }
    ]
  },
  oRoom: {
    name: "O Room",
    floorType: "concrete",
    level: "B3",
    bounds: { minX: 16, maxX: 304, minY: 8, maxY: 192 },
    walkablePolygon: [
      { x: 20, y: 10 },
      { x: 84, y: 10 },
      { x: 84, y: 28 },
      { x: 300, y: 28 },
      { x: 300, y: 190 },
      { x: 20, y: 190 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "stairsToStairwayB2", x: 47, y: 10, w: 30, h: 8, targetRoom: "stairway", spawnX: 265, spawnY: 45 },
      { id: "door1ToPrivateCorridor", x: 20, y: 48, w: 8, h: 28, targetRoom: "privateCorridor", spawnX: 250, spawnY: 100 },
      { id: "door2ToMorgue", x: 181, y: 143, w: 28, h: 8, targetRoom: "morgue", spawnX: 150, spawnY: 138 },
      { id: "door3ToElevatorEntry", x: 292, y: 132, w: 8, h: 28, targetRoom: "elevatorEntry", spawnX: 48, spawnY: 98 },
      { id: "door4ToSmallLab", x: 258, y: 28, w: 28, h: 8, targetRoom: "smallLab", spawnX: 150, spawnY: 100 }
    ],
    walls: [
      { x: 84, y: 77, w: 162, h: 5 },
      { x: 84, y: 77, w: 5, h: 71 },
      { x: 241, y: 77, w: 5, h: 71 },
      { x: 84, y: 143, w: 97, h: 5 },
      { x: 209, y: 143, w: 37, h: 5 }
    ],
    interactables: [
      { type: "stairsHorizontal", x: 27, y: 19, w: 53, h: 8 },
      { type: "morgueStructure", x: 84, y: 77, w: 162, h: 71 },
      { type: "zombie", x: 217, y: 47, w: 12, h: 14 },
      { type: "zombie", x: 265, y: 88, w: 12, h: 14 },
      { type: "zombie", x: 58, y: 157, w: 12, h: 14 },
      { type: "zombie", x: 258, y: 164, w: 12, h: 14 },
      { type: "inkRibbon", x: 108, y: 45, w: 10, h: 8 },
      { type: "inkRibbon", x: 202, y: 154, w: 10, h: 8 },
      { type: "inkRibbon", x: 270, y: 52, w: 10, h: 8 }
    ]
  },
  privateCorridor: {
    name: "Private Corridor",
    floorType: "concrete",
    level: "B3",
    bounds: { minX: 20, maxX: 300, minY: 64, maxY: 136 },
    corridorPoly: [{ x: 20, y: 64, w: 280, h: 72 }],
    doors: [
      { id: "door1ToORoom", x: 292, y: 86, w: 8, h: 28, targetRoom: "oRoom", spawnX: 50, spawnY: 100 },
      { id: "door2ToXRayRoom", x: 214, y: 128, w: 28, h: 8, targetRoom: "xRayRoom", spawnX: 225, spawnY: 158 },
      { id: "door3ToPrivateRoom", x: 158, y: 64, w: 28, h: 8, targetRoom: "privateRoom", spawnX: 150, spawnY: 174 },
      { id: "door4ToCellEntry", x: 20, y: 78, w: 8, h: 28, targetRoom: "cellEntry", spawnX: 48, spawnY: 158 }
    ],
    interactables: []
  },
  cellEntry: {
    name: "Cell Entry",
    floorType: "concrete",
    level: "B3",
    bounds: { minX: 24, maxX: 224, minY: 8, maxY: 192 },
    walkablePolygon: [
      { x: 30, y: 10 },
      { x: 220, y: 10 },
      { x: 220, y: 82 },
      { x: 118, y: 82 },
      { x: 118, y: 190 },
      { x: 30, y: 190 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToPrivateCorridor", x: 58, y: 182, w: 30, h: 8, targetRoom: "privateCorridor", spawnX: 30, spawnY: 92 },
      { id: "door2ToCellRoom", x: 212, y: 42, w: 8, h: 28, targetRoom: "cellRoom", spawnX: 78, spawnY: 94 }
    ],
    interactables: [
      { type: "keypadPanel", x: 182, y: 14, w: 28, h: 12, solid: false }
    ]
  },
  cellRoom: {
    name: "Cell",
    floorType: "concrete",
    level: "B3",
    bounds: { minX: 58, maxX: 262, minY: 28, maxY: 172 },
    corridorPoly: [{ x: 62, y: 32, w: 196, h: 136 }],
    doors: [
      { id: "doorToCellEntry", x: 58, y: 80, w: 8, h: 28, targetRoom: "cellEntry", spawnX: 190, spawnY: 48 }
    ],
    interactables: [
      { type: "bed", x: 127, y: 93, w: 55, h: 22 },
      { type: "toilet", x: 193, y: 111, w: 14, h: 17 },
      { type: "chrisInCell", x: 138, y: 98, w: 30, h: 13 },
      { type: "detentionCell", x: 116, y: 65, w: 106, h: 82, solid: true }
    ]
  },
  elevatorEntry: {
    name: "Elevator Entry",
    floorType: "concrete",
    level: "B3",
    bounds: { minX: 16, maxX: 304, minY: 8, maxY: 192 },
    walkablePolygon: [
      { x: 20, y: 68 },
      { x: 130, y: 68 },
      { x: 130, y: 10 },
      { x: 300, y: 10 },
      { x: 300, y: 70 },
      { x: 196, y: 70 },
      { x: 196, y: 185 },
      { x: 136, y: 185 },
      { x: 133, y: 132 },
      { x: 20, y: 132 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToORoom", x: 20, y: 88, w: 8, h: 28, targetRoom: "oRoom", spawnX: 275, spawnY: 145 },
      { id: "door2ToLabSaveRoom", x: 188, y: 92, w: 8, h: 28, targetRoom: "labSaveRoom", spawnX: 78, spawnY: 100 },
      { id: "door3ToPowerMaze1", x: 142, y: 177, w: 30, h: 8, targetRoom: "powerMaze1", spawnX: 150, spawnY: 24 },
      { id: "door4ToOperatingRoom", x: 76, y: 64, w: 28, h: 8, targetRoom: "operatingRoom", spawnX: 150, spawnY: 165 },
      { id: "elevatorToMainLabEntryB4", x: 258, y: 10, w: 30, h: 8, targetRoom: "mainLabEntryB4", spawnX: 150, spawnY: 24 }
    ],
    interactables: [
      { type: "elevator", x: 258, y: 22, w: 30, h: 38, solid: false },
      { type: "zombie", x: 122, y: 88, w: 12, h: 14 },
      { type: "zombie", x: 145, y: 148, w: 12, h: 14 }
    ]
  },
  labSaveRoom: {
    name: "Lab Save Room",
    floorType: "concrete",
    level: "B3",
    bounds: { minX: 56, maxX: 264, minY: 28, maxY: 172 },
    corridorPoly: [{ x: 60, y: 32, w: 200, h: 136 }],
    doors: [
      { id: "doorToElevatorEntry", x: 56, y: 84, w: 8, h: 28, targetRoom: "elevatorEntry", spawnX: 174, spawnY: 100 }
    ],
    interactables: [
      { type: "itemChest", x: 211, y: 43, w: 34, h: 26, solid: true },
      { type: "bookshelfHorizontal", x: 82, y: 43, w: 60, h: 20, solid: true },
      { type: "smallTable", x: 157, y: 44, w: 42, h: 28, solid: false },
      { type: "typewriter", x: 167, y: 48, w: 22, h: 18 },
      { type: "blueHerb", x: 91, y: 98, w: 10, h: 10 },
      { type: "greenHerb", x: 124, y: 107, w: 10, h: 10 },
      { type: "flameRounds", x: 222, y: 105, w: 11, h: 9 },
      { type: "inkRibbon", x: 89, y: 144, w: 10, h: 8 },
      { type: "inkRibbon", x: 184, y: 145, w: 10, h: 8 }
    ]
  },
  mainLabEntryB4: {
    name: "Main Lab Entry",
    floorType: "concrete",
    level: "B4",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    walkablePolygon: [
      { x: 36, y: 10 },
      { x: 270, y: 10 },
      { x: 270, y: 80 },
      { x: 124, y: 80 },
      { x: 124, y: 190 },
      { x: 36, y: 190 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "elevatorToElevatorEntry", x: 240, y: 10, w: 30, h: 8, targetRoom: "elevatorEntry", spawnX: 270, spawnY: 48 },
      { id: "door1ToMainLab", x: 66, y: 182, w: 30, h: 8, targetRoom: "mainLab", spawnX: 150, spawnY: 24 }
    ],
    interactables: [
      { type: "elevator", x: 240, y: 21, w: 30, h: 38, solid: false }
    ]
  },
  mainLab: {
    name: "Main Lab",
    floorType: "checkerboard",
    level: "B4",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "doorToMainLabEntryB4", x: 266, y: 10, w: 30, h: 8, targetRoom: "mainLabEntryB4", spawnX: 250, spawnY: 62 }
    ],
    interactables: [
      { type: "tyrantTube", x: 22, y: 53, w: 38, h: 55, solid: true },
      { type: "keypadPanel", x: 62, y: 73, w: 24, h: 16, solid: false },
      { type: "masterKey", x: 31, y: 126, w: 12, h: 8 },
      { type: "specimenTube", x: 91, y: 49, w: 40, h: 38, solid: true },
      { type: "specimenTube", x: 133, y: 49, w: 40, h: 38, solid: true },
      { type: "specimenTube", x: 175, y: 49, w: 40, h: 38, solid: true },
      { type: "specimenTube", x: 91, y: 91, w: 40, h: 38, solid: true },
      { type: "specimenTube", x: 133, y: 91, w: 40, h: 38, solid: true },
      { type: "specimenTube", x: 175, y: 91, w: 40, h: 38, solid: true },
      { type: "handgunAmmo", x: 267, y: 162, w: 12, h: 7 }
    ]
  },
  powerMaze1: {
    name: "Power Maze 1",
    floorType: "carpetRed",
    level: "B3",
    bounds: { minX: 16, maxX: 304, minY: 8, maxY: 192 },
    corridorPoly: [
      { x: 20, y: 10, w: 280, h: 48 },
      { x: 20, y: 42, w: 62, h: 120 },
      { x: 62, y: 42, w: 54, h: 154 },
      { x: 20, y: 146, w: 96, h: 50 },
      { x: 190, y: 42, w: 110, h: 74 },
      { x: 190, y: 100, w: 46, h: 96 }
    ],
    constrainToCorridorPoly: true,
    doors: [
      { id: "door1ToElevatorEntry", x: 140, y: 10, w: 30, h: 8, targetRoom: "elevatorEntry", spawnX: 150, spawnY: 160 },
      { id: "door2ToPowerMaze2", x: 292, y: 92, w: 8, h: 28, targetRoom: "powerMaze2", spawnX: 252, spawnY: 28 }
    ],
    interactables: [
      { type: "powerMachine", x: 116, y: 58, w: 74, h: 92, solid: true },
      { type: "powerMachine", x: 230, y: 40, w: 36, h: 48, solid: true },
      { type: "powerMachine", x: 236, y: 116, w: 64, h: 80, solid: true },
      { type: "powerMachine", x: 20, y: 164, w: 42, h: 32, solid: true },
      { type: "chimera", x: 113, y: 18, w: 25, h: 30 },
      { type: "chimera", x: 205, y: 70, w: 25, h: 30 }
    ]
  },
  powerMaze2: {
    name: "Power Maze 2",
    floorType: "carpetRed",
    level: "B3",
    bounds: { minX: 16, maxX: 304, minY: 8, maxY: 192 },
    corridorPoly: [
      { x: 20, y: 10, w: 280, h: 50 },
      { x: 20, y: 42, w: 58, h: 120 },
      { x: 64, y: 42, w: 224, h: 44 },
      { x: 236, y: 54, w: 52, h: 122 },
      { x: 20, y: 144, w: 280, h: 42 },
      { x: 146, y: 56, w: 48, h: 120 }
    ],
    constrainToCorridorPoly: true,
    doors: [
      { id: "door1ToPowerMaze1", x: 250, y: 10, w: 30, h: 8, targetRoom: "powerMaze1", spawnX: 275, spawnY: 94 },
      { id: "door2ToPowerRoom", x: 142, y: 178, w: 30, h: 8, targetRoom: "powerRoom", spawnX: 150, spawnY: 24 }
    ],
    interactables: [
      { type: "powerMachine", x: 40, y: 61, w: 20, h: 76, solid: true },
      { type: "powerMachine", x: 80, y: 61, w: 66, h: 24, solid: true },
      { type: "powerMachine", x: 194, y: 61, w: 42, h: 24, solid: true },
      { type: "powerMachine", x: 78, y: 87, w: 68, h: 57, solid: true },
      { type: "powerMachine", x: 194, y: 87, w: 42, h: 57, solid: true },
      { type: "moDiskTerminal", x: 111, y: 45, w: 24, h: 17 },
      { type: "chimera", x: 32, y: 14, w: 25, h: 30 },
      { type: "chimera", x: 158, y: 92, w: 25, h: 30 },
      { type: "chimera", x: 252, y: 96, w: 25, h: 30 }
    ]
  },
  powerRoom: {
    name: "Power Room",
    floorType: "carpetRed",
    level: "B3",
    bounds: { minX: 16, maxX: 304, minY: 8, maxY: 192 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "doorToPowerMaze2", x: 142, y: 10, w: 30, h: 8, targetRoom: "powerMaze2", spawnX: 150, spawnY: 160 }
    ],
    interactables: [
      { type: "powerMachine", x: 86, y: 79, w: 148, h: 42, solid: true },
      { type: "keypadPanel", x: 147, y: 105, w: 28, h: 12, solid: false },
      { type: "chimera", x: 42, y: 86, w: 25, h: 30 }
    ]
  },
  operatingRoom: {
    name: "Operating Room",
    floorType: "chess",
    level: "B3",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "doorToElevatorEntry", x: 142, y: 182, w: 30, h: 8, targetRoom: "elevatorEntry", spawnX: 90, spawnY: 82 },
      { id: "ventDropToMorgue", x: 242, y: 36, w: 30, h: 10, targetRoom: "morgue", spawnX: 220, spawnY: 44, stepLadderTarget: { x: 246, y: 48, tolerance: 14, wallZone: { x: 238, y: 10, w: 42, h: 24 } } }
    ],
    interactables: [
      { type: "surgicalLamp", x: 126, y: 28, w: 46, h: 20 },
      { type: "operatingTable", x: 107, y: 72, w: 76, h: 40, solid: true },
      { type: "smallTable", x: 38, y: 39, w: 52, h: 28, solid: false },
      { type: "shotgunShells", x: 59, y: 48, w: 10, h: 8 },
      { type: "redHerb", x: 253, y: 145, w: 10, h: 10 },
      { type: "airDuct", x: 238, y: 18, w: 42, h: 18 },
      { type: "stepLadder", x: 48, y: 132, startX: 48, startY: 132, resettable: true, w: 20, h: 22, solid: true }
    ]
  },
  xRayRoom: {
    name: "X-Ray Room",
    floorType: "concrete",
    level: "B3",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "doorToPrivateCorridor", x: 214, y: 182, w: 28, h: 8, targetRoom: "privateCorridor", spawnX: 225, spawnY: 104 }
    ],
    interactables: [
      { type: "xrayViewer", x: 42, y: 34, w: 34, h: 58, solid: true },
      { type: "xrayMachine", x: 244, y: 42, w: 34, h: 48, solid: true },
      { type: "morgueStretcher", x: 98, y: 67, w: 76, h: 28, solid: true },
      { type: "woodenCrate", x: 47, y: 132, w: 28, h: 26, solid: true },
      { type: "woodenCrate", x: 238, y: 132, w: 28, h: 26, solid: true },
      { type: "smallTable", x: 181, y: 116, w: 44, h: 25, solid: false },
      { type: "researcherLetter", x: 196, y: 123, w: 15, h: 10 },
      { type: "handgunAmmo", x: 101, y: 125, w: 10, h: 6 },
      { type: "handgunAmmo", x: 142, y: 125, w: 10, h: 6 },
      { type: "greenHerb", x: 87, y: 157, w: 10, h: 10 }
    ]
  },
  privateRoom: {
    name: "Private Room",
    floorType: "concrete",
    level: "B3",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "doorToPrivateCorridor", x: 158, y: 182, w: 28, h: 8, targetRoom: "privateCorridor", spawnX: 170, spawnY: 92 }
    ],
    interactables: [
      { type: "bookshelfHorizontal", x: 38, y: 34, w: 68, h: 22, solid: true },
      { type: "desk", x: 184, y: 38, w: 78, h: 38, solid: false },
      { type: "moDiskTerminal", x: 212, y: 44, w: 24, h: 17 },
      { type: "fax", x: 190, y: 59, w: 15, h: 10 },
      { type: "bench", x: 122, y: 47, w: 24, h: 18, solid: true },
      { type: "smallTable", x: 45, y: 130, w: 48, h: 28, solid: true },
      { type: "zombie", x: 131, y: 96, w: 12, h: 14 },
      { type: "zombie", x: 239, y: 98, w: 12, h: 14 },
      { type: "zombie", x: 101, y: 157, w: 12, h: 14 },
      { type: "zombie", x: 263, y: 153, w: 12, h: 14 },
      { type: "inkRibbon", x: 154, y: 54, w: 10, h: 8 },
      { type: "inkRibbon", x: 207, y: 164, w: 10, h: 8 }
    ]
  },
  morgue: {
    name: "Morgue B3",
    floorType: "concrete",
    level: "B3",
    bounds: { minX: 60, maxX: 260, minY: 30, maxY: 170 },
    corridorPoly: [{ x: 60, y: 30, w: 200, h: 140 }],
    doors: [
      { id: "doorToORoom", x: 145, y: 152, w: 30, h: 8, targetRoom: "oRoom", spawnX: 190, spawnY: 154 }
    ],
    interactables: [
      { type: "morgueStretcher", x: 76, y: 53, w: 48, h: 20, solid: true },
      { type: "morgueStretcher", x: 145, y: 53, w: 48, h: 20, solid: true },
      { type: "morgueStretcher", x: 76, y: 98, w: 48, h: 20, solid: true },
      { type: "smallTable", x: 178, y: 112, w: 50, h: 26, solid: false },
      { type: "moDiskTerminal", x: 186, y: 115, w: 22, h: 15 },
      { type: "magnumRounds", x: 216, y: 121, w: 9, h: 8 },
      { type: "colt", x: 232, y: 126, w: 18, h: 12 }
    ]
  },
  undergroundSaveRoom: {
    name: "Underground Save Room",
    floorType: "cave",
    bounds: { minX: 100, maxX: 220, minY: 55, maxY: 145 },
    corridorPoly: [{ x: 100, y: 55, w: 120, h: 90 }],
    doors: [
      { id: "doorToStraightPassage", x: 142, y: 55, w: 28, h: 8, targetRoom: "straightPassage", spawnX: 270, spawnY: 95 }
    ],
    interactables: [
      { type: "itemChest", x: 112, y: 76, w: 36, h: 24, solid: true },
      { type: "smallTable", x: 166, y: 76, w: 34, h: 24, solid: true },
      { type: "typewriter", x: 172, y: 78, w: 22, h: 16 },
      { type: "firstAidSpray", x: 116, y: 116, w: 8, h: 12 },
      { type: "inkRibbon", x: 163, y: 116, w: 10, h: 8 },
      { type: "inkRibbon", x: 180, y: 116, w: 10, h: 8 },
      { type: "blueHerb", x: 202, y: 116, w: 10, h: 10 }
    ]
  },
  guardhouseGate: {
    name: "Guardhouse Gate",
    floorType: "concrete",
    bounds: { minX: 30, maxX: 290, minY: 10, maxY: 185 },
    walkablePolygon: [
      { x: 30, y: 10 },
      { x: 80, y: 10 },
      { x: 80, y: 70 },
      { x: 285, y: 70 },
      { x: 287, y: 185 },
      { x: 235, y: 185 },
      { x: 235, y: 125 },
      { x: 30, y: 125 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToFalls", x: 249, y: 177, w: 26, h: 8, targetRoom: "falls", spawnX: 50, spawnY: 55 },
      { id: "door2ToGuardhouseEntry", x: 46, y: 10, w: 26, h: 8, targetRoom: "guardhouseEntry", spawnX: 145, spawnY: 78 }
    ],
    interactables: [
      { type: "greenHerb", x: 190, y: 110, w: 10, h: 10 },
      { type: "blueHerb", x: 42, y: 58, w: 10, h: 10 },
      { type: "zombieDog", x: 90, y: 98, w: 12, h: 12 },
      { type: "zombieDog", x: 210, y: 92, w: 12, h: 12 }
    ]
  },
  guardhouseEntry: {
    name: "Guardhouse Entry",
    floorType: "wood",
    bounds: { minX: 30, maxX: 290, minY: 10, maxY: 185 },
    walkablePolygon: [
      { x: 30, y: 10 },
      { x: 106, y: 10 },
      { x: 94, y: 61 },
      { x: 290, y: 61 },
      { x: 290, y: 104 },
      { x: 209, y: 104 },
      { x: 208, y: 185 },
      { x: 180, y: 185 },
      { x: 180, y: 102 },
      { x: 94, y: 102 },
      { x: 91, y: 128 },
      { x: 30, y: 128 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToGuardhouseGate", x: 45, y: 120, w: 28, h: 8, targetRoom: "guardhouseGate", spawnX: 48, spawnY: 35 },
      { id: "door2ToGuardhouseSaveRoom", x: 132, y: 98, w: 26, h: 8, targetRoom: "guardhouseSaveRoom", spawnX: 146, spawnY: 105 },
      { id: "door3ToRoom001", x: 162, y: 57, w: 26, h: 8, targetRoom: "room001", spawnX: 250, spawnY: 145 },
      { id: "door4ToCentralCorridorGH", x: 181, y: 177, w: 26, h: 8, targetRoom: "centralCorridorGH", spawnX: 35, spawnY: 165 },
      { id: "door5ToRecRoom", x: 282, y: 73, w: 8, h: 26, targetRoom: "recRoom", spawnX: 36, spawnY: 122 }
    ],
    interactables: [
      { type: "blueHerb", x: 42, y: 24, w: 10, h: 10 },
      { type: "blueHerb", x: 63, y: 24, w: 10, h: 10 },
      { type: "floorHole", x: 135, y: 76, w: 24, h: 18 },
      { type: "pushableStatue", x: 78, y: 16, w: 20, h: 28, solid: true },
      { type: "floorHole", x: 222, y: 78, w: 22, h: 18 }
    ]
  },
  centralCorridorGH: {
    name: "Central Corridor GH",
    floorType: "wood",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    walkablePolygon: [
      { x: 250, y: 10 },
      { x: 295, y: 10 },
      { x: 295, y: 190 },
      { x: 20, y: 190 },
      { x: 20, y: 150 },
      { x: 250, y: 150 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToGuardhouseEntry", x: 20, y: 158, w: 8, h: 26, targetRoom: "guardhouseEntry", spawnX: 190, spawnY: 150 },
      { id: "door2ToBeehivePassage", x: 287, y: 111, w: 8, h: 26, targetRoom: "beehivePassage", spawnX: 35, spawnY: 124 },
      { id: "door3ToRoom002", x: 287, y: 22, w: 8, h: 26, targetRoom: "room002", spawnX: 235, spawnY: 55 }
    ],
    interactables: [
      { type: "greenHerb", x: 258, y: 55, w: 10, h: 10 },
      { type: "greenHerb", x: 258, y: 72, w: 10, h: 10 },
      { type: "greenHerb", x: 258, y: 89, w: 10, h: 10 }
    ]
  },
  beehivePassage: {
    name: "Beehive Passage",
    floorType: "wood",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    walkablePolygon: [
      { x: 120, y: 10 },
      { x: 220, y: 10 },
      { x: 220, y: 100 },
      { x: 290, y: 100 },
      { x: 290, y: 185 },
      { x: 20, y: 185 },
      { x: 20, y: 100 },
      { x: 120, y: 100 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToCentralCorridorGH", x: 20, y: 116, w: 8, h: 28, targetRoom: "centralCorridorGH", spawnX: 260, spawnY: 118 },
      { id: "door2ToDrugStoreroom", x: 120, y: 62, w: 8, h: 28, targetRoom: "drugStoreroom", spawnX: 270, spawnY: 150, codeRequired: "345", lockId: "drug-storeroom-code" },
      { id: "door3ToRoom003", x: 212, y: 62, w: 8, h: 28, targetRoom: "room003", spawnX: 42, spawnY: 157 },
      { id: "door4ToPlant42Room", x: 282, y: 116, w: 8, h: 28, targetRoom: "plant42Room", spawnX: 45, spawnY: 146 }
    ],
    interactables: [
      { type: "giantBeehive", x: 151, y: 20, w: 38, h: 34, solid: true },
      { type: "keypadPanel", x: 130, y: 65, w: 9, h: 18 },
      { type: "room002Key", x: 184, y: 60, w: 10, h: 8 },
      { type: "wasp", x: 130, y: 54, w: 12, h: 10 },
      { type: "wasp", x: 145, y: 83, w: 12, h: 10 },
      { type: "wasp", x: 192, y: 48, w: 12, h: 10 },
      { type: "wasp", x: 194, y: 84, w: 12, h: 10 },
      { type: "wasp", x: 163, y: 87, w: 12, h: 10 }
    ]
  },
  drugStoreroom: {
    name: "Drug Storeroom",
    floorType: "wood",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "door1ToBeehivePassage", x: 292, y: 145, w: 8, h: 28, targetRoom: "beehivePassage", spawnX: 142, spawnY: 58 }
    ],
    interactables: [
      { type: "smallTable", x: 50, y: 42, w: 64, h: 58, solid: true },
      { type: "emptyBottle", x: 57, y: 52, w: 8, h: 14 },
      { type: "emptyBottle", x: 72, y: 52, w: 8, h: 14 },
      { type: "emptyBottle", x: 87, y: 52, w: 8, h: 14 },
      { type: "emptyBottle", x: 102, y: 52, w: 8, h: 14 },
      { type: "sinkTable", x: 50, y: 124, w: 58, h: 34, solid: true },
      { type: "vaseShelf", x: 154, y: 30, w: 118, h: 36, solid: true },
      { type: "vase", x: 188, y: 36, w: 12, h: 17 },
      { type: "vase", x: 226, y: 36, w: 12, h: 17 }
    ],
  },
  room003: {
    name: "Room 003",
    floorType: "carpetRed",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    walkablePolygon: [
      { x: 195, y: 10 },
      { x: 295, y: 10 },
      { x: 295, y: 180 },
      { x: 20, y: 180 },
      { x: 20, y: 125 },
      { x: 195, y: 125 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToBeehivePassage", x: 20, y: 145, w: 8, h: 28, targetRoom: "beehivePassage", spawnX: 202, spawnY: 38 },
      { id: "door2ToRoom003Bathroom", x: 72, y: 125, w: 28, h: 8, targetRoom: "room003Bathroom", spawnX: 140, spawnY: 80 },
      { id: "door3ToPlant42Room", x: 287, y: 78, w: 8, h: 28, targetRoom: "plant42Room", spawnX: 45, spawnY: 66 }
    ],
    interactables: [
      { type: "bookshelfHorizontal", x: 210, y: 22, w: 70, h: 34, solid: true },
      { type: "vJoltReport", x: 226, y: 32, w: 16, h: 12 },
      { type: "inkRibbon", x: 252, y: 34, w: 10, h: 8 },
      { type: "inkRibbon", x: 266, y: 34, w: 10, h: 8 }
    ]
  },
  room003Bathroom: {
    name: "Room 003 Bathroom",
    floorType: "chess",
    bounds: { minX: 100, maxX: 180, minY: 50, maxY: 115 },
    corridorPoly: [{ x: 100, y: 50, w: 80, h: 65 }],
    doors: [
      { id: "doorToRoom003", x: 125, y: 107, w: 28, h: 8, targetRoom: "room003", spawnX: 88, spawnY: 145 }
    ],
    interactables: [
      { type: "sinkTable", x: 105, y: 83, w: 22, h: 16, solid: true },
      { type: "shower", x: 147, y: 54, w: 25, h: 25, solid: true },
      { type: "flameRounds", x: 154, y: 62, w: 11, h: 6 },
      { type: "zombie", x: 105, y: 55, w: 12, h: 14 }
    ]
  },
  plant42Room: {
    name: "Plant 42 Room",
    floorType: "wood",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "door1ToRoom003", x: 20, y: 48, w: 8, h: 28, targetRoom: "room003", spawnX: 275, spawnY: 92 },
      { id: "door2ToBeehivePassage", x: 20, y: 132, w: 8, h: 28, targetRoom: "beehivePassage", spawnX: 260, spawnY: 130 }
    ],
    interactables: [
      { type: "helmetKey", x: 154, y: 28, w: 12, h: 8 },
      { type: "hangingPlant42", x: 98, y: 10, w: 124, h: 130 }
    ]
  },
  room002: {
    name: "Room 002",
    floorType: "carpetRed",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    walkablePolygon: [
      { x: 205, y: 10 },
      { x: 295, y: 10 },
      { x: 295, y: 180 },
      { x: 20, y: 180 },
      { x: 20, y: 125 },
      { x: 205, y: 125 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToCentralCorridorGH", x: 20, y: 145, w: 8, h: 28, targetRoom: "centralCorridorGH", spawnX: 267, spawnY: 90 },
      { id: "door2ToRoom002Bathroom", x: 72, y: 125, w: 28, h: 8, targetRoom: "room002Bathroom", spawnX: 130, spawnY: 80 },
      { id: "stairsToWaterTankEntry", x: 222, y: 20, w: 46, h: 26, targetRoom: "waterTankEntry", spawnX: 54, spawnY: 40 }
    ],
    interactables: [
      { type: "stairsVertical", x: 222, y: 20, w: 46, h: 26 },
      { type: "bedVertical", x: 255, y: 83, w: 38, h: 82, solid: true },
      { type: "plant42Report", x: 256, y: 112, w: 15, h: 11 },
      { type: "smallTable", x: 214, y: 148, w: 34, h: 26, solid: true },
      { type: "shotgunShells", x: 226, y: 155, w: 10, h: 8 }
    ]
  },
  room002Bathroom: {
    name: "Room 002 Bathroom",
    floorType: "chess",
    bounds: { minX: 100, maxX: 180, minY: 50, maxY: 115 },
    corridorPoly: [{ x: 100, y: 50, w: 80, h: 65 }],
    doors: [
      { id: "doorToRoom002", x: 125, y: 107, w: 28, h: 8, targetRoom: "room002", spawnX: 88, spawnY: 135 }
    ],
    interactables: [
      { type: "sinkTable", x: 105, y: 83, w: 22, h: 16, solid: true },
      { type: "shower", x: 147, y: 54, w: 25, h: 25, solid: true },
      { type: "handgunAmmo", x: 154, y: 62, w: 11, h: 6 },
      { type: "zombie", x: 105, y: 55, w: 12, h: 14 }
    ]
  },
  waterTankEntry: {
    name: "Water Tank Entry",
    floorType: "concrete",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    walkablePolygon: [
      { x: 20, y: 10 },
      { x: 300, y: 10 },
      { x: 300, y: 190 },
      { x: 120, y: 190 },
      { x: 120, y: 160 },
      { x: 238, y: 160 },
      { x: 238, y: 65 },
      { x: 20, y: 65 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1StairsToRoom002", x: 40, y: 10, w: 42, h: 8, targetRoom: "room002", spawnX: 235, spawnY: 55 },
      { id: "door2ToWaterTank", x: 120, y: 168, w: 28, h: 8, targetRoom: "waterTank", spawnX: 270, spawnY: 130 }
    ],
    interactables: [
      { type: "stairsVertical", x: 42, y: 20, w: 38, h: 30 },
      { type: "greenHerb", x: 210, y: 25, w: 10, h: 10 },
      { type: "waterArea", x: 274, y: 65, w: 26, h: 95, solid: true },
      { type: "waterArea", x: 140, y: 160, w: 80, h: 30 },
      { type: "waterCrate", x: 242, y: 66, w: 28, h: 30 },
      { type: "waterCrate", x: 242, y: 96, w: 28, h: 30 },
      { type: "waterCrate", x: 242, y: 126, w: 28, h: 30 }
    ],
  },
  waterTank: {
    name: "Water Tank",
    floorType: "water",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "door1ToWaterTankEntry", x: 292, y: 118, w: 8, h: 28, targetRoom: "waterTankEntry", spawnX: 150, spawnY: 168 },
      { id: "door2ToMeetingRoom", x: 292, y: 55, w: 8, h: 28, targetRoom: "meetingRoom", spawnX: 106, spawnY: 120 },
      { id: "door3ToArmsStorage", x: 20, y: 18, w: 8, h: 28, targetRoom: "armsStorage", spawnX: 210, spawnY: 95, switchRequired: "armsStorageUnlocked" },
      { id: "door4ToControlRoomB1", x: 20, y: 78, w: 8, h: 28, targetRoom: "controlRoomB1", spawnX: 190, spawnY: 95 }
    ],
    interactables: [
      { type: "brokenGlassTank", x: 110, y: 66, w: 100, h: 80, solid: true },
      { type: "neptune", x: 142, y: 34, w: 30, h: 20 },
      { type: "neptune", x: 42, y: 90, w: 16, h: 11 },
      { type: "neptune", x: 165, y: 160, w: 16, h: 11 }
    ]
  },
  meetingRoom: {
    name: "Meeting Room",
    floorType: "water",
    bounds: { minX: 90, maxX: 230, minY: 45, maxY: 155 },
    corridorPoly: [{ x: 90, y: 45, w: 140, h: 110 }],
    doors: [
      { id: "door1ToWaterTank", x: 90, y: 111, w: 8, h: 28, targetRoom: "waterTank", spawnX: 272, spawnY: 70 }
    ],
    interactables: [
      { type: "plant42Roots", x: 145, y: 61, w: 52, h: 40 },
      { type: "smallTable", x: 124, y: 104, w: 72, h: 25, solid: true },
      { type: "bench", x: 131, y: 136, w: 20, h: 12, solid: true },
      { type: "bench", x: 170, y: 136, w: 20, h: 12, solid: true }
    ],
  },
  armsStorage: {
    name: "Arms Storage",
    floorType: "water",
    bounds: { minX: 80, maxX: 240, minY: 45, maxY: 155 },
    corridorPoly: [{ x: 80, y: 45, w: 160, h: 110 }],
    doors: [
      { id: "door1ToWaterTank", x: 232, y: 82, w: 8, h: 28, targetRoom: "waterTank", spawnX: 40, spawnY: 30 }
    ],
    interactables: [
      { type: "armsShelf", x: 112, y: 55, w: 100, h: 30, solid: true },
      { type: "handgunAmmo", x: 122, y: 74, w: 10, h: 6 },
      { type: "handgunAmmo", x: 143, y: 74, w: 10, h: 6 },
      { type: "shotgunShells", x: 164, y: 73, w: 10, h: 8 },
      { type: "shotgunShells", x: 183, y: 73, w: 10, h: 8 },
      { type: "room003Key", x: 199, y: 72, w: 12, h: 8 }
    ],
  },
  controlRoomB1: {
    name: "Control Room B1",
    floorType: "water",
    bounds: { minX: 80, maxX: 240, minY: 45, maxY: 155 },
    corridorPoly: [{ x: 80, y: 45, w: 160, h: 110 }],
    doors: [
      { id: "door1ToWaterTank", x: 232, y: 78, w: 8, h: 28, targetRoom: "waterTank", spawnX: 40, spawnY: 90 }
    ],
    interactables: [
      { type: "waterDrainSwitch", x: 94, y: 130, w: 18, h: 18 },
      { type: "armsStorageSwitch", x: 151, y: 49, w: 18, h: 18 }
    ],
  },
  guardhouseSaveRoom: {
    name: "Guardhouse Save Room",
    floorType: "wood",
    bounds: { minX: 80, maxX: 240, minY: 45, maxY: 155 },
    corridorPoly: [{ x: 80, y: 45, w: 160, h: 110 }],
    doors: [
      { id: "doorToGuardhouseEntry", x: 140, y: 45, w: 28, h: 8, targetRoom: "guardhouseEntry", spawnX: 146, spawnY: 80 }
    ],
    interactables: [
      { type: "itemChest", x: 96, y: 75, w: 36, h: 22, solid: true },
      { type: "typewriter", x: 181, y: 64, w: 26, h: 20, solid: true },
      { type: "explosiveRounds", x: 184, y: 108, w: 10, h: 8 },
      { type: "firstAidSpray", x: 122, y: 119, w: 8, h: 8 }
    ]
  },
  room001: {
    name: "Room 001",
    floorType: "carpetRed",
    bounds: { minX: 30, maxX: 290, minY: 15, maxY: 190 },
    walkablePolygon: [
      { x: 30, y: 15 },
      { x: 290, y: 15 },
      { x: 290, y: 185 },
      { x: 220, y: 185 },
      { x: 220, y: 105 },
      { x: 30, y: 105 }
    ],
    constrainToWalkablePolygon: true,
    doors: [
      { id: "door1ToGuardhouseEntry", x: 236, y: 177, w: 28, h: 8, targetRoom: "guardhouseEntry", spawnX: 170, spawnY: 75 },
      { id: "door2ToRoom001Bathroom", x: 220, y: 124, w: 8, h: 28, targetRoom: "room001Bathroom", spawnX: 122, spawnY: 94 }
    ],
    interactables: [
      { type: "shelfVertical", x: 40, y: 27, w: 30, h: 78, solid: true },
      { type: "bed", x: 150, y: 34, w: 130, h: 36, solid: true },
      { type: "blankBook", x: 220, y: 58, w: 12, h: 9 },
      { type: "smallTable", x: 252, y: 76, w: 24, h: 18, solid: true }
    ]
  },
  room001Bathroom: {
    name: "Room 001 Bathroom",
    floorType: "chess",
    bounds: { minX: 112, maxX: 184, minY: 62, maxY: 118 },
    corridorPoly: [{ x: 112, y: 62, w: 72, h: 56 }],
    doors: [
      { id: "doorToRoom001", x: 112, y: 82, w: 8, h: 28, targetRoom: "room001", spawnX: 232, spawnY: 137 }
    ],
    interactables: [
      { type: "shower", x: 118, y: 66, w: 22, h: 18, solid: true },
      { type: "controlRoomKey", x: 124, y: 70, w: 10, h: 8 },
      { type: "toilet", x: 146, y: 66, w: 12, h: 14, solid: true },
      { type: "sinkTable", x: 164, y: 66, w: 18, h: 14, solid: true }
    ],
  },
  recRoom: {
    name: "Rec Room",
    floorType: "wood",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "door1ToGuardhouseEntry", x: 20, y: 116, w: 8, h: 28, targetRoom: "guardhouseEntry", spawnX: 265, spawnY: 78 }
    ],
    interactables: [
      { type: "poolTable", x: 68, y: 47, w: 112, h: 58, solid: true },
      { type: "inkRibbon", x: 118, y: 39, w: 10, h: 8 },
      { type: "spider", x: 205, y: 48, w: 24, h: 22 },
      { type: "spider", x: 157, y: 137, w: 24, h: 22 },
      { type: "barCounter", x: 258, y: 22, w: 30, h: 156, solid: true }
    ]
  },
  mainHall2F: {
    name: "Main Hall 2F",
    floorType: "secondFloor",
    bounds: { minX: 18, maxX: 302, minY: 20, maxY: 172 },
    corridorPoly: [{ x: 18, y: 20, w: 284, h: 152 }],
    walls: [
      { x: 55, y: 50, w: 90, h: 32 },
      { x: 205, y: 50, w: 70, h: 32 },
      { x: 55, y: 78, w: 220, h: 24 },
      { x: 50, y: 120, w: 220, h: 52 }
    ],
    doors: [
      { id: "stairsToMainHall", x: 135, y: 16, w: 50, h: 10, targetRoom: "mainHall", spawnX: 155, spawnY: 112 },
      { id: "p1DiningRoom2F", x: 12, y: 68, w: 12, h: 38, targetRoom: "diningRoom2F", spawnX: 270, spawnY: 100 },
      { id: "p2CPassage", x: 296, y: 34, w: 12, h: 36, targetRoom: "cPassage", spawnX: 55, spawnY: 155 },
      { id: "p3TerraceEntry", x: 296, y: 130, w: 12, h: 36, targetRoom: "terraceEntry", spawnX: 132, spawnY: 150 }
    ],
    interactables: [
      { type: "lowerFloorView", x: 55, y: 50, w: 90, h: 32, solid: true, railings: true },
      { type: "lowerFloorView", x: 205, y: 50, w: 70, h: 32, solid: true, railings: true },
      { type: "lowerFloorView", x: 55, y: 78, w: 220, h: 24, solid: true, railings: true },
      { type: "lowerFloorView", x: 50, y: 120, w: 220, h: 52, solid: true, railings: true },
      { type: "stairsHorizontal", x: 135, y: 20, w: 50, h: 30 }
    ]
  },
  diningRoom2F: {
    name: "Dining Room 2F",
    floorType: "secondFloor",
    bounds: { minX: 18, maxX: 302, minY: 12, maxY: 184 },
    corridorPoly: [{ x: 18, y: 12, w: 284, h: 172 }],
    walls: [{ x: 50, y: 45, w: 220, h: 95 }],
    doors: [
      { id: "p1ToMainHall2F", x: 290, y: 76, w: 12, h: 38, targetRoom: "mainHall2F", spawnX: 270, spawnY: 100 },
      { id: "pToWestStairway2F", x: 18, y: 23, w: 12, h: 30, targetRoom: "westStairway2F", spawnX: 240, spawnY: 158 }
    ],
    interactables: [
      { type: "lowerFloorView", x: 50, y: 45, w: 220, h: 95, solid: true },
      { type: "lowerFloorTable", x: 92, y: 76, w: 136, h: 34 },
      { type: "zombie", x: 255, y: 22, w: 12, h: 14 },
      { type: "zombie", x: 25, y: 160, w: 12, h: 14 },
      { type: "pushableStatue", x: 145, y: 150, w: 28, h: 30, solid: true, fallToRoom: "diningRoom", reward: "blueJewel" }
    ]
  },
  cPassage: {
    name: "C Passage",
    floorType: "wood",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [
      { x: 50, y: 10, w: 250, h: 45 },
      { x: 255, y: 55, w: 45, h: 90 },
      { x: 20, y: 145, w: 280, h: 40 }
    ],
    walls: [
      { x: 20, y: 10, w: 30, h: 45 },
      { x: 20, y: 55, w: 235, h: 90 }
    ],
    doors: [
      { id: "door1ToMainHall2F", x: 46, y: 175, w: 28, h: 10, targetRoom: "mainHall2F", spawnX: 278, spawnY: 70 },
      { id: "door2ToPillarPassage", x: 132, y: 175, w: 30, h: 10, targetRoom: "pillarPassage", spawnX: 45, spawnY: 34, keyRequired: "armorKey", lockId: "pillar-passage-armor" },
      { id: "door3ToArmorRoom", x: 255, y: 84, w: 10, h: 28, targetRoom: "armorRoom", spawnX: 225, spawnY: 90, keyRequired: "armorKey", lockId: "armor-room-armor" },
      { id: "door4ToEastStairway2F", x: 182, y: 10, w: 30, h: 10, targetRoom: "eastStairway2F", spawnX: 150, spawnY: 72, lockId: "east-stairs-c-passage", unlockFromSide: "eastStairway2F" },
      { id: "door5ToSmallLibrary", x: 62, y: 10, w: 30, h: 10, targetRoom: "smallLibrary", spawnX: 140, spawnY: 130 }
    ],
    interactables: [
      { type: "zombie", x: 118, y: 25, w: 12, h: 14 },
      { type: "zombie", x: 205, y: 158, w: 12, h: 14 }
    ]
  },
  terraceEntry: {
    name: "Terrace Entry",
    floorType: "wood",
    bounds: { minX: 120, maxX: 200, minY: 12, maxY: 188 },
    corridorPoly: [{ x: 120, y: 12, w: 80, h: 176 }],
    doors: [
      { id: "p3ToMainHall2F", x: 120, y: 160, w: 10, h: 26, targetRoom: "mainHall2F", spawnX: 270, spawnY: 145 },
      { id: "doorToTerrace", x: 190, y: 38, w: 10, h: 28, targetRoom: "terrace", spawnX: 220, spawnY: 50 }
    ],
    interactables: []
  },
  terrace: {
    name: "Terrace",
    floorType: "concrete",
    bounds: { minX: 20, maxX: 280, minY: 10, maxY: 190 },
    corridorPoly: [
      { x: 20, y: 10, w: 260, h: 90 },
      { x: 200, y: 100, w: 80, h: 90 }
    ],
    doors: [{ id: "doorToTerraceEntry", x: 20, y: 50, w: 10, h: 28, targetRoom: "terraceEntry", spawnX: 160, spawnY: 56 }],
    interactables: [
      { type: "terraceGarden", x: 20, y: 100, w: 180, h: 88, solid: true },
      { type: "terraceSeat", x: 162, y: 30, w: 14, h: 14, solid: true },
      { type: "crow", x: 226, y: 70, w: 10, h: 10 },
      { type: "crow", x: 238, y: 126, w: 10, h: 10 },
      { type: "spencerBody", x: 232, y: 158, w: 20, h: 12 },
      { type: "bazooka", x: 258, y: 160, w: 20, h: 6 }
    ]
  },
  westStairway2F: {
    name: "West Stairway 2F",
    floorType: "wood",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 184 },
    corridorPoly: [
      { x: 210, y: 10, w: 90, h: 65 },
      { x: 80, y: 65, w: 220, h: 27 },
      { x: 20, y: 65, w: 85, h: 85 },
      { x: 20, y: 150, w: 280, h: 34 },
      { x: 220, y: 124, w: 80, h: 60 }
    ],
    walls: [
      { x: 20, y: 10, w: 190, h: 55 },
      { x: 86, y: 146, w: 210, h: 4 }
    ],
    doors: [
      { id: "bottomToDiningRoom2F", x: 218, y: 174, w: 42, h: 10, targetRoom: "diningRoom2F", spawnX: 34, spawnY: 38 },
      { id: "stairsToWestStairway1F", x: 86, y: 96, w: 42, h: 16, targetRoom: "westStairway1F", spawnX: 160, spawnY: 140 },
      { id: "sideDoorToTrophyRoom", x: 210, y: 36, w: 12, h: 28, targetRoom: "trophyRoom", spawnX: 264, spawnY: 132, keyRequired: "helmetKey", lockId: "trophy-room-helmet" },
      { id: "topToRoughPassage", x: 248, y: 10, w: 36, h: 12, targetRoom: "roughPassage", spawnX: 92, spawnY: 34, fileRequired: "passNumber", lockId: "rough-passage-pass-number" }
    ],
    interactables: [
      { type: "stairwell", x: 86, y: 112, w: 210, h: 34, solid: true },
      { type: "zombie", x: 268, y: 34, w: 12, h: 14 },
      { type: "zombie", x: 55, y: 136, w: 12, h: 14 }
    ]
  },
  trophyRoom: {
    name: "Trophy Room",
    floorType: "wood",
    bounds: { minX: 30, maxX: 290, minY: 30, maxY: 170 },
    corridorPoly: [{ x: 30, y: 30, w: 260, h: 140 }],
    doors: [{ id: "doorToWestStairway2F", x: 280, y: 130, w: 10, h: 36, targetRoom: "westStairway2F", spawnX: 224, spawnY: 54, keyRequired: "helmetKey", lockId: "trophy-room-helmet" }],
    interactables: [
      { type: "trophySwitch", x: 260, y: 91, w: 8, h: 12 },
      { type: "taxidermyDeer", x: 142, y: 38, w: 34, h: 28, solid: true },
      { type: "redJewel", x: 143, y: 48, w: 7, h: 7, requiresDark: true },
      { type: "studyDesk", x: 82, y: 100, w: 98, h: 30, solid: true },
      { type: "windowVertical", x: 30, y: 72, w: 4, h: 36 },
      { type: "shotgunShells", x: 98, y: 123, w: 9, h: 8 },
      { type: "magnumRounds", x: 128, y: 123, w: 9, h: 8 },
      { type: "orders", x: 153, y: 122, w: 10, h: 9 }
    ]
  },
  roughPassage: {
    name: "Rough Passage",
    floorType: "wood",
    bounds: { minX: 20, maxX: 300, minY: 20, maxY: 180 },
    corridorPoly: [
      { x: 20, y: 20, w: 170, h: 42 },
      { x: 150, y: 62, w: 40, h: 55 },
      { x: 150, y: 117, w: 95, h: 35 },
      { x: 220, y: 152, w: 65, h: 28 }
    ],
    walls: [
      { x: 190, y: 20, w: 110, h: 97 },
      { x: 20, y: 62, w: 130, h: 55 },
      { x: 20, y: 117, w: 130, h: 63 },
      { x: 190, y: 62, w: 110, h: 55 },
      { x: 245, y: 117, w: 55, h: 35 },
      { x: 20, y: 152, w: 200, h: 28 }
    ],
    doors: [
      { id: "doorToWestStairway2F", x: 68, y: 20, w: 30, h: 10, targetRoom: "westStairway2F", spawnX: 250, spawnY: 45, fileRequired: "passNumber", lockId: "rough-passage-pass-number" },
      { id: "doorToElevatorStairway2F", x: 240, y: 172, w: 24, h: 8, targetRoom: "elevatorStairway2F", spawnX: 36, spawnY: 154 }
    ],
    interactables: [
      { type: "greenHerb", x: 32, y: 36, w: 10, h: 10 },
      { type: "greenHerb", x: 62, y: 36, w: 10, h: 10 },
      { type: "zombie", x: 168, y: 128, w: 12, h: 14 },
      { type: "blueHerb", x: 156, y: 34, w: 10, h: 10 },
      { type: "zombie", x: 232, y: 158, w: 12, h: 14 }
    ]
  },
  elevatorStairway2F: {
    name: "Elevator Stairway 2F",
    floorType: "carpetGreen",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [
      { x: 60, y: 10, w: 170, h: 80 },
      { x: 230, y: 10, w: 60, h: 130 },
      { x: 180, y: 80, w: 110, h: 60 },
      { x: 135, y: 140, w: 155, h: 40 },
      { x: 20, y: 140, w: 115, h: 40 },
      { x: 20, y: 180, w: 270, h: 10 }
    ],
    walls: [
      { x: 20, y: 10, w: 40, h: 130 },
      { x: 60, y: 90, w: 75, h: 50 }
    ],
    doors: [
      { id: "doorToRoughPassage", x: 20, y: 146, w: 10, h: 28, targetRoom: "roughPassage", spawnX: 250, spawnY: 154 },
      { id: "doorToCloset", x: 105, y: 180, w: 26, h: 10, targetRoom: "closet", spawnX: 118, spawnY: 90 },
      { id: "elevatorToBasement", x: 170, y: 112, w: 10, h: 28, targetRoom: "kitchen", spawnX: 215, spawnY: 145 },
      { id: "doorToLargeLibrary", x: 60, y: 42, w: 10, h: 28, targetRoom: "largeLibrary", spawnX: 260, spawnY: 50 }
    ],
    interactables: [
      { type: "elevator", x: 135, y: 95, w: 35, h: 45, solid: true },
      { type: "zombie", x: 200, y: 102, w: 12, h: 14 },
      { type: "zombie", x: 228, y: 154, w: 12, h: 14 },
      { type: "zombie", x: 78, y: 154, w: 12, h: 14 }
    ]
  },
  elevatorStairwayB1: {
    name: "Elevator Stairway B1",
    floorType: "concrete",
    bounds: { minX: 40, maxX: 280, minY: 55, maxY: 135 },
    corridorPoly: [{ x: 40, y: 60, w: 240, h: 60 }],
    doors: [
      { id: "door1ToKitchen", x: 40, y: 76, w: 8, h: 28, targetRoom: "kitchen", spawnX: 43, spawnY: 30 },
      { id: "doorToElevatorStairway1F", x: 272, y: 76, w: 8, h: 28, targetRoom: "elevatorStairway", spawnX: 215, spawnY: 44 }
    ],
    interactables: [
      { type: "stairsVertical", x: 122, y: 63, w: 145, h: 54 }
    ]
  },
  kitchen: {
    name: "Kitchen",
    floorType: "chess",
    bounds: { minX: 30, maxX: 290, minY: 10, maxY: 190 },
    walkablePolygon: [
      { x: 30, y: 10 },
      { x: 70, y: 10 },
      { x: 70, y: 60 },
      { x: 290, y: 60 },
      { x: 290, y: 185 },
      { x: 30, y: 185 }
    ],
    walls: [{ x: 70, y: 10, w: 220, h: 50 }],
    doors: [
      { id: "door1ToElevatorStairwayB1", x: 30, y: 24, w: 8, h: 28, targetRoom: "elevatorStairwayB1", spawnX: 55, spawnY: 82 },
      { id: "door2ToUndergroundPassage2", x: 40, y: 182, w: 28, h: 8, targetRoom: "undergroundPassage2", spawnX: 100, spawnY: 160, lockId: "kitchen-underground-passage-2", unlockFromSide: "undergroundPassage2" },
      { id: "doorToElevatorStairway2F", x: 236, y: 138, w: 30, h: 8, targetRoom: "elevatorStairway2F", spawnX: 180, spawnY: 145 }
    ],
    interactables: [
      { type: "stainlessCounter", x: 82, y: 64, w: 128, h: 18, solid: true },
      { type: "stainlessCounter", x: 102, y: 112, w: 72, h: 28, solid: true },
      { type: "elevator", x: 236, y: 76, w: 30, h: 62, solid: true },
      { type: "zombie", x: 190, y: 96, w: 12, h: 14 },
      { type: "zombie", x: 164, y: 160, w: 12, h: 14 }
    ]
  },
  undergroundPassage2: {
    name: "Underground Passage 2",
    floorType: "concrete",
    constrainToWalkablePolygon: true,
    bounds: { minX: 30, maxX: 290, minY: 10, maxY: 185 },
    walkablePolygon: [
      { x: 30, y: 143 },
      { x: 140, y: 143 },
      { x: 143, y: 20 },
      { x: 290, y: 20 },
      { x: 287, y: 58 },
      { x: 201, y: 58 },
      { x: 195, y: 140 },
      { x: 288, y: 140 },
      { x: 290, y: 180 },
      { x: 30, y: 180 }
    ],
    doors: [
      { id: "door1ToKitchen", x: 38, y: 176, w: 30, h: 8, targetRoom: "kitchen", spawnX: 52, spawnY: 168, lockId: "kitchen-underground-passage-2", unlockFromSide: "undergroundPassage2" },
      { id: "door2ToUndergroundPassage1", x: 254, y: 16, w: 30, h: 8, targetRoom: "undergroundPassage1", spawnX: 45, spawnY: 140 }
    ],
    interactables: [
      { type: "zombie", x: 153, y: 157, w: 12, h: 14 },
      { type: "zombie", x: 164, y: 76, w: 12, h: 14 },
      { type: "greenHerb", x: 250, y: 157, w: 10, h: 10 },
      { type: "greenHerb", x: 270, y: 157, w: 10, h: 10 }
    ]
  },
  undergroundPassage1: {
    name: "Underground Passage 1",
    floorType: "concrete",
    bounds: { minX: 30, maxX: 290, minY: 10, maxY: 185 },
    constrainToWalkablePolygon: true,
    walkablePolygon: [
      { x: 30, y: 127 },
      { x: 190, y: 130 },
      { x: 195, y: 13 },
      { x: 290, y: 10 },
      { x: 290, y: 58 },
      { x: 247, y: 58 },
      { x: 240, y: 128 },
      { x: 290, y: 130 },
      { x: 285, y: 180 },
      { x: 30, y: 182 }
    ],
    doors: [
      { id: "door1ToUndergroundPassage2", x: 26, y: 140, w: 8, h: 28, targetRoom: "undergroundPassage2", spawnX: 270, spawnY: 38 }
    ],
    interactables: [
      { type: "zombie", x: 250, y: 22, w: 12, h: 14 },
      { type: "zombie", x: 267, y: 38, w: 12, h: 14 },
      { type: "shotgunShells", x: 278, y: 16, w: 10, h: 8 }
    ]
  },
  closet: {
    name: "Closet",
    floorType: "wood",
    bounds: { minX: 100, maxX: 220, minY: 50, maxY: 150 },
    corridorPoly: [{ x: 100, y: 50, w: 120, h: 100 }],
    doors: [{ id: "doorToElevatorStairway2F", x: 140, y: 142, w: 30, h: 8, targetRoom: "elevatorStairway2F", spawnX: 118, spawnY: 160 }],
    interactables: [
      { type: "shelf", x: 120, y: 60, w: 76, h: 18, solid: true },
      { type: "acidRounds", x: 112, y: 108, w: 10, h: 10 },
      { type: "carBattery", x: 184, y: 112, w: 16, h: 12 }
    ]
  },
  largeLibrary: {
    name: "Large Library",
    floorType: "wood",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 180 },
    corridorPoly: [
      { x: 20, y: 10, w: 280, h: 90 },
      { x: 20, y: 100, w: 180, h: 80 }
    ],
    walls: [{ x: 200, y: 100, w: 100, h: 80 }],
    doors: [
      { id: "doorToElevatorStairway2F", x: 290, y: 48, w: 10, h: 28, targetRoom: "elevatorStairway2F", spawnX: 75, spawnY: 52 },
      { id: "doorToHeliportLookout", x: 78, y: 10, w: 30, h: 10, targetRoom: "heliportLookout", spawnX: 100, spawnY: 100 },
      { id: "doorToPrivateLibrary", x: 20, y: 128, w: 10, h: 28, targetRoom: "privateLibrary", spawnX: 190, spawnY: 75 }
    ],
    interactables: [
      { type: "shelf", x: 48, y: 28, w: 82, h: 16, solid: true },
      { type: "shelf", x: 168, y: 28, w: 82, h: 16, solid: true },
      { type: "shelfVertical", x: 58, y: 106, w: 18, h: 56, solid: true },
      { type: "shelfVertical", x: 132, y: 106, w: 18, h: 56, solid: true },
      { type: "zombie", x: 188, y: 66, w: 12, h: 14 },
      { type: "zombie", x: 95, y: 142, w: 12, h: 14 },
      { type: "magnumRounds", x: 226, y: 78, w: 9, h: 8 },
      { type: "scrapbook", x: 164, y: 72, w: 12, h: 10 },
      { type: "zombie", x: 95, y: 142, w: 12, h: 14 }
    ]
  },
  heliportLookout: {
    name: "Heliport Lookout",
    floorType: "wood",
    bounds: { minX: 85, maxX: 235, minY: 35, maxY: 155 },
    corridorPoly: [{ x: 85, y: 35, w: 150, h: 120 }],
    doors: [
      { id: "doorToLargeLibrary", x: 145, y: 147, w: 30, h: 8, targetRoom: "largeLibrary", spawnX: 142, spawnY: 50 }
    ],
    interactables: [
      { type: "windowVertical", x: 85, y: 48, w: 6, h: 36 },
      { type: "desk", x: 120, y: 58, w: 85, h: 46, solid: true },
      { type: "handgunAmmo", x: 142, y: 98, w: 10, h: 6 },
      { type: "inkRibbon", x: 174, y: 97, w: 10, h: 8 },
      { type: "carBattery", x: 211, y: 119, w: 16, h: 12 }
    ]
  },
  heliport: {
    name: "Heliport",
    floorType: "concrete",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 20, y: 10, w: 280, h: 180 }],
    doors: [
      { id: "elevatorToEmergencyTunnel", x: 292, y: 20, w: 8, h: 28, targetRoom: "emergencyTunnel", spawnX: 56, spawnY: 24 }
    ],
    interactables: [
      { type: "elevator", x: 258, y: 20, w: 30, h: 28, solid: false },
      { type: "flare", x: 238, y: 27, w: 8, h: 14 },
      { type: "helicopterShadow", x: 106, y: 57, w: 108, h: 76 },
      { type: "tyrant", x: 238, y: 113, w: 34, h: 55 },
      { type: "rocketLauncher", x: 94, y: 151, w: 30, h: 10 }
    ]
  },
  privateLibrary: {
    name: "Private Library",
    floorType: "wood",
    bounds: { minX: 70, maxX: 250, minY: 35, maxY: 165 },
    corridorPoly: [{ x: 70, y: 35, w: 180, h: 130 }],
    doors: [{ id: "doorToLargeLibrary", x: 240, y: 88, w: 10, h: 28, targetRoom: "largeLibrary", spawnX: 34, spawnY: 138 }],
    interactables: [
      { type: "shelf", x: 100, y: 48, w: 105, h: 16, solid: true },
      { type: "shelfVertical", x: 82, y: 72, w: 18, h: 58, solid: true },
      { type: "pushableStatue", x: 146, y: 94, w: 26, h: 28, solid: true },
      { type: "moDisk", x: 198, y: 136, w: 10, h: 8 }
    ]
  },
  pillarPassage: {
    name: "Pillar Passage",
    floorType: "wood",
    bounds: { minX: 20, maxX: 300, minY: 10, maxY: 190 },
    walkablePolygon: [
      { x: 20, y: 10 },
      { x: 100, y: 10 },
      { x: 100, y: 72 },
      { x: 160, y: 72 },
      { x: 160, y: 110 },
      { x: 300, y: 110 },
      { x: 300, y: 190 },
      { x: 35, y: 190 },
      { x: 35, y: 127 },
      { x: 20, y: 127 }
    ],
    walls: [
      { x: 110, y: 10, w: 190, h: 62 },
      { x: 20, y: 72, w: 70, h: 38 },
      { x: 20, y: 127, w: 15, h: 63 }
    ],
    doors: [
      { id: "door1ToCPassage", x: 42, y: 10, w: 26, h: 10, targetRoom: "cPassage", spawnX: 145, spawnY: 155, keyRequired: "armorKey", lockId: "pillar-passage-armor" },
      { id: "door2ToAtticEntry", x: 290, y: 132, w: 10, h: 28, targetRoom: "atticEntry", spawnX: 65, spawnY: 145 }
    ],
    interactables: [
      { type: "pillar", x: 92, y: 130, w: 30, h: 28, solid: true },
      { type: "greenHerb", x: 166, y: 118, w: 10, h: 10 },
      { type: "richardBody", x: 210, y: 145, w: 24, h: 14 },
      { type: "radio", x: 235, y: 139, w: 10, h: 10 },
      { type: "handgunAmmo", x: 245, y: 159, w: 10, h: 6 }
    ]
  },
  atticEntry: {
    name: "Attic Entry",
    floorType: "wood",
    bounds: { minX: 45, maxX: 250, minY: 15, maxY: 180 },
    walkablePolygon: [
      { x: 55, y: 115 },
      { x: 125, y: 115 },
      { x: 125, y: 15 },
      { x: 185, y: 15 },
      { x: 185, y: 115 },
      { x: 240, y: 115 },
      { x: 240, y: 175 },
      { x: 55, y: 175 }
    ],
    walls: [
      { x: 45, y: 115, w: 10, h: 60 },
      { x: 55, y: 15, w: 70, h: 100 },
      { x: 185, y: 15, w: 55, h: 100 },
      { x: 240, y: 115, w: 10, h: 60 }
    ],
    doors: [
      { id: "door1ToPillarPassage", x: 55, y: 132, w: 8, h: 26, targetRoom: "pillarPassage", spawnX: 270, spawnY: 140 },
      { id: "door2ToSmallDiningRoom", x: 140, y: 15, w: 28, h: 8, targetRoom: "smallDiningRoom", spawnX: 215, spawnY: 45 },
      { id: "door3ToAttic", x: 232, y: 132, w: 8, h: 26, targetRoom: "attic", spawnX: 108, spawnY: 155, keyRequired: "shieldKey", lockId: "attic-shield-key" }
    ],
    interactables: [
      { type: "stairsVertical", x: 193, y: 126, w: 34, h: 32 }
    ]
  },
  smallDiningRoom: {
    name: "Small Dining Room",
    floorType: "wood",
    bounds: { minX: 50, maxX: 250, minY: 15, maxY: 185 },
    walkablePolygon: [
      { x: 50, y: 15 },
      { x: 240, y: 15 },
      { x: 240, y: 185 },
      { x: 120, y: 185 },
      { x: 120, y: 125 },
      { x: 50, y: 125 }
    ],
    walls: [{ x: 50, y: 125, w: 70, h: 60 }],
    doors: [{ id: "doorToAtticEntry", x: 232, y: 38, w: 8, h: 26, targetRoom: "atticEntry", spawnX: 150, spawnY: 38 }],
    interactables: [
      { type: "livingTable", x: 132, y: 78, w: 56, h: 30, solid: true },
      { type: "mirror", x: 67, y: 38, w: 6, h: 30, solid: true },
      { type: "acidRounds", x: 194, y: 112, w: 10, h: 10 },
      { type: "handgunAmmo", x: 90, y: 94, w: 10, h: 6 },
      { type: "inkRibbon", x: 188, y: 151, w: 10, h: 8 }
    ]
  },
  attic: {
    name: "Attic",
    floorType: "wood",
    bounds: { minX: 95, maxX: 225, minY: 10, maxY: 190 },
    corridorPoly: [{ x: 95, y: 10, w: 130, h: 180 }],
    doors: [{ id: "doorToAtticEntry", x: 98, y: 182, w: 28, h: 8, targetRoom: "atticEntry", spawnX: 220, spawnY: 145, keyRequired: "shieldKey", lockId: "attic-shield-key" }],
    interactables: [
      { type: "yawnChimney", x: 136, y: 14, w: 44, h: 24, linkedRoom: "lessonRoom" },
      { type: "yawn", x: 136, y: 12, w: 44, h: 32, encounter: "atticFirst", phase: "dormant", revealed: false },
      { type: "pillar", x: 149, y: 86, w: 28, h: 32, solid: true },
      { type: "moonCrest", x: 112, y: 133, w: 12, h: 12, revealed: false },
      { type: "shotgunShells", x: 182, y: 146, w: 12, h: 9 }
    ]
  },
  armorRoom: {
    name: "Armor Room",
    floorType: "wood",
    bounds: { minX: 50, maxX: 250, minY: 20, maxY: 180 },
    corridorPoly: [{ x: 50, y: 20, w: 200, h: 160 }],
    doors: [{ id: "doorToCPassage", x: 242, y: 84, w: 8, h: 28, targetRoom: "cPassage", spawnX: 265, spawnY: 96, keyRequired: "armorKey", lockId: "armor-room-armor" }],
    interactables: [
      { type: "armorChest", x: 62, y: 74, w: 32, h: 44, solid: true, opened: false },
      { type: "sunCrest", x: 98, y: 102, w: 12, h: 12, revealed: false },
      { type: "armorPuzzleReset", x: 66, y: 78, w: 8, h: 7 },
      { type: "armorRoomSwitch", x: 220, y: 48, w: 14, h: 14, activated: false },
      { type: "knightStatue", x: 76, y: 38, w: 15, h: 23, solid: true },
      { type: "knightStatue", x: 119, y: 38, w: 15, h: 23, solid: true },
      { type: "knightStatue", x: 162, y: 38, w: 15, h: 23, solid: true },
      { type: "knightStatue", x: 205, y: 38, w: 15, h: 23, solid: true },
      { type: "knightStatue", x: 119, y: 137, w: 15, h: 23, solid: true },
      { type: "knightStatue", x: 162, y: 137, w: 15, h: 23, solid: true },
      { type: "knightStatue", x: 76, y: 137, w: 15, h: 23, solid: true },
      { type: "knightStatue", x: 205, y: 137, w: 15, h: 23, solid: true },
      { type: "puzzleGrate", x: 148, y: 92, w: 16, h: 20, ventId: "left" },
      { type: "puzzleGrate", x: 171, y: 92, w: 16, h: 20, ventId: "right" },
      { type: "pushableStatue", x: 112, y: 87, w: 22, h: 28, solid: true, puzzleId: "armorRoom", startX: 112, startY: 87 },
      { type: "pushableStatue", x: 197, y: 87, w: 22, h: 28, solid: true, puzzleId: "armorRoom", startX: 197, startY: 87 }
    ]
  },
  eastStairway2F: {
    name: "East Stairway 2F",
    floorType: "wood",
    bounds: { minX: 40, maxX: 280, minY: 10, maxY: 185 },
    walkablePolygon: [
      { x: 40, y: 60 },
      { x: 132, y: 60 },
      { x: 132, y: 36 },
      { x: 76, y: 36 },
      { x: 76, y: 10 },
      { x: 159, y: 10 },
      { x: 159, y: 60 },
      { x: 280, y: 63 },
      { x: 280, y: 185 },
      { x: 238, y: 185 },
      { x: 238, y: 96 },
      { x: 72, y: 96 },
      { x: 72, y: 185 },
      { x: 40, y: 185 }
    ],
    walls: [
      { x: 40, y: 10, w: 36, h: 50 },
      { x: 159, y: 10, w: 121, h: 50 },
      { x: 72, y: 96, w: 166, h: 89 }
    ],
    doors: [
      { id: "door1ToCPassage", x: 43, y: 177, w: 26, h: 8, targetRoom: "cPassage", spawnX: 195, spawnY: 34, lockId: "east-stairs-c-passage", unlockFromSide: "eastStairway2F" },
      { id: "door2ToSmallLibrary", x: 40, y: 67, w: 8, h: 28, targetRoom: "smallLibrary", spawnX: 220, spawnY: 88, lockId: "small-library-east-stairway", unlockFromSide: "smallLibrary" },
      { id: "door3ToEastStairway1F", x: 101, y: 10, w: 30, h: 8, targetRoom: "eastStairway1F", spawnX: 170, spawnY: 55 },
      { id: "door4ToDeerRoom", x: 178, y: 90, w: 30, h: 8, targetRoom: "deerRoom", spawnX: 150, spawnY: 58 },
      { id: "door5ToLessonRoomEntry", x: 244, y: 177, w: 28, h: 8, targetRoom: "lessonRoomEntry", spawnX: 190, spawnY: 48 }
    ],
    interactables: [
      { type: "stairsVisual", x: 78, y: 12, w: 78, h: 24 },
      { type: "zombie", x: 184, y: 68, w: 12, h: 14 },
      { type: "zombie", x: 250, y: 137, w: 12, h: 14 }
    ]
  },
  smallLibrary: {
    name: "Small Library",
    floorType: "carpet",
    bounds: { minX: 60, maxX: 240, minY: 35, maxY: 165 },
    corridorPoly: [{ x: 60, y: 35, w: 180, h: 130 }],
    doors: [
      { id: "doorToCPassage", x: 110, y: 157, w: 30, h: 8, targetRoom: "cPassage", spawnX: 105, spawnY: 32 },
      { id: "doorToEastStairway2F", x: 232, y: 76, w: 8, h: 28, targetRoom: "eastStairway2F", spawnX: 56, spawnY: 72, lockId: "small-library-east-stairway", unlockFromSide: "smallLibrary" }
    ],
    interactables: [
      { type: "livingTable", x: 130, y: 91, w: 50, h: 24, solid: true },
      { type: "botanyBook", x: 148, y: 76, w: 14, h: 10 }
    ]
  },
  deerRoom: {
    name: "Deer Room",
    floorType: "wood",
    bounds: { minX: 85, maxX: 225, minY: 45, maxY: 155 },
    corridorPoly: [{ x: 85, y: 45, w: 140, h: 110 }],
    doors: [
      { id: "door1ToEastStairway2F", x: 140, y: 45, w: 30, h: 8, targetRoom: "eastStairway2F", spawnX: 205, spawnY: 72 },
      { id: "door2ToBedroom", x: 85, y: 88, w: 8, h: 28, targetRoom: "bedroom", spawnX: 210, spawnY: 88 },
      { id: "door3ToStudy", x: 217, y: 88, w: 8, h: 28, targetRoom: "study", spawnX: 82, spawnY: 88 }
    ],
    interactables: [
      { type: "zombie", x: 151, y: 103, w: 12, h: 14 },
      { type: "taxidermyDeer", x: 138, y: 124, w: 34, h: 28, solid: true }
    ]
  },
  bedroom: {
    name: "Bedroom",
    floorType: "carpet",
    bounds: { minX: 70, maxX: 230, minY: 35, maxY: 165 },
    corridorPoly: [{ x: 70, y: 35, w: 160, h: 130 }],
    doors: [{ id: "doorToDeerRoom", x: 222, y: 82, w: 8, h: 28, targetRoom: "deerRoom", spawnX: 98, spawnY: 88 }],
    interactables: [
      { type: "bed", x: 78, y: 47, w: 120, h: 34, solid: true },
      { type: "smallTable", x: 77, y: 88, w: 28, h: 24, solid: true },
      { type: "lighter", x: 87, y: 78, w: 10, h: 6 },
      { type: "bed", x: 78, y: 124, w: 120, h: 34, solid: true },
      { type: "handgunAmmo", x: 132, y: 136, w: 12, h: 6 }
    ]
  },
  study: {
    name: "Study",
    floorType: "wood",
    bounds: { minX: 70, maxX: 230, minY: 35, maxY: 165 },
    corridorPoly: [{ x: 70, y: 35, w: 160, h: 130 }],
    doors: [{ id: "doorToDeerRoom", x: 70, y: 82, w: 8, h: 28, targetRoom: "deerRoom", spawnX: 195, spawnY: 88 }],
    interactables: [
      { type: "desk", x: 145, y: 128, w: 76, h: 30, solid: true },
      { type: "butterflyShelf", x: 193, y: 49, w: 28, h: 76, solid: true },
      { type: "acidRounds", x: 104, y: 67, w: 10, h: 10 },
      { type: "inkRibbon", x: 126, y: 98, w: 10, h: 8 },
      { type: "researcherWill", x: 176, y: 136, w: 14, h: 10 }
    ]
  },
  lessonRoomEntry: {
    name: "Lesson Room Entry",
    floorType: "wood",
    bounds: { minX: 70, maxX: 230, minY: 35, maxY: 165 },
    corridorPoly: [{ x: 70, y: 35, w: 160, h: 130 }],
    doors: [
      { id: "door1ToEastStairway2F", x: 190, y: 35, w: 28, h: 8, targetRoom: "eastStairway2F", spawnX: 260, spawnY: 145 },
      { id: "door2ToLessonRoom", x: 70, y: 58, w: 8, h: 28, targetRoom: "lessonRoom", spawnX: 242, spawnY: 58, keyRequired: "helmetKey", lockId: "lesson-room-helmet" }
    ],
    interactables: [
      { type: "fireplace", x: 137, y: 123, w: 42, h: 40, solid: true },
      { type: "mansionMapPicture", x: 145, y: 99, w: 26, h: 18, solid: true },
      { type: "greenHerb", x: 190, y: 130, w: 10, h: 10 }
    ]
  },
  lessonRoom: {
    name: "Lesson Room",
    floorType: "chess",
    bounds: { minX: 50, maxX: 270, minY: 20, maxY: 180 },
    corridorPoly: [{ x: 50, y: 20, w: 220, h: 160 }],
    doors: [{ id: "door1ToLessonRoomEntry", x: 262, y: 52, w: 8, h: 28, targetRoom: "lessonRoomEntry", spawnX: 82, spawnY: 64, keyRequired: "helmetKey", lockId: "lesson-room-helmet" }],
    interactables: [
      { type: "piano", x: 60, y: 38, w: 36, h: 74, solid: true, interactive: false },
      { type: "yawnChimney", x: 143, y: 14, w: 44, h: 24, linkedRoom: "attic" },
      { type: "yawn", x: 143, y: 12, w: 44, h: 32, encounter: "lessonSecond", phase: "dormant", revealed: false },
      { type: "floorHole", x: 102, y: 118, w: 26, h: 18, revealed: false, targetRoom: "isolatedPassage" }
    ]
  },
  isolatedPassage: {
    name: "Isolated Passage",
    floorType: "concrete",
    bounds: { minX: 30, maxX: 290, minY: 50, maxY: 150 },
    corridorPoly: [{ x: 30, y: 50, w: 260, h: 100 }],
    doors: [
      { id: "stairsToUndergroundPassage1", x: 258, y: 142, w: 28, h: 8, targetRoom: "undergroundPassage1", spawnX: 258, spawnY: 153, disabled: true, revealed: false, blockedMessage: "La escalera está oculta. Examiná la tumba." }
    ],
    interactables: [
      { type: "passageTomb", x: 54, y: 82, w: 24, h: 30, stairsDoorId: "stairsToUndergroundPassage1" },
      { type: "isolatedStairs", x: 258, y: 116, w: 28, h: 27, revealed: false },
      { type: "ropeReturn", x: 262, y: 76, w: 18, h: 40, targetRoom: "lessonRoom" }
    ]
  }
};
