const fakeBackend = false;
const server = "localhost"; // "192.168.0.34"

export const config = {
  apiUrl: fakeBackend ? `http://${server}:4000` : `http://${server}:1337`,
  fakeBackend
};
