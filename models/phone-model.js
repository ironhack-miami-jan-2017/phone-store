const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const phoneSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'The phone brand is required']
  },
  name: {
    type: String,
    required: [true, 'The phone name is required']
  },
  image: {
    type: String,
    default: ''
  },
  specs: {
    type: Array,
    default: []
  }
});


const Phone = mongoose.model('Phone', phoneSchema);


module.exports = Phone;
