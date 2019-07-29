// Import packages
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index.routes");
// App
const app = express();

// Morgan
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// First route
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

// Starting server
app.listen("1337");
