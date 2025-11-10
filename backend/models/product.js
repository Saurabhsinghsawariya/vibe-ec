const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // You could add more, like 'imageUrl'
});

module.exports = mongoose.model('Product', ProductSchema);