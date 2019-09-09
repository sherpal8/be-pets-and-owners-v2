const {
  fetchPetsByOwnerId,
  fetchPetById,
  createPet,
  deletePetById
} = require("../models/pets.js");

const _pets = {};

_pets.getPetById = (req, res) => {
  const { pet_id } = req.params;
  fetchPetById(pet_id, (err, parsedPetData) => {
    if (err) console.log(err);
    res.status(200).send({ petById: parsedPetData });
  });
};

_pets.getPetsByOwnerId = (req, res) => {
  const { owner_id } = req.params;
  fetchPetsByOwnerId(owner_id, (err, petsByOwnerArr) => {
    if (err) console.log(err);
    res.status(200).send({ petsByOwner: petsByOwnerArr });
  });
};

_pets.postPets = (req, res) => {
  const { owner_id } = req.params;
  const data = req.body;
  createPet(owner_id, data, (err, newPetData) => {
    if (err) console.log(err);
    res.status(201).send({ newPetData });
  });
};

_pets.deletePetByIdController = (req, res) => {
  const { pet_id } = req.params;
  deletePetById(pet_id, (err, msg) => {
    if (err) console.log(err);
    res.status(200).send(msg);
  });
};

module.exports = _pets;
