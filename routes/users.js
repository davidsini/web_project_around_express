const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;
const usersPath = path.join(__dirname, "../data/users.json");

router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(usersPath, "utf-8");
    const users = JSON.parse(data);
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "An error has ocurred on the server" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await fs.readFile(usersPath, "utf-8");
    const users = JSON.parse(data);
    const user = users.find((item) => item._id === req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User ID not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "An error has ocurred on the server" });
  }
});

module.exports = router;
