const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;
const usersPath = path.join(__dirname, "../data/users.json");

const doesUserExist = async (req, res, next) => {
  const data = await fs.readFile(usersPath, "utf-8");
  const users = JSON.parse(data);
  const user = users.find((item) => item._id === req.params.id);

  if (!user) {
    res.status(404).send({ message: "ID de usuario no encontrado" });
    return;
  }

  req.user = user;
  next();
};

const sendUser = (req, res) => {
  res.send(req.user);
};

router.get("/", async (req, res) => {
  const usersFile = await fs.readFile(usersPath, "utf-8");
  const users = JSON.parse(usersFile);

  res.send(users);
});

router.get("/:id", doesUserExist, sendUser);

module.exports = router;
