const Todo = require("../models/todo");
const createError = require("http-errors");

const createTodo = async (req, res, next) => {
  const { title, description } = req.body;
  const errors = {};
  if (!title.trim()) errors.title = "title must not be empty";
  if (!description.trim()) errors.description = "description must not be empty";
  if (Object.keys(errors).length > 0) {
    return next(createError(400, { errors }));
  }
  const newTodo = new Todo({ title, description });
  const result = await newTodo.save(newTodo);
  res.status(201).json(result);
};

module.exports = { createTodo };
