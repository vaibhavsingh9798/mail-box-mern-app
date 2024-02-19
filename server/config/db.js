const mongoose = require('mongoose')

const connectDB = async () =>{
    try{
await mongoose.connect('mongodb://localhost:27017/mail-box')
console.log('db connected')
    }catch(err){
        console.log('db err',err)
        process.exit(1)
    }
}

module.exports = connectDB;

