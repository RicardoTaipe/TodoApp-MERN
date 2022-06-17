const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const multer = require("./middlewares/uploader");
const morgan = require("morgan");
const compression = require("compression");
const customErrorHandler = require("./middlewares/error-handler");

require("dotenv").config();
require("./database");

//routes

const todoRoutes = require("./routes/todos.routes");
const userRoutes = require("./routes/users.routes");
const app = express();

//Settings
app.set("port", 8080 || process.env.PORT);

//Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(todoRoutes);
app.use(userRoutes);

//Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(multer.single("image"));

//Custom error handler
app.use(customErrorHandler);

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});

module.exports = server;
