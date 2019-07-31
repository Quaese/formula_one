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

  // delete json object from require cache
  delete require.cache[require.resolve("." + filename)];
};

module.exports = {
  newDate,
  writeJSONFile
};
