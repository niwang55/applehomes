const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

const configs = require('./config.js');

const schemas = require('./schemas.js');
let Home = schemas.Home;
let Area = schemas.Area;

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.text({defaultCharset: 'utf-8'}));

// Database
mongoose.connect('mongodb://localhost/applehomes');

// Sessions
app.use(session({
  secret: 'apple homes',
  resave: false,
  saveUninitialized: true
}));

// Cloudinary
cloudinary.config(configs.cloudinary);

app.use(express.static(path.join(__dirname, '../client')));

// Routes

app.get('/api/test', (req, res) => {
  cloudinary.api.resources(function(result) {
    res.send(result);
  },
    {
      type: 'upload',
      prefix: '50 Alice Street Unit C, Arcadia, CA 91006/'
    });
});

// Route for getting list of homes
app.get('/api/homes', (req, res) => {
  Home.find({}, (err, homes) => {
    res.send(homes);
  });
});

// Route for adding a new home
app.post('/api/homes', (req, res) => {
  Home.create(req.body, (err, home) => {
    if (err) { console.log('Error in posting to homes', err); }
    console.log('Added home to db');
  });

  res.end();
});

// Route for getting list of areas
app.get('/api/areas', (req, res) => {
  let areaArray = [];

  Area.find({}, (err, results) => {
    res.send(results);
  });
});

// Route for updating the current home a user is looking at
app.post('/api/currenthome', (req, res) => {
  req.session.currentHome = req.body.address;

  res.end();
});

// Route for updating the current area a user is looking at
app.post('/api/currentarea', (req, res) => {
  req.session.currentArea = req.body.area;

  res.end();
});

// Route for getting details of a home based on the one that the user clicked
app.get('/api/homedetail', (req, res) => {
  Home.findOne({address: req.session.currentHome}, (err, home) => {
    if (err) {
      console.log(err);
    }

    // Have to wrap in array for some reason
    res.send([home]);
  });
});

// ROute for getting details of an area based on the one that the user clicked
app.get('/api/areadetails', (req, res) => {
  Area.find({city: req.session.currentArea}, (err, area) => {
    if (err) {
      console.log(err);
    }

    res.send([area]);
  });
});

// Route for getting homes related to an area based on the one that the user clicked
app.get('/api/areahomes', (req, res) => {
  Home.find({area: req.session.currentArea}, (err, homes) => {
    if (err) {
      console.log(err);
    }

    res.send(homes);
  });
});

// Route for getting pictures related to a certain home
app.get('/api/homepictures', (req, res) => {
  cloudinary.api.resources(function(result) {
    res.send(result);
  },
    {
      type: 'upload',
      prefix: `${req.session.currentHome}/`,
      max_results: 50,
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, function() {
  console.log('App is now listening on port 3000');
});