const express = require('express')
const router = express.Router();

const controller = require("../controllers/UploadFileController")

//upload single file
router.post("/single",controller.upload);

//upload multiple file
router.post("/multiple",controller.multiUpload);


module.exports = router