const express = require("express");
const router = express.Router();
const state = require("../models/state.model");
const m = require("../helpers/middlewares");

// Complete state
router.get("/", async (req, res) => {
  await state
    .getState()
    .then(state => res.json(state))
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

router.put("/", m.checkStateFields, async (req, res) => {
  await state
    .updateState(req.body)
    .then(state =>
      res.json({
        message: "State has been updated",
        code: 1,
        content: state
      })
    )
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

// Routes
module.exports = router;
