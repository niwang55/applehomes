const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Home = mongoose.model('Home', {
  address: String,
  title: String,
  link: String,
  summary: String,
  description: String,
  access: String,
  neighborhood: String,
  transportation: String,
  notes: String,
  area: String,
  price: Number,
  people: Number,
  bedrooms: Number,
  beds: Number,
  bathrooms: Number,
  fullHome: Boolean,
  privateRoom: Boolean,
  privateBath: Boolean
});

const Area = mongoose.model('Area', {
  city: String,
  description: String,
  picture: String
});

module.exports = {
  Home: Home,
  Area: Area
};