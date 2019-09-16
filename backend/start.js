const { spawn } = require("child_process");
const fs = require("fs");
const helper = require("./helpers/helper");

const filename = __dirname + "/" + "../src/config/" + "env.js";
const ip = helper.getIPAddress()[0];

let content;

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
content = `export const env = {"ip": "${ip}"};`;

// write environment file
writeEnvFile(filename, content);

// start node server
const nodemon = spawn("node_modules/.bin/nodemon", ["-e", "index.js"]);

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
