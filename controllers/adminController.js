const workerModel =  require('../models/workerModel')
const userModel = require('../models/userModels');

const getAllUsers = async(req,res)=>{
    try{
        const users = await userModel.find({})
        res.status(200).send({
            success:true,
            message:'users data',
            data:users
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:'error while fetching users',
            error
        })
        
    }
}

const getAllWorkers = async (req,res)=>{
    try{
        const workers = await workerModel.find({})
        res.status(200).send({
            success:true,
            message:'workers data',
            data:workers
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:'error while fetching workers',
            error
        })
        
    }
}

// Worker account status
const changeAccountStatusController = async (req, res) => {
  console.log("this is body",req.body)
  console.log("this is change account")
    try {
      const { workerId, status } = req.body;
      const worker = await workerModel.findByIdAndUpdate(workerId, { status }, { new: true });
      if (!worker) {
        return res.status(404).send({
          success: false,
          message: "Worker not found",
        });
      }
      const user = await userModel.findById(worker.userId);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
      const notifcation = user.notifcation || [];
      notifcation.push({
        type: "worker-account-request-updated",
        message: `Your Worker Account Request Has ${status}`,
        onClickPath: "/notification",
      });
      user.notifcation = notifcation;
      user.isWorker = status === "approved" ? true : false;
      await user.save();
      res.status(201).send({
        success: true,
        message: "Account Status Updated",
        data: worker,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Account Status",
        error: error.message,
      });
    }
  };
  
module.exports = {getAllUsers,getAllWorkers,changeAccountStatusController}