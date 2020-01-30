const dictDE = {
  de: {
    en: "Englisch",
    de: "Deutsch",
    language: "Sprache",

    admin: {
      drivers: {
        title: "Fahrer | Fahrer",
        description: "Bereich zum Verwalten von Fahrern"
      },
      locations: {
        title: "Ort | Orte",
        description: "Bereich zum Verwalten von Strecken"
      }
    },

    app: {
      created: "erstellt",
      modified: "geändert"
    },

    common: {
      add: "Hinzufügen",
      back: "zurück",
      cancel: "Abbrechen",
      delete: "Löschen",
      edit: "Bearbeiten",
      more: "mehr",
      new: "neu",
      save: "Speichern"
    },

    dialog: {
      cancelText: "Abbrechen",
      confirmDeleteHeader: "Löschen bestätigen",
      confirmDeleteRaceText:
        'Soll das Rennen "{title}" endgültig gelöscht werden?',
      confirmDeleteResultText:
        'Soll das Ergebnis von "{name}" endgültig gelöscht werden?',
      confirmDeleteSeasonText:
        'Soll die Saison "{title}" endgültig gelöscht werden?',
      deleteText: "Löschen"
    },

    error: {
      required: {
        name: "Name erforderlich",
        time: "Falsches Zeitformat (mm:ss:ddd)"
      },
      select: {
        nothing: "Kein gültige Option gewählt."
      }
    },

    form: {
      select: {
        choose: "Bitte auswählen"
      }
    },

    home: {
      headline: "Verwaltungs-Tool für Highscore-Listen",
      description: {
        headline: "Beschreibung",
        text: `
        <p>
          Mit dem Tool können Veranstaltungen verwaltet werden, die länger
          laufen und selbst eigene Unterveranstaltungen besitzen (z.B. Formel
          Eins Saison und die untergeordneten Grand Prix').
        </p>
        <p>
          Den Unterveranstaltungen können Ergebnislisten zugeordnet werden.
          Diese enthalten die erreichten Zeiten und werden aufsteigend sortiert.
        </p>`
      }
    },

    nav: {
      admin: "Verwaltung",
      home: "Home",
      highscorelist: "Saisons & Highscoreliste"
    },

    seasons: {
      actions: "Aktionen",
      addRace: "Rennen hinzufügen",
      addSeason: "Saison hinzufügen",
      availableSeasons: "Verfügbare Saisons",
      highscoreNameDefault: "Keine Zeiten bisher",
      highscoreTime: "Bestzeit",
      location: "Ort",
      name: "Name",
      position: "#",
      races: "Rennen | Rennen",
      results: "Ergebnis | Ergebnisse",
      season: "Saison",
      time: "Zeit"
    }
  }
};

export default dictDE;
