const express = require('express')
const router = express.Router();

const controller = require("../controllers/ServiceController")

//list of service
router.get("/", controller.getAll);
router.get("/listeNom", controller.listerNom);
router.get("/vendeurNom/:id", controller.vendeurNom);
router.get("/categorie/:id", controller.categorie);
// router.get("/unvalidList", controller.getUnvalidList);

//Get a single service by id
router.get("/:id", controller.get);

//Create a new service
router.post("/", controller.post);

//Update a user
// router.patch("/add/:id", controller.add);
// router.put("/:id", controller.put);

//Delete a service
router.delete("/:id", controller.delete);

//Authentication
// router.post("/auth", controller.auth);

module.exports = router