// Create express app
const express = require('express')
const app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let cors = require("cors");
app.use(cors());

// Express middleware to allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// multer
const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({
  // dest:'./uploads/'
  storage :  fileStorageEngine
});

//connectdb
const client = require('./src/configs/connect.js')

// Server port
const port = 3306


//routes
const adminRoute = require("./src/routes/Admin")
const clientRoute = require("./src/routes/Client")
const vendeurRoute = require("./src/routes/Vendeur")
const categorieRoute = require("./src/routes/Categorie")
const serviceRoute = require("./src/routes/Service")
const commandeRoute = require("./src/routes/Commande")
const messageRoute = require("./src/routes/Message")


const uploadFileRoute = require("./src/routes/UploadFile")


app.use('/admins', adminRoute);
app.use('/clients', clientRoute);
app.use('/vendeur', vendeurRoute);
app.use('/service', serviceRoute);
app.use('/categorie', categorieRoute);
app.use('/commande', commandeRoute);
app.use('/message', messageRoute);

app.use('/upload', upload.single("file"), uploadFileRoute);


// static file 
app.use(express.static('src'));
app.use('/uploads', express.static('uploads'));

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
})

export default app;