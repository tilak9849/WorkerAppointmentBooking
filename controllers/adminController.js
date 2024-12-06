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
const changeAccountStatusController = async(req,res)=>{
    try{
const {workerId, status} = req.body
        const worker = await workerModel.findByIdAndUpdate(workerId,{status})
        const user = await userModel.findOne({_id:worker.userId})
        const notification =user.notification
        notification.push({
            type:'worker-account-request-updated',
            message:`Your Worker Account Request Has ${status}`,
            onClickPath:'/notification'
        })

        user.isWorker === 'approved' ? true :false
        await user.save()
        res.status(201).send({
            success:true,
            message:'Account Status Updated',
            data:worker
,        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            messege:'Error while changing account status'
        })
        
    }
}
module.exports = {getAllUsers,getAllWorkers,changeAccountStatusController}