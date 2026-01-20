const express = require("express");
const app = express();
const PORT = 3000;
const usersRoutes = require("./routes/users.js");
const cardsRoutes = require("./routes/cards.js");

app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);
app.use((req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
