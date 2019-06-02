export const highscore = {
  list: [
    { name: "Quaese", time: 310123, time_string: "05:10:123" },
    { name: "Pchel", time: 305456, time_string: "05:05:456" },
    { name: "q", time: 307789, time_string: "05:07:789" },
    { name: "p", time: 180012, time_string: "03:00:012" }
  ],
  fields: [
    { name: "place", value: "Platz" },
    { name: "name", value: "Name" },
    { name: "time", value: "Zeit" },
    { name: "diff_first", value: "+" },
    { name: "diff_prev", value: "+" }
  ]
};

const highscores = {
  1: highscore
};

export default highscores;
