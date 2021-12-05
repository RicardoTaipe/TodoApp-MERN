const router = require("express-promise-router")();
const { createTodo } = require("../controllers/todos.controller");

router.post("/todos", async (req, res) => {
  res.status(201).send(await createTodo(req.body));
});

module.exports = router;
