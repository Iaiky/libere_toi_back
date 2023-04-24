const express = require('express')
const router = express.Router();

const controller = require("../controllers/CategorieController")

//list of categorie
router.get("/", controller.getAll);
router.get("/listeCategorie", controller.lister);
router.get("/listeNomCategorie", controller.listerNom);

//Get a single categorie by id
router.get("/:id", controller.get);

//Create a new categorie
router.post("/", controller.post);

//Update a categorie
// router.patch("/add/:id", controller.add);
router.put("/:id", controller.put);

//Delete a categorie
router.delete("/:id", controller.delete);


module.exports = router