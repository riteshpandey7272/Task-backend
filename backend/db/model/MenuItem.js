const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  menuitemid: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  regularprice: { type: Number, required: true },
  mediumprice: { type: Number, required: true },
  largeprice: { type: Number, required: true },
  userId: { type: Number, required: true },
  resturentid: { type: Number, ref: 'Restaurant', required: true },
  menuid: { type: Number, ref: 'Menu', required: true },
  categoryid: { type: Number, ref: 'Category', required: true }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
