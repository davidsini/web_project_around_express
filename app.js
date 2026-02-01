const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const usersRoutes = require("./routes/users.js");
const cardsRoutes = require("./routes/cards.js");

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.error("Error conectando a la base de datos", err);
  });

app.use((req, res, next) => {
  req.user = {
    _id: "697fbaff5c7d07714a7ab07e",
  };
  next();
});

app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
