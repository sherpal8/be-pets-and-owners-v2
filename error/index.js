const errObj = {};

errObj.errorHandler400 = (err, req, res, next) => {
  const codes = ["22P02", "42703", "23502", "404"];
  if (codes.includes(err.code) || codes.includes(err.status)) {
    res.status(404).send({ msg: "Page not found" });
  }
  next(err);
};

errObj.errorHandler422 = (err, req, res, next) => {
  const codes = ["23503"];
  if (codes.includes(err.code)) {
    res.status(422).send({ msg: "Unprocessable entity" });
  }
  next(err);
};

errObj.errorHandler404 = (err, req, res, next) => {
  const codes = ["404"];
  if (codes.includes(err.code) || codes.includes(err.status)) {
    res.status(404).send({ msg: "Page not found" });
  }
  next(err);
};

errObj.errorHandler500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Server error" });
};

// controller for invalid 405 methods
errObj.errorHandler405 = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
};

module.exports = { errObj };
