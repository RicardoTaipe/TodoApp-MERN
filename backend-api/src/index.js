const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const multer = require("multer");
const morgan = require("morgan");
const compression = require("compression");
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

//setting multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (_, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(
  multer({
    storage,
    fileFilter: (_, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const mimeType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mimeType && extname) {
        return cb(null, true);
      }
      cb(new Error("Error: extension file must be jpg or png"));
    },
  }).single("image")
);

//Custom error handler
app.use((error, _, res, next) => {
  res.status(error.status || 500);
  const _error = {
    status: error.status,
    error,
  };
  if (process.env.NODE_ENV !== "production") {
    _error["stack"] = error.stack;
  }
  res.json(_error);
  next();
});

let server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});

module.exports = server;
