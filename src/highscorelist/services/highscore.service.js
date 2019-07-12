import ArrayService from "../../services/array.service";

const apiUrl = "http://localhost:4000";

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
  fetchState: async () => {
    const requestOptions = {
      method: "GET",
      headers: {}
    };

    return await fetch(`${apiUrl}/highscore/state`, requestOptions).then(
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

  createId: list => {
    let id = 0;

    list.forEach(item => {
      id = Math.max(id, item.id);
    });

    return id + 1;
  }
};
