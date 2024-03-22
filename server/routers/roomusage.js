const express = require("express");
const RoomUsageController = require("../controllers/RoomUsageController");
const authentication = require("../middlewares/AuthHandler");
const router = express.Router();

router.use(authentication);
router.get("/roomusage", RoomUsageController.getAllRoomUsage);
router.get("/roomusage/:id", RoomUsageController.getRoomUsageById);
router.post("/roomusage", RoomUsageController.addRoomUsage);
router.patch("/roomusage/:id", RoomUsageController.editRoomUsage);
router.delete("/roomusage/:id", RoomUsageController.deleteRoomUsage);

module.exports = router;
