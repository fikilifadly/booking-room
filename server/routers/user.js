const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const auth = require("../middlewares/AuthHandler");

router.post("/user/login", UserController.login);

router.use(auth);
router.post("/user/register", UserController.register);

module.exports = router;
