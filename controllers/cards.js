const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate("owner")
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: "Error en el servidor" }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Datos inválidos al crear la tarjeta" });
      }
      res.status(500).send({ message: "Error en el servidor" });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ message: "Tarjeta eliminada exitosamente" }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de tarjeta inválido" });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      res.status(500).send({ message: "Error en el servidor" });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de tarjeta inválido" });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      res.status(500).send({ message: "Error en el servidor" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de tarjeta inválido" });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      res.status(500).send({ message: "Error en el servidor" });
    });
};
