const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true, // Removes unnecessary whitespace
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Ensures no duplicate emails
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Regex for email validation
    },
    cn: {
        type: String,
        required: [true, 'Citizenship number is required'],
        match: [/^\d{4}-\d{4}-\d{6}$/, 'Citizenship number must follow the format ####-####-######'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isWorker:{
            type:Boolean,
            default:false
    },
    notification:{
        type:Array,
        default:[]
    },
    seennotification:{
        type:Array,
        default:[],  
    }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Create User Model
const userModel = mongoose.model('users', userSchema);

// Export the Model
module.exports = userModel;
