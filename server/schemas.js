const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Home = mongoose.model('Home', {
  address: String,
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

module.exports = {
  Home: Home
};