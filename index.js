const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { connectToDatabase } = require('./database/db');
const { UserModel } = require('./models/userModel');
const { QuestionModel } = require('./models/questionModel');  // Correct import
const adminRoutes = require('./routers/adminRoutes');
const generalRoutes = require('./routers/generalRoutes');
const userRoutes = require('./routers/userRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const port = process.env.PORT || 8080;

// MIDDLEWARES
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());

// ROUTES MIDDLEWARE
app.use('/api/v1/admin', authMiddleware.authenticateAdmin, adminRoutes);
app.use('/api/v1', generalRoutes);
app.use('/api/v1/user', authMiddleware.authenticateUser, userRoutes);

// GET THE LANDING PAGE
app.get('/', async (req, res) => {
  try {
    const userToken = req.cookies.userToken;
    const adminToken = req.cookies.adminToken;

    let user;
    let admin;
    if (userToken) {
      const userId = await jwt.verify(userToken, process.env.JWT_SECRET).id;
      user = await UserModel.findById(userId);
    }

    if (adminToken) {
      const adminId = await jwt.verify(adminToken, process.env.JWT_SECRET).id;
      // Since you don't have an AdminModel, you might not need this part
      // admin = await AdminModel.findById(adminId);
    }

    res.status(200).render('landingPage', { user, admin });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// SPINNING DEV PORT AND CONNECTING TO DATABASE
(async function () {
  try {
    const connected = await connectToDatabase();
    if (connected) {
      app.listen(port, () => console.log(`Server running on localhost port:${port}`));
    } else {
      console.error('Failed to connect to the database.');
    }
  } catch (err) {
    console.error(err.message);
  }
})();



// const express = require('express');
// const methodOverride = require('method-override');
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const { connectToDatabase } = require('./database/db');
// const { UserModel } = require('./models/userModel');
// const { AdminModel } = require('./models/questionModel');
// const adminRoutes = require('./routers/adminRoutes');
// const generalRoutes = require('./routers/generalRoutes');
// const userRoutes = require('./routers/userRoutes');


// const app = express();
// const port = process.env.PORT || 8080;

// // MIDDLEWARES
// const authMiddleware = require('./middlewares/authMiddleware');
// app.set('view engine', 'ejs');
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride('_method'));
// app.use(cookieParser());

// // ROUTES MIDDLEWARE
// app.use('/api/v1/admin', authMiddleware.authenticateAdmin, adminRoutes);
// app.use('/api/v1', generalRoutes);
// app.use('/api/v1/user', authMiddleware.authenticateUser, userRoutes);

// // GET THE LANDING PAGE
// app.get('/', async (req, res) => {
//   try {
//     const userToken = req.cookies.userToken;
//     const adminToken = req.cookies.adminToken;

//     let user;
//     let admin;
//     if (userToken) {
//       const userId = await jwt.verify(userToken, process.env.JWT_SECRET).id;
//       user = await UserModel.findById(userId);
//     }

//     if (adminToken) {
//       const adminId = await jwt.verify(adminToken, process.env.JWT_SECRET).id;
//       admin = await AdminModel.findById(adminId);
//     }

//     res.status(200).render('landingPage', { user, admin });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // SPINNING DEV PORT AND CONNECTING TO DATABASE
// (async function () {
//   try {
//     const connected = await connectToDatabase();
//     if (connected) {
//       app.listen(port, () => console.log(`Server running on localhost port:${port}`));
//     } else {
//       console.error('Failed to connect to the database.');
//     }
//   } catch (err) {
//     console.error(err.message);
//   }
// })();
