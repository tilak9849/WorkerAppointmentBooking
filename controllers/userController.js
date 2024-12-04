const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const workerModel = require('../models/workerModel')
// Register callback
const registerController = async (req, res) => {
    try {
        const { name, email, password, cn } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists", success: false });
        }

        // Ensure password is provided
        if (!password) {
            return res.status(400).send({ message: "Password is required", success: false });
        }

        // Ensure citizenship number (cn) is provided and valid
        if (!cn || !/^\d{4}-\d{4}-\d{6}$/.test(cn)) {
            return res.status(400).send({ message: "Invalid or missing citizenship number (CN)", success: false });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            cn // Save the citizenship number as well
        });

        // Save user to DB
        await newUser.save();
        res.status(201).send({ message: "Registration successful", success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: `Error in register controller: ${err.message}` });
    }
};

// Login callback
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ensure email and password are provided
        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required", success: false });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: "Invalid credentials", success: false });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid credentials", success: false });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token expires in 1 day
        );

        // Send token and success response
        res.status(200).send({
            message: "Login successful",
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email } // Optional: Add user details
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: `Error in login controller: ${err.message}` });
    }
};


const authController = async (req, res) => {
    try {
      const user = await userModel.findById({ _id: req.body.userId });
      user.password = undefined;
      if (!user) {
        return res.status(200).send({
          message: "user not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "auth error",
        success: false,
        error,
      });
    }
  };

  const applyWorkerController = async(req,res) =>{
    try{
      const newWorker = await workerModel({...req.body,status:'pending'})
      await newWorker.save()
      const adminUser = await userModel.findOne({isAdmin:true})
      const notification = adminUser.notification
      notification.push({
        type:'apply-worker-request',
        message:`${newWorker.firstName} ${newWorker.lastName} Has Applied For A Worker Account`,
        data:{
          workerId : newWorker._id,
          name:newWorker.firstName + " " + newWorker.lastName,
          onclickPath:'/admin/workers'
        }
      })
      await userModel.findByIdAndUpdate(adminUser._id,{notification})
      res.status(201).send({
        success:true,
        message:'Worker Account Applied Successfully'
      })
    }catch(err){
      console.log(err);
      res.status(500).send({
        success:false,
        error,
        message:"Error while Applying Worker"
      })
      
    }

  }

  const getAllNotificationController = async (req,res) =>{
      try{
        const user = await userModel.findOne({_id:req.body.userId})
        const seennotification = user.seennotification
        const notification = user.notification
        seennotification.push(...notification)
        user.notification = []
        user.seennotification = notification
        const updateUser = await user.save()
        res.status(200).send({
          success:true,
          message:'All notification marked as read',
          data:updateUser,
        });

      }catch(err){
        console.log(err);
      res.status(500).send({
        success:false,
        error,
        message:"Error while Getting Notification"
      })
      }
  }
// delete notifications
  const deleteAllNotificationController = async (req,res) => {
    try{
      const user = await userModel.findOne({_id:req.body.userId})
      user.notification = []
      user.seennotification = []
      const updatedUser = await user.save()
      updatedUser.password = undefined
      res.status(200).send({
        success:true,
        messsege:'Notifications Deleted Successfully',
        data:updatedUser,
      })
    }catch(err){
      console.log(err);
      res.status(500).send({
        success:false,
        messsege:'Unable to delete all notification',
        error
      })
    }
  }

module.exports = { loginController, registerController,authController,applyWorkerController,getAllNotificationController ,deleteAllNotificationController};
