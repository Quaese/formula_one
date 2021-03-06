import ArrayService from "../../services/array.service";
import { config } from "../../config/config";

// const apiUrl = "http://localhost:4000";
// const apiUrl = "http://localhost:1337";
const apiUrl = config.apiUrl;

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
    const requestUrl = config.fakeBackend
      ? `${apiUrl}/highscore/state`
      : `${apiUrl}/api/v1/state`;

    // return await fetch(`${apiUrl}/highscore/state`, requestOptions).then(
    // return await fetch(`${apiUrl}/api/v1/state`, requestOptions).then(
    return await fetch(requestUrl, requestOptions).then(handleResponse);
  },

  /*
   * Updates the state (async)
   */
  updateState: async state => {
    // clone state and remove unnecessary properties before update
    let saveState = { ...state };
    delete saveState.loading;
    delete saveState.fields;
    delete saveState.modify;

    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(saveState),
      headers: { "Content-Type": "application/json" }
    };
    const requestUrl = config.fakeBackend
      ? `${apiUrl}/highscore/state`
      : `${apiUrl}/api/v1/state`;

    return await fetch(requestUrl, requestOptions).then(response => {
      return response.status;
    });
  },

  sortHighscorelist: list => {
    let highscoreList = list.sort(ArrayService.sortObjectByProperty("time"));

    // add differences
    highscoreList.length &&
      highscoreList.reduce((accu, curr, index, array) => {
        curr.diff_first = curr.time - array[0].time;
        curr.diff_prev = curr.time - accu;

        return curr.time;
      }, highscoreList[0].time);

    return [...highscoreList];
  },

  createId: (prefix, idList, additionalPre = "") => {
    let id = idList.length;

    while (idList.indexOf(prefix + additionalPre + id) > -1 && id < 1000) {
      id++;
    }

    return prefix + additionalPre + id;
  }
};
