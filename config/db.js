const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDb connected ${mongoose.connection.host}`.bgGreen.white);
        
    }catch(err){
        console.log(`MongoDb server Issue ${err}`.bgRed.white);
        
    }
};

module.exports = connectDB;