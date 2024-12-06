const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/authMiddleware');
const { getAllUsers, getAllWorkers, changeAccountStatusController } = require('../controllers/adminController');

// GET || USERS
router.get('/getAllUsers',authmiddleware,getAllUsers)

// GET || WORKERS
router.get('/getAllWorkers',authmiddleware,getAllWorkers)

// POST || ACCOUNT STATUS
router.get('/changeAccountStatus',authmiddleware,changeAccountStatusController)


module.exports = router;