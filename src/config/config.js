const fakeBackend = false;

export const config = {
  apiUrl: fakeBackend ? "http://localhost:4000" : "http://localhost:1337",
  fakeBackend
};
