const helper = require("../helpers/helper.js");

const getPath = "../data/";
const updatePath = "./data/";
const filename = "state.json";
let state = require(getPath + filename);

function getState() {
  // delete json object from require cache
  delete require.cache[require.resolve(getPath + filename)];
  state = require(getPath + filename);

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

function insertState(newState) {
  newState;
}

function updateState(newState) {
  return new Promise((resolve, reject) => {
    helper.writeJSONFile(updatePath + filename, newState);

    // delete require.cache[require.resolve(getPath + filename)];

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
