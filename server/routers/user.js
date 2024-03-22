const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const authentication = require("../middlewares/AuthHandler");

router.post("/user/login", UserController.login);

router.use(authentication);
router.post("/user/register", UserController.register);
router.patch("/user/:id", UserController.edit);
router.delete("/user/:id", UserController.delete);
router.get("/user", UserController.getAll);

module.exports = router;
