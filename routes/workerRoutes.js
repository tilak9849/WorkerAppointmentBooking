const express  =  require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getWorkerInfoController, updateProfileController, getWorkerByIdController, getWorkerAppointmentController, updateStatusController } = require('../controllers/workerController');
const router = express.Router() 

router.post('/getWorkerInfo',authMiddleware,getWorkerInfoController)


router.post('/updateProfile',authMiddleware,updateProfileController)

router.post('/getWorkerById',authMiddleware,getWorkerByIdController)

router.get('/worker-appointments',authMiddleware,getWorkerAppointmentController)

router.post('/update-status',authMiddleware,updateStatusController)
module.exports = router;