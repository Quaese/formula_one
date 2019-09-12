const helper = require("../helpers/helper.js");

const getPath = "../data/";
const updatePath = "./data/";
const filename = "state.json";
const fs = require("fs");
let state;

if (fs.existsSync(__dirname + "/" + getPath + filename)) {
  state = require(getPath + filename);
} else {
  state = require(getPath + "init.state.json");
  helper.writeJSONFile(updatePath + filename, state);
}

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
  return new Promise(resolve => {
    helper.writeJSONFile(updatePath + filename, newState);

    // delete require.cache[require.resolve(getPath + filename)];

    resolve(newState);
  });
}

function deleteState(id) {
  id;
}

module.exports = {
  getState,
  insertState,
  updateState,
  deleteState
};
