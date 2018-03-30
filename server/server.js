const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
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
app.use(compression());

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

// Middleware for route authentication
function isAuthenticated(req, res, next) {
  if (req.session.authenticated = true) {
    return next();
  }

  res.redirect('/');
}

// Routes

// Route for testing purposes
app.get('/api/test', (req, res) => {
  cloudinary.api.resources(function(result) {
    res.send(result);
  },
    {
      type: 'upload',
      prefix: '50 Alice Street Unit C, Arcadia, CA 91006/'
    });
});

// Route for login
app.post('/api/login', (req, res) => {
  if (req.body.password === configs.SITE_PASSWORD) {
    req.session.authenticated = true;

    res.send({
      authenticated: true
    });
  } else {
    req.session.authenticated = false;
    
    res.send({
      authenticated: false
    });
  }
});

// Route for logging out
app.get('/api/logout', (req, res) => {
  req.session.destroy();
  res.end();
});

// Route for checking authentication
app.get('/api/authenticate', (req, res) => {
  if (req.session.authenticated) {
    res.send({
      authenticated: true
    });
  } else {
    res.send({
      authenticated: false
    });
  }
});

// Route for getting list of homes
app.get('/api/homes', (req, res) => {
  Home.find({}, (err, homes) => {
    res.send(homes);
  });
});

// Route for adding a new home
app.post('/api/homes', isAuthenticated, (req, res) => {
  Home.create(req.body, (err, home) => {
    if (err) { console.log('Error in posting to homes', err); }
    console.log('Added home to db');
  });

  res.end();
});

// Route for uploading pictures to new home
app.post('/api/homepictures', isAuthenticated, (req, res) => {
  cloudinary.v2.uploader.upload(req.body.file64, {folder: req.body.address});

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

// Route for updating the current editing home
app.post('/api/editinghome', isAuthenticated, (req, res) => {
  req.session.currentEditingHome = req.body.address;

  res.end();
});

// Route for getting the details about the home user is editing
app.get('/api/editinghome', isAuthenticated, (req, res) => {
  Home.find({address: req.session.currentEditingHome}, (err, result) => {
    res.send(result[0]);
  });
});

// Route for updating details of a home, just delete and replace instead of update
app.post('/api/updatehome', isAuthenticated, (req, res) => {
  Home.find({address: req.body.address}).remove().exec();

  Home.create(req.body, (err, home) => {
    if (err) { console.log('Error in updating home', err); }
    console.log('Added updated home to db');
  });

  res.end();
});

// Route for deleting a home from the database
app.post('/api/deletehome', isAuthenticated, (req, res) => {
  Home.find({address: req.body.address}).remove().exec();

  cloudinary.api.delete_resources_by_prefix(`${req.body.address}/`, function(result) {});

  res.end();
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, function() {
  console.log('App is now listening on port 3000');
});
