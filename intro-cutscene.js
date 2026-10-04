// Standalone intro content. This file is intentionally not loaded by index.html yet.
window.GAME_INTRO_CUTSCENE = {
  title: "Resident Evil",
  advanceMode: "dialogue",
  typewriterMsPerCharacter: 24,
  scenes: [
    {
      image: "Assets/intro-1.jfif",
      alt: "Map of the forest northwest of Raccoon City",
      dialogue: [
        {
          speaker: "Chris Redfield (Narrator)",
          text: "Raccoon City... Alpha Team is flying over the forest area northwest of the city, searching for the helicopter of their compatriots, Bravo Team, who disappeared during their investigation of a series of bizarre murder cases..."
        }
      ]
    },
    {
      image: "Assets/intro-2.jfif",
      alt: "Newspaper reports about the bizarre murders",
      dialogue: [
        {
          speaker: "Chris Redfield (Narrator)",
          text: "Bizarre murder cases have recently occurred in Raccoon City. There are outlandish reports of families being attacked by a group of about ten people. Was it a cult?"
        },
        {
          speaker: "Chris Redfield (Narrator)",
          text: "Victims were apparently eaten..."
        },
        {
          speaker: "Chris Redfield (Narrator)",
          text: "The Bravo Team was sent in to investigate, but we lost contact. Alpha Team was dispatched to locate them."
        }
      ]
    },
    {
      image: "Assets/intro-3.jfif",
      alt: "Alpha Team searching the dark forest",
      action: "The helicopter lands in the middle of the dark forest.",
      dialogue: [
        { speaker: "Chris Redfield", text: "Look, Jill! It's Bravo Team's chopper!" },
        {
          speaker: "Chris Redfield (Narrator)",
          text: "No one was aboard, but strangely, most of the equipment was still there. However, we soon discovered why..."
        }
      ]
    },
    {
      image: "Assets/intro-4.png",
      alt: "The mansion looming in the darkness",
      action: "Joseph Frost finds a severed hand. Mutant dogs attack.",
      dialogue: [
        { speaker: "Joseph Frost", text: "Hey! Come here!" },
        { speaker: "Joseph Frost", text: "Ahhh! Nooo!" },
        { speaker: "Albert Wesker", text: "Huh? Joseph, no! Don't go!" },
        { speaker: "Jill Valentine", text: "Joseph!" },
        { speaker: "Albert Wesker", text: "Run! For that house!" }
      ]
    },
    {
      image: "Assets/intro-5.jfif",
      alt: "The S.T.A.R.S. team",
      action: "The surviving members flee into the mansion.",
      dialogue: [
        {
          speaker: "Chris Redfield (Narrator)",
          text: "They have escaped into the mansion, where they thought it was safe. Yet..."
        }
      ]
    }
  ]
};
