let app;

try {
  app = require("./env");
} catch (error) {
  app = {};
  app.env = { ip: "localhost" };
}

const fakeBackend = false;
const server = app.env.ip; //"localhost"; // "192.168.0.34"

export const config = {
  apiUrl: fakeBackend ? `http://${server}:4000` : `http://${server}:1337`,
  fakeBackend
};
