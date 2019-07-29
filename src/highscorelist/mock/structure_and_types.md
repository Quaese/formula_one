# Structure/State/Types

## Structure - Season

Seasons

- Season 1
  - Race 1
  - Race 2
    ...
  - Race n

-Season 2

- Season 1
  - Race 1
  - Race 2
    ...
  - Race n

...

- Season n

## Types - Season

- Result = { id: number, name: string, time: number, time_string: string }

- Race = {id: number, title: string, list: [Result]}

- Season = {id: number, title: string, races: [Races]}

- SeasonIDs = [Season.id]

- Seasons = [Season]

## Types - Fields

- Field = {name: string, value: string}

- Fields = [Field]

## State

```
state = {
  seasonsIDs: [],
  seasons: [],
  fields: []
}
```

`SeasonsIDs`: Array of Season.ids
`Seasons`: Array of Season Objects

Suche nach Season über ID erfolgt über `filter` Methode im Seasons-Array.
