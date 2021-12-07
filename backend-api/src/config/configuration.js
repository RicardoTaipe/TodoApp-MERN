module.exports = {
  //'mongodb://username:password@host:port/database?options...' format for remote db
  DB_URL: process.env.DB_URL ?? "mongodb://localhost:27017/todo_mern",
  ENV: process.env.NODE_ENV ?? "development",
  JWT_SECRET: process.env.JWT_SECRET ?? "SECRET",
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  API_KEY: process.env.CLOUDINARY_API_KEY ?? "",
  API_SECRET: process.env.CLOUDINARY_API_SECRET ?? "",
};
