const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModels");
const workerModel = require("../models/workerModel");

const getWorkerInfoController = async (req, res) => {
  try {
    const worker = await workerModel.findOne({ userId: req.body.userId });
    if (!worker) {
      return res.status(404).send({
        success: false,
        message: "Worker not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Worker data successfully fetched",
      data: worker,
    });
  } catch (error) {
    console.error("Error fetching worker:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching worker details",
      error,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const worker = await workerModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
      { new: true }
    );
    if (!worker) {
      return res.status(404).send({
        success: false,
        message: "Worker not found for update",
      });
    }
    res.status(200).send({
      success: true,
      message: "Worker profile updated successfully",
      data: worker,
    });
  } catch (error) {
    console.error("Error updating worker:", error);
    res.status(500).send({
      success: false,
      message: "Error updating worker details",
      error,
    });
  }
};

const getWorkerByIdController = async (req,res) =>{
  try{
    const worker = await workerModel.findOne({ _id:req.body.workerId })
    res.status(200).send({
      success: true,
      message: "Single Worker fetched Successfully",
      data: worker,
    })
  }catch(error){
    console.error("Error while fetching single worker:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching single worker details",
      error,
    });
  }
}

const getWorkerAppointmentController = async (req,res) =>{
 try{
   const worker = await workerModel.findOne({userId:req.body.userId})
  const appointments = await appointmentModel.find({  workerId : worker._id})

  res.status(200).send({
    success:true,
    message:'Worker Appointment fetch Successfully',
    data:appointments
  })
 }catch(error){
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Error fetching  worker appointments",
    error,
  });
  
 }
}

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    
    // Update appointment status
    const appointment = await appointmentModel.findByIdAndUpdate(appointmentsId, { status });
    
    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: 'Appointment not found',
      });
    }

    // Find the user associated with the appointment
    const user = await userModel.findOne({ _id: appointment.userId });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found for the given appointment',
      });
    }

    // Push the notification to the user's notification array
    user.notification.push({
      type: "status-updated",
      message: `Your appointment has been updated to ${status}`,
      onCLickPath: "/worker-appointments",
    });

    // Save the user document
    await user.save();

    // Send a successful response
    res.status(200).send({
      success: true,
      message: 'Appointment Status Updated',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Status",
      error: error.message,
    });
  }
};


module.exports = { 
  getWorkerInfoController, 
  updateProfileController,
  getWorkerByIdController ,
  getWorkerAppointmentController,
  updateStatusController};
