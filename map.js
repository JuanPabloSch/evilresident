const MANSION_1F_MARKERS = {
  mainHall: [50.2, 86.0],
  diningRoom: [23.9, 77.6],
  teaRoom: [19.1, 62.9],
  bar: [25.2, 51.1],
  elevatorStairway: [36.4, 57.6],
  centralCorridor: [17.8, 40.2],
  keepersBedroom: [15.1, 57.6],
  vacantRoom: [14.7, 35.2],
  mansionSaveRoom: [9.9, 35.2],
  westStairway1F: [4.0, 39.3],
  tigerStatueRoom: [21.7, 34.6],
  greenhouse: [29.2, 36.8],
  artRoom: [70.6, 86.6],
  lPassage: [89.0, 86.9],
  wardrobeCloset: [86.6, 77.9],
  wardrobe: [87.1, 66.7],
  livingRoom: [87.7, 54.8],
  largeGallery: [80.5, 53.3],
  dressingRoom: [68.6, 72.0],
  trapRoom: [82.5, 42.4],
  bathroom: [91.7, 38.6],
  windingPassage: [94.1, 47.0],
  outsideBoiler: [97.4, 30.5],
  backPassage: [69.9, 43.3],
  mansionStoreroom: [76.7, 36.4],
  eastStairway1F: [72.2, 27.1],
  courtyardStudy: [68.0, 35.2],
  roofedPassage: [61.6, 19.0],
  storeroom: [69.1, 7.8],
  isolatedPassage: [76.7, 57.3]
};

const MANSION_MAP = (() => {
  const panel = document.getElementById("map-panel");
  const toggleButton = document.getElementById("map-toggle");
  const closeButton = document.getElementById("map-close");
  const title = document.getElementById("map-title");
  const current = document.getElementById("map-current");
  const frame = document.getElementById("mansion-map");
  const image = document.getElementById("mansion-map-image");
  const marker = document.getElementById("map-location");
  const unavailable = document.getElementById("map-unavailable");

  function setCurrentRoom(roomId) {
    const room = ROOMS[roomId];
    if (!room) return;
    const position = MANSION_1F_MARKERS[roomId];
    const hasMap = Boolean(position);

    current.textContent = room.name;
    title.textContent = hasMap
      ? "Mansion Spencer · 1F"
      : room.level ? `Mansion Spencer · ${room.level}` : "Mapa no disponible";
    frame.hidden = !hasMap;
    unavailable.hidden = hasMap;
    marker.hidden = !hasMap;

    if (hasMap) {
      marker.style.left = `${position[0]}%`;
      marker.style.top = `${position[1]}%`;
      marker.setAttribute("aria-label", `Ubicación actual: ${room.name}`);
      image.alt = "Plano del primer piso de la mansión";
    } else {
      unavailable.textContent = `Todavía no hay un plano cargado para ${room.level || "este piso"}.`;
    }
  }

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
