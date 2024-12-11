const express  =  require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getWorkerInfoController, updateProfileController } = require('../controllers/workerController');
const router = express.Router() 

router.post('/getWorkerInfo',authMiddleware,getWorkerInfoController)


router.post('/updateProfile',authMiddleware,updateProfileController)
module.exports = router;