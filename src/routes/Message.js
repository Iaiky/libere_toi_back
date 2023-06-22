const express = require('express')
const router = express.Router();

const controller = require("../controllers/MessageController")

//list of message
router.get("/", controller.getAll);
router.get("/ListeMP/:id", controller.getMP);
router.get("/:idSend/:idReceive", controller.get);
router.get("/LastMP/:idSend/:idReceive", controller.getLastMP);



//Create a new message
router.post("/", controller.post);

//Update a message
// router.patch("/add/:id", controller.add);
router.put("/:id", controller.put);

//Delete a user
// router.delete("/:id", controller.delete);

//Authentication
// router.post("/auth", controller.auth);

module.exports = router