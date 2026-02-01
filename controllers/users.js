const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: "Error en el servidor" }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de usuario inválido" });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      res.status(500).send({ message: "Error en el servidor" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Datos inválidos" });
      }
      res.status(500).send({ message: "Error en el servidor" });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Datos inválidos" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de usuario inválido" });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      res.status(500).send({ message: "Error en el servidor" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Datos inválidos para el avatar" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de usuario inválido" });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      res.status(500).send({ message: "Error en el servidor" });
    });
};
