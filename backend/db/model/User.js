const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    users: [
      {
        Userid: Number,
        role: String,
        name: String,
        email: String,
        mobile_num: String,
        password: String
      }
    ]
  });

const User = mongoose.model('users', userSchema);

module.exports = User;
