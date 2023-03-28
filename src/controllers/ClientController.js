var db = require("../configs/connect")
// var md5 = require("md5")


// Get all user
module.exports = {
    getAll : (req, res, next) => {
        var sql = "select * from user"
        var params = []
        db.query(sql, params, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    //Get a single user by id
    get : (req, res, next) => {
        var sql = `Select * from user where iduser= ${req.params.id}`
        db.query(sql, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    //Create a new user
    post : (req, res, next) => {
        var errors=[]
        if (!req.body.nom){
            errors.push("No firstname specified");
        }
        if (!req.body.prenom){
            errors.push("No lastname specified");
        }
        if (!req.body.email){
            errors.push("No lastname specified");
        }
        if (!req.body.mdp){
            errors.push("No lastname specified");
        }
        if (!req.body.tel){
            errors.push("No lastname specified");
        }
        if (errors.length){
            res.status(400).json({"error":errors.join(",")});
            return;
        }
        var data = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            mdp : req.body.mdp,
            tel : req.body.tel,
            type : req.body.type,
            CIN_Passeport : req.body.CIN_Passeport
        }
        var sql =`INSERT INTO user(nom, prenom, email, tel, mdp, type, CIN_Passeport) 
                    VALUES ( '${data.nom}', '${data.prenom}', '${data.email}', '${data.tel}', '${data.mdp}', ${data.type}, '${data.CIN_Passeport}' )`
        db.query(sql, function (err, rows, field) {
            if (!err){
                res.send('Insertion was successful')
            }
            else{ console.log(err.message) }
        });
    },

    //update a new user
    put : (req, res, next) => {
        var data = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            mdp : req.body.mdp,
            tel : req.body.tel
        }
        let sql = `update user
                    set nom = '${data.nom}',
                    prenom = '${data.prenom}',
                    email = '${data.email}',
                    tel = '${data.tel}',
                    mdp = '${data.mdp}'
                    where iduser = ${req.params.id}`
        db.query(sql, (err, rows, field)=>{
            if(!err){
                res.send('Update was successful')
            }
            else{ console.log(err.message) }
        })
    },

    //delete a user
    delete : (req, res, next) => {
        let sql = `delete from user where iduser=${req.params.id}`

        db.query(sql, (err, rows, field)=>{
        if(!err){
            res.send('Deleted was successful')
        }
        else{ console.log(err.message) }
    })
    },
    //authentication
    auth : (req, res, next) => {
        var errors=[]
        if (!req.body.mdp){
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
            mdp : req.body.mdp
        }
        var sql =`SELECT * FROM user WHERE email='${data.email}' and mdp='${data.mdp}'`
        db.query(sql, function (err, rows, field) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            if(rows.length === 0) {   
                res.status(400).send("No Match")
                return;          
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
    },

}