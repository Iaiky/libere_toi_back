var db = require("../configs/connect")

// Get all user 
module.exports = {
    getAll : (req, res, next) => {
        var sql = "select * from user where type=3"
        var params = []
        db.query(sql, params, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    //Get a single vendeur by id
    get : (req, res, next) => {
        var sql = `select concat(user.nom,' ', user.prenom) as nom, user.email, user.bio, image.source as profile, img.source as couverture from user inner join image as image on user.photo= image.idphoto inner join image as img on user.photo_couverture = img.idphoto where iduser= ${req.params.id}`
        db.query(sql, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    //Get a single vendeur by id
    getImg : (req, res, next) => {
        var sql = 'select source from image where idphoto = 9'
        db.query(sql, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    //update a new vendeur
    // put : (req, res, next) => {
    //     var data = {
    //         titre: req.body.titre,
    //         source: req.body.source,
    //     }
    //     let sql = `update vendeur
    //                 set titre = '${data.titre}',
    //                 source = '${data.source}'
    //                 where categorie = ${req.params.id}`
    //     db.query(sql, (err, rows, field)=>{
    //         if(!err){
    //             res.send('Update was successful')
    //         }
    //         else{ console.log(err.message) }
    //     })
    // },

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

}