const fs = require("fs");
const os = require("os");

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

const getIPAddress = () => {
  "use strict";

  const ifaces = os.networkInterfaces();
  let addresses = [];

  Object.keys(ifaces).forEach(ifname => {
    ifaces[ifname].forEach(function(iface) {
      if ("IPv4" !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      // push ip address to result array
      addresses.push(iface.address);
    });
  });

  return addresses;
};

module.exports = {
  newDate,
  writeJSONFile,
  getIPAddress
};
