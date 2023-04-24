const express = require('express')
const router = express.Router();

const controller = require("../controllers/VendeurController")

//list of vendeur
router.get("/", controller.getAll);
router.get("/img", controller.getImg);

//Get a single vendeur by id
router.get("/:id", controller.get);

//Update a vendeur
// router.patch("/add/:id", controller.add);
// router.put("/:id", controller.put);

//Delete a vendeur
router.delete("/:id", controller.delete);


module.exports = router