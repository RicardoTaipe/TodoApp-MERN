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
  return await newTodo.save(newTodo);
};

const getTodos = async () => {
  return await Todo.find();
};

const deleteTodo = async (id) => {
  await Todo.deleteOne({ _id: id });
};

module.exports = { createTodo, getTodos, deleteTodo };
