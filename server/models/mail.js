const mongoose = require('mongoose')

const MailSchema = new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    recipient:{
        type:String,
        required:true
    },
    subject:{
         type:String,
         required:true
    },
    text:{
        type:String,
    }
})

const Mailbox = mongoose.model('MailBox',MailSchema)

module.exports = Mailbox;