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
  const todo = await Todo.findOne({ _id: id });
  if (!todo) {
    throw createError(404, "Todo not found");
  }
  await Todo.deleteOne({ _id: id });
};

const updateTodo = async (id, body) => {
  const todo = await Todo.findOne({ _id: id });
  if (!todo) {
    throw createError(404, "Todo not found");
  }
  await Todo.findOneAndUpdate(id, body);
};

const getTodo = async (id) => {
  const todo = await Todo.findOne({ _id: id });
  if (!todo) {
    throw createError(404, "Todo not found");
  }
  return todo;
};

module.exports = { createTodo, getTodos, deleteTodo, updateTodo, getTodo };
