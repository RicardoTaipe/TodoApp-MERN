module.exports = {
  //'mongodb://username:password@host:port/database?options...' format for remote db
  DB_URL: process.env.DB_URL ?? "mongodb://localhost:27017/todo_mern",
  ENV: process.env.NODE_ENV ?? "development",
};
