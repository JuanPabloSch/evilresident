// Standalone intro content. This file is intentionally not loaded by index.html yet.
window.GAME_INTRO_CUTSCENE = {
  title: "Resident Evil",
  date: "July 1998",
  location: "Raccoon Forest",
  advanceMode: "dialogue",
  typewriterMsPerCharacter: 24,
  scenes: [
    {
      image: "Assets/intro-1.jfif",
      alt: "Map of the forest northwest of Raccoon City",
      dialogue: [
        {
          speaker: "Chris (narrating)",
          text: "Alpha Team is flying around the Forest zone situated in north-west Raccoon City, where we're searching for the helicopter of our compatriots; \"Bravo Team\", who disappeared during the middle of our mission."
        },
        { speaker: "Wesker", text: "Chris, have you found it yet?" },
        { speaker: "Chris", text: "No, I haven't found it yet." }
      ]
    },
    {
      image: "Assets/intro-2.jfif",
      alt: "Newspaper reports about the bizarre murders",
      dialogue: [
        {
          speaker: "Chris (narrating)",
          text: "Bizarre murder cases have recently occurred in Raccoon City. There are outlandish reports of families being attacked by a group of about ten people. Victims were apparently eaten. Bravo Team went to the hideout of the group, and disappeared."
        }
      ]
    },
    {
      image: "Assets/intro-3.jfif",
      alt: "Alpha Team searching the dark forest",
      action: "The helicopter lands in the middle of the dark forest.",
      dialogue: [
        { speaker: "Jill", text: "Look Chris!" },
        {
          speaker: "Chris (narrating)",
          text: "It was Bravo Team's Helicopter. Nobody was in it. But strangely, most of the equipment was still there. However, we soon discovered why."
        }
      ]
    },
    {
      image: "Assets/intro-4.png",
      alt: "The mansion looming in the darkness",
      action: "Joseph Frost finds a severed hand. Mutant dogs attack.",
      dialogue: [
        { speaker: "Joseph Frost", text: "Hey! Come here!" },
        { speaker: "Joseph", text: "Arg!" },
        { speaker: "Joseph", text: "Arg!" },
        { speaker: "Jill", text: "Joseph!" },
        { speaker: "Chris", text: "No! Don't go!" },
        { speaker: "Chris", text: "Jill, run for that house!" }
      ]
    },
    {
      image: "Assets/intro-5.jfif",
      alt: "The S.T.A.R.S. team",
      action: "The surviving members flee into the mansion.",
      dialogue: [
        {
          speaker: "Chris (narrating)",
          text: "They have escaped into the mansion, where they thought it was safe. Yet..."
        }
      ]
    }
  ]
};
