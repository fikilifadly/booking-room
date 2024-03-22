const express = require("express");
const authentication = require("../middlewares/AuthHandler");
const RoomController = require("../controllers/RoomController");
const router = express.Router();

router.use(authentication);
router.get("/room", RoomController.getAllRoom);
router.post("/room", RoomController.addRoom);
router.patch("/room/:id", RoomController.editRoom);
router.delete("/room/:id", RoomController.deleteRoom);

module.exports = router;
