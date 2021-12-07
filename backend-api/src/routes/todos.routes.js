const router = require("express-promise-router")();
const {
  createTodo,
  getTodos,
  getTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todos.controller");
const isAuthenticated = require("../middlewares/auth");

router.get("/todos/:id", isAuthenticated, async (req, res) => {
  res.send(await getTodo(req.params.id));
});

router.get("/todos", isAuthenticated, async (req, res) => {
  res.send(await getTodos(req.userData.userId));
});

router.post("/todos", isAuthenticated, async (req, res) => {
  res.status(201).send(await createTodo(req.body, req.userData.userId));
});

router.delete("/todos/:id", isAuthenticated, async (req, res) => {
  res.send(await deleteTodo(req.params.id));
});

router.put("/todos/:id", isAuthenticated, async (req, res) => {
  res.send(await updateTodo(req.params.id, req.body));
});

module.exports = router;
