const express = require("express");
const ClientController = require("../controllers/ClientController");
const authentication = require("../middlewares/AuthHandler");
const router = express.Router();

router.use(authentication);
router.get("/client", ClientController.getAllClients);
router.get("/client/:id", ClientController.getClientById);
router.post("/client", ClientController.addClient);
router.patch("/client/:id", ClientController.editClient);
router.delete("/client/:id", ClientController.deleteClient);

module.exports = router;
