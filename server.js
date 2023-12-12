// Create express app
const { createServer } = require('http');
const express = require('express');
const { json, send } = require('micro');
const microCors = require('micro-cors');

const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Replace cors middleware with micro-cors
const cors = microCors({
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  origin: '*', // Change this to your frontend URL in production
});

// Express middleware to allow CORS
app.use(cors);

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
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Convert Express app to a serverless function for Vercel
module.exports = (req, res) => {
  if (req.method === 'OPTIONS') {
    // Handling preflight requests
    return send(res, 200, 'Preflight accepted');
  }

  return app(req, res);
};