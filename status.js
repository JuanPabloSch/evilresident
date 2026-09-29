const STATUS_ITEMS = {
  handgunAmmo: "Munición de pistola",
  shotgunShells: "Cartuchos de escopeta",
  magnumRounds: "Munición Magnum",
  inkRibbon: "Cinta de tinta",
  greenHerb: "Hierba verde",
  blueHerb: "Hierba azul",
  firstAidSpray: "Aerosol de primeros auxilios",
  armorKey: "Llave de la armadura",
  crankItem: "Manivela cuadrada",
  doomBook1: "Libro de la perdición I",
  redJewel: "Joya roja",
  orders: "Orders",
  carBattery: "Batería de auto",
  acidRounds: "Acid Rounds",
  scrapbook: "Scrapbook",
  moDisk: "MO Disk",
  radio: "Radio",
  moonCrest: "Moon Crest",
  sunCrest: "Sun Crest",
  botanyBook: "Botany Book",
  lighter: "Encendedor"
};

const STATUS = (() => {
  const items = new Map();
  const panel = document.getElementById("status-panel");
  const toggle = document.getElementById("status-toggle");
  const close = document.getElementById("status-close");
  const list = document.getElementById("inventory-list");
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
  let handgunReserve = 36;
  let storedHandgunReserve = 0;
  const storedItems = new Map();
  const INVENTORY_LIMIT = 8;

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) close.focus();
    else toggle.focus();
  }

  function renderInventory() {
    list.replaceChildren();
    document.getElementById("inventory-title").textContent = `OBJETOS (${inventorySlots()}/${INVENTORY_LIMIT})`;
    if (items.size === 0 && handgunReserve === 0) {
      const empty = document.createElement("li");
      empty.className = "inventory-empty";
      empty.textContent = "No llevás objetos.";
      list.appendChild(empty);
      return;
    }
    if (handgunReserve > 0) {
      const ammo = document.createElement("li");
      const ammoName = document.createElement("span");
      ammoName.textContent = "Munición de pistola";
      const ammoCount = document.createElement("strong");
      ammoCount.textContent = `×${handgunReserve}`;
      ammo.append(ammoName, ammoCount);
      list.appendChild(ammo);
    }
    items.forEach((count, name) => {
      const entry = document.createElement("li");
      const itemName = document.createElement("span");
      itemName.textContent = name;
      const quantity = document.createElement("strong");
      quantity.textContent = `×${count}`;
      entry.append(itemName, quantity);
      list.appendChild(entry);
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

  toggle.addEventListener("click", () => setOpen(panel.hidden));
  close.addEventListener("click", () => setOpen(false));
  chestClose.addEventListener("click", () => { chestPanel.hidden = true; });

  renderInventory();
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
    getHealth() { return health; },
    getItemName(type) { return STATUS_ITEMS[type] || null; },
    hasItem(type) { return (items.get(STATUS_ITEMS[type]) || 0) > 0; },
    addItem(type) {
      const name = STATUS_ITEMS[type];
      if (!name) return false;
      if (type === "handgunAmmo" ? handgunReserve === 0 && inventorySlots() >= INVENTORY_LIMIT : !items.has(name) && inventorySlots() >= INVENTORY_LIMIT) {
        hint.textContent = "Inventario lleno. Guardá algo en un baúl primero.";
        return false;
      }
      if (type === "handgunAmmo") handgunReserve += 12;
      else items.set(name, (items.get(name) || 0) + 1);
      renderInventory();
      if (!chestPanel.hidden) renderChest();
      hint.textContent = type === "handgunAmmo" ? "12 balas agregadas a la reserva." : `${name} agregado al inventario.`;
      return true;
    },
    getHandgunReserve() { return handgunReserve; },
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
