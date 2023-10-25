var db = require("../configs/connect")
// var md5 = require("md5")


// Get all user
module.exports = {
    getAll : (req, res, next) => {
        var sql = "select * from message order by idmessage desc"
        var params = []
        db.query(sql, params, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    getMP : (req, res, next) => {
        var sql = `SELECT message.idmessage, message.receveur, message.msg, message.time, concat( user.nom,' ',usr.prenom) as nom, us.photoProfil FROM message 
            inner join user as user on receveur = user.iduser 
            inner join user as usr on receveur = usr.iduser
            inner join user as us on receveur = usr.iduser
            where envoyeur = ${req.params.id} group by receveur`
        db.query(sql, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    getLastMP : (req, res, next) => {
        var sql = `SELECT  message.idmessage, message.msg , message.time, message.receveur, message.status from message          
        where envoyeur = ${req.params.idSend} and receveur = ${req.params.idReceive} order by message.idmessage desc limit 1`
        db.query(sql, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    //Get all msg from discussion 
    get : (req, res, next) => {
        var sql = `SELECT message.idmessage,message.time,message.msg,message.envoyeur,message.receveur,message.status,
        concat( user.nom,' ',user.prenom) as nomenvoyeur, user.photoProfil
        from message 
        inner JOIN user on user.iduser = message.envoyeur
        where(envoyeur=${req.params.idSend} and receveur=${req.params.idReceive}) or (envoyeur=${req.params.idReceive} and receveur=${req.params.idSend})
        order by idmessage LIMIT 20`
        db.query(sql, (err, rows, field) => {
            if (!err) {
                res.send(rows)
            }
          });
    },

    //Create a new message
    post : (req, res, next) => {
        var errors=[]
        if (!req.body.message){
            errors.push("No message specified");
        }
        if (!req.body.idenvoyeur){
            errors.push("No idenvoyeur specified");
        }
        if (!req.body.idreceveur){
            errors.push("No idreceveur specified");
        }
        
        var data = {
            message: req.body.message,      
            idreceveur: req.body.idreceveur, 
            idenvoyeur: req.body.idenvoyeur,              
        }

        var sql =`insert into message(envoyeur, receveur, msg ) 
            values (${data.idenvoyeur}, ${data.idreceveur}, '${data.message}')`
        db.query(sql, function (err, rows, field) {
            if (!err){
                res.send('Insertion was successful')
            }
            else{ console.log(err.message) }
        });
    },

    // update a new message
    put : (req, res, next) => {

        let sql = `update message
                    set status = 1
                    where idmessage = ${req.params.id}`
        db.query(sql, (err, rows, field)=>{
            if(!err){
                res.send('Update was successful')
            }
            else{ console.log(err.message) }
        })
    },

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