export const highscore = {
  id: 1,
  list: [
    { id: 1, name: "Quaese", time: 310123, time_string: "05:10:123" },
    { id: 2, name: "Pchel", time: 305456, time_string: "05:05:456" },
    { id: 3, name: "q", time: 307789, time_string: "05:07:789" },
    { id: 4, name: "p", time: 180012, time_string: "03:00:012" }
  ]
};

export const fields = [
  { name: "place", value: "Platz" },
  { name: "name", value: "Name" },
  { name: "time", value: "Zeit" },
  { name: "diff_first", value: "+" },
  { name: "diff_prev", value: "+" },
  { name: "actions", value: "Aktionen" }
];

const highscores = {
  1: highscore
};

export default highscores;
