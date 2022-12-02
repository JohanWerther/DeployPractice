const express = require("express");
const errorController = require("./controllers/error-controller");
const HttpError = require("./models/http-error");
const app = express();
const router = require("./routes/index");
const cors = require("cors");

app.use(cors());
app.use(express.json(), express.urlencoded({ extended: false }));

app.use("/api/v1", router);

app.all("*", (req, res, next) => {
  console.log({mensaje: req.user})
  return next(
    new HttpError(
      `La ruta ${req.originalUrl} no pertenece a este servidor`,
      404
    )
  );
});

app.use(errorController);

module.exports = app;
