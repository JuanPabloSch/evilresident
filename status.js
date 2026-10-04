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
  passCode01: "Pass Code 01",
  passCode02: "Pass Code 02",
  passCode03: "Pass Code 03",
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
  keepersDiary: "Keeper's Diary",
  blankBook: "Blank Book",
  lighter: "Encendedor",
  researcherWill: "Researcher's Will",
  researcherLetter: "Researcher's Letter",
  runeTranslation: "Rune Translation",
  plant42Report: "Plant 42 Report",
  vJoltReport: "V-Jolt Report",
  vJolt: "V-JOLT",
  chemical: "Chemical (Herbicide)"
};
const STATUS_FILES = new Set(["securitySystem", "musicNotes", "fax", "scrapbook", "researcherWill", "researcherLetter", "runeTranslation", "plant42Report", "vJoltReport", "orders", "passNumber", "passCode01", "passCode02", "passCode03", "botanyBook", "keepersDiary"]);
const FILE_CONTENTS = {
  botanyBook: {
    title: "BOTANY BOOK",
    subtitle: "∼ About Medical Herbs ∽",
    paragraphs: [
      "As you may know, there are many plants that have medical effects. Since ancient times, humans have been healing wounds and diseases using various plants.",
      "In this book, we're going to sample three herbs that grow around the Raccoon mountains and give their outlines as examples of those plants with medical properties.",
      "Each herb has different colors and different effects as medical plants: the green one recovers physical strength, the blue one neutralizes natural toxins, while the red herb does not have any effect by itself.",
      "The red herb is only effective when it is mixed with other herbs. For example, if you mix this herb with the herb that recovers physical strength, the recovery effect will be tripled.",
      "By adjusting the amount and experimenting with these three herbs, you can create various kinds of medicines but I'll leave the details in your hands, because that's the best way to acquire true knowledge."
    ]
  },
  keepersDiary: {
    title: "KEEPER'S DIARY",
    paragraphs: [
      "May 9th, 1998",
      "At night, we played Poker with Scott the guard, Alias and Steve the researcher.",
      "Steve was really lucky, but I think he was cheating. What a scumbag.",
      "May 10th, 1998",
      "Today, a high ranking researcher asked me to take care of a new monster. It looks like a gorilla without any skin. They told me to feed them live food. When I threw in a pig, they were playing with it... tearing off the pig's legs and pulling out the guts before they actually ate it.",
      "May 11th, 1998",
      "Around 5 o'clock this morning, Scott came in and woke me up suddenly. He was wearing a protection suit that looks like a space suit. He told me to put one on as well. I heard there was an accident in the basement lab. It's no wonder, those researchers never rest, even at night.",
      "May 12th, 1998",
      "I've been wearing this annoying space suit since yesterday, my skin grows musty and feels very itchy. By way of revenge, I didn't feed those dogs today. Now I feel better.",
      "May 13th, 1998",
      "I went to the medical room because my back is all swollen and feels itchy. They put a big bandage on my back and the doctor told me I did not need to wear the space suit any more. I guess I can sleep well tonight.",
      "May 14th, 1998",
      "When I woke up this morning, I found another blister on my foot. It was annoying and I ended up dragging my foot as I went to the dogs' pen. They have been quiet since morning, which is very unusual. I found that some of them had escaped. I'll be in real trouble if the higher-ups find out.",
      "May 15th, 1998",
      "Even though I didn't feel well, I decided to go see Nancy. It's my first day off in a long time. But I was stopped by the guard on the way out. They say the company has ordered that no one leave the grounds. I can't even make a phone call. What kind of joke is this?!",
      "May 16th, 1998",
      "I heard a researcher who tried to escape from this mansion was shot last night. My entire body feels burning and itchy at night. When I was scratching the swelling on my arm, a lump of rotten flesh dropped off. What the hell is happening to me?",
      "May 19, 1998",
      "Fever gone but itchy. Hungry and eat doggie food. Itchy itchy Scott came. Ugly face so killed him. Tasty.",
      "4",
      "Itchy.\nTasty."
    ]
  },
  vJoltReport: {
    title: "\"V-JOLT\" REPORT",
    paragraphs: [
      "As I stated in the last report, there are some common features found in the cells of the plant infected by the Tyrant virus. We also have found another interesting fact through some experiments.",
      "We found an element that destroys these plant cells rapidly in \"UMB No.16\", one of the series of UMB chemicals that we used for that experiment. We named this \"UMB No.16\" as \"V-JOLT\".",
      "In our calculation, it will take less than 5 seconds to destroy Plant 42 if we put the \"V-JOLT\" directly on the root.",
      "You need to mix some of the UMB series chemicals in a specific order to create a \"V-JOLT\". But the UMB series chemicals may generate a poisonous gas which is harmful to the human body. Extreme caution should be taken when handling these chemicals.",
      "Following are the types of UMB series chemicals and their brief characteristics.",
      "UMB No. 2 — Red",
      "NP-003 — Purple",
      "UMB No. 4 — Green",
      "Yellow-6 — Yellow",
      "UMB No. 7 — White",
      "UMB No. 13 — Blue (stimulating smell)",
      "V-JOLT (UMB No. 16) — Brown",
      "On the wall beside the door: 1+2=3, 2+4=6, 3+4=7, 6+7=13, 13+3=16.",
      "Beside the sink: Water=1, Red=2, Purple=3, Green=4. Combine the substances in the order shown by the equations. The final equation requires another Purple (NP-003), so repeat Water + Red to make it. The mixing station keeps all reagents in the room, so no bottles need to be carried."
    ]
  },
  securitySystem: {
    title: "SECURITY SYSTEM",
    paragraphs: [
      "- BASEMENT LEVEL 1 -",
      "HELICOPTER PORT",
      "Executive and Government Officials only on helicopter port. This restriction may not apply in case of an accident.",
      "PASSAGE TO THE HELICOPTER",
      "No one is allowed to enter unless they are attended by a Research Consultant or Security Director. All others will be shot on sight.",
      "ELEVATOR",
      "The elevator stops during all emergencies.",
      "- BASEMENT LEVEL 2 -",
      "VISUAL DATA ROOM",
      "Visual Data Room is within the control of Special Research Division. Keith Arving, the Room Manager, is designated to have jurisdiction over room usage.",
      "- BASEMENT LEVEL 3 -",
      "PRISON",
      "Sanitation Division controls the usage of the prison. Consultant Researchers (E.Smith, S.Ross, A.Wesker) must be present if virus is used.",
      "TRIPLE LOCK DOOR",
      "No one is allowed to enter unless he presents all pass code documents. Pass code documents must be created on the specialized output machine by the Chief Researcher of each block.",
      "POWER ROOM",
      "Only Headquarters Supervisors may enter. This restriction may not apply in the Consultant Researcher has received special instructions.",
      "PASS CODE OUTPUT MACHINE",
      "No one is allowed to use the pass code output machine but the Chief Researchers.",
      "- BASEMENT LEVEL 4 -",
      "TOP SECRET",
      "Regarding the progress of \"Tyrant\" after the use of T-virus... (Remaining document is unreadable)"
    ]
  },
  scrapbook: {
    title: "SCRAPBOOK",
    paragraphs: [
      "RACCOON TIMES MAY 27, 1998",
      "ANIMAL ATTACK? WOMAN MUTILATED",
      "May 20. Around 10 PM a 20-year-old young woman's body was found by a passer-by on the left bank of Marble River in the Cider District of Raccoon City. Raccoon police assume it to be a grizzly or other animal's doing because there are teeth marks along her mutilated arms and left foot that show considerable power. Since she was wearing a hiking boot on her remaining foot, it has been determined that she was attacked in the Arklay Mountains and fell into the river. They are hurrying to identify this woman.",
      "RACCOON WEEKLY JUNE 16, 1998",
      "MONSTERS IN ARKLAY MOUNTAINS?",
      "Some people claim they've seen monsters in the Arklay mountains. The monsters are supposedly about the same size as large dogs and usually run in a pack as wolves do. This may sound like a group of ordinary wild dogs, but these monsters are surprisingly fierce and hard to hurt. They say these dogs won't bother you unless you wake them, so you smart readers should stay out of the Arklay Mountains for the time being. But if you're looking for adventure, check it out! You wanna try?",
      "RACCOON TIMES JULY 9, 1998",
      "MYSTERY ON ARKLAY MOUNTAINS: MOUNTAIN ROAD BLOCKED",
      "Due to successive disasters in the Arklay Mountains, the city authorities have decided to block the road leading to the foothills. At the same time, Raccoon police intend to begin the search for lost people with the help of S.T.A.R.S. team members. They expect great difficulty because of the vast size of the Arklay Mountains and the primeval forest that covers most of the area. Also people are still reporting sightings of grotesque monsters in the mountains."
    ]
  },
  researcherWill: {
    title: "RESEARCHER'S WILL",
    paragraphs: [
      "My dear Alma,",
      "The fact that you have received this letter is both a joy and sadness for me. I could not even talk to you because of that guy in the sunglasses. Alma, be calm and read this.",
      "I think I've told you that I moved to pharmaceutical company's lab. They headhunted me. Last month, there was an accident in the lab and the virus we were studying escaped.",
      "All my colleagues who were infected by the virus are dead. To be accurate, they've become living dead. They still wander around. Some of them are knocking on my room door desperately right now. But there's no sign of intelligence in their eyes.",
      "That cursed virus takes away all humanity from the human brain. Love, joy, sorrow, fear, humor... eternally.",
      "And Alma, even the memories of the days I spent with you...",
      "Yes, I'm infected. I did everything I could, but I could only delay the progress by a few days. The most frightening thing is, that I forget more about you by the day.",
      "So I chose a peaceful death, rather than becoming the living dead. Within an hour, I will have entered my eternal sleep. I do hope you'll understand my decision...",
      "Good Bye and Forever Yours,\nMartin Crackhorn"
    ]
  },
  passNumber: {
    title: "PASS NUMBER",
    paragraphs: ["pass no.\n8/083/0"]
  },
  passCode01: {
    title: "PASS CODE 01",
    paragraphs: [
      "\"I swear by myself\", declares the Lord, \"that because you have done this and have not withheld your son, your only son,",
      "(Genesis 22:16)"
    ]
  },
  passCode02: {
    title: "PASS CODE 02",
    paragraphs: [
      "I will surely bless you and make your descendant as numerous as the stars in the sky, and as the sand on the seashore. Your descendants will take possession of the cities of their enemies,",
      "(Genesis 22:17)"
    ]
  },
  passCode03: {
    title: "PASS CODE 03",
    paragraphs: [
      "and through your offspring all nations on earth will be blessed, because you have obeyed me.\"",
      "(Genesis 22:18)"
    ]
  },
  orders: {
    title: "ORDERS",
    paragraphs: [
      "TOP SECRET    July 22, 1998   2:13",
      "To the Head of the Security Department",
      "\"X-day\" is approaching. Complete the following orders within the week.",
      "1. Lure the members of S.T.A.R.S. into the lab and have them fight with the B.O.W. in order to obtain data of actual battles.",
      "2. Collect two embryos per B.O.W. type making sure to include all species except for Tyrant.",
      "3. Destroy the Arkley lab including all researchers and lab animals in a manner which will seem accidental.",
      "White Umbrella"
    ]
  },
  plant42Report: {
    title: "PLANT 42 REPORT",
    paragraphs: [
      "4 days have passed since the accident and the plant at Point 42 is growing amazingly fast.",
      "It has been effected by the T-Virus differently than other plants have been and shows unique shape in addition to its size. Looking at the way it behaves, it is now difficult to determine what kind of plant it was originally.",
      "There are two ways in which Plant 42 gathers nutrition.",
      "The first is through its root that reaches into the basement. Immediately after the accident, a scientist went mad and broke the water tank in the basement. Now the basement is filled with water. It is easily imaginable that some chemical elements were blended in the water and promotes the incredibly fast growth of Plant 42.",
      "Another part of Plant 42 from the basement grows through the duct and hangs down like so many bulbs from the ceiling of the first floor. Many vines come out of those bulbs and they are the second resource for its nutrition. Once sensing movement, Plant 42 shoots its vines around the prey and holds it. Then it starts sucking up blood, using the suckers located at the back of its vine.",
      "It also has some intelligence. It blocks the door by twining its vines around it especially when it captures prey or is sleeping. Several staff members have already fallen victim to this.",
      "May 21, 1998\nHenry Sarton"
    ]
  },
  fax: {
    title: "FAX",
    paragraphs: [
      "To:\nGeneral Manager of Sanitation Division",
      "From:\nSpecial Committee on Disasters Raccoon Special Research Dept.",
      "This memorandum is strictly confidential and must be destroyed as soon as it is understood.",
      "Regarding the \"T-Virus\" outbreak which occurred recently, this Committee conducted a field survey. According to the results, estimates on the amount of damage caused by the accident are considerably greater than reported earlier.",
      "First, although it is very difficult to obtain accurate data in terms of actual numbers, it is thought that more than half of the researchers died after exposure to the \"T-Virus\". The body count will almost likely increase since nearly all of the survivors show symptoms peculiar to the \"T-Virus\".",
      "Second, our security system is still in operation. However, our special security guard squad has been nearly destroyed. Because of that, research information considered by our company to be top secret has been made available to outsiders. Counter-measures should be taken as soon as possible.",
      "Finally, many of the \"subjects\" from the experiments have escaped and are out of control. We believe that some of the researchers were killed by these \"subjects\" and their bodies were mutilated.",
      "By curious coincidence, these events are proof of the success of our research. However, there is also a very high risk that this news may be leaked to the press if we don't act immediately.",
      "The condition is very serious. Our operation to cover-up the situation is difficult to attain, however we hope the problem will be solved quickly. We are especially concerned that the State Police and S.T.A.R.S. are intervening too quickly. We need to act on this situation as well."
    ]
  },
  researcherLetter: {
    title: "RESEARCHER'S LETTER",
    paragraphs: [
      "June 8, 1998",
      "Dear Ada,",
      "Ada, by the time you read this, I'll be something... different. Today's test turned out to be positive, just as I expected. I feel like going crazy when I think about becoming one of them. Ada, you're not infected and I hope you never will be.",
      "In case you are the last one left, take the material in the Visual Data Room and go to the Power Room to operate the Triggering System before you escape. And make all this public through the media.",
      "If everything is in order, all the locks can be opened by the security system. You can access the system if you log in with my name from the terminal in the small lab and enter the password. The password is your name.",
      "To unlock the door at B2 where the Visual Data Room is located, you'll need to access with our name first and then enter another password. I've written the code below. I'm sure you'll understand it easily.",
      "And this is my last hope - if you find me completely changed, please kill me yourself.",
      "PASSWORD = ᛗ ᛟ ᛚ ᛖ",
      "Yours, John"
    ]
  },
  runeTranslation: {
    title: "NOTES ON THE WALL PHOTOGRAPH",
    paragraphs: [
      "The photograph on the west wall appears blank under ordinary light. When the room is illuminated, a set of runes becomes visible across the image.",
      "The symbols form four words. Read from top to bottom, they say:",
      "ᛏᛉᛖᛖ = TREE",
      "ᚫᛈᛈᛚᛖ = APPLE",
      "ᛗᚫᚾ = MAN",
      "ᚹᛟᛗᚫᚾ = WOMAN",
      "A tree, an apple, a man, and a woman. The arrangement is unmistakable: the Garden of Eden. Perhaps the old story is also a key to reading the message left by the researcher."
    ]
  }
};
const STATUS_KEY_ITEMS = new Set(["lockpick", "rope", "brokenShotgun", "eagleMedal", "wolfMedal", "radio"]);
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
  const filesReader = document.getElementById("files-reader");
  const filesReaderTitle = document.getElementById("files-reader-title");
  const filesReaderSubtitle = document.getElementById("files-reader-subtitle");
  const filesReaderBody = document.getElementById("files-reader-body");
  const filesBack = document.getElementById("files-back");
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
        const usable = ["Hierba verde", "Hierba azul", "Mezcla verde ×2", "Mezcla verde ×3", "Mezcla verde y roja", "Mezcla verde y azul", STATUS_ITEMS.doomBook1, STATUS_ITEMS.doomBook2, STATUS_ITEMS.flare].includes(name);
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
    if (name === STATUS_ITEMS.flare) {
      weaponHandlers.useFlare();
      return;
    }
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
    filesList.hidden = false;
    filesReader.hidden = true;
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
      const fileId = [...fileIds].find((id) => STATUS_ITEMS[id] === name);
      const content = FILE_CONTENTS[fileId];
      if (content) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "file-open";
        button.textContent = count > 1 ? `${name} ×${count}` : name;
        button.addEventListener("click", () => openFile(content));
        entry.appendChild(button);
      } else {
        entry.textContent = count > 1 ? `${name} ×${count}` : name;
      }
      filesList.appendChild(entry);
    });
  }

  function openFile(content) {
    filesList.hidden = true;
    filesReaderTitle.textContent = content.title;
    filesReaderSubtitle.textContent = content.subtitle || "";
    filesReaderBody.replaceChildren();
    content.paragraphs.forEach((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      filesReaderBody.appendChild(paragraph);
    });
    filesReader.hidden = false;
    filesBack.focus();
  }

  filesBack.addEventListener("click", () => {
    filesReader.hidden = true;
    filesList.hidden = false;
  });

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
    serialize() {
      return {
        items: [...items], keyItems: [...keyItems], files: [...files], fileIds: [...fileIds],
        health, poisoned, poisonFrames, handgunReserve, rocketReserve, storedHandgunReserve,
        storedItems: [...storedItems]
      };
    },
    restore(data) {
      items.clear(); (data.items || []).forEach(([key, value]) => items.set(key, value));
      keyItems.clear(); (data.keyItems || []).forEach((value) => keyItems.add(value));
      files.clear(); (data.files || []).forEach(([key, value]) => files.set(key, value));
      fileIds.clear(); (data.fileIds || []).forEach((value) => fileIds.add(value));
      storedItems.clear(); (data.storedItems || []).forEach(([key, value]) => storedItems.set(key, value));
      health = data.health ?? 100;
      poisoned = Boolean(data.poisoned);
      poisonFrames = data.poisonFrames || 0;
      handgunReserve = data.handgunReserve || 0;
      rocketReserve = data.rocketReserve || 0;
      storedHandgunReserve = data.storedHandgunReserve || 0;
      document.getElementById("poison-status").hidden = !poisoned;
      renderInventory(); renderKeyItems(); renderFiles(); renderChest(); setHealth(health);
      panel.hidden = true; chestPanel.hidden = true; toggle.setAttribute("aria-expanded", "false");
    },
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
