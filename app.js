const express = require("express");
const app = express();
const _ = require("./controllers/owners");
const _pets = require("./controllers/pets");

app.use(express.json());

app.get("/api", (req, res) => res.send("Hello World!"));

// owners data
app.get("/api/owners", _.getAllOwners);
app.post("/api/owners", _.postOwner);
app.get("/api/owners/:owner_id", _.getOwnerById);
app.patch("/api/owners/:owner_id", _.patchOwner);
app.delete("/api/owners/:owner_id", _.deleteOwnerByIdController);

// pets data
app.get("/api/pets/:pet_id", _pets.getPetById);
app.get("/api/pets/owner/:owner_id", _pets.getPetsByOwnerId);
app.post("/api/pets/owner/:owner_id", _pets.postPets);
app.delete("/api/pets/:pet_id", _pets.deletePetByIdController);

module.exports = app;
