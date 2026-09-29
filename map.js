const ROOM_MARKERS = {
  diningRoom: [108, 161],
  mainHall: [151, 206],
  dressingRoom: [88, 169],
  wardrobe: [123, 235],
  wardrobeCloset: [88, 225],
  artRoom: [231, 184],
  teaRoom: [413, 281],
  bar: [220, 165],
  centralCorridor: [550, 303],
  elevatorStairway: [452, 116],
  keepersBedroom: [493, 48],
  tigerStatueRoom: [494, 155],
  greenhouse: [665, 165],
  westStairway1F: [82, 224],
  vacantRoom: [170, 322],
  mansionSaveRoom: [151, 347],
  lPassage: [483, 225],
  windingPassage: [559, 232],
  bathroom: [600, 188],
  outsideBoiler: [685, 175],
  trapRoom: [552, 342],
  livingRoom: [552, 301],
  backPassage: [368, 371],
  eastStairway1F: [373, 283],
  mansionStoreroom: [548, 121],
  courtyardStudy: [237, 343],
  largeGallery: [249, 240],
  roofedPassage: [244, 225],
  storeroom: [633, 347]
};

const MANSION_MAP = (() => {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  const markers = document.createElementNS(NS, "g");
  const walls = document.createElementNS(NS, "g");
  const details = document.createElementNS(NS, "g");
  const visited = new Set();

  svg.setAttribute("viewBox", "0 0 768 420");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Plano del primer piso de la Mansion Spencer");

  const floor = document.createElementNS(NS, "path");
  floor.setAttribute("class", "plan-floor");
  floor.setAttribute("d", [
    "M36 113H194V127H266V211H286V287H70V238H36Z",
    "M108 287H286V370H108Z",
    "M286 263H460V415H286Z",
    "M435 43L449 31H469V20H519V71H506V97H562V136H706V209H686V386H460V263H596V209H460V178H435Z",
    "M460 209H596V263H460Z"
  ].join(" "));
  svg.appendChild(floor);

  const excludedRoom = document.createElementNS(NS, "rect");
  excludedRoom.setAttribute("class", "plan-excluded");
  excludedRoom.setAttribute("x", "519");
  excludedRoom.setAttribute("y", "280");
  excludedRoom.setAttribute("width", "67");
  excludedRoom.setAttribute("height", "47");
  svg.appendChild(excludedRoom);

  Object.entries(ROOM_MARKERS).forEach(([roomId, [x, y]]) => {
    if (!ROOMS[roomId]) return;
    const group = document.createElementNS(NS, "g");
    group.setAttribute("class", "map-marker");
    group.setAttribute("data-room", roomId);

    const title = document.createElementNS(NS, "title");
    title.textContent = ROOMS[roomId].name;
    group.appendChild(title);

    const dot = document.createElementNS(NS, "circle");
    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y);
    dot.setAttribute("r", "3");
    group.appendChild(dot);
    markers.appendChild(group);
  });

  const wallPath = document.createElementNS(NS, "path");
  wallPath.setAttribute("class", "plan-walls");
  wallPath.setAttribute("d", [
    "M36 113H194V127H266V211H286V287H70V238H36Z M108 287H286V370H108Z",
    "M286 263H460V415H286Z",
    "M435 43L449 31H469V20H519V71H506V97H562V136H706V209H686V386H460V263H596V209H460V178H435Z",
    "M75 143H143V262M75 143V216M104 186V262M142 122V262",
    "M194 147H248V211H266M224 211V262M104 262H266",
    "M320 263V296H354V335H393V296H427V263M320 296H354M393 296H427",
    "M460 71H506V141H460M506 97V179M562 136V209M625 136V209M596 209V263M651 156V209",
    "M460 263H686M519 280H586V326H651V358M519 327V358M586 263V358M651 209V386"
  ].join(" "));
  walls.appendChild(wallPath);

  const doors = [
    [139, 122, 6, 12], [122, 140, 12, 6], [139, 202, 6, 12],
    [80, 182, 13, 6], [147, 258, 12, 6], [238, 151, 7, 13],
    [227, 258, 12, 6], [284, 321, 6, 12], [130, 284, 12, 6],
    [241, 272, 6, 12], [456, 148, 6, 12], [466, 37, 6, 13],
    [489, 175, 12, 6], [510, 175, 12, 6], [539, 188, 6, 12],
    [574, 188, 6, 12], [598, 204, 12, 6], [638, 187, 12, 6],
    [681, 194, 6, 12], [662, 229, 12, 6], [583, 266, 6, 12],
    [456, 300, 6, 12], [601, 322, 12, 6], [542, 365, 6, 12]
  ];
  doors.forEach(([x, y, width, height]) => {
    const door = document.createElementNS(NS, "rect");
    door.setAttribute("class", "plan-door");
    door.setAttribute("x", x);
    door.setAttribute("y", y);
    door.setAttribute("width", width);
    door.setAttribute("height", height);
    details.appendChild(door);
  });

  const staircases = [
    [58, 216, 110, 238, "vertical"],
    [226, 211, 286, 233, "vertical"],
    [321, 263, 426, 296, "vertical"],
    [355, 298, 392, 334, "horizontal"]
  ];
  staircases.forEach(([left, top, right, bottom, direction]) => {
    for (let offset = 4; direction === "vertical" ? left + offset < right : top + offset < bottom; offset += 5) {
      const line = document.createElementNS(NS, "line");
      line.setAttribute("class", "plan-stair");
      if (direction === "vertical") {
        line.setAttribute("x1", left + offset);
        line.setAttribute("y1", top);
        line.setAttribute("x2", left + offset);
        line.setAttribute("y2", bottom);
      } else {
        line.setAttribute("x1", left);
        line.setAttribute("y1", top + offset);
        line.setAttribute("x2", right);
        line.setAttribute("y2", top + offset);
      }
      details.appendChild(line);
    }
  });

  svg.append(walls, details, markers);
  document.getElementById("mansion-map").appendChild(svg);

  function setCurrentRoom(roomId) {
    visited.add(roomId);
    markers.querySelectorAll(".map-marker").forEach((marker) => {
      const id = marker.getAttribute("data-room");
      marker.classList.toggle("current", id === roomId);
      marker.classList.toggle("visited", visited.has(id) && id !== roomId);
    });
    document.getElementById("map-current").textContent = ROOMS[roomId].name;
  }

  const panel = document.getElementById("map-panel");
  const toggleButton = document.getElementById("map-toggle");
  const closeButton = document.getElementById("map-close");

  function setOpen(isOpen) {
    panel.hidden = !isOpen;
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) closeButton.focus();
    else toggleButton.focus();
  }

  toggleButton.addEventListener("click", () => setOpen(panel.hidden));
  closeButton.addEventListener("click", () => setOpen(false));

  setCurrentRoom("mainHall");
  return {
    setCurrentRoom,
    toggle() {
      setOpen(panel.hidden);
    }
  };
})();
