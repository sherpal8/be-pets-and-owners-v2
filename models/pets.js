const fs = require("fs");

const fetchPetById = (pet_id, cb) => {
  fs.readdir("./data/pets", (err, files) => {
    if (err) cb(err);
    files.forEach(file => {
      fs.readFile(`./data/pets/${file}`, "utf-8", (err, petData) => {
        if (err) cb(err);
        const parsedPetData = JSON.parse(petData);
        if (parsedPetData.id === pet_id) {
          cb(null, parsedPetData);
        }
      });
    });
  });
};

const fetchPetsByOwnerId = (owner_id, cb) => {
  fs.readdir("./data/pets", (err, files) => {
    if (err) cb(err);
    const petsArr = [];
    files.forEach(file => {
      fs.readFile(`./data/pets/${file}`, "utf-8", (err, petData) => {
        if (err) cb(err);
        const parsedPetData = JSON.parse(petData);
        petsArr.push(parsedPetData);
        if (petsArr.length === files.length) {
          let petsByOwnerArr = [];
          petsByOwnerArr = petsArr.filter(pet => pet.owner === owner_id);
          cb(null, petsByOwnerArr);
        }
      });
    });
  });
};

const createPet = (owner_id, data, cb) => {
  fs.readdir("./data/pets", (err, files) => {
    if (err) cb(err);
    const newPetId = `p${files.length + 1}`;
    data.id = newPetId;
    data.owner = owner_id;
    fs.writeFile(
      `./data/pets/${newPetId}.json`,
      JSON.stringify(data, null, 2),
      err => {
        if (err) cb(err);
        cb(null, data);
      }
    );
  });
};

const deletePetById = (pet_id, cb) => {
  fs.unlink(`./data/pets/${pet_id}.json`, err => {
    if (err) cb(err);
    const msg = { msg: "Successful deletion" };
    cb(null, msg);
  });
};

module.exports = {
  createPet,
  fetchPetById,
  fetchPetsByOwnerId,
  deletePetById
};
