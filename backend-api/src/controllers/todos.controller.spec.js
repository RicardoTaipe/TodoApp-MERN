const { createTodo } = require("./todos.controller");
const Todo = require("../models/todo");
const createError = require("http-errors");

jest.mock("../models/todo");

test("should add a new todo", async () => {
  const todo = {
    title: "asda",
    description: "lorem ipusm",
  };

  const spy = jest.spyOn(Todo.prototype, "save").mockResolvedValue(todo);

  await createTodo(todo);

  expect(Todo).toHaveBeenCalledTimes(1);
  expect(Todo).toHaveBeenCalledWith(todo);
  expect(spy).toHaveBeenCalled();

  spy.mockRestore();
});

test("should not add a new todo", async () => {
  const todo = {
    title: "",
    description: "",
  };

  try {
    await createTodo(todo);
  } catch (e) {
    expect(e).toEqual(new createError.BadRequest());
  }
});
