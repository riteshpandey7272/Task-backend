const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  menuid: { type: Number, required: true },
  menuname: { type: String, required: true },
  userId: { type: Number, required: true },
  resturentid: { type: Number, ref: 'Restaurant', required: true }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
