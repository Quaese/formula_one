const checkStateFields = (req, res, next) => {
  const { seasons, races, results } = req.body;

  // console.log(seasons, races, results);
  if (seasons && races && results) {
    next();
  } else {
    res.status(400).json({
      message: "ERROR: fields not correct"
    });
  }
};

module.exports = {
  checkStateFields
};
