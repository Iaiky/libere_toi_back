const { Client } = require('pg')

const client = new Client({
  user: 'Iaiky',
  host: 'localhost',
  database: 'libere_toi',
  password: '1234',
  port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = client