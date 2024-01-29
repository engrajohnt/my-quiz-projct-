// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  quizResults: [
    {
      answers: [String], // Assuming the answers are stored as strings
      score: Number,
    },
  ],
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel};
