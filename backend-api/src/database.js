const mongoose = require("mongoose");
const config = require("./config/configuration");

mongoose
  .connect(config.DB_URL)
  .then(() => console.log("DB connected"))
  .catch((error) => console.error(error));
