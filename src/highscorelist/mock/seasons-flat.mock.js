const seasons = {
  byId: {
    season1: {
      id: "season1",
      title: "Season 1",
      races: ["season1_race1", "season1_race2", "season1_race3"]
    },
    season2: {
      id: "season2",
      title: "Season 2",
      races: ["season2_race1", "season2_race2", "season2_race3"]
    },
    season3: {
      id: "season3",
      title: "Season 3",
      races: []
    }
  },

  order: ["season1", "season2", "season3"]
};

const races = {
  season1_race1: {
    id: "season1_race1",
    title: "Race 1 (Season 1)",
    results: [
      "season1_race1_result1",
      "season1_race1_result2",
      "season1_race1_result3",
      "season1_race1_result4"
    ]
  },
  season1_race2: {
    id: "season1_race2",
    title: "Race 2 (Season 1)",
    results: [
      "season1_race2_result1",
      "season1_race2_result2",
      "season1_race2_result3",
      "season1_race2_result4"
    ]
  },
  season1_race3: {
    id: "season1_race3",
    title: "Race 3 (Season 1)",
    results: [
      "season1_race3_result1",
      "season1_race3_result2",
      "season1_race3_result3",
      "season1_race3_result4"
    ]
  },
  season2_race1: {
    id: "season2_race1",
    title: "Race 1 (Season 2)",
    results: [
      "season2_race1_result1",
      "season2_race1_result2",
      "season2_race1_result3",
      "season2_race1_result4"
    ]
  },
  season2_race2: {
    id: "season2_race2",
    title: "Race 2 (Season 2)",
    results: [
      "season2_race2_result1",
      "season2_race2_result2",
      "season2_race2_result3",
      "season2_race2_result4"
    ]
  },
  season2_race3: {
    id: "season2_race3",
    title: "Race 3 (Season 2)",
    results: [
      "season2_race3_result1",
      "season2_race3_result2",
      "season2_race3_result3",
      "season2_race3_result4"
    ]
  }
};

const results = {
  season1_race1_result1: {
    id: "season1_race1_result1",
    name: "Quaese",
    time: 310123,
    time_string: "05:10:123"
  },
  season1_race1_result2: {
    id: "season1_race1_result2",
    name: "Pichel",
    time: 305456,
    time_string: "05:05:456"
  },
  season1_race1_result3: {
    id: "season1_race1_result3",
    name: "q",
    time: 307789,
    time_string: "05:07:789"
  },
  season1_race1_result4: {
    id: "season1_race1_result4",
    name: "p",
    time: 180012,
    time_string: "03:00:012"
  },

  season1_race2_result1: {
    id: "season1_race2_result1",
    name: "Quaese",
    time: 310123,
    time_string: "05:10:123"
  },
  season1_race2_result2: {
    id: "season1_race2_result2",
    name: "Pichel",
    time: 305456,
    time_string: "05:05:456"
  },
  season1_race2_result3: {
    id: "season1_race2_result3",
    name: "q",
    time: 307789,
    time_string: "05:07:789"
  },
  season1_race2_result4: {
    id: "season1_race2_result4",
    name: "p",
    time: 180012,
    time_string: "03:00:012"
  },

  season1_race3_result1: {
    id: "season1_race3_result1",
    name: "Quaese",
    time: 310123,
    time_string: "05:10:123"
  },
  season1_race3_result2: {
    id: "season1_race3_result2",
    name: "Pichel",
    time: 305456,
    time_string: "05:05:456"
  },
  season1_race3_result3: {
    id: "season1_race3_result3",
    name: "q",
    time: 307789,
    time_string: "05:07:789"
  },
  season1_race3_result4: {
    id: "season1_race3_result4",
    name: "p",
    time: 180012,
    time_string: "03:00:012"
  },

  season2_race1_result1: {
    id: "season2_race1_result1",
    name: "Quaese",
    time: 310123,
    time_string: "05:10:123"
  },
  season2_race1_result2: {
    id: "season2_race1_result2",
    name: "Pichel",
    time: 305456,
    time_string: "05:05:456"
  },
  season2_race1_result3: {
    id: "season2_race1_result3",
    name: "q",
    time: 307789,
    time_string: "05:07:789"
  },
  season2_race1_result4: {
    id: "season2_race1_result4",
    name: "p",
    time: 180012,
    time_string: "03:00:012"
  },

  season2_race2_result1: {
    id: "season2_race2_result1",
    name: "Quaese",
    time: 310123,
    time_string: "05:10:123"
  },
  season2_race2_result2: {
    id: "season2_race2_result2",
    name: "Pichel",
    time: 305456,
    time_string: "05:05:456"
  },
  season2_race2_result3: {
    id: "season2_race2_result3",
    name: "q",
    time: 307789,
    time_string: "05:07:789"
  },
  season2_race2_result4: {
    id: "season2_race2_result4",
    name: "p",
    time: 180012,
    time_string: "03:00:012"
  },

  season2_race3_result1: {
    id: "season2_race3_result1",
    name: "Quaese",
    time: 310123,
    time_string: "05:10:123"
  },
  season2_race3_result2: {
    id: "season2_race3_result2",
    name: "Pichel",
    time: 305456,
    time_string: "05:05:456"
  },
  season2_race3_result3: {
    id: "season2_race3_result3",
    name: "q",
    time: 307789,
    time_string: "05:07:789"
  },
  season2_race3_result4: {
    id: "season2_race3_result4",
    name: "p",
    time: 180012,
    time_string: "03:00:012"
  }
};
