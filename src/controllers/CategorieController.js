var db = require("../configs/connect")

// Get all categorie
module.exports = {
    getAll : (req, res, next) => {
        var sql = "select * from categorie"
        var params = []
        db.query(sql, params, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    //Get a single categorie by id
    get : (req, res, next) => {
        var sql = `Select * from categorie where categorie= ${req.params.id}`
        db.query(sql, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    //Create a new categorie
    post : (req, res, next) => {
        var errors=[]
        if (!req.body.titre){
            errors.push("Pas de titre");
        }
        if (!req.body.idphoto){
            errors.push("No source");
        }
        if (errors.length){
            res.status(400).json({"error":errors.join(",")});
            return;
        }
        var data = {
            titre: req.body.titre,
            idphoto: req.body.idphoto,
        }
        var sql =`INSERT INTO categorie(titre, idphoto) 
                    VALUES ( '${data.titre}', '${data.idphoto}' )`
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
            titre: req.body.titre,
            source: req.body.source,
        }
        let sql = `update categorie
                    set titre = '${data.titre}',
                    source = '${data.source}'
                    where categorie = ${req.params.id}`
        db.query(sql, (err, rows, field)=>{
            if(!err){
                res.send('Update was successful')
            }
            else{ console.log(err.message) }
        })
    },

    //delete a user
    delete : (req, res, next) => {
        let sql = `delete from categorie where categorie=${req.params.id}`

        db.query(sql, (err, rows, field)=>{
        if(!err){
            res.send('Deleted was successful')
        }
        else{ console.log(err.message) }
    })
    },
    //liste 
    lister : (req, res, next) => {
        var sql = "select categorie.categorie,categorie.titre,image.source FROM categorie INNER JOIN image ON categorie.idphoto=image.idphoto"
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

    //liste 
    listerNom : (req, res, next) => {
        var sql = "select categorie, titre FROM categorie"
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