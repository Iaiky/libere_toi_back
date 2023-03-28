const express = require('express')
const router = express.Router();

const controller = require("../controllers/ClientController")

//list of users
router.get("/", controller.getAll);
// router.get("/validList", controller.getValidList);
// router.get("/unvalidList", controller.getUnvalidList);

//Get a single user by id
router.get("/:id", controller.get);

//Create a new user
router.post("/", controller.post);

//Update a user
// router.patch("/add/:id", controller.add);
router.put("/:id", controller.put);

//Delete a user
router.delete("/:id", controller.delete);

//Authentication
router.post("/auth", controller.auth);

module.exports = router