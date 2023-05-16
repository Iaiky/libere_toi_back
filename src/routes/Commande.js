const express = require('express')
const router = express.Router();

const controller = require("../controllers/CommandeController")

//list of commande
router.get("/", controller.getAll);
router.get("/validation", controller.getValidationList);

//Get a single commande by id
router.get("/commandeClient/:id", controller.getCommandeClientList);
router.get("/validClient/:id", controller.getValidClientList);
router.get("/validVendeur/:id", controller.getValidVendeurList);
router.get("/:id", controller.get);

//Create a new commande
router.post("/", controller.post);

//Update a user
// router.patch("/add/:id", controller.add);
// router.put("/:id", controller.put);

//Delete a user
// router.delete("/:id", controller.delete);

//Authentication
// router.post("/auth", controller.auth);

module.exports = router