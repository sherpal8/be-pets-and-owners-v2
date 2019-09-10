const apiRouter = require("express").Router();
const ownersRouter = require("./ownersRouter");
const petsRouter = require("./petsRouter");

apiRouter.get("/", (req, res) =>
  res.status(200).send({ msg: "Welcome to pets and owners" })
);

apiRouter.use("/owners", ownersRouter);
apiRouter.use("/pets", petsRouter);

module.exports = apiRouter;
