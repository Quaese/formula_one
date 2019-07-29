import ArrayService from "../../services/array.service";

// const apiUrl = "http://localhost:4000";
const apiUrl = "http://localhost:1337";

// handle response from fake fetch (see: _tools/fake-backend.tools.js)
const handleResponse = response => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    // response not ok
    if (!response.ok) {
      const error = "highscore.service (handleResponse): response not ok";
      return Promise.reject(error);
    }

    // return data
    return data;
  });
};

// highscore service
export default {
  /*
   * Fetches the state (async)
   */
  fetchState: async () => {
    const requestOptions = {
      method: "GET",
      headers: {}
    };

    // return await fetch(`${apiUrl}/highscore/state`, requestOptions).then(
    return await fetch(`${apiUrl}/api/v1/state`, requestOptions).then(
      handleResponse
    );
  },

  sortHighscorelist: list => {
    let highscoreList = list.sort(ArrayService.sortObjectByProperty("time"));

    // add differences
    highscoreList.reduce((accu, curr, index, array) => {
      curr.diff_first = curr.time - array[0].time;
      curr.diff_prev = curr.time - accu;

      return curr.time;
    }, highscoreList[0].time);

    return [...highscoreList];
  },

  createId: (prefix, resultsList) => {
    const resultPre = "_result";
    let id = resultsList.length;

    while (resultsList.indexOf(prefix + resultPre + id) > -1 && id < 1000) {
      id++;
    }

    return prefix + resultPre + id;
  }
};
