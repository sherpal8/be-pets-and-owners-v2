const express = require("express");
const app = express();
const { errObj } = require("./error");
const apiRouter = require("./router/apiRouter");
const fs = require("fs");

app.use(express.json());

app.use((req, res, next) => {
  //   console.log(typeof Object.keys(app));
  const date = new Date().toLocaleString();
  fs.readFile("./log.txt", "utf8", (err, fileData) => {
    if (err) {
      console.log(err);
    }
    let logString = "";
    if (fileData) {
      logString += `${fileData}\n`;
    }
    if (date) {
      logString += `${date}\n`;
      fs.writeFile("./log.txt", logString, err => {
        if (err) console.log(err);
        console.log("event successfully logged in log.txt");
      });
    }
  });
  next();
});

app.use("/api", apiRouter);

// error 404
app.all("*", errObj.errorHandler404);

// error handlers
app.use(errObj.errorHandler400);
app.use(errObj.errorHandler422);
app.use(errObj.errorHandler404);
app.use(errObj.errorHandler500);
app.use(errObj.errorHandler405);

module.exports = app;

/////// code before using routers
// app.get("/api", (req, res) => res.send({ msg: "Welcome to pets and owners" }));

// // owners data
// app.get("/api/owners", _.getAllOwners);
// app.post("/api/owners", _.postOwner);
// app.get("/api/owners/:owner_id", _.getOwnerById);
// app.patch("/api/owners/:owner_id", _.patchOwner);
// app.delete("/api/owners/:owner_id", _.deleteOwnerByIdController);

// // pets data
// app.get("/api/pets/:pet_id", _pets.getPetById);
// app.get("/api/pets/owner/:owner_id", _pets.getPetsByOwnerId);
// app.post("/api/pets/owner/:owner_id", _pets.postPets);
// app.delete("/api/pets/:pet_id", _pets.deletePetByIdController);
