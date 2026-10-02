const STATUS_ITEMS = {
  handgun: "Berreta",
  handgunAmmo: "Munición de pistola",
  shotgunShells: "Cartuchos de escopeta",
  magnumRounds: "Munición Magnum",
  inkRibbon: "Cinta de tinta",
  greenHerb: "Hierba verde",
  redHerb: "Hierba roja",
  blueHerb: "Hierba azul",
  firstAidSpray: "Aerosol de primeros auxilios",
  armorKey: "Llave de la armadura",
  helmetKey: "Helmet Key",
  shieldKey: "Shield Key",
  lockpick: "Lockpick",
  rope: "Rope",
  controlRoomKey: "Control Room Key",
  powerRoomKey: "Power Room Key",
  masterKey: "Master Key",
  mansionEmblem: "Emblem",
  goldEmblem: "Gold Emblem",
  combatKnife: "Cuchillo de supervivencia",
  shotgunWall: "Escopeta",
  brokenShotgun: "Escopeta rota",
  colt: "Colt Python",
  grenadeLauncher: "Lanzagranadas",
  bazooka: "Bazooka",
  securitySystem: "Security System",
  musicNotes: "Music Notes",
  slides: "Slides",
  fax: "Fax",
  room002Key: "002 Key",
  room003Key: "003 Key",
  crankItem: "Manivela cuadrada",
  hexCrank: "Hex Crank",
  doomBook1: "Libro de la perdición I",
  doomBook2: "Doom Book 2",
  eagleMedal: "Eagle Medal",
  wolfMedal: "Wolf Medal",
  redJewel: "Joya roja",
  blueJewel: "Joya azul",
  orders: "Orders",
  passNumber: "Pass Number",
  carBattery: "Batería de auto",
  flare: "Flare",
  rocketLauncher: "Rocket Launcher",
  acidRounds: "Acid Rounds",
  explosiveRounds: "Explosive Rounds",
  fireRounds: "Fire Rounds",
  flameRounds: "Flame Rounds",
  scrapbook: "Scrapbook",
  moDisk: "MO Disk",
  radio: "Radio",
  moonCrest: "Moon Crest",
  sunCrest: "Sun Crest",
  starCrest: "Star Crest",
  windCrest: "Wind Crest",
  botanyBook: "Botany Book",
  blankBook: "Blank Book",
  lighter: "Encendedor",
  researcherWill: "Researcher's Will",
  researcherLetter: "Researcher's Letter",
  plant42Report: "Plant 42 Report",
  vJoltReport: "V-Jolt Report",
  chemical: "Chemical (Herbicide)"
};
const STATUS_FILES = new Set(["securitySystem", "musicNotes", "fax", "scrapbook", "researcherWill", "researcherLetter", "plant42Report", "vJoltReport", "orders", "passNumber"]);
const STATUS_KEY_ITEMS = new Set(["lockpick", "rope", "brokenShotgun", "eagleMedal", "wolfMedal"]);
const AMMO_PICKUP_QUANTITIES = {
  handgunAmmo: 15,
  shotgunShells: 7,
  magnumRounds: 6,
  fireRounds: 6,
  flameRounds: 6,
  acidRounds: 6,
  explosiveRounds: 6
};

const STATUS = (() => {
  const items = new Map([[STATUS_ITEMS.handgun, 1]]);
  const panel = document.getElementById("status-panel");
  const toggle = document.getElementById("status-toggle");
  const close = document.getElementById("status-close");
  const list = document.getElementById("inventory-list");
  const keyItemsList = document.getElementById("key-items-list");
  const filesList = document.getElementById("files-list");
  const filesCount = document.getElementById("files-count");
  const itemsTab = document.getElementById("items-tab");
  const filesTab = document.getElementById("files-tab");
  const itemsView = document.getElementById("items-view");
  const filesView = document.getElementById("files-view");
  const hint = document.getElementById("pickup-hint");
  const fill = document.getElementById("health-fill");
  const label = document.getElementById("health-label");
  const condition = document.getElementById("health-condition");
  const meter = document.querySelector(".health-track");
  const chestPanel = document.getElementById("chest-panel");
  const chestClose = document.getElementById("chest-close");
  const chestPlayerItems = document.getElementById("chest-player-items");
  const chestStoredItems = document.getElementById("chest-stored-items");
  const chestCapacity = document.getElementById("chest-capacity");
  let health = 100;
  let poisoned = false;
  let poisonFrames = 0;
  let combineSelection = null;
  let weaponHandlers = { equip() {}, selectAmmo() {} };
  let handgunReserve = 36;
  let rocketReserve = 0;
  let storedHandgunReserve = 0;
  const storedItems = new Map();
  const keyItems = new Set();
  const files = new Map();
  const fileIds = new Set();
  const INVENTORY_LIMIT = 8;

  function setTab(tab) {
    const showFiles = tab === "files";
    itemsView.hidden = showFiles;
    filesView.hidden = !showFiles;
    itemsTab.setAttribute("aria-selected", String(!showFiles));
    filesTab.setAttribute("aria-selected", String(showFiles));
  }

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) close.focus();
    else toggle.focus();
  }

  function renderInventory() {
    list.replaceChildren();
    document.getElementById("inventory-title").textContent = `OBJETOS (${inventorySlots()}/${INVENTORY_LIMIT})`;
    const entries = [];
    if (handgunReserve > 0) {
      entries.push(["Munición de pistola", handgunReserve]);
    }
    items.forEach((count, name) => {
      entries.push([name, count]);
    });
    for (let index = 0; index < INVENTORY_LIMIT; index++) {
      const slot = document.createElement("li");
      slot.className = entries[index] ? "inventory-slot filled" : "inventory-slot";
      if (entries[index]) {
        const [name, count] = entries[index];
        slot.title = `${index + 1}. ${name} ×${count}`;
        const label = document.createElement("span");
        label.className = "inventory-slot-name";
        label.textContent = `${name} ×${count}`;
        slot.appendChild(label);
        const herb = ["Hierba verde", "Hierba roja", "Hierba azul", "Mezcla verde ×2"].includes(name);
        const usable = ["Hierba verde", "Hierba azul", "Mezcla verde ×2", "Mezcla verde ×3", "Mezcla verde y roja", "Mezcla verde y azul", STATUS_ITEMS.doomBook1, STATUS_ITEMS.doomBook2].includes(name);
        const weaponItem = ["Berreta", "Cuchillo de supervivencia", "Escopeta", "Colt Python", "Lanzagranadas", "Bazooka", "Rocket Launcher"].includes(name);
        const launcherAmmo = ["Flame Rounds", "Acid Rounds", "Explosive Rounds"].includes(name);
        if (usable || herb || weaponItem || launcherAmmo) {
          const actions = document.createElement("span");
          actions.className = "inventory-slot-actions";
          if (usable) actions.appendChild(createItemAction("Usar", () => useItem(name)));
          if (herb) actions.appendChild(createItemAction(combineSelection === name ? "Elegida" : "Combinar", () => combineItem(name)));
          if (weaponItem) actions.appendChild(createItemAction("Equipar", () => weaponHandlers.equip(name)));
          if (launcherAmmo) actions.appendChild(createItemAction("Seleccionar", () => weaponHandlers.selectAmmo(name)));
          slot.appendChild(actions);
        }
      } else {
        slot.textContent = String(index + 1).padStart(2, "0");
        slot.setAttribute("aria-label", `Espacio ${index + 1} vacío`);
      }
      list.appendChild(slot);
    }
  }

  function renderKeyItems() {
    keyItemsList.replaceChildren();
    if (keyItems.size === 0) {
      const empty = document.createElement("li");
      empty.className = "inventory-empty";
      empty.textContent = "No llevás objetos clave.";
      keyItemsList.appendChild(empty);
      return;
    }
    [...keyItems]
      .map((type) => STATUS_ITEMS[type])
      .filter(Boolean)
      .forEach((name) => {
        const item = document.createElement("li");
        item.textContent = name;
        keyItemsList.appendChild(item);
      });
  }

  function createItemAction(text, callback) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "inventory-action";
    button.textContent = text;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      callback();
    });
    return button;
  }

  function consumeItem(name, amount = 1) {
    const count = items.get(name) || 0;
    if (count < amount) return false;
    if (count === amount) items.delete(name);
    else items.set(name, count - amount);
    return true;
  }

  function useItem(name) {
    const bookMedal = name === STATUS_ITEMS.doomBook1 ? "eagleMedal"
      : name === STATUS_ITEMS.doomBook2 ? "wolfMedal" : null;
    if (bookMedal) {
      if (!consumeItem(name)) return;
      keyItems.add(bookMedal);
      renderKeyItems();
      renderInventory();
      hint.textContent = bookMedal === "eagleMedal"
        ? "Abriste el libro y encontraste la Eagle Medal. El Doom Book 1 se descartó."
        : "Abriste el libro y encontraste la Wolf Medal. El Doom Book 2 se descartó.";
      if (!chestPanel.hidden) renderChest();
      return;
    }
    const effects = {
      "Hierba verde": { heal: 33 },
      "Hierba azul": { curePoison: true },
      "Mezcla verde ×2": { heal: 66 },
      "Mezcla verde ×3": { heal: 100 },
      "Mezcla verde y roja": { heal: 100 },
      "Mezcla verde y azul": { heal: 33, curePoison: true }
    };
    const effect = effects[name];
    if (name === "Hierba azul" && !poisoned) {
      hint.textContent = "No tenés veneno para curar.";
      return;
    }
    if (effect?.heal && health >= 100 && !(effect.curePoison && poisoned)) {
      hint.textContent = "La energía ya está completa.";
      return;
    }
    if (!effect || !consumeItem(name)) return;
    if (effect.heal) setHealth(health + effect.heal);
    if (effect.curePoison) setPoison(false);
    hint.textContent = effect.curePoison && effect.heal
      ? `${name}: energía recuperada y veneno curado.`
      : effect.curePoison ? "Veneno curado." : `${name}: energía recuperada.`;
    renderInventory();
    if (!chestPanel.hidden) renderChest();
  }

  function combineItem(name) {
    if (!combineSelection) {
      combineSelection = name;
      hint.textContent = `Elegiste ${name}. Elegí otra hierba para combinar.`;
      renderInventory();
      return;
    }
    const first = combineSelection;
    combineSelection = null;
    let result = null;
    if (first === "Hierba verde" && name === "Hierba verde" && (items.get(name) || 0) >= 2) result = "Mezcla verde ×2";
    else if ((first === "Hierba verde" && name === "Hierba roja") || (first === "Hierba roja" && name === "Hierba verde")) result = "Mezcla verde y roja";
    else if ((first === "Hierba verde" && name === "Hierba azul") || (first === "Hierba azul" && name === "Hierba verde")) result = "Mezcla verde y azul";
    else if ((first === "Mezcla verde ×2" && name === "Hierba verde") || (name === "Mezcla verde ×2" && first === "Hierba verde")) result = "Mezcla verde ×3";

    if (!result) {
      hint.textContent = "Esas hierbas no se pueden combinar.";
      renderInventory();
      return;
    }
    if (first === name) consumeItem(first, 2);
    else {
      consumeItem(first);
      consumeItem(name);
    }
    items.set(result, (items.get(result) || 0) + 1);
    hint.textContent = `Creaste ${result}.`;
    renderInventory();
    if (!chestPanel.hidden) renderChest();
  }

  function renderFiles() {
    filesList.replaceChildren();
    filesCount.textContent = String(files.size);
    if (files.size === 0) {
      const empty = document.createElement("li");
      empty.className = "inventory-empty";
      empty.textContent = "Todavía no encontraste archivos.";
      filesList.appendChild(empty);
      return;
    }
    files.forEach((count, name) => {
      const entry = document.createElement("li");
      entry.textContent = count > 1 ? `${name} ×${count}` : name;
      filesList.appendChild(entry);
    });
  }

  function inventorySlots() {
    return items.size + (handgunReserve > 0 ? 1 : 0);
  }

  function renderStorageList(element, entries, action, emptyText) {
    element.replaceChildren();
    if (!entries.length) {
      const empty = document.createElement("li");
      empty.className = "inventory-empty";
      empty.textContent = emptyText;
      element.appendChild(empty);
      return;
    }
    entries.forEach(({ id, name, count }) => {
      const row = document.createElement("li");
      const label = document.createElement("span");
      label.textContent = `${name} ×${count}`;
      const button = document.createElement("button");
      button.className = "storage-action";
      button.type = "button";
      button.textContent = action === "store" ? "Guardar" : "Retirar";
      button.addEventListener("click", () => action === "store" ? storeItem(id) : retrieveItem(id));
      row.append(label, button);
      element.appendChild(row);
    });
  }

  function inventoryEntries(source, reserve) {
    const entries = [...source].map(([name, count]) => ({ id: name, name, count }));
    if (reserve > 0) entries.unshift({ id: "__handgunAmmo", name: "Munición de pistola", count: reserve });
    return entries;
  }

  function renderChest() {
    renderStorageList(chestPlayerItems, inventoryEntries(items, handgunReserve), "store", "No llevás objetos.");
    renderStorageList(chestStoredItems, inventoryEntries(storedItems, storedHandgunReserve), "retrieve", "El baúl está vacío.");
    chestCapacity.textContent = `Inventario: ${inventorySlots()}/${INVENTORY_LIMIT} espacios`;
  }

  function storeItem(id) {
    if (id === "__handgunAmmo") {
      storedHandgunReserve += handgunReserve;
      handgunReserve = 0;
    } else {
      const count = items.get(id);
      if (!count) return;
      storedItems.set(id, (storedItems.get(id) || 0) + count);
      items.delete(id);
    }
    renderInventory();
    renderChest();
  }

  function retrieveItem(id) {
    if (id === "__handgunAmmo") {
      if (handgunReserve === 0 && inventorySlots() >= INVENTORY_LIMIT) return;
      handgunReserve += storedHandgunReserve;
      storedHandgunReserve = 0;
    } else {
      if (!storedItems.has(id) || (!items.has(id) && inventorySlots() >= INVENTORY_LIMIT)) return;
      items.set(id, (items.get(id) || 0) + storedItems.get(id));
      storedItems.delete(id);
    }
    renderInventory();
    renderChest();
  }

  function setHealth(value) {
    health = Math.max(0, Math.min(100, value));
    fill.style.width = `${health}%`;
    label.textContent = `${health}%`;
    meter.setAttribute("aria-valuenow", String(health));
    condition.textContent = health > 75 ? "FINE" : health > 50 ? "CAUTION" : health > 25 ? "DANGER" : "CRITICAL";
    condition.dataset.level = health > 50 ? "fine" : health > 25 ? "caution" : "danger";
  }

  function setPoison(value) {
    const next = Boolean(value);
    if (poisoned === next) return;
    poisoned = next;
    poisonFrames = 0;
    document.getElementById("poison-status").hidden = !poisoned;
  }

  toggle.addEventListener("click", () => setOpen(panel.hidden));
  close.addEventListener("click", () => setOpen(false));
  itemsTab.addEventListener("click", () => setTab("items"));
  filesTab.addEventListener("click", () => setTab("files"));
  chestClose.addEventListener("click", () => { chestPanel.hidden = true; });

  renderInventory();
  renderKeyItems();
  renderFiles();
  setHealth(health);
  return {
    toggle() { setOpen(panel.hidden); },
    isOpen() { return !panel.hidden || !chestPanel.hidden; },
    openChest() {
      panel.hidden = true;
      chestPanel.hidden = false;
      renderChest();
      chestClose.focus();
    },
    setHealth,
    setWeaponHandlers(handlers) { weaponHandlers = { ...weaponHandlers, ...handlers }; },
    getHealth() { return health; },
    setPoison,
    isPoisoned() { return poisoned; },
    tick() {
      if (!poisoned) return;
      poisonFrames++;
      if (poisonFrames >= 600) {
        poisonFrames = 0;
        setHealth(health - 1);
      }
    },
    getItemName(type) { return STATUS_ITEMS[type] || null; },
    hasItem(type) { return keyItems.has(type) || (items.get(STATUS_ITEMS[type]) || 0) > 0; },
    hasFile(type) { return fileIds.has(type); },
    addItem(type) {
      const name = STATUS_ITEMS[type];
      if (!name) return false;
      if (STATUS_FILES.has(type)) {
        fileIds.add(type);
        files.set(name, (files.get(name) || 0) + 1);
        renderFiles();
        hint.textContent = `${name} agregado a Files.`;
        return true;
      }
      if (STATUS_KEY_ITEMS.has(type)) {
        if (keyItems.has(type)) return false;
        keyItems.add(type);
        renderKeyItems();
        hint.textContent = `${name} agregado a Objetos clave.`;
        return true;
      }
      if (type === "handgunAmmo" ? handgunReserve === 0 && inventorySlots() >= INVENTORY_LIMIT : !items.has(name) && inventorySlots() >= INVENTORY_LIMIT) {
        hint.textContent = "Inventario lleno. Guardá algo en un baúl primero.";
        return false;
      }
      const amount = AMMO_PICKUP_QUANTITIES[type] || 1;
      if (type === "handgunAmmo") handgunReserve += amount;
      else {
        items.set(name, (items.get(name) || 0) + amount);
        if (type === "rocketLauncher") rocketReserve++;
      }
      renderInventory();
      if (!chestPanel.hidden) renderChest();
      hint.textContent = AMMO_PICKUP_QUANTITIES[type]
        ? `${amount} ${name.toLowerCase()} agregadas.`
        : `${name} agregado al inventario.`;
      return true;
    },
    getHandgunReserve() { return handgunReserve; },
    getRocketReserve() { return rocketReserve; },
    consumeRocket() {
      if (rocketReserve <= 0) return false;
      rocketReserve--;
      renderInventory();
      return true;
    },
    getItemCount(type) { return keyItems.has(type) ? 1 : items.get(STATUS_ITEMS[type]) || 0; },
    consumeItem(type, count = 1) {
      const name = STATUS_ITEMS[type];
      if (count === 1 && keyItems.delete(type)) {
        renderKeyItems();
        return true;
      }
      if (!name || !consumeItem(name, count)) return false;
      renderInventory();
      if (!chestPanel.hidden) renderChest();
      return true;
    },
    setWeaponDisplay(name, loaded, reserve, ammoLabel) {
      document.getElementById("weapon-selected").textContent = name;
      document.getElementById("status-ammo-loaded").textContent = loaded;
      document.getElementById("status-ammo-reserve").textContent = reserve;
      document.getElementById("status-ammo-separator").hidden = reserve === "";
      document.getElementById("status-ammo-type").textContent = ammoLabel;
    },
    takeHandgunAmmo(amount) {
      const taken = Math.min(handgunReserve, amount);
      handgunReserve -= taken;
      renderInventory();
      return taken;
    },
    closeChest() { chestPanel.hidden = true; },
    setPickupHint(text) { hint.textContent = text; }
  };
})();
