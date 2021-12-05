const Todo = require("../models/todo");
const createError = require("http-errors");

const createTodo = async (body) => {
  const { title, description } = body;

  const errors = {};
  if (!title.trim()) errors.title = "title must not be empty";
  if (!description.trim()) errors.description = "description must not be empty";
  if (Object.keys(errors).length > 0) {
    throw createError(400, errors);
  }

  const newTodo = new Todo({ title, description });
  const result = await newTodo.save(newTodo);
  return result;
};

module.exports = { createTodo };
