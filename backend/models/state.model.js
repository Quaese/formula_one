const filename = "../data/state.json";
let state = require(filename);
const helper = require("../helpers/helper.js");

function getState() {
  return new Promise((resolve, reject) => {
    if (Object.keys(state).length === 0) {
      reject({
        message: "ERROR: no state available",
        status: 202
      });
    }

    resolve(state);
  });
}

function insertState(newState) {}

function updateState(newState) {
  return new Promise((resolve, reject) => {
    // helper.writeJSONFile(filename, newState);
    resolve(newState);
  });
}

function deleteState(id) {}

module.exports = {
  getState,
  insertState,
  updateState,
  deleteState
};
