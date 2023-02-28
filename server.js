// Create express app
const express = require('express')
const app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connectdb
const client = require('./src/configs/connect.js')

// Server port
const port = 3000


//routes
const adminRoute = require("./src/routes/Admin")

app.use('/admins', adminRoute);

// Start server
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Default response for any other request
app.use(function(req, res){
  res.status(404);
});