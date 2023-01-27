const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
     phone: {
        type: Number,
        required: true,
        unique: true,
        min: 10,
      },
      password: {
        type: String,
        required: true,
      },
      isBlocked:{
        type: Boolean,
        default:false
      }

});

module.exports = mongoose.model("user", userSchema);