const { signUp, logIn } = require("./users.controller");
const User = require("../models/user");
const createError = require("http-errors");

jest.mock("../models/user");

test("should register a new user", async () => {
  const user = {
    email: "test@gmail.com",
    password: "test",
    name: "test",
    username: "test avatar",
  };
  const spy = jest.spyOn(User.prototype, "save").mockResolvedValue(user);

  const newUser = await signUp(user);

  expect(spy).toHaveBeenCalled();
  expect(newUser).toEqual(user);

  spy.mockRestore();
});

test("should login an existing user", async () => {
  const user = {
    _id: "231231242323234233",
    email: "test@gmail.com",
    password: "test",
  };

  const spy = jest.spyOn(User, "findOne").mockResolvedValue({
    _id: "231231242323234233",
    email: "test@gmail.com",
    password: "test",
    matchPassword: (password) => {
      return true;
    },
  });

  const newUser = await logIn(user);

  expect(spy).toHaveBeenCalled();

  expect(newUser).toHaveProperty("token");
  expect(newUser).toHaveProperty("uid");

  spy.mockRestore();
});
