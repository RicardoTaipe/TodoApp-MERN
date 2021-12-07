const router = require("express-promise-router")();
const {
  signUp,
  logIn,
  getUserDetail,
  updateUserDetails,
  uploadProfilePhoto,
} = require("../controllers/users.controller");
const isAuthenticated = require("../middlewares/auth");

router.post("/signup", async (req, res) => {
  res.send(await signUp(req.body));
});

router.post("/login", async (req, res) => {
  res.send(await logIn(req.body));
});

router.get("/users", isAuthenticated, async (req, res) => {
  res.send(await getUserDetail(req.userData.userId));
});

router.post("/users", isAuthenticated, async (req, res) => {
  res.send(await updateUserDetails(req.userData.userId, req.body));
});

router.post("/users/image", isAuthenticated, async (req, res) => {
  res.send(await uploadProfilePhoto(req.userData.userId, req.file));
});

module.exports = router;
