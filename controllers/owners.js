const {
  fetchAllOwners,
  fetchOwnerById,
  updateOwner,
  createOwner,
  deleteOwnerById
} = require("../models/owners.js");

const _ = {};

_.getAllOwners = (req, res, next) => {
  fetchAllOwners((err, ownersArr) => {
    if (err) next(err);
    res.status(200).send({ ownersArr });
  });
};

_.getOwnerById = (req, res, next) => {
  const { owner_id } = req.params;
  fetchOwnerById(owner_id, (err, singleOwner) => {
    if (err) next(err);
    res.status(200).send({ singleOwner });
  });
};

_.patchOwner = (req, res, next) => {
  const { owner_id } = req.params;
  const data = req.body;
  updateOwner(owner_id, data, (err, patchedOwner) => {
    if (err) next(err);
    res.status(200).send({ patchedOwner });
  });
};

_.postOwner = (req, res, next) => {
  const data = req.body;
  createOwner(data, (err, data) => {
    if (err) next(err);
    res.status(201).send({ newOwner: data });
  });
};

_.deleteOwnerByIdController = (req, res, next) => {
  const { owner_id } = req.params;
  deleteOwnerById(owner_id, (err, msg) => {
    if (err) next(err);
    res.status(200).send(msg);
  });
};

module.exports = _;
