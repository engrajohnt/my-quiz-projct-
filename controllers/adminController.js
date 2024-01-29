// controllers/adminController.js
const { QuestionModel } = require('../models/questionModel');

const getDashboard = async (req, res) => {
  try {
    // Your logic to retrieve data for the admin dashboard
    const questions = await QuestionModel.find();

    // Render the admin dashboard view with the retrieved data
    res.render('admin/dashboard', { questions });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};

// Add other admin-related functions as needed

module.exports = {
  getDashboard,
  // Add other admin-related functions here
};
