const {
  fetchAllOwners,
  fetchOwnerById,
  updateOwner,
  createOwner,
  deleteOwnerById
} = require("../models/owners.js");

const _ = {};

_.getAllOwners = (req, res) => {
  fetchAllOwners((err, ownersArr) => {
    if (err) next(err);
    res.status(200).send({ ownersArr });
  });
};

_.getOwnerById = (req, res) => {
  const { owner_id } = req.params;
  console.log(owner_id);
  fetchOwnerById(owner_id, (err, singleOwner) => {
    if (err) next(err);
    res.status(200).send({ singleOwner });
  });
};

_.patchOwner = (req, res) => {
  const { owner_id } = req.params;
  const data = req.body;
  updateOwner(owner_id, data, (err, patchedOwner) => {
    if (err) next(err);
    res.status(200).send({ patchedOwner });
  });
};

_.postOwner = (req, res) => {
  const data = req.body;
  createOwner(data, (err, data) => {
    if (err) next(err);
    res.status(201).send({ newOwner: data });
  });
};

_.deleteOwnerByIdController = (req, res) => {
  const { owner_id } = req.params;
  console.log(owner_id);
  deleteOwnerById(owner_id, (err, msg) => {
    if (err) console.log(err);
    res.status(200).send(msg);
  });
};

module.exports = _;
