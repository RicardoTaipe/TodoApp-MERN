const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();
require("./database");

const app = express();

//Settings
app.set("port", 3001 || process.env.PORT);

//Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Custom error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ status: error.status, message: error.message });
});

let server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});

module.exports = server;
