const mysql = require('mysql')

const connection = mysql.createConnection({
  host:'bhsgtu3cpuow2xq73lwo-mysql.services.clever-cloud.com',
  user:'ussgy6qj996njw2k',
  password:'ussgy6qj996njw2k', //password null if locally
  database:'bhsgtu3cpuow2xq73lwo'
})


connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection