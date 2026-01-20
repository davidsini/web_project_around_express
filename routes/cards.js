const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;
const cardsPath = path.join(__dirname, "../data/cards.json");

router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(cardsPath, "utf-8");
    const cards = JSON.parse(data);
    res.send(cards);
  } catch (error) {
    res.status(500).send({ message: "An error has ocurred on the server" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await fs.readFile(cardsPath, "utf-8");
    const cards = JSON.parse(data);
    const card = cards.find((item) => item._id === req.params.id);

    if (!card) {
      return res.status(404).send({ message: "Requested resource not found" });
    }
    res.send(card);
  } catch (error) {
    res.status(500).send({ message: "An error has ocurred on the server" });
  }
});

module.exports = router;
