const dictEN = {
  en: {
    en: "English",
    de: "German",
    language: "Language",

    app: {
      created: "created",
      modified: "modified"
    },

    common: {
      add: "add",
      back: "back",
      cancel: "cancel",
      delete: "delete",
      edit: "edit",
      more: "more",
      save: "save"
    },

    dialog: {
      cancelText: "Cancel",
      confirmDeleteHeader: "Confirm deletion",
      confirmDeleteRaceText:
        'Should the race "{title}" be permanently deleted?',
      confirmDeleteResultText:
        'Should the result from "{name}" be permanently deleted?',
      confirmDeleteSeasonText:
        'Should the season with title "{title}" be permanently deleted?',
      deleteText: "Delete"
    },

    error: {
      required: {
        name: "Name required",
        time: "Wrong time format (mm:ss:dd)"
      },
      select: {
        nothing: "No valid option selected."
      }
    },

    home: {
      headline: "Administration tool for highscore lists",
      description: {
        headline: "Description",
        text: `
        <p>
          The tool can be used to manage events that run longer and have their own subevents (e.g. Formula One season and the subordinate Grand Prix').
        </p>
        <p>
          Results lists can be assigned to the subevents. These lists contain the times reached and are sorted in ascending order.
        </p>`
      }
    },

    nav: {
      home: "Home",
      highscorelist: "Seasons & Highscorelist"
    },

    seasons: {
      actions: "Actions",
      addRace: "Add Race",
      addSeason: "Add Season",
      availableSeasons: "Available Seasons",
      highscoreNameDefault: "no results yet",
      highscoreTime: "Highscore",
      location: "Location",
      name: "Name",
      position: "#",
      races: "Race | Races",
      results: "Result | Results",
      season: "Season",
      time: "Time"
    }
  }
};

export default dictEN;
