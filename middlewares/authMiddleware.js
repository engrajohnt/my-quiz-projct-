// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/userModel'); // Adjust the path based on your file structure

const authenticateAdmin = async (req, res, next) => {
  try {
    const adminToken = req.cookies.adminToken;

    // Check if adminToken exists
    if (!adminToken) {
      return res.status(401).redirect('/admin/login'); // Redirect to admin login page or handle authentication as needed
    }

    // If adminToken exists, proceed with decoding (you may want to verify the token as well)
    const { id } = await jwt.verify(adminToken, process.env.JWT_SECRET);

    // Assuming there's no AdminModel, we can skip querying an admin model
    // If you later add admin functionality, you can adjust this part

    // req.admin = admin;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  authenticateAdmin,
};







// // middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const { UserModel, QuestionModel } = require('../models');

// const authenticateUser = async (req, res, next) => {
//   try {
//     const userToken = req.cookies.userToken;
//     if (!userToken) {
//       return res.status(401).redirect('/login'); // Redirect to login page or handle authentication as needed
//     }

//     const { id } = await jwt.verify(userToken, process.env.JWT_SECRET);
//     const user = await UserModel.findById(id);

//     if (!user) {
//       return res.status(401).redirect('/login'); // Redirect to login page or handle authentication as needed
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Internal Server Error');
//   }
// };

// const authenticateAdmin = async (req, res, next) => {
//   try {
//     const adminToken = req.cookies.adminToken;
//     if (!adminToken) {
//       return res.status(401).redirect('/admin/login'); // Redirect to admin login page or handle authentication as needed
//     }

//     const { id } = await jwt.verify(adminToken, process.env.JWT_SECRET);
//     // Since there's no AdminModel, we can skip querying an admin model
//     // If you later add admin functionality, you can adjust this part

//     // req.admin = admin;
//     next();
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Internal Server Error');
//   }
// };

// module.exports = {
//   authenticateUser,
//   authenticateAdmin,
// };
