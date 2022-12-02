require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    app.listen(process.env.PORT || 8080, () => console.log("Server running"));
  })
  .catch(console.log);
