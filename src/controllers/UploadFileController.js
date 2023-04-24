var db = require("../configs/connect")


module.exports = {
    // upload file  
    upload : (req, res, next) => {
        res.json({file:req.file})
        // res.send("upload successfull")
    },

    // upload multiple file  
    multiUpload : (req, res, next) => {
        
    }
}