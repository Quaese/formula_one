const fs = require("fs");

const newDate = () => new Date().toString();

const writeJSONFile = (filename, content) => {
  fs.writeFileSync(
    filename,
    JSON.stringify(content),
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

module.exports = {
  newDate,
  writeJSONFile
};
