const { spawn } = require("child_process");
const helper = require("./helpers/helper");

const ip = helper.getIPAddress()[0];
const nodemon = spawn("node_modules/.bin/nodemon", ["-e", "index.js"]);

nodemon.stdout.on("data", data => {
  console.log(`${data}`);
});

nodemon.stderr.on("data", data => {
  console.log(`${data}`);
});

nodemon.on("close", code => {
  console.log(`child process exited with code ${code}`);
});

console.log("start.js", ip);
