const { signUp } = require("./users.controller");
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
