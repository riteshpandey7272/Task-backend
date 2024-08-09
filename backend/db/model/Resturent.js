const mongoose = require('mongoose');

const resturentSchema = new mongoose.Schema({
  resturents: [
    {
      Userid: { type: Number, ref: 'User' },
      resturentid: Number,
      resturentName: String,
      resturentContact: String,
      resturentEmailid: String,
      resturentAddress: String,
      ownerName: String,
      ownerContact: Number,
      ownerAlternateContact: Number,
      ownerEmail: String,
      numberOfTables: Number
    }
  ]
});

const Resturent = mongoose.model('Resturent', resturentSchema);

module.exports = Resturent;
