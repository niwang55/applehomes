const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const schemas = require('./schemas.js');
let Home = schemas.Home;

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.text({defaultCharset: 'utf-8'}));

// Database
mongoose.connect('mongodb://localhost/applehomes');

app.use(express.static(path.join(__dirname, '../client')));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, function() {
  console.log('App is now listening on port 3000');
});