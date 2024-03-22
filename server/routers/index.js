const express = require("express");
const router = express.Router();

const user = require("./user");
const room = require("./room");
const client = require("./client");
const roomusage = require("./roomusage");

// router
router.use(user);
router.use(room);
router.use(client);
router.use(roomusage);

// error handler

module.exports = router;
