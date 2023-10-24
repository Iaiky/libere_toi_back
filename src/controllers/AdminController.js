var db = require("../configs/connect")
// var md5 = require("md5")

module.exports = {
    getAll : (req, res, next) => {
        var sql = "select * from client"
        var params = []
        db.query(sql, params, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    //Get a single admin by id
    get : (req, res, next) => {
        var sql = `Select * from admin where "idAdmin"= ${req.params.id}`
        db.query(sql, (err, result) => {
            if (!err) {
                res.send(result.rows)
            }
          });
    },

    //Create a new user
    post : (req, res, next) => {
        var errors=[]
        if (!req.body.firstname){
            errors.push("No firstname specified");
        }
        if (!req.body.lastname){
            errors.push("No lastname specified");
        }
        if (errors.length){
            res.status(400).json({"error":errors.join(",")});
            return;
        }
        var data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            // password : md5(req.body.password),
            tel : req.body.tel
        }
        var sql =`INSERT INTO admin("nomAdmin", "prenomAdmin", tel) 
                    VALUES ( '${data.firstname}', '${data.lastname}', '${data.tel}')`
        db.query(sql, function (err, result) {
            if (!err){
                res.send('Insertion was successful')
            }
            else{ console.log(err.message) }
        });
    },

    //update a new user
    put : (req, res, next) => {
        var data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            // password : md5(req.body.password),
            tel : req.body.tel
        }
        let sql = `update admin
                    set "nomAdmin" = '${data.firstname}',
                    "prenomAdmin" = '${data.lastname}',
                    tel = '${data.tel}'
                    where "idAdmin" = ${req.params.id}`
        db.query(sql, (err, result)=>{
            if(!err){
                res.send('Update was successful')
            }
            else{ console.log(err.message) }
        })
    },

    //delete a user
    delete : (req, res, next) => {
        let sql = `delete from user where "iduser"=${req.params.id}`

        db.query(sql, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    },
    //authentication
    auth : (req, res, next) => {
        var errors=[]
        if (!req.body.password){
            errors.push("No password specified");
        }
        if (!req.body.email){
            errors.push("No email specified");
        }
        if (errors.length){
            res.status(400).json({"error":errors.join(",")});
            return;
        }
        var data = {
            email: req.body.email,
            password : req.body.password
        }
        var sql ='SELECT * FROM user WHERE email=? and password=? and validation = 1'
        var params =[data.email, data.password]
        db.all(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            if(result.length === 0) {   
                res.status(400).send("No Match")
                return;          
            }
            res.json({
                "message": "success",
                "data": result
            })
        });
    },

}