const fs = require("fs");
const { fetchPetsByOwnerId } = require("../models/pets.js");

const fetchAllOwners = cb => {
  fs.readdir("./data/owners", (err, files) => {
    if (err) cb(err);
    let ownersArr = [];
    files.forEach(file => {
      fs.readFile(`./data/owners/${file}`, "utf-8", (err, owner) => {
        if (err) cb(err);
        const parsedOwner = JSON.parse(owner);
        ownersArr.push(parsedOwner);
        if (ownersArr.length === files.length) {
          cb(null, ownersArr);
        }
      });
    });
  });
};

const fetchOwnerById = (owner_id, cb) => {
  fetchAllOwners((err, ownersArr) => {
    if (err) cb(err);
    const singleOwner = ownersArr.filter(owner => owner.id === owner_id);
    cb(null, singleOwner[0]);
  });
};

const updateOwner = (owner_id, data, cb) => {
  fetchOwnerById(owner_id, (err, singleOwner) => {
    if (err) cb(err);
    console.log(singleOwner);
    if (data.name) singleOwner.name = data.name;
    if (data.age) singleOwner.age = data.age;
    fs.writeFile(
      `./data/owners/${owner_id}.json`,
      JSON.stringify(singleOwner, null, 2),
      err => {
        if (err) cb(err);
        cb(null, singleOwner);
      }
    );
  });
};

const createOwner = (data, cb) => {
  fetchAllOwners((err, owners) => {
    if (err) cb(err);
    const newId = Date.now();
    data.id = `o${newId}`;
    console.log(data.id);
    fs.writeFile(
      `./data/owners/${data.id}.json`,
      JSON.stringify(data, null, 2),
      err => {
        if (err) cb(err);
        cb(null, data);
      }
    );
  });
};

const deleteOwnerById = (owner_id, cb) => {
  fs.unlink(`./data/owners/${owner_id}.json`, err => {
    if (err) cb(err);
    fetchPetsByOwnerId(owner_id, (err, petsByOwnerArr) => {
      if (err) cb(err);
      let counter = 0;
      petsByOwnerArr.forEach(pet => {
        counter++;
        fs.unlink(`./data/pets/${pet.id}.json`, err => {
          if (err) cb(err);
          if (counter === petsByOwnerArr.length) {
            const msg = {
              msg: `Successful deletion of owner and pets`
            };
            cb(null, msg);
          }
        });
      });
    });
  });
};

module.exports = {
  createOwner,
  fetchAllOwners,
  fetchOwnerById,
  updateOwner,
  deleteOwnerById
};
