const router = require("express-promise-router")();
const { createTodo, getTodos } = require("../controllers/todos.controller");

router.get("/todos", async (req, res) => {
  res.send(await getTodos());
});

router.post("/todos", async (req, res) => {
  res.status(201).send(await createTodo(req.body));
});

module.exports = router;
