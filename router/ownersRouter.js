const ownersRouter = require("express").Router();
const _ = require("../controllers/owners");

ownersRouter.get("/", _.getAllOwners);
ownersRouter.post("/", _.postOwner);
ownersRouter.get("/:owner_id", _.getOwnerById);
ownersRouter.patch("/:owner_id", _.patchOwner);
ownersRouter.delete("/:owner_id", _.deleteOwnerByIdController);

module.exports = ownersRouter;
