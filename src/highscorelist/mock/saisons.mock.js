// Results
const Result_1 = {
  id: 1,
  name: "Quaese",
  time: 310123,
  time_string: "05:10:123"
};
const Result_2 = {
  id: 2,
  name: "Pichel",
  time: 305456,
  time_string: "05:05:456"
};
const Result_3 = { id: 3, name: "q", time: 307789, time_string: "05:07:789" };
const Result_4 = { id: 4, name: "p", time: 180012, time_string: "03:00:012" };

// Races
const Race_1 = {
  id: 1,
  title: "Race 1",
  races: [Result_1, Result_2, Result_3, Result_4]
};
const Race_2 = {
  id: 2,
  title: "Race 2",
  races: [Result_1, Result_2, Result_3, Result_4]
};
const Race_3 = {
  id: 3,
  title: "Race 3",
  races: [Result_1, Result_2, Result_3, Result_4]
};
const Race_4 = {
  id: 4,
  title: "Race 4",
  races: [Result_1, Result_2, Result_3, Result_4]
};

// Seasons
const Season_1 = {
  id: 1,
  title: "Season 1",
  racesIDs: [Race_1.id, Race_2.id, Race_3.id, Race_4.id]
  // races: []
};
const Season_2 = {
  id: 2,
  title: "Season 2",
  racesIDs: [Race_1.id, Race_2.id, Race_3.id]
  // races: []
};
const Season_3 = {
  id: 3,
  title: "Season 3",
  racesIDs: [Race_1.id, Race_2.id, Race_3.id, Race_4.id]
  // races: []
};

// All races
export const Races = [Race_1, Race_2, Race_3, Race_4];
// All seasons
export const Seasons = [Season_1, Season_2, Season_3];
// All season IDs
export const SeasonsIDs = [Season_1.id, Season_2.id, Season_3.id];

// Field names
export const fields = [
  { name: "place", value: "Platz" },
  { name: "name", value: "Name" },
  { name: "time", value: "Zeit" },
  { name: "diff_first", value: "+" },
  { name: "diff_prev", value: "+" },
  { name: "actions", value: "Aktionen" }
];
