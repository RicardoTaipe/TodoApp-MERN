const router = require("express-promise-router")();
const { createTodo } = require("../controllers/todos.controller");
router.post("/todos", createTodo);

module.exports = router;
