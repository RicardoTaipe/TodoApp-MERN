const router = require("express-promise-router")();
const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} = require("../controllers/todos.controller");

router.get("/todos", async (req, res) => {
  res.send(await getTodos());
});

router.post("/todos", async (req, res) => {
  res.status(201).send(await createTodo(req.body));
});

router.delete("/todos/:id", async (req, res) => {
  res.send(await deleteTodo(req.params.id));
});

router.put("/todos/:id", async (req, res) => {
  res.send(await updateTodo(req.params.id));
});

module.exports = router;
