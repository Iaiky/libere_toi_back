const mysql = require('mysql')

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root', //passxord null if locally
  database:'libere_toi'
})


connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection