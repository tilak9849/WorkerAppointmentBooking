const express = require('express');
const { loginController, registerController, authController,applyWorkerController,getAllNotificationController,deleteAllNotificationController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Initialize the router object
const router = express.Router();

// Routes
// LOGIN Route || POST
router.post('/login', loginController);

// REGISTER Route || POST
router.post('/register', registerController);

// Auth || POST
router.post('/getUserData',authMiddleware,authController)

// Apply Worker  |POST
router.post('/apply-worker',authMiddleware,applyWorkerController)

// Notification Worker || POST  
router.post('/get-all-notification',authMiddleware,getAllNotificationController)

// Notification Worker || POST  
router.post('/delete-all-notification',authMiddleware,deleteAllNotificationController)

// Export the router to use in `server.js`
module.exports = router;
