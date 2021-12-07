const router = require("express-promise-router")();
const { signUp, logIn } = require("../controllers/users.controller");

router.post("/signup", async (req, res) => {
  res.send(await signUp(req.body));
});

router.post("/login", async (req, res) => {
  res.send(await logIn(req.body));
});

module.exports = router;
