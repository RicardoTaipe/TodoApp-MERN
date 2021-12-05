const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} = require("./todos.controller");
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

test("should delete a todo by id", async () => {
  const spyFind = jest.spyOn(Todo, "findOne").mockResolvedValue(true);
  const id = "61ac04e8e581860cd81e44aa";
  const spyDelete = jest.spyOn(Todo, "deleteOne");
  await deleteTodo(id);
  expect(spyDelete).toHaveBeenCalled();
  expect(spyDelete).toHaveBeenCalledWith({ _id: id });
  spyDelete.mockRestore();
});

test("should not delete a todo when todo not found", async () => {
  jest.spyOn(Todo, "findOne").mockResolvedValue(false);
  const id = "61ac04e8e581860cd81e44aa";

  try {
    await deleteTodo(id);
  } catch (error) {
    expect(error).toEqual(new createError.NotFound(["Todo not found"]));
  }
});

test("should update a todo by id", async () => {
  jest.spyOn(Todo, "findOne").mockResolvedValue(true);
  const todo = {
    title: "asda",
    description: "lorem ipusm",
  };
  const spy = jest.spyOn(Todo, "findOneAndUpdate");
  const id = "61ac04e8e581860cd81e44aa";
  await updateTodo(id, todo);
  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledWith(id, todo);
});

test("should not update a todo when todo not found", async () => {
  const spy = jest.spyOn(Todo, "findOne").mockResolvedValue(false);
  const id = "61ac04e8e581860cd81e44aa";
  const todo = {
    title: "asda",
    description: "lorem ipusm",
  };
  try {
    await updateTodo(id, todo);
  } catch (error) {
    expect(error).toEqual(new createError.NotFound(["Todo not found"]));
  }
});
