const { createTodo, getTodos } = require("./todos.controller");
const Todo = require("../models/todo");
const createError = require("http-errors");

jest.mock("../models/todo");

test("should add a new todo", async () => {
  const todo = {
    title: "asda",
    description: "lorem ipusm",
  };

  const spy = jest.spyOn(Todo.prototype, "save").mockResolvedValue(todo);

  const newTodo = await createTodo(todo);

  expect(spy).toHaveBeenCalled();
  expect(newTodo).toEqual(todo);

  spy.mockRestore();
});

test("should not add a new todo", async () => {
  const todo = {
    title: "",
    description: "",
  };

  try {
    await createTodo(todo);
  } catch (error) {
    expect(error).toEqual(new createError.BadRequest());
  }
});

test("should get all todos", async () => {
  const expectedTodos = [
    {
      title: "asda",
      description: "lorem ipusm",
    },
    {
      title: "asda",
      description: "lorem ipusm",
    },
  ];
  const spy = jest.spyOn(Todo, "find").mockResolvedValue(expectedTodos);

  const todos = await getTodos();

  expect(spy).toHaveBeenCalled();
  expect(todos).toEqual(expectedTodos);
  spy.mockRestore();
});
