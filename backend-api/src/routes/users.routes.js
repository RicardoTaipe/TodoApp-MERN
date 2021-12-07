const router = require("express-promise-router")();
const {
  signUp,
  logIn,
  getUserDetail,
} = require("../controllers/users.controller");
const isAuthenticated = require("../middlewares/auth");

router.post("/signup", async (req, res) => {
  res.send(await signUp(req.body));
});

router.post("/login", async (req, res) => {
  res.send(await logIn(req.body));
});

router.get("/users", isAuthenticated, async (req, res) => {
  res.send(await getUserDetail(req.body.uid));
});

module.exports = router;
