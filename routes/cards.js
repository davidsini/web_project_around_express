const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;
const cardsPath = path.join(__dirname, "../data/cards.json");

const doesCardExist = async (req, res, next) => {
  const cardsFile = await fs.readFile(cardsPath, "utf-8");
  const cards = JSON.parse(cardsFile);
  const card = cards.find((item) => item._id === req.params.id);

  if (!card) {
    res.status(404).send({ message: "Recurso solicitado no encontrado" });
    return;
  }

  req.card = card;
  next();
};

const sendCard = (req, res) => {
  res.send(req.card);
};

router.get("/", async (req, res) => {
  const cardsFile = await fs.readFile(cardsPath, "utf-8");
  const cards = JSON.parse(cardsFile);

  res.send(cards);
});

router.get("/:id", doesCardExist, sendCard);

module.exports = router;
