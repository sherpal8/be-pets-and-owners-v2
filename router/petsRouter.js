const petsRouter = require("express").Router();
const _pets = require("../controllers/pets");

petsRouter
  .route("/:pet_id")
  .get(_pets.getPetById)
  .delete(_pets.deletePetByIdController);

petsRouter
  .route("/owner/:owner_id")
  .get(_pets.getPetsByOwnerId)
  .post(_pets.postPets);

module.exports = petsRouter;
