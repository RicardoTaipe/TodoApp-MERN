const router = require("express-promise-router")();
const {
  createTodo,
  getTodos,
  getTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todos.controller");

router.get("/todos/:id", async (req, res) => {
  res.send(await getTodo(req.params.id));
});

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
  res.send(await updateTodo(req.params.id, req.body));
});

module.exports = router;
