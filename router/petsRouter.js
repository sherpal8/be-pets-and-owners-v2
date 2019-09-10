const petsRouter = require("express").Router();
const _pets = require("../controllers/pets");

petsRouter.get("/:pet_id", _pets.getPetById);
petsRouter.get("/owner/:owner_id", _pets.getPetsByOwnerId);
petsRouter.post("/owner/:owner_id", _pets.postPets);
petsRouter.delete("/:pet_id", _pets.deletePetByIdController);

module.exports = petsRouter;
