var db = require("../configs/connect")


module.exports = {
    // upload file  
    upload : (req, res, next) => {
        // console.log(req.file);
        res.json({ message: 'success', file: req.file })
        // res.send("upload successfull")
    },

    // upload multiple file  
    multiUpload : (req, res, next) => {
        
    }
}