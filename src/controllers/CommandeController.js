var db = require("../configs/connect")
// var md5 = require("md5")


// Get all user
module.exports = {
    getAll : (req, res, next) => {
        var sql = "select * from commande order by idcommande desc"
        var params = []
        db.query(sql, params, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    getCommandeClientList : (req, res, next) => {
        var sql = `SELECT 
        commande.idcommande,commande.client,commande.vendeur,
        commande.service,service.image_source,commande.motif,
        commande.dateCreation,commande.validationVendeur,
        commande.validationPaiementClient,commande.validation
        FROM commande
        INNER JOIN service ON commande.service = service.idservice
        where client = ${req.params.id}
        ORDER BY idcommande DESC LIMIT 10 ;`
        var params = []
        db.query(sql, params, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    getCommandeVendeurList : (req, res, next) => {
        var sql = `SELECT 
        commande.idcommande,commande.client,commande.vendeur,
        commande.service,service.image_source,commande.motif,
        commande.dateCreation,commande.validationVendeur,
        commande.validationPaiementClient,commande.validation
        FROM commande
        INNER JOIN service ON commande.service = service.idservice
        where vendeur = ${req.params.id}
        ORDER BY idcommande DESC LIMIT 10 ;`
        var params = []
        db.query(sql, params, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    getValidClientList : (req, res, next) => {
        var sql = `select * from commande where validationPaiementClient = 0 and client = ${req.params.id} and validationVendeur=1 order by idcommande desc`
        var params = []
        db.query(sql, params, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    getValidVendeurList : (req, res, next) => {
        var sql = `select * from commande where validationVendeur = 0 and vendeur = ${req.params.id} order by idcommande desc`
        var params = []
        db.query(sql, params, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    getValidationList : (req, res, next) => {
        var sql = "select * from commande where validation = 0 order by idcommande desc"
        var params = []
        db.query(sql, params, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    //Get a single service by id
    // get : (req, res, next) => {
    //     var sql = `Select service.idcommande, service.titre, service.description, service.prix, service.delai, service.consigne, service.image_source, categorie.titre as categorie, user.prenom 
    //     from ((service 
    //         inner join categorie on service.idcategorie = categorie.categorie)
    //         inner join user on service.idvendeur = user.iduser) 
    //     where idvendeur= ${req.params.id} order by idservice desc limit 4`
    //     db.query(sql, (err, rows, field) => {
    //         if (!err) {
    //             res.send(rows)
    //         }
    //       });
    // },

    //Create a new commande
    post : (req, res, next) => {
        var errors=[]
        if (!req.body.description){
            errors.push("No description specified");
        }
        if (!req.body.idservice){
            errors.push("No idservice specified");
        }
        if (!req.body.idvendeur){
            errors.push("No idvendeur specified");
        }
        
        var data = {
            description: req.body.description,
            client: req.body.client,      
            idvendeur: req.body.idvendeur, 
            idservice: req.body.idservice,              
        }

        var sql =`insert into commande(client, vendeur, service, dateCreation, motif) 
            values (${data.client}, ${data.idvendeur}, ${data.idservice}, curdate(), '${data.description}');`
        db.query(sql, function (err, rows, field) {
            if (!err){
                res.send('Insertion was successful')
            }
            else{ console.log(err.message) }
        });
    },

    // update a new commande
    clientValidation : (req, res, next) => {

        let sql = `update commande
                    set validationPaiementClient = '1',
                    where idcommande = ${req.params.id}`
        db.query(sql, (err, rows, field)=>{
            if(!err){
                res.send('Update was successful')
            }
            else{ console.log(err.message) }
        })
    },

    vendeurValidation : (req, res, next) => {

        let sql = `update commande
                    set validationVendeur = '1',
                    where idcommande = ${req.params.id}`
        db.query(sql, (err, rows, field)=>{
            if(!err){
                res.send('Update was successful')
            }
            else{ console.log(err.message) }
        })
    },

    Validation : (req, res, next) => {

        let sql = `update commande
                    set validation = '1',
                    where idcommande = ${req.params.id}`
        db.query(sql, (err, rows, field)=>{
            if(!err){
                res.send('Update was successful')
            }
            else{ console.log(err.message) }
        })
    },

    //delete a user
    delete : (req, res, next) => {
        let sql = `delete from commande where idcommande=${req.params.id}`

        db.query(sql, (err, rows, field)=>{
        if(!err){
            res.send('Deleted was successful')
        }
        else{ console.log(err.message) }
    })
    },
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