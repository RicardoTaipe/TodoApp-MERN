const router = require("express-promise-router")();
const { signUp } = require("../controllers/users.controller");

router.post("/signup", async (req, res) => {
  res.send(await signUp(req.body));
});

module.exports = router;
