const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryid: { type: Number, required: true },
  name: { type: String, required: true },
  userId: { type: Number, required: true },
  resturentid: { type: Number, ref: 'Restaurant', required: true },
  menuid: { type: Number, ref: 'Menu', required: true }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
