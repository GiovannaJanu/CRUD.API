const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Car = new Schema({
  modelo: {
    type: String
  },
  cor: {
    type: String
  },
  marca: {
    type: String
  },
  num_porta: {
    type: Number
  }
},{
    collection: 'car'
});

module.exports = mongoose.model('car', Car);