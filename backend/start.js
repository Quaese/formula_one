const { spawn } = require("child_process");
const fs = require("fs");
const helper = require("./helpers/helper");

const filename = __dirname + "/" + "../src/config/" + "env.js";
const ip = helper.getIPAddress()[0];

let content;
// server modes:
// 1 = development (default), 2 = production
let mode = 1;

// parse arguments
process.argv.forEach(function(val, index) {
  // if current argument is *mode* => get following value of argv
  if (val === "-mode") mode = process.argv[index + 1];
});

/*
 * Function to write content to a file.
 * If file with *filename* doesn't exist it is created.
 */
const writeEnvFile = (filename, content) => {
  fs.writeFileSync(
    filename,
    content,
    {
      encoding: "utf8",
      flag: "w+"
    },
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
};

// create content for environment file
content = `/* eslint-disable */\nexport const env = {"ip": "${ip}"};`;

// write environment file
writeEnvFile(filename, content);

// start node server
const nodemon =
  mode === 1
    ? spawn("node_modules/.bin/nodemon", ["-e", "index.js"])
    : spawn("node", ["./index.js"]);

// event handler for spawn child processes
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
