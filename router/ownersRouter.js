const ownersRouter = require("express").Router();
const _ = require("../controllers/owners");

ownersRouter
  .route("/")
  .get(_.getAllOwners)
  .post(_.postOwner);

ownersRouter
  .route("/:owner_id")
  .get(_.getOwnerById)
  .patch(_.patchOwner)
  .delete(_.deleteOwnerByIdController);

module.exports = ownersRouter;
