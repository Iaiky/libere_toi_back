var db = require("../configs/connect")
// var md5 = require("md5")


// Get all user
module.exports = {
    getAll : (req, res, next) => {
        var sql = "select * from service"
        var params = []
        db.query(sql, params, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    //Get 4 services by idvendeur
    get : (req, res, next) => {
        var sql = `Select service.idservice, service.titre, service.description, service.prix, service.delai, service.consigne, service.image_source, categorie.titre as categorie, user.prenom 
        from ((service 
            inner join categorie on service.idcategorie = categorie.categorie)
            inner join user on service.idvendeur = user.iduser) 
        where idvendeur= ${req.params.id} order by idservice desc limit 4`
        db.query(sql, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    //liste 
    listerNom : (req, res, next) => {
        var sql = "select idservice, titre FROM service"
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
    categorie : (req, res, next) => {
        var sql = `Select service.idservice, service.titre, service.description, service.prix, service.delai, service.consigne, service.image_source, categorie.titre as categorie, user.prenom 
        from ((service 
            inner join categorie on service.idcategorie = categorie.categorie)
            inner join user on service.idvendeur = user.iduser) 
        where idcategorie= ${req.params.id} order by idservice `
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

    //vendeur get en fonction de idservice
    vendeurNom : (req, res, next) => {
        var sql = `select service.idvendeur, concat( user.nom,' ',usr.prenom) as nom from service 
        inner join user as user on service.idvendeur = user.iduser
        inner join user as usr on service.idvendeur = usr.iduser
        where idservice = ${req.params.id}`
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

    //Create a new user
    post : (req, res, next) => {
        var errors=[]
        if (!req.body.description){
            errors.push("No description specified");
        }
        if (!req.body.idcategorie){
            errors.push("No idcategorie specified");
        }
        if (!req.body.titre){
            errors.push("No titre specified");
        }
        if (!req.body.prix){
            errors.push("No prix specified");
        }
        if (!req.body.delai){
            errors.push("No delai specified");
        }
        if (!req.body.consigne){
            errors.push("No consigne specified");
        }
        if (!req.body.idvendeur){
            errors.push("No idvendeur specified");
        }
        if (!req.body.image_source){
            errors.push("No image_source specified");
        }
        
        var data = {
            description: req.body.description,
            idcategorie: req.body.idcategorie,
            titre: req.body.titre,
            prix: req.body.prix,
            delai: req.body.delai,
            consigne: req.body.consigne,
            idvendeur: req.body.idvendeur,
            image_source: req.body.image_source,          
        }

        var sql =`INSERT INTO service(description, idcategorie, titre, prix, delai, consigne, idvendeur, image_source) 
                    VALUES ( '${data.description}', ${data.idcategorie}, '${data.titre}', ${data.prix}, '${data.delai}', '${data.consigne}', ${data.idvendeur}, 'http://localhost:3000/uploads/${data.image_source}')`
        db.query(sql, function (err, rows, field) {
            if (!err){
                res.send('Insertion was successful')
            }
            else{ console.log(err.message) }
        });
    },

    //update a new user
    // put : (req, res, next) => {
    //     var data = {
    //         nom: req.body.nom,
    //         prenom: req.body.prenom,
    //         email: req.body.email,
    //         mdp : req.body.mdp,
    //         tel : req.body.tel
    //     }
    //     let sql = `update user
    //                 set nom = '${data.nom}',
    //                 prenom = '${data.prenom}',
    //                 email = '${data.email}',
    //                 tel = '${data.tel}',
    //                 mdp = '${data.mdp}'
    //                 where iduser = ${req.params.id}`
    //     db.query(sql, (err, rows, field)=>{
    //         if(!err){
    //             res.send('Update was successful')
    //         }
    //         else{ console.log(err.message) }
    //     })
    // },

    // //delete a user
    // delete : (req, res, next) => {
    //     let sql = `delete from user where iduser=${req.params.id}`

    //     db.query(sql, (err, rows, field)=>{
    //     if(!err){
    //         res.send('Deleted was successful')
    //     }
    //     else{ console.log(err.message) }
    // })
    // },
    // //authentication
    // auth : (req, res, next) => {
    //     var errors=[]
    //     if (!req.body.mdp){
    //         errors.push("No password specified");
    //     }
    //     if (!req.body.email){
    //         errors.push("No email specified");
    //     }
    //     if (errors.length){
    //         res.status(400).json({"error":errors.join(",")});
    //         return;
    //     }
    //     var data = {
    //         email: req.body.email,
    //         mdp : req.body.mdp
    //     }
    //     var sql =`SELECT * FROM user WHERE email='${data.email}' and mdp='${data.mdp}'`
    //     db.query(sql, function (err, rows, field) {
    //         if (err){
    //             res.status(400).json({"error": err.message})
    //             return;
    //         }
    //         if(rows.length === 0) {   
    //             res.status(400).send("No Match")
    //             return;          
    //         }
    //         res.json({
    //             "message": "success",
    //             "data": rows
    //         })
    //     });
    // },

}